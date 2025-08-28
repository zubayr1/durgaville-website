import React, { useState } from "react";
import { Button, Form, Grid, Message, Segment, Header, Icon, List } from "semantic-ui-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js"; // Make sure this path is correct
import { TailSpin } from "react-loader-spinner";

// --- Competition Data ---
// Storing all competition details in an object for easy access.
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
      "Top 3 winners will receive certificates and prizes.",
    ],
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
      "Top 3 winners will receive certificates and prizes.",
    ],
  },
  "Fancy dress competition for kids Group 1": {
    type: "kid",
    date: "Thursday, 2nd Oct",
    time: "6:00 PM - 7:00 PM",
    age: "3 - 7 years",
    rules: [
      "Dress and makeup are to be done by the participants beforehand.",
      "Please note: There is no dressing room available in the puja hall.",
      "Top 3 winners will receive certificates and prizes.",
    ],
  },
  "Fancy dress competition for kids Group 2": {
    type: "kid",
    date: "Thursday, 2nd Oct",
    time: "6:00 PM - 7:00 PM",
    age: "8 - 12 years",
    rules: [
      "Dress and makeup are to be done by the participants beforehand.",
      "Please note: There is no dressing room available in the puja hall.",
      "Top 3 winners will receive certificates and prizes.",
    ],
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

// --- Main Component ---
function Registration() {
  // State for selected competition, form data, loading, and error messages
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  // --- Form Options ---
  const competitionOptions = Object.keys(competitionData).map((name) => ({
    key: name,
    text: name,
    value: name,
  }));

  // --- Event Handlers ---
  const handleCompetitionChange = (e, { value }) => {
    setSelectedCompetition(value);
    // Reset form data when competition changes to avoid carrying over old values
    setFormData({});
    setStatus({ loading: false, error: null, success: false }); // Reset status messages
  };

  const handleInputChange = (e, { name, value }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setStatus({ loading: true, error: null, success: false });

    const competitionInfo = competitionData[selectedCompetition];
    if (!competitionInfo) {
      setStatus({ loading: false, error: "Please select a competition.", success: false });
      return;
    }

    // --- Validation ---
    const requiredFields =
      competitionInfo.type === "kid"
        ? ["kidName", "kidAge", "parentName", "parentPhone", "parentEmail"]
        : ["name", "phone", "email"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setStatus({ loading: false, error: "Please fill out all required fields.", success: false });
        return;
      }
    }
     // Email validation
    const emailField = competitionInfo.type === 'kid' ? formData.parentEmail : formData.email;
    if (emailField && !/\S+@\S+\.\S+/.test(emailField)) {
        setStatus({ loading: false, error: "Please enter a valid email address.", success: false });
        return;
    }


    // --- Firebase Submission ---
    try {
      await addDoc(collection(db, "competitions2025"), {
        competition: selectedCompetition,
        ...formData,
        registrationTime: new Date().toISOString(),
      });

      setStatus({ loading: false, error: null, success: true });
      // Reset form after a successful submission
      setTimeout(() => {
        setSelectedCompetition("");
        setFormData({});
        setStatus({ loading: false, error: null, success: false });
      }, 3000); // Give user time to see success message
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus({
        loading: false,
        error: "An unexpected error occurred. Please try again.",
        success: false,
      });
    }
  };

  // --- Dynamic Content Rendering ---
  const currentCompetition = competitionData[selectedCompetition];
  const isKidCompetition = currentCompetition?.type === "kid";
  const isAdultCompetition = currentCompetition?.type === "adult";

  // --- Render Method ---
  return (
    <div style={{ padding: "2em 0", overflowX: "hidden" }}>
      <Grid container centered stackable>
        <Grid.Row>
          <Grid.Column width={12} textAlign="center">
            <Header as="h1" style={{ fontSize: "3rem", color: "#333" }}>
              Registration for Competitions
            </Header>
            <Header as="h3" color="grey" style={{ marginTop: "-0.5rem" }}>
              Select a Competition to view rules and register.
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile={15} tablet={12} computer={10}>
            <Segment padded="very">
              <Form onSubmit={handleSubmit} loading={status.loading}>
                <Form.Select
                  fluid
                  label="Competition Type"
                  options={competitionOptions}
                  placeholder="Choose a competition..."
                  value={selectedCompetition}
                  onChange={handleCompetitionChange}
                  required
                />

                {/* --- Conditional Form Fields for Kids --- */}
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

                {/* --- Conditional Form Fields for Adults --- */}
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
                  type="submit"
                  disabled={!selectedCompetition || status.loading}
                  style={{ backgroundColor: "#bb0d3b", color: "#fff", marginTop: "1em" }}
                >
                  Register
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        {/* --- Status Messages --- */}
        <Grid.Row>
          <Grid.Column mobile={15} tablet={12} computer={10}>
            {status.loading && (
              <div style={{ display: "flex", justifyContent: "center", padding: "2em" }}>
                <TailSpin height="60" width="60" color="#bb0d3b" />
              </div>
            )}
            {status.error && <Message error header="Error" content={status.error} />}
            {status.success && (
              <Message success header="Success!" content="Your registration has been submitted." />
            )}
          </Grid.Column>
        </Grid.Row>

        {/* --- Rules Display --- */}
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
                  {currentCompetition.rules.map((rule, index) => (
                    <List.Item key={index}>{rule}</List.Item>
                  ))}
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </div>
  );
}

export default Registration;
