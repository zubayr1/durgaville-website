import React, { useState } from "react";
import { Button, Form, Grid, Message, Segment, Header, Icon, List } from "semantic-ui-react";
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
  // State now holds an array of entries
  const [entries, setEntries] = useState([
    { selectedCompetition: "", formData: {}, status: { loading: false, error: null, success: false } },
  ]);

  const competitionOptions = Object.keys(competitionData).map((name) => ({
    key: name,
    text: name,
    value: name,
  }));

  // --- Handlers ---
  const handleCompetitionChange = (index, value) => {
    const newEntries = [...entries];
    newEntries[index].selectedCompetition = value;
    newEntries[index].formData = {}; // reset form data
    newEntries[index].status = { loading: false, error: null, success: false };
    setEntries(newEntries);
  };

  const handleInputChange = (index, name, value) => {
    const newEntries = [...entries];
    newEntries[index].formData[name] = value;
    setEntries(newEntries);
  };

  const handleSubmit = async (index) => {
    const entry = entries[index];
    const competitionInfo = competitionData[entry.selectedCompetition];

    if (!competitionInfo) {
      updateStatus(index, { loading: false, error: "Please select a competition.", success: false });
      return;
    }

    const requiredFields =
      competitionInfo.type === "kid"
        ? ["kidName", "kidAge", "parentName", "parentPhone", "parentEmail"]
        : ["name", "phone", "email"];

    for (const field of requiredFields) {
      if (!entry.formData[field]) {
        updateStatus(index, { loading: false, error: "Please fill out all required fields.", success: false });
        return;
      }
    }

    const emailField = competitionInfo.type === "kid" ? entry.formData.parentEmail : entry.formData.email;
    if (emailField && !/\S+@\S+\.\S+/.test(emailField)) {
      updateStatus(index, { loading: false, error: "Please enter a valid email address.", success: false });
      return;
    }

    // Submit to Firebase
    updateStatus(index, { loading: true, error: null, success: false });
    try {
      await addDoc(collection(db, "competitions2025"), {
        competition: entry.selectedCompetition,
        ...entry.formData,
        registrationTime: new Date().toISOString(),
      });
      updateStatus(index, { loading: false, error: null, success: true });
    } catch (error) {
      console.error(error);
      updateStatus(index, { loading: false, error: "An unexpected error occurred.", success: false });
    }
  };

  const updateStatus = (index, newStatus) => {
    const newEntries = [...entries];
    newEntries[index].status = newStatus;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      { selectedCompetition: "", formData: {}, status: { loading: false, error: null, success: false } },
    ]);
  };

  return (
    <div style={{ padding: "2em 0", overflowX: "hidden" }}>
      <Grid container centered stackable>
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

        {entries.map((entry, index) => {
          const currentCompetition = competitionData[entry.selectedCompetition];
          const isKidCompetition = currentCompetition?.type === "kid";
          const isAdultCompetition = currentCompetition?.type === "adult";

          return (
            <React.Fragment key={index}>
              {/* Rules */}
              {currentCompetition && (
                <Grid.Row>
                  <Grid.Column mobile={15} tablet={12} computer={10}>
                    <Segment>
                      <Header as="h3">{entry.selectedCompetition}</Header>
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
                    <Form loading={entry.status.loading}>
                      <Form.Select
                        fluid
                        label="Competition Type"
                        options={competitionOptions}
                        placeholder="Choose a competition..."
                        value={entry.selectedCompetition}
                        onChange={(e, { value }) => handleCompetitionChange(index, value)}
                        required
                      />

                      {isKidCompetition && (
                        <>
                          <Form.Input
                            label="Kid's Name"
                            name="kidName"
                            placeholder="Enter kid's full name"
                            value={entry.formData.kidName || ""}
                            onChange={(e, { name, value }) => handleInputChange(index, name, value)}
                            required
                          />
                          <Form.Input
                            label="Kid's Age"
                            name="kidAge"
                            type="number"
                            placeholder={`Required age: ${currentCompetition.age}`}
                            value={entry.formData.kidAge || ""}
                            onChange={(e, { name, value }) => handleInputChange(index, name, value)}
                            required
                          />
                          <Form.Input
                            label="Parent's Name"
                            name="parentName"
                            placeholder="Enter parent's full name"
                            value={entry.formData.parentName || ""}
                            onChange={(e, { name, value }) => handleInputChange(index, name, value)}
                            required
                          />
                          <Form.Input
                            label="Parent's Phone Number"
                            name="parentPhone"
                            placeholder="Enter parent's phone number"
                            value={entry.formData.parentPhone || ""}
                            onChange={(e, { name, value }) => handleInputChange(index, name, value)}
                            required
                          />
                          <Form.Input
                            label="Parent's Email"
                            name="parentEmail"
                            type="email"
                            placeholder="Enter parent's email address"
                            value={entry.formData.parentEmail || ""}
                            onChange={(e, { name, value }) => handleInputChange(index, name, value)}
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
                            value={entry.formData.name || ""}
                            onChange={(e, { name, value }) => handleInputChange(index, name, value)}
                            required
                          />
                          <Form.Input
                            label="Phone Number"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={entry.formData.phone || ""}
                            onChange={(e, { name, value }) => handleInputChange(index, name, value)}
                            required
                          />
                          <Form.Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={entry.formData.email || ""}
                            onChange={(e, { name, value }) => handleInputChange(index, name, value)}
                            required
                          />
                        </>
                      )}

                      <Button
                        type="button"
                        onClick={() => handleSubmit(index)}
                        disabled={!entry.selectedCompetition || entry.status.loading}
                        style={{ backgroundColor: "#bb0d3b", color: "#fff", marginTop: "1em", marginRight: "1em" }}
                      >
                        Submit
                      </Button>

                      <Button
                        type="button"
                        onClick={addEntry}
                        style={{ backgroundColor: "#007bff", color: "#fff", marginTop: "1em" }}
                      >
                        Add More Entry
                      </Button>

                      {entry.status.error && <Message error header="Error" content={entry.status.error} />}
                      {entry.status.success && (
                        <Message success header="Success!" content="Your registration has been submitted." />
                      )}
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </React.Fragment>
          );
        })}
      </Grid>
    </div>
  );
}

export default Registration;