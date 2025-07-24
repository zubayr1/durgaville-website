import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Message } from "semantic-ui-react";
import Cropper from "react-easy-crop";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import getCroppedImg from "./cropimage.js";
import { useNavigate } from "react-router-dom";

const AdminAddMember = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState(-1);
  const [isCropped, setIsCropped] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "info@durgaville.com") {
        navigate("/adminlogin");
      }
    });
  }, [navigate]);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(imageURL, croppedAreaPixels, 0);
      setIsCropped(1);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (name === "" || date === "" || image === null || croppedImage === null) {
      setError(1);
    } else if (image.name.includes(" ")) {
      setError(3);
    } else if (!isCropped) {
      setError(4);
    } else {
      try {
        const imageRef = ref(storage, `imagesMembers/${image.name}`);
        await uploadBytes(imageRef, croppedImage);

        const imageUrl = await getDownloadURL(imageRef);
        await addDoc(collection(db, "coreMembers"), {
          title: name,
          date: date,
          imageUrl: imageUrl,
        });
        setError(0);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setError(2);
      }
    }
  };

  let layout;
  if (error === -1) {
    layout = <div></div>;
  } else if (error === 1) {
    layout = (
      <div>
        <Message error header="Submission Error" content="One of the entries is empty" />
      </div>
    );
  } else if (error === 2) {
    layout = (
      <div>
        <Message error header="Submission Error" content="Error due to unforeseen issue" />
      </div>
    );
  } else if (error === 3) {
    layout = (
      <div>
        <Message error header="Submission Error" content="Image name should not have white spaces" />
      </div>
    );
  } else if (error === 4) {
    layout = (
      <div>
        <Message error header="Submission Error" content="Image is not cropped yet" />
      </div>
    );
  } else if (error === 0) {
    layout = (
      <div>
        <Message success header="Success" content="Submission done successfully" />
      </div>
    );
  }

  let cropLayout = <div></div>;
  if (imageURL !== null) {
    cropLayout = (
      <Grid centered>
        <Grid.Row style={{ width: "100%", height: "400px" }}>
          <Cropper
            image={imageURL}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Grid.Row>
        <Grid.Row>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(e.target.value)}
            className="zoom-range"
          />
        </Grid.Row>
      </Grid>
    );
  }

  return (
    <div style={{ overflow: "hidden", marginTop: "10%" }}>
      <Grid centered>
        <Grid.Row>
          <p style={{ fontWeight: "bolder", fontSize: "4rem", fontFamily: "Inter" }}>
            Durgaville Admin Portal: Add Member
          </p>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={10} computer={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label htmlFor="name">Name</label>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Field>

              <Form.Field>
                <label htmlFor="datetime">Date and Time</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Field>

              <Form.Field>
                <label htmlFor="image">Image</label>
                <input type="file" onChange={handleImageChange} />
              </Form.Field>

              <Button type="submit">Submit</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>{layout}</Grid.Row>
      </Grid>
      {cropLayout}
    </div>
  );
};

export default AdminAddMember;
