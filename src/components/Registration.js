import React, { useState } from "react";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { TailSpin } from "react-loader-spinner";

function Registration() {
  const [entries, setEntries] = useState([{ fullName: "", age: 0, email: "", phone: "" }]);
  const [error, setError] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleSubmit = async () => {
    setError(-1);

    let valid = true;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      if (entry.fullName === "" || entry.age === 0 || entry.email === "" || entry.phone === "") {
        setError(1);
        valid = false;
        break;
      }

      if (valid) {
        setLoading(true);

        try {
          await addDoc(collection(db, "sit&draw2024"), {
            title: entry.fullName,
            age: entry.age,
            email: entry.email,
            phone: entry.phone,
          });
          setError(0);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          setError(2);
        }
      }
    }
  };

  let layout;

  if (error === -1) {
    layout = <div></div>;
  } else if (error === 1) {
    layout = (
      <div>
        <Message error header="Submission Error" content="One of the required entries is empty" />
      </div>
    );
  } else if (error === 2) {
    layout = (
      <div>
        <Message error header="Submission Error" content="Error due to unforeseen issue" />
      </div>
    );
  } else if (error === 0) {
    layout = (
      <div>
        <Message success header="Success" content="Submission done successfully" />
      </div>
    );
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <Grid centered>
        <Grid.Row centered>
          <Grid.Column only="computer" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "3.5rem",
                color: "black",
                fontWeight: "bold",
                marginTop: "3%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Registration for Sit & Draw
            </p>
          </Grid.Column>

          <Grid.Column only="tablet" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
                marginTop: "3%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Registration for Sit & Draw
            </p>
          </Grid.Column>

          <Grid.Column only="mobile" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "1.5rem",
                color: "black",
                fontWeight: "bold",
                marginTop: "5%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Registration for Sit & Draw
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile={14} tablet={10} computer={8}>
            <Form onSubmit={handleSubmit}>
              {entries.map((entry, index) => (
                <Segment key={index} padded="very">
                  <Form.Field>
                    <label htmlFor={`fullName-${index}`}>Full Name</label>
                    <input
                      placeholder="Full Name"
                      value={entry.fullName}
                      onChange={(e) => handleInputChange(index, "fullName", e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor={`age-${index}`}>Age</label>
                    <input
                      type="number"
                      placeholder="Age"
                      value={entry.age}
                      onChange={(e) => handleInputChange(index, "age", e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor={`email-${index}`}>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={entry.email}
                      onChange={(e) => handleInputChange(index, "email", e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor={`phone-${index}`}>Phone Number</label>
                    <input
                      placeholder="Phone"
                      value={entry.phone}
                      onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                    />
                  </Form.Field>
                </Segment>
              ))}
              <div style={{ marginTop: "2%" }}>
                <Button disabled type="submit" style={{ backgroundColor: "#bb0d3b", color: "#fff" }}>
                  Register
                </Button>
              </div>
            </Form>
          </Grid.Column>
        </Grid.Row>
        {loading && (
          <Grid.Row>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2em" }}>
              <TailSpin height="80" width="80" color="#bb0d3b" ariaLabel="loading" />
            </div>
          </Grid.Row>
        )}
        <Grid.Row>{layout}</Grid.Row>
      </Grid>
    </div>
  );
}

export default Registration;
