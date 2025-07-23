import React, { useState } from "react";
import { Grid, FormField, Button, Form, TextArea, Message, Icon, Divider } from "semantic-ui-react";

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
        paddingTop: "5%",
        paddingBottom: "3%",
      }}
    >
      <Grid centered>
        <Grid.Row only="computer">
          <Grid.Column
            floated="left"
            width={8}
            style={{ paddingLeft: "5%", paddingRight: "5%", borderRight: "1px solid #a1a1ab" }}
          >
            <Grid>
              <Grid.Row>
                <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <FormField>
                    <label
                      htmlFor="name"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        fontSize: "1.3rem",
                        color: "#606166",
                        marginBottom: "2%",
                      }}
                    >
                      Name
                    </label>
                    <input
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ height: "50px", padding: "10px", fontSize: "1.3rem", width: "100%", marginBottom: "3%" }}
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
                        marginBottom: "2%",
                      }}
                    >
                      Email
                    </label>
                    <input
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ height: "50px", padding: "10px", fontSize: "1.3rem", width: "100%", marginBottom: "3%" }}
                    />
                  </FormField>
                  <FormField>
                    <label
                      htmlFor="message"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        fontSize: "1.3rem",
                        color: "#606166",
                        marginBottom: "2%",
                      }}
                    >
                      Message
                    </label>
                    <TextArea
                      placeholder=""
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ marginBottom: "4%" }}
                    />
                  </FormField>

                  <Button
                    type="submit"
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.3rem" }}
                  >
                    Send Message
                  </Button>
                </Form>
              </Grid.Row>
              <Grid.Row centered>{layout}</Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={6} verticalAlign="middle">
            <Grid centered style={{ marginBottom: "50px" }}>
              <Grid.Column width={4} style={{ padding: 0 }}>
                <p style={{ fontWeight: "bold", fontFamily: "Inter", fontSize: "1.3rem", color: "#606166" }}>ADDRESS</p>
              </Grid.Column>

              <Grid.Column floated="left" width={8} style={{ padding: 0 }}>
                <p style={{ fontFamily: "Inter", fontSize: "1.4rem", color: "#919199", margin: 0 }}>
                  Am Europakanal 2, 91056
                </p>
                <p style={{ fontFamily: "Inter", fontSize: "1.4rem", color: "#919199", margin: 0 }}>
                  Erlangen, Germany
                </p>
              </Grid.Column>
            </Grid>

            <Grid centered style={{ marginTop: "50px" }}>
              <Grid.Column width={4} style={{ padding: 0 }}>
                <p style={{ fontWeight: "bold", fontFamily: "Inter", fontSize: "1.3rem", color: "#606166" }}>PHONE</p>
              </Grid.Column>

              <Grid.Column floated="left" width={8} style={{ padding: 0 }}>
                <p style={{ fontFamily: "Inter", fontSize: "1.4rem", color: "#919199", margin: 0 }}>+49 160 3439029</p>
              </Grid.Column>
            </Grid>

            <Grid centered style={{ marginTop: "50px" }}>
              <Grid.Column width={4} style={{ padding: 0 }}>
                <p style={{ fontWeight: "bold", fontFamily: "Inter", fontSize: "1.3rem", color: "#606166" }}>EMAIL</p>
              </Grid.Column>

              <Grid.Column floated="left" width={8} style={{ padding: 0 }}>
                <p
                  style={{ fontFamily: "Inter", fontSize: "1.4rem", color: "#919199", margin: 0, fontStyle: "italic" }}
                >
                  info@durgaville.com
                </p>
              </Grid.Column>
            </Grid>

            <Grid centered style={{ marginTop: "50px" }}>
              <Grid.Column width={4} style={{ padding: 0 }}>
                <p style={{ fontWeight: "bold", fontFamily: "Inter", fontSize: "1.3rem", color: "#606166" }}>SOCIAL</p>
              </Grid.Column>

              <Grid.Column floated="left" width={8} style={{ padding: 0 }}>
                <Grid>
                  <Grid.Column width={4}>
                    <Icon
                      onClick={() => handleiconClick("facebook")}
                      circular
                      color="black"
                      name="facebook f"
                      size="large"
                    />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Icon
                      onClick={() => handleiconClick("instagram")}
                      circular
                      color="black"
                      name="instagram"
                      size="large"
                    />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Icon
                      onClick={() => handleiconClick("youtube")}
                      circular
                      color="black"
                      name="youtube"
                      size="large"
                    />
                  </Grid.Column>
                </Grid>
              </Grid.Column>

              <Grid.Column width={8} style={{ padding: 0 }}>
                <div style={{ marginTop: "10%" }}>
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
                    Data Privacy
                  </a>
                  <a
                    href="/impressum"
                    style={{ color: "#606166", textDecoration: "underline", cursor: "pointer", fontSize: "1.1rem" }}
                  >
                    Impressum
                  </a>
                </div>
                <div style={{ marginTop: "12px", fontSize: "1rem", color: "#919199" }}>
                  © Durgaville e.V. | VR 201678<sup style={{ fontSize: "0.8rem" }}>†</sup>
                </div>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row only="tablet">
          <Grid.Column
            floated="left"
            width={8}
            style={{ paddingLeft: "5%", paddingRight: "5%", borderRight: "1px solid #a1a1ab" }}
          >
            <Grid>
              <Grid.Row>
                <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <FormField>
                    <label
                      htmlFor="name"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        fontSize: "1.3rem",
                        color: "#606166",
                        marginBottom: "2%",
                      }}
                    >
                      Name
                    </label>
                    <input
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ height: "50px", padding: "10px", fontSize: "1.3rem", width: "100%", marginBottom: "3%" }}
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
                        marginBottom: "2%",
                      }}
                    >
                      Email
                    </label>
                    <input
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ height: "50px", padding: "10px", fontSize: "1.3rem", width: "100%", marginBottom: "3%" }}
                    />
                  </FormField>
                  <FormField>
                    <label
                      htmlFor="message"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        fontSize: "1.3rem",
                        color: "#606166",
                        marginBottom: "2%",
                      }}
                    >
                      Message
                    </label>
                    <TextArea
                      placeholder=""
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ marginBottom: "4%" }}
                    />
                  </FormField>

                  <Button
                    type="submit"
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.3rem" }}
                  >
                    Send Message
                  </Button>
                </Form>
              </Grid.Row>

              <Grid.Row centered>{layout}</Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={7} verticalAlign="middle">
            <Grid centered style={{ marginBottom: "50px" }}>
              <Grid.Column width={4} style={{ padding: 0 }}>
                <p style={{ fontWeight: "bold", fontFamily: "Inter", fontSize: "1.1rem", color: "#606166" }}>ADDRESS</p>
              </Grid.Column>

              <Grid.Column floated="left" width={8} style={{ padding: 0 }}>
                <p style={{ fontFamily: "Inter", fontSize: "1.2rem", color: "#919199", margin: 0 }}>
                  Am Europakanal 2, 91056
                </p>
                <p style={{ fontFamily: "Inter", fontSize: "1.2rem", color: "#919199", margin: 0 }}>
                  Erlangen, Germany
                </p>
              </Grid.Column>
            </Grid>

            <Grid centered style={{ marginTop: "50px" }}>
              <Grid.Column width={4} style={{ padding: 0 }}>
                <p style={{ fontWeight: "bold", fontFamily: "Inter", fontSize: "1.1rem", color: "#606166" }}>PHONE</p>
              </Grid.Column>

              <Grid.Column floated="left" width={8} style={{ padding: 0 }}>
                <p style={{ fontFamily: "Inter", fontSize: "1.2rem", color: "#919199", margin: 0 }}>+49 160 3439029</p>
              </Grid.Column>
            </Grid>

            <Grid centered style={{ marginTop: "50px" }}>
              <Grid.Column width={4} style={{ padding: 0 }}>
                <p style={{ fontWeight: "bold", fontFamily: "Inter", fontSize: "1.1rem", color: "#606166" }}>EMAIL</p>
              </Grid.Column>

              <Grid.Column floated="left" width={8} style={{ padding: 0 }}>
                <p
                  style={{ fontFamily: "Inter", fontSize: "1.2rem", color: "#919199", margin: 0, fontStyle: "italic" }}
                >
                  info@durgaville.com
                </p>
              </Grid.Column>
            </Grid>

            <Grid centered style={{ marginTop: "50px" }}>
              <Grid.Column width={4} style={{ padding: 0 }}>
                <p style={{ fontWeight: "bold", fontFamily: "Inter", fontSize: "1.1rem", color: "#606166" }}>SOCIAL</p>
              </Grid.Column>

              <Grid.Column floated="left" width={8} style={{ padding: 0 }}>
                <Grid>
                  <Grid.Column width={4}>
                    <Icon
                      onClick={() => handleiconClick("facebook")}
                      circular
                      color="black"
                      name="facebook f"
                      size="large"
                    />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Icon
                      onClick={() => handleiconClick("instagram")}
                      circular
                      color="black"
                      name="instagram"
                      size="large"
                    />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Icon
                      onClick={() => handleiconClick("youtube")}
                      circular
                      color="black"
                      name="youtube"
                      size="large"
                    />
                  </Grid.Column>
                  <Grid.Column width={16} style={{ padding: 0 }}>
                    <div style={{ marginTop: "7%" }}>
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
                        Data Privacy
                      </a>
                      <a
                        href="/impressum"
                        style={{ color: "#606166", textDecoration: "underline", cursor: "pointer", fontSize: "1.1rem" }}
                      >
                        Impressum
                      </a>
                    </div>
                    <div style={{ marginTop: "12px", fontSize: "1rem", color: "#919199" }}>
                      © Durgaville e.V. | VR 201678<sup style={{ fontSize: "0.8rem" }}>†</sup>
                    </div>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row only="mobile">
          <Grid>
            <Grid.Row
              centered
              floated="left"
              width={8}
              style={{ marginLeft: "5%", marginRight: "5%", borderRight: "1px solid #a1a1ab" }}
            >
              <Form onSubmit={handleSubmit} style={{ width: "100%", margin: "5%" }}>
                <FormField>
                  <label
                    htmlFor="name"
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      fontSize: "1.3rem",
                      color: "#606166",
                      marginBottom: "2%",
                    }}
                  >
                    Name
                  </label>
                  <input
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ height: "40px", padding: "10px", fontSize: "1.3rem", width: "100%", marginBottom: "3%" }}
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
                      marginBottom: "2%",
                    }}
                  >
                    Email
                  </label>
                  <input
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ height: "40px", padding: "10px", fontSize: "1.3rem", width: "100%", marginBottom: "3%" }}
                  />
                </FormField>
                <FormField>
                  <label
                    htmlFor="message"
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      fontSize: "1.3rem",
                      color: "#606166",
                      marginBottom: "2%",
                    }}
                  >
                    Message
                  </label>
                  <TextArea
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ marginBottom: "4%" }}
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

            <Divider inverted />

            <Grid.Row width={7} verticalAlign="middle">
              <Grid centered style={{ marginBottom: "50px" }}>
                <Grid.Row width={4} style={{ padding: 0 }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      fontSize: "1.1rem",
                      color: "#606166",
                      marginBottom: "2%",
                    }}
                  >
                    ADDRESS
                  </p>
                </Grid.Row>

                <Grid.Row floated="left" width={8} style={{ padding: 0, marginBottom: "3%" }}>
                  <div>
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontSize: "1.2rem",
                        color: "#919199",
                        margin: 0,
                        lineHeight: "1.5",
                        display: "block",
                      }}
                    >
                      Am Europakanal 2, 91056
                    </p>
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontSize: "1.2rem",
                        color: "#919199",
                        margin: 0,
                        lineHeight: "1.5",
                        display: "block",
                      }}
                    >
                      Erlangen, Germany
                    </p>
                  </div>
                </Grid.Row>

                <Grid.Row width={4} style={{ padding: 0 }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      fontSize: "1.1rem",
                      color: "#606166",
                      marginBottom: "2%",
                    }}
                  >
                    PHONE
                  </p>
                </Grid.Row>

                <Grid.Row floated="left" width={8} style={{ padding: 0, marginBottom: "3%" }}>
                  <p style={{ fontFamily: "Inter", fontSize: "1.2rem", color: "#919199", margin: 0 }}>
                    +49 160 3439029
                  </p>
                </Grid.Row>

                <Grid.Row width={4} style={{ padding: 0 }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      fontSize: "1.1rem",
                      color: "#606166",
                      marginBottom: "2%",
                    }}
                  >
                    EMAIL
                  </p>
                </Grid.Row>

                <Grid.Row floated="left" width={8} style={{ padding: 0, marginBottom: "3%" }}>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: "1.2rem",
                      color: "#919199",
                      margin: 0,
                      fontStyle: "italic",
                    }}
                  >
                    info@durgaville.com
                  </p>
                </Grid.Row>

                <Grid.Row width={4} style={{ padding: 0 }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      fontSize: "1.1rem",
                      color: "#606166",
                      marginBottom: "2%",
                    }}
                  >
                    SOCIAL
                  </p>
                </Grid.Row>

                <Grid.Row floated="left" style={{ padding: 0 }}>
                  <Grid centered>
                    <Grid.Column width={4}>
                      <Icon
                        onClick={() => handleiconClick("facebook")}
                        circular
                        color="black"
                        name="facebook f"
                        size="large"
                      />
                    </Grid.Column>

                    <Grid.Column width={4}>
                      <Icon
                        onClick={() => handleiconClick("instagram")}
                        circular
                        color="black"
                        name="instagram"
                        size="large"
                      />
                    </Grid.Column>

                    <Grid.Column width={4}>
                      <Icon
                        onClick={() => handleiconClick("youtube")}
                        circular
                        color="black"
                        name="youtube"
                        size="large"
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
                <Grid.Row width={16} style={{ padding: 0 }}>
                  <div style={{ marginTop: "5%" }}>
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
                      Data Privacy
                    </a>
                    <a
                      href="/impressum"
                      style={{ color: "#606166", textDecoration: "underline", cursor: "pointer", fontSize: "1.1rem" }}
                    >
                      Impressum
                    </a>

                    <div style={{ marginTop: "12px", fontSize: "1rem", color: "#919199" }}>
                      © Durgaville e.V. | VR 201678<sup style={{ fontSize: "0.8rem" }}>†</sup>
                    </div>
                  </div>
                </Grid.Row>
              </Grid>
            </Grid.Row>
          </Grid>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Footer;
