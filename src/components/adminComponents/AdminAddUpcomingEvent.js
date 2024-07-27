import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Image, Message } from "semantic-ui-react";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useNavigate } from "react-router-dom";

const AdminAddUpcomingEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState(-1);

  const navigate = useNavigate();

  useEffect(() => {
    //navgate to login
    onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "info@durgaville.com") {
        navigate("/adminlogin");
      }
    });
  }, [navigate]);

  const handleSubmit = async () => {
    if (title === "" || description === "" || date === "" || image === null) {
      setError(1);
    } else if(image.name.includes(" ")) {
      setError(3);
    }
    else {
      try {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `imagesUpcomingEvents/${image.name}`);
        await uploadBytes(imageRef, image);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        // Add document to a 'events' collection in Firestore
        await addDoc(collection(db, "upcomingEvents"), {
          title: title,
          description: description,
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
  }
  else if (error === 0) {
    layout = (
      <div>
        <Message success header="Success" content="Submission done successfully" />
      </div>
    );
  }

  return (
    <div style={{ overflow: "hidden", marginTop: "10%" }}>
      <Grid centered>
        <Grid.Row>
          <p style={{ fontWeight: "bolder", fontSize: "4rem", fontFamily: "Inter" }}>Durgaville Admin Portal: Add Upcoming Events</p>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={10} computer={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label htmlFor="title">Title</label>
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="description">Description</label>
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="date">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="image">Image</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={10} computer={8}>
            {image && <Image src={URL.createObjectURL(image)} size="medium" />}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>{layout}</Grid.Row>
      </Grid>
    </div>
  );
};

export default AdminAddUpcomingEvent;
