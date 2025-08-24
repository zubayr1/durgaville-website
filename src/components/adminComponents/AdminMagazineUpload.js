import React, { useState, useEffect } from "react";
import { Grid, Form, Button, Message, Header, Segment, Container, Loader } from "semantic-ui-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";

function AdminMagazineUpload() {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

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
      setImageFile(file);
      setError(null);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        // 100MB limit for PDFs
        setError("PDF file size exceeds 100MB limit");
        return;
      }
      if (file.type !== "application/pdf") {
        setError("Please select a valid PDF file");
        return;
      }
      setPdfFile(file);
      setError(null);
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
    if (!formData.name || !formData.year || !formData.description || !imageFile || !pdfFile) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Upload image
      const imagePath = generateUniqueFileName(imageFile.name, "magazineimages");
      const imageUrl = await uploadFile(imageFile, imagePath);

      // Upload PDF
      const pdfPath = generateUniqueFileName(pdfFile.name, "magazines");
      const pdfUrl = await uploadFile(pdfFile, pdfPath);

      // Save to database
      const magazineData = {
        name: formData.name,
        year: formData.year,
        description: formData.description,
        imageUrl: imageUrl,
        pdfUrl: pdfUrl,
        imagePath: imagePath,
        pdfPath: pdfPath,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "magazines"), magazineData);

      setSuccess(true);
      setFormData({ name: "", year: "", description: "" });
      setImageFile(null);
      setPdfFile(null);

      // Reset file inputs
      const imageInput = document.getElementById("image-input");
      const pdfInput = document.getElementById("pdf-input");
      if (imageInput) imageInput.value = "";
      if (pdfInput) pdfInput.value = "";
    } catch (error) {
      console.error("Error uploading magazine:", error);
      setError("Failed to upload magazine. Please try again.");
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
              Upload Magazine
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={12}>
            <Segment padded>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Magazine Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter magazine name"
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
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter magazine description"
                    rows={4}
                    required
                  />
                </Form.Field>

                <Form.Field>
                  <label>Magazine Cover Image</label>
                  <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} required />
                  <small>Maximum file size: 10MB. Supported formats: JPG, PNG, GIF</small>
                </Form.Field>

                <Form.Field>
                  <label>Magazine PDF</label>
                  <input id="pdf-input" type="file" accept=".pdf" onChange={handlePdfChange} required />
                  <small>Maximum file size: 100MB. Only PDF files allowed.</small>
                </Form.Field>

                {loading && (
                  <Message info>
                    <Loader active inline size="small" />
                    Uploading... {Math.round(uploadProgress)}%
                  </Message>
                )}

                {error && <Message negative>{error}</Message>}

                {success && <Message positive>Magazine uploaded successfully!</Message>}

                <Button type="submit" primary loading={loading} disabled={loading} style={{ marginTop: "1rem" }}>
                  Upload Magazine
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default AdminMagazineUpload;
