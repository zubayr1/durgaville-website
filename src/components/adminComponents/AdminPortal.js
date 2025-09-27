import React from "react";
import { Button, Grid, Segment, Header } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminPortal = () => {
  const navigate = useNavigate();

  return (
    <div style={{ overflow: "hidden" }}>
      <Grid centered>
        <Grid.Row>
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
              Admin Portal
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile={14} tablet={10} computer={8}>
            <Segment padded>
              <Header as="h3">Boishakhi 2025</Header>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                as={Link}
                to="/admin/boishakhi-orders"
              >
                View Food Orders
              </Button>
            </Segment>

            <Segment padded>
              <Header as="h3">Gallery Management</Header>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/adminaddgallery")}
              >
                Add Gallery
              </Button>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/admineditgallery")}
              >
                Edit Gallery
              </Button>
            </Segment>

            <Segment padded>
              <Header as="h3">Member Management</Header>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/adminaddmember")}
              >
                Add Member
              </Button>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/admineditmembers")}
              >
                Edit Members
              </Button>
            </Segment>

            <Segment padded>
              <Header as="h3">Event Management</Header>

              <Header as="h4" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                Past Events
              </Header>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/adminaddpastevent")}
              >
                Add Past Event
              </Button>
              <Button
                fluid
                style={{ marginBottom: "2rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/admineditpastevent")}
              >
                Edit Past Event
              </Button>

              <Header as="h4" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                Upcoming Events
              </Header>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/adminaddupcomingevent")}
              >
                Add Upcoming Event
              </Button>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/admineditupcomingevent")}
              >
                Edit Upcoming Event
              </Button>
            </Segment>

            <Segment padded>
              <Header as="h3">Magazine Management</Header>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/admincheckmagazineentries")}
              >
                Check Magazine Entries
              </Button>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/magazineupload")}
              >
                Upload Magazine
              </Button>
            </Segment>

            <Segment padded>
              <Header as="h3">Competition 2025 Management</Header>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/admincheckcompetitionentries")}
              >
                Check Competition 2025 Entries
              </Button>
            </Segment>

            <Segment padded>
              <Header as="h3">Press Release Management</Header>
              <Button
                fluid
                style={{ marginBottom: "1rem", backgroundColor: "#bb0d3b", color: "#fff" }}
                onClick={() => navigate("/adminpressreleases")}
              >
                Upload Press Release
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AdminPortal;
