import React from "react";
import { Grid } from "semantic-ui-react";
import Carousel from "./SponsorCarousel";

function Sponsors() {
  return (
    <div>
      <Grid centered>
        <Grid.Row centered>
          <Grid.Column only="computer" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "3.5rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "1%",
                marginTop: "2%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Our Sponsors
            </p>
          </Grid.Column>

          <Grid.Column only="tablet" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "1%",
                marginTop: "2%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Our Sponsors
            </p>
          </Grid.Column>

          <Grid.Column only="mobile" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "1.5rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "1%",
                marginTop: "2%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Our Sponsors
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{ width: "90%" }} only="computer">
          <Carousel deviceType="computer" />
        </Grid.Row>

        <Grid.Row style={{ width: "90%" }} only="tablet">
          <Carousel deviceType="tablet" />
        </Grid.Row>

        <Grid.Row style={{ width: "100%" }} only="mobile">
          <Carousel deviceType="mobile" />
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Sponsors;
