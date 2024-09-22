import React, { useState } from "react";
import { Grid, Card, Icon, Button } from "semantic-ui-react";
import "./Schedule.css";

function Schedule() {
  const events = [
    {
      date: "9th Oct, Wed",
      eventName: "Moha Sosthi",
      times: [
        { time: "05:00 PM - 06.00PM", event: "Inauguration" },
        { time: "6.00PM - 7.30PM", event: "Bodhan, Amontron, Odhibas & Pujo" },
        { time: "7.30PM - 8.30PM", event: "Vedic Mantra Chanting" },
        { time: "8.30PM - 10.00PM", event: "Prasad Distribution" },
      ],
    },
    {
      date: "10th Oct, Thu",
      eventName: "Moha Saptami",
      times: [
        { time: "10:00AM - 1:30PM", event: "Nabapatrika & Saptami Pujo" },
        { time: "12:30PM - 1:30PM", event: "Pushpanjoli" },
        { time: "1:00PM - 2:30PM", event: "Prasad Distribution" },
        { time: "6:00PM - 7:30PM", event: "Sondhya Arati" },
        { time: "7:30PM - 8:30PM", event: "Fun Quiz & Tonguetwister Evening" },
        { time: "8:30PM - 10:00PM", event: "Prasad Distribution" },
      ],
    },
    {
      date: "11th Oct, Fri",
      eventName: "Maha Ashtami",
      times: [
        { time: "10:00AM - 1:30PM", event: "Ashtami Pujo" },
        { time: "12:30PM - 1:30PM", event: "Pushpanjoli" },
        { time: "1:00PM - 2:30PM", event: "Prasad Distribution" },
        { time: "5:30PM - 7:00PM", event: "Sondhi Pujo, Pushpanjoli and Sondhya Arati" },
        { time: "7:00PM - 7:30PM", event: "Dhunuchi Naach" },
        { time: "7:30PM - 8:30PM", event: "Fun Competitions Evening" },
        { time: "8:30PM - 10:00PM", event: "Prasad Distribution" },
      ],
    },
    {
      date: "12th Oct, Sat",
      eventName: "Moha Navami",
      times: [
        { time: "9:30AM - 1:00PM", event: "Navami Pujo" },
        { time: "12:00PM - 1:00PM", event: "Pushpanjoli" },
        { time: "12:30PM - 2:00PM", event: "Prasad Distribution" },
        { time: "2:00PM - 3:00PM", event: "Sit and Draw Competition for Kids" },
        { time: "3:00PM - 4:30PM", event: "Hom" },
        { time: "5:30PM - 6:30PM", event: "Sondhya Arati" },
        { time: "7:00PM - 8:30PM", event: "“SheShakti”, The Cultural Program" },
        { time: "8:30PM - 10:00PM", event: "Prasad Distribution" },
      ],
    },
    {
      date: "13th Oct, Sun",
      eventName: "Bijoya Dashami",
      times: [
        { time: "10:30AM - 12:30PM", event: "Dashami Pujo & Bishorjon" },
        { time: "12:00PM - 12:30PM", event: "Pushpanjoli" },
        { time: "12:30 PM - 1:00PM", event: "Debi Boron" },
        { time: "1:00PM - 2:30PM", event: "Dhunchi Naach & Sindur Khela" },
        { time: "1:00PM - 2:30PM", event: "Dodhikorma Distribution" },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < events.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <Grid columns={1} centered>
        <Grid.Row centered>
          <Grid.Column width={16} textAlign="middle">
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
              Pujo Schedule
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={10}>
            <Card color="teal" fluid>
              <Card.Content>
                <Card.Header>
                  <p className="tiro-devanagari-sanskrit-regular-italic">
                    <Icon name="calendar alternate outline" />
                    {events[currentIndex].eventName}
                  </p>
                </Card.Header>
                <Card.Meta style={{ marginTop: "5px", fontSize: "1.1em" }}>{events[currentIndex].date}</Card.Meta>
                <Card.Description>
                  {events[currentIndex].times.map((item, idx) => (
                    <p key={idx} style={{ marginBottom: "1em" }}>
                      <Icon name="clock outline" color="blue" />
                      <strong>{item.time}: </strong>
                      <span style={{ color: "#4183c4" }}>{item.event}</span>
                    </p>
                  ))}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            style={{ marginRight: "10px", backgroundColor: "#690460", color: "#fff" }}
          >
            &lt; Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === events.length - 1}
            style={{ backgroundColor: "#bb0d3b", color: "#fff" }}
          >
            Next &gt;
          </Button>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Schedule;
