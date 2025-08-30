import React, { useState } from "react";
import { Button, Form, Grid, Segment, Header, Icon, List } from "semantic-ui-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";

// --- Competition Data ---
const competitionData = {
  "Drawing Competition Age Group 1": {
    type: "kid",
    date: "Tuesday, 30th Sep",
    time: "6:00 PM - 7:00 PM",
    age: "6 - 11 years",
    rules: [
      "Paper size A3 will be provided.",
      "Participants must bring their own pencil and colors.",
      "No reference photos are allowed during the competition.",
      "Allowed time is 60 minutes.",
    ],
    minAge: 6,
    maxAge: 11,
  },
  "Drawing Competition Age Group 2": {
    type: "kid",
    date: "Tuesday, 30th Sep",
    time: "6:00 PM - 7:00 PM",
    age: "12 - 17 years",
    rules: [
      "Paper size A3 will be provided.",
      "Participants must bring their own pencil and colors.",
      "No reference photos are allowed during the competition.",
      "Allowed time is 60 minutes.",
    ],
    minAge: 12,
    maxAge: 17,
  },
  "Fancy dress competition for kids Group 1": {
    type: "kid",
    date: "Thursday, 2nd Oct",
    time: "6:00 PM - 7:00 PM",
    age: "3 - 7 years",
    rules: [
      "Dress and makeup are to be done by the participants beforehand.",
      "Please note: There is no dressing room available in the puja hall.",
    ],
    minAge: 3,
    maxAge: 7,
  },
  "Fancy dress competition for kids Group 2": {
    type: "kid",
    date: "Thursday, 2nd Oct",
    time: "6:00 PM - 7:00 PM",
    age: "8 - 12 years",
    rules: [
      "Dress and makeup are to be done by the participants beforehand.",
      "Please note: There is no dressing room available in the puja hall.",
    ],
    minAge: 8,
    maxAge: 12,
  },
  "Conch Playing": {
    type: "adult",
    date: "Wednesday, 1st Oct",
    time: "7:00 PM onwards",
    rules: ["The duration of conch playing will be noted for judging."],
  },
  "Candle lighting": {
    type: "adult",
    date: "Wednesday, 1st Oct",
    time: "7:00 PM onwards",
    rules: ["The number of candles lit with a single matchstick will be counted."],
  },
  "Saree (Female) draping competition": {
    type: "adult",
    date: "Thursday, 2nd Oct",
    time: "7:00 PM - 8:00 PM",
    rules: ["Participants will be judged on draping a normal saree with pleats."],
  },
};

