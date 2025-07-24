import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";

export default function PageNotFound() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", overflow: "hidden" }}
    >
      <Segment style={{ textAlign: "center" }}>
        <Grid centered>
          <Grid.Row centered verticalAlign="middle">
            <p style={{ fontSize: "24px", marginBottom: "20px" }}>Page Not Found!</p>
          </Grid.Row>
          <Grid.Row>
            <Button primary onClick={() => (window.location.href = "/")}>
              Go back to Home
            </Button>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
