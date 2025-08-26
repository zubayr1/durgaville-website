import React, { useState } from "react";
import { Grid, FormField, Button, Form, TextArea, Message, Icon } from "semantic-ui-react";

import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(-1);

  const currentDate = new Date();

  const handleiconClick = (value) => {
    if (value === "facebook") {
      window.open("https://www.facebook.com/durgaville/", "_blank");
    }
    if (value === "instagram") {
      window.open("https://www.instagram.com/durgaville/", "_blank");
    }
    if (value === "youtube") {
      window.open("https://www.youtube.com/@durgaville8491", "_blank");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    if (name === "" || email === "" || description === "") {
      setError(1);
    } else {
      try {
        // Add message to a 'messages' collection in Firestore
        await addDoc(collection(db, "messages"), {
          name: name,
          email: email,
          description: description,
          date: currentDate.toLocaleString(),
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
        <Message error header="Oops!" content="One of the entries is empty" />
      </div>
    );
  } else if (error === 2) {
    layout = (
      <div>
        <Message error header="Sorry!" content="Error due to unforeseen issue" />
      </div>
    );
  } else if (error === 0) {
    layout = (
      <div>
        <Message success header="Success!" content="Message sent successfully!!" />
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        paddingTop: "3%",
        paddingBottom: "3%",
      }}
    >
      <Grid centered>
        <Grid.Row>
          <Grid>
            <Grid.Row centered floated="left" width={16}>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.2rem",
                  color: "#666",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  marginLeft: "10%",
                  marginRight: "10%",
                  fontStyle: "italic",
                }}
              >
                Get in touch with Durgaville to learn more about our work and how you can get involved.
              </p>
              <Form onSubmit={handleSubmit} style={{ width: "100%", marginLeft: "10%", marginRight: "10%" }}>
                <Form.Group widths="equal">
                  <FormField>
                    <label
                      htmlFor="name"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        fontSize: "1.3rem",
                        color: "#606166",
                        marginBottom: "1%",
                      }}
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      placeholder="add your name here"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ height: "40px", padding: "10px", fontSize: "1.3rem", width: "100%" }}
                    />
                  </FormField>

                  <FormField>
                    <label
                      htmlFor="email"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        fontSize: "1.3rem",
                        color: "#606166",
                        marginBottom: "1%",
                      }}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      placeholder="add your email here"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ height: "40px", padding: "10px", fontSize: "1.3rem", width: "100%" }}
                    />
                  </FormField>
                </Form.Group>
                <FormField>
                  <label
                    htmlFor="message"
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      fontSize: "1.3rem",
                      color: "#606166",
                      marginBottom: "1%",
                    }}
                  >
                    Message
                  </label>
                  <TextArea
                    placeholder="add your message here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ marginBottom: "2%" }}
                  />
                </FormField>

                <Button
                  type="submit"
                  style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.3rem" }}
                >
                  Send Message
                </Button>
              </Form>

              {layout}
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                <Grid stackable centered style={{ marginTop: "1rem" }}>
                  <Grid.Row columns="equal" divided>
                    <Grid.Column style={{ paddingBottom: "1rem", textAlign: "center" }}>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Inter",
                          fontSize: "1.1rem",
                          color: "#606166",
                          marginBottom: "1rem",
                        }}
                      >
                        {" "}
                        ADDRESS{" "}
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontSize: "1.2rem",
                          color: "#919199",
                          margin: 0,
                          lineHeight: "1.5",
                        }}
                      >
                        {" "}
                        Am Europakanal 2, 91056{" "}
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontSize: "1.2rem",
                          color: "#919199",
                          margin: 0,
                          lineHeight: "1.5",
                        }}
                      >
                        {" "}
                        Erlangen, Germany{" "}
                      </p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: "1rem", textAlign: "center" }}>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Inter",
                          fontSize: "1.1rem",
                          color: "#606166",
                          marginBottom: "1rem",
                        }}
                      >
                        {" "}
                        PHONE{" "}
                      </p>
                      <p style={{ fontFamily: "Inter", fontSize: "1.2rem", color: "#919199", margin: 0 }}>
                        {" "}
                        +49 160 3439029{" "}
                      </p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: "1rem", textAlign: "center" }}>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Inter",
                          fontSize: "1.1rem",
                          color: "#606166",
                          marginBottom: "1rem",
                        }}
                      >
                        {" "}
                        EMAIL{" "}
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontSize: "1.2rem",
                          color: "#919199",
                          margin: 0,
                          fontStyle: "italic",
                        }}
                      >
                        {" "}
                        info@durgaville.com{" "}
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered style={{ marginTop: "1rem" }}>
                    <Grid.Column textAlign="center">
                      <p
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Inter",
                          fontSize: "1.1rem",
                          color: "#606166",
                          marginBottom: "1rem",
                        }}
                      >
                        {" "}
                        SOCIAL{" "}
                      </p>
                      <Icon
                        onClick={() => handleiconClick("facebook")}
                        circular
                        color="black"
                        name="facebook f"
                        size="large"
                        style={{ cursor: "pointer", margin: "0 0.5rem" }}
                      />
                      <Icon
                        onClick={() => handleiconClick("instagram")}
                        circular
                        color="black"
                        name="instagram"
                        size="large"
                        style={{ cursor: "pointer", margin: "0 0.5rem" }}
                      />
                      <Icon
                        onClick={() => handleiconClick("youtube")}
                        circular
                        color="black"
                        name="youtube"
                        size="large"
                        style={{ cursor: "pointer", margin: "0 0.5rem" }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Grid.Column textAlign="center" style={{ marginTop: "1rem" }}>
                      <a
                        href="/dataprivacy"
                        style={{
                          marginRight: "20px",
                          color: "#606166",
                          textDecoration: "underline",
                          cursor: "pointer",
                          fontSize: "1.1rem",
                        }}
                      >
                        {" "}
                        Data Privacy{" "}
                      </a>
                      <a
                        href="/impressum"
                        style={{ color: "#606166", textDecoration: "underline", cursor: "pointer", fontSize: "1.1rem" }}
                      >
                        {" "}
                        Impressum{" "}
                      </a>
                      <div style={{ marginTop: "12px", fontSize: "1rem", color: "#919199" }}>
                        {" "}
                        © Durgaville e.V. | VR 201678
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Footer;