function Registration() {
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState({ loading: false, error: null });

  const competitionOptions = Object.keys(competitionData).map((name) => ({
    key: name,
    text: name,
    value: name,
  }));

  const handleCompetitionChange = (e, { value }) => {
    setSelectedCompetition(value);
    setFormData({});
    setStatus({ loading: false, error: null });
  };

  const handleInputChange = (e, { name, value }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const competitionInfo = competitionData[selectedCompetition];
    if (!competitionInfo) {
      alert("Please select a competition.");
      return;
    }

    // Required fields
    const requiredFields =
      competitionInfo.type === "kid"
        ? ["kidName", "kidAge", "parentName", "parentPhone", "parentEmail"]
        : ["name", "phone", "email"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert("Please fill out all required fields.");
        return;
      }
    }

    // Email validation
    const emailField = competitionInfo.type === "kid" ? formData.parentEmail : formData.email;
    if (!/^\S+@\S+\.\S+$/.test(emailField)) {
      alert("Please submit a proper Email ID.");
      return;
    }

    // Kid age validation
    if (competitionInfo.type === "kid") {
      const age = parseInt(formData.kidAge, 10);
      if (isNaN(age) || age < competitionInfo.minAge || age > competitionInfo.maxAge) {
        alert(`Please enter a valid age between ${competitionInfo.minAge} and ${competitionInfo.maxAge}.`);
        return;
      }
    }

    // Submit to Firebase
    setStatus({ loading: true, error: null });
    try {
      await addDoc(collection(db, "competitions2025"), {
        competition: selectedCompetition,
        ...formData,
        registrationTime: new Date().toISOString(),
      });
      setStatus({ loading: false, error: null });
      alert(
        "Your registration is now complete. All the best! To register for another competition or child, you can submit again.",
      );
      setSelectedCompetition("");
      setFormData({});
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, error: "An unexpected error occurred." });
    }
  };

  const currentCompetition = competitionData[selectedCompetition];
  const isKidCompetition = currentCompetition?.type === "kid";
  const isAdultCompetition = currentCompetition?.type === "adult";

  return (
    <div style={{ padding: "2em 0", paddingTop: "4.5rem", overflow: "visible" }}>
      <Grid centered stackable>
        <Grid.Row>
          <Grid.Column width={12} textAlign="center">
            <Header as="h1" style={{ fontSize: "3rem", color: "#333" }}>
              Registration for Competitions
            </Header>
            <Header as="h3" color="grey" style={{ marginTop: "-0.5rem" }}>
              Select a Competition to register and view rules.
            </Header>
            <Header as="h3" color="black" style={{ marginTop: "-0.5rem" }}>
              <span style={{ fontWeight: 900, fontSize: "1.1em" }}>
                First, Second and Third place holders will be awarded!
              </span>
            </Header>
          </Grid.Column>
        </Grid.Row>

        {/* Rules */}
        {currentCompetition && (
          <Grid.Row>
            <Grid.Column mobile={15} tablet={12} computer={10}>
              <Segment>
                <Header as="h3">{selectedCompetition}</Header>
                <p>
                  <Icon name="calendar alternate outline" /> <strong>Date:</strong> {currentCompetition.date}
                </p>
                <p>
                  <Icon name="clock outline" /> <strong>Time:</strong> {currentCompetition.time}
                </p>
                {currentCompetition.age && (
                  <p>
                    <Icon name="child" /> <strong>Age Group:</strong> {currentCompetition.age}
                  </p>
                )}
                <Header as="h4">Rules:</Header>
                <List bulleted>
                  {currentCompetition.rules.map((rule, i) => (
                    <List.Item key={i}>{rule}</List.Item>
                  ))}
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        )}

        {/* Form */}
        <Grid.Row>
          <Grid.Column mobile={15} tablet={12} computer={10}>
            <Segment padded="very">
              <Form loading={status.loading}>
                <Form.Select
                  fluid
                  label="Competition Type"
                  options={competitionOptions}
                  placeholder="Choose a competition..."
                  value={selectedCompetition}
                  onChange={handleCompetitionChange}
                  required
                  style={{ zIndex: 1000 }}
                />

                {isKidCompetition && (
                  <>
                    <Form.Input
                      label="Kid's Name"
                      name="kidName"
                      placeholder="Enter kid's full name"
                      value={formData.kidName || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Input
                      label="Kid's Age"
                      name="kidAge"
                      type="number"
                      placeholder={`Required age: ${currentCompetition.age}`}
                      value={formData.kidAge || ""}
                      onChange={handleInputChange}
                      required
                      min={currentCompetition.minAge}
                      max={currentCompetition.maxAge}
                    />
                    <Form.Input
                      label="Parent's Name"
                      name="parentName"
                      placeholder="Enter parent's full name"
                      value={formData.parentName || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Input
                      label="Parent's Phone Number"
                      name="parentPhone"
                      placeholder="Enter parent's phone number"
                      value={formData.parentPhone || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Input
                      label="Parent's Email"
                      name="parentEmail"
                      type="email"
                      placeholder="Enter parent's email address"
                      value={formData.parentEmail || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </>
                )}

                {isAdultCompetition && (
                  <>
                    <Form.Input
                      label="Name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Input
                      label="Phone Number"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </>
                )}

                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!selectedCompetition || status.loading}
                  style={{ backgroundColor: "#bb0d3b", color: "#fff", marginTop: "1em" }}
                >
                  Submit
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Registration;
