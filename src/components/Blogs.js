import React from "react";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";

function Blogs() {
  return (
    <div style={{ padding: "2rem 0" }}>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Segment
              style={{
                backgroundColor: "#f8f9fa",
                border: "2px solid #dee2e6",
                borderRadius: "15px",
                padding: "3rem 2rem",
                margin: "2rem 0",
              }}
            >
              <Icon name="pencil alternate" size="massive" color="grey" style={{ marginBottom: "1rem" }} />
              <Header
                as="h2"
                style={{
                  color: "#666",
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  marginTop: "1rem",
                }}
              >
                No blog posts yet
              </Header>
              <p
                style={{
                  color: "#888",
                  fontSize: "1.1rem",
                  fontFamily: "Inter",
                  marginTop: "1rem",
                }}
              >
                We're working on creating engaging content for our blog. Check back soon!
              </p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Blogs;
