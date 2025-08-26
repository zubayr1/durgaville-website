import React from "react";
import { Icon, Grid } from "semantic-ui-react";

import useHandleNavigation from "./handleNavigation";

function MobileView() {
  const { handlebuttonClick, handleiconClick } = useHandleNavigation();

  return (
    <Grid>
      <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p onClick={() => handlebuttonClick("home")} style={{ fontWeight: "bolder", fontFamily: "Inter" }}>
          HOME
        </p>
      </Grid.Row>

      <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p onClick={() => handlebuttonClick("get-involved")} style={{ fontWeight: "bolder", fontFamily: "Inter" }}>
          GET INVOLVED
        </p>
      </Grid.Row>

      {/* <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p onClick={() => handlebuttonClick("Boishakhi, 2025")} style={{ fontWeight: "bolder", fontFamily: "Inter" }}>
          BOISHAKHI, 2025
        </p>
      </Grid.Row> */}

      <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p
          onClick={() => handlebuttonClick("Sharod Utsav, 2025")}
          style={{ fontWeight: "bolder", fontFamily: "Inter" }}
        >
          SHAROD UTAV, 2025
        </p>
      </Grid.Row>

      <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p
          onClick={() => handlebuttonClick("Sharod Utsav, 2024")}
          style={{ fontWeight: "bolder", fontFamily: "Inter" }}
        >
          SHAROD UTAV, 2024
        </p>
      </Grid.Row>

      <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p onClick={() => handlebuttonClick("upcoming-events")} style={{ fontWeight: "bolder", fontFamily: "Inter" }}>
          UPCOMING EVENTS
        </p>
      </Grid.Row>

      <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p onClick={() => handlebuttonClick("past-events")} style={{ fontWeight: "bolder", fontFamily: "Inter" }}>
          PAST EVENTS
        </p>
      </Grid.Row>

      <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p onClick={() => handlebuttonClick("publications")} style={{ fontWeight: "bolder", fontFamily: "Inter" }}>
          PUBLICATIONS
        </p>
      </Grid.Row>

      {/* <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p onClick={() => handlebuttonClick("meet-the-team")} style={{ fontWeight: "bolder", fontFamily: "Inter" }}>
          MEET THE TEAM
        </p>
      </Grid.Row>*/}

      {/* <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p onClick={() => handlebuttonClick("magazine")} style={{ fontWeight: "bolder", fontFamily: "Inter" }}>
          MAGAZINE 2025
        </p>
      </Grid.Row> */}

      {/* <Grid.Row style={{ borderBottom: ".7px solid #dee0e3", paddingBottom: "6%", marginRight: "14%" }}>
        <p onClick={() => handlebuttonClick("admin-portal")} style={{ fontWeight: "bolder", fontFamily: "Inter" }}>
          ADMIN PORTAL
        </p>
      </Grid.Row> */}

      <Grid.Row style={{ marginTop: "6%" }}>
        <Grid.Column width={4}>
          <Icon onClick={() => handleiconClick("facebook")} circular color="black" name="facebook f" size="large" />
        </Grid.Column>

        <Grid.Column width={4}>
          <Icon onClick={() => handleiconClick("instagram")} circular color="black" name="instagram" size="large" />
        </Grid.Column>

        <Grid.Column width={4}>
          <Icon onClick={() => handleiconClick("youtube")} circular color="black" name="youtube" size="large" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default MobileView;
