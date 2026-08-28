import React, { useState, useEffect, useRef } from "react";
import { Grid, Form, Button, Message, Header, Segment, Container, Loader, Modal } from "semantic-ui-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function AdminPressReleases() {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Image cropping states
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [showCropModal, setShowCropModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "info@durgaville.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        navigate("/adminlogin");
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setError("Image file size exceeds 10MB limit");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Create preview URL and show crop modal
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setShowCropModal(true);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  // Initialize crop with 1:1 aspect ratio
  const onImageLoad = (img) => {
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        1, // 1:1 aspect ratio
        img.width,
        img.height,
      ),
      img.width,
      img.height,
    );
    setCrop(crop);
  };

  // Convert canvas to blob
  const getCroppedImg = (image, crop) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.95,
      );
    });
  };

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    try {
      const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
      const croppedFile = new File([croppedImageBlob], imageFile.name, {
        type: "image/jpeg",
      });
      setImageFile(croppedFile);
      setShowCropModal(false);
    } catch (error) {
      console.error("Error cropping image:", error);
      setError("Failed to crop image. Please try again.");
    }
  };

  const generateUniqueFileName = (originalName, prefix) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split(".").pop();
    const baseName = originalName.replace(/\.[^/.]+$/, "");
    return `${prefix}/${baseName}_${timestamp}_${randomString}.${extension}`;
  };

  const uploadFile = async (file, path) => {
    const fileRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => reject(error),
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        },
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.year || !imageFile) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Upload image
      const imagePath = generateUniqueFileName(imageFile.name, "pressreleaseimages");
      const imageUrl = await uploadFile(imageFile, imagePath);

      // Save to database
      const pressReleaseData = {
        name: formData.name,
        year: formData.year,
        imageUrl: imageUrl,
        imagePath: imagePath,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "pressreleases"), pressReleaseData);

      setSuccess(true);
      setFormData({ name: "", year: "" });
      setImageFile(null);

      // Reset file input
      const imageInput = document.getElementById("image-input");
      if (imageInput) imageInput.value = "";
    } catch (error) {
      console.error("Error uploading press release:", error);
      setError("Failed to upload press release. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (checkingAuth) {
    return (
      <Container style={{ marginTop: "2em" }}>
        <Loader active>Checking authentication...</Loader>
      </Container>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect to login
  }

  return (
    <Container style={{ marginTop: "2em" }}>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header as="h2" style={{ marginBottom: "2rem" }}>
              Upload Press Release
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={12}>
            <Segment padded>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Press Release Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter press release name"
                    required
                  />
                </Form.Field>

                <Form.Field>
                  <label>Year</label>
                  <input
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Enter year (e.g., 2024)"
                    min="2000"
                    max="2030"
                    required
                  />
                </Form.Field>

                <Form.Field>
                  <label>Press Release Thumbnail Image</label>
                  <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} required />
                  <small>
                    Maximum file size: 10MB. Image will be cropped to 1:1 ratio. Supported formats: JPG, PNG, GIF
                  </small>
                </Form.Field>

                {loading && (
                  <Message info>
                    <Loader active inline size="small" />
                    Uploading... {Math.round(uploadProgress)}%
                  </Message>
                )}

                {error && <Message negative>{error}</Message>}

                {success && <Message positive>Press release uploaded successfully!</Message>}

                <Button type="submit" primary loading={loading} disabled={loading} style={{ marginTop: "1rem" }}>
                  Upload Press Release
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {/* Image Crop Modal */}
      <Modal open={showCropModal} onClose={() => setShowCropModal(false)} size="large">
        <Modal.Header>Crop Image to 1:1 Ratio</Modal.Header>
        <Modal.Content>
          <div style={{ textAlign: "center" }}>
            {previewImage && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1} // 1:1 aspect ratio
                minWidth={100}
                minHeight={100}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={previewImage}
                  style={{ maxHeight: "400px", maxWidth: "100%" }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
            <canvas
              ref={canvasRef}
              style={{
                display: "none",
              }}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setShowCropModal(false)}>Cancel</Button>
          <Button primary onClick={handleCropComplete}>
            Crop & Continue
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}

export default AdminPressReleases;
