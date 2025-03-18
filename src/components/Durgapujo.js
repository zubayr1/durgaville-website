import React from "react";
import { Grid, Image, Icon, Divider } from "semantic-ui-react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import pujo_2024_aarti from "../assets/pujo_2024/aarti.jpg";
import pujo_2024_ladies from "../assets/pujo_2024/narisakti.jpg";
import pujo_2024_men from "../assets/pujo_2024/men.jpg";

import Sponsors from "./Sponsors";
// import Registration from "./Registration";
import Schedule from "./Schedule";

function Durgapujo() {
  return (
    <div style={{ marginBottom: "5%" }}>
      <Grid>
        <Grid.Row centered>
          <Grid.Column only="computer" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "4.0rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "2%",
                marginTop: "4%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Durgapujo, 2024
            </p>

            <p
              style={{
                fontFamily: "Inter",
                fontSize: "1.6rem",
                color: "black",
                fontStyle: "italic",
                marginBottom: "2%",
                marginLeft: "7%",
                marginRight: "7%",
              }}
            >
              We are thrilled to look back on our fourth edition of Durga Puja, which took place from
              <span style={{ color: "#e88310" }}> 9th to 13th October 2024. </span>
              It was a heartwarming experience to gather with friends and family as we prayed for speedy justice for
              "Abhaya" and sought the blessings of "Maa" Durga to protect us from the real demons of modern society. Our
              commitment to honoring "Maa" Durga through pure and traditional rituals was truly fulfilled, thanks to the
              active participation of everyone involved. Together, we created a beautiful 'Home away from home.' We are
              grateful that participation, prasad, and entry were free and open to all, allowing everyone to join in the
              festivities without any registrations.
              <span style={{ color: "#e88310" }}>
                {" "}
                <br /> Thank you to everyone who made this celebration so special.
              </span>
            </p>
          </Grid.Column>

          <Grid.Column only="tablet" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "3.0rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "2%",
                marginTop: "6%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Durgapujo, 2024
            </p>

            <p
              style={{
                fontFamily: "Inter",
                fontSize: "1.4rem",
                color: "black",
                fontStyle: "italic",
                marginBottom: "2%",
                marginLeft: "7%",
                marginRight: "7%",
              }}
            >
              We are thrilled to look back on our fourth edition of Durga Puja, which took place from
              <span style={{ color: "#e88310" }}> 9th to 13th October 2024. </span>
              It was a heartwarming experience to gather with friends and family as we prayed for speedy justice for
              "Abhaya" and sought the blessings of "Maa" Durga to protect us from the real demons of modern society. Our
              commitment to honoring "Maa" Durga through pure and traditional rituals was truly fulfilled, thanks to the
              active participation of everyone involved. Together, we created a beautiful 'Home away from home.' We are
              grateful that participation, prasad, and entry were free and open to all, allowing everyone to join in the
              festivities without any registrations.
              <span style={{ color: "#e88310" }}>
                {" "}
                <br /> Thank you to everyone who made this celebration so special.
              </span>
            </p>
          </Grid.Column>

          <Grid.Column only="mobile" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "2.0rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "5%",
                marginTop: "6%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Durgapujo, 2024
            </p>
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "1.1rem",
                color: "black",
                fontStyle: "italic",
                marginBottom: "5%",
                marginLeft: "7%",
                marginRight: "7%",
              }}
            >
              We are thrilled to look back on our fourth edition of Durga Puja, which took place from
              <span style={{ color: "#e88310" }}> 9th to 13th October 2024. </span>
              It was a heartwarming experience to gather with friends and family as we prayed for speedy justice for
              "Abhaya" and sought the blessings of "Maa" Durga to protect us from the real demons of modern society. Our
              commitment to honoring "Maa" Durga through pure and traditional rituals was truly fulfilled, thanks to the
              active participation of everyone involved. Together, we created a beautiful 'Home away from home.' We are
              grateful that participation, prasad, and entry were free and open to all, allowing everyone to join in the
              festivities without any registrations.
              <span style={{ color: "#e88310" }}>
                {" "}
                <br /> Thank you to everyone who made this celebration so special.
              </span>
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered only="computer">
          <Grid.Column width={6}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Icon name="calendar" size="huge" />
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.3rem",
                  color: "black",
                  fontStyle: "italic",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>9th October </span>
                <br />
                to
                <br />
                <span style={{ fontSize: "1.5rem" }}>13th October </span>
                <br />
                <span style={{ fontSize: "1.5rem", color: "#e88310" }}>2024</span>
              </p>
            </div>
          </Grid.Column>

          <Grid.Column width={6}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.3rem",
                  color: "black",
                  fontStyle: "italic",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>Gemeindezentrum</span>
                <br />
                <span style={{ fontSize: "1.5rem" }}>Frauenaurach</span>
                <br />
                <span style={{ color: "#e88310" }}>Gaisbühlstraße 4 </span>
                <br />
                <span style={{ color: "#e88310" }}>91056 Erlangen</span>
                <br />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gaisbühlstraße+4+91056+Erlangen"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2e10c4", textDecoration: "none" }}
                >
                  Open in Google Maps
                </a>
              </p>
              <Icon name="map marker alternate" size="huge" />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered only="tablet">
          <Grid.Column width={6}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Icon name="calendar" size="big" />
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.2rem",
                  color: "black",
                  fontStyle: "italic",
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>9th October </span>
                <br />
                to
                <br />
                <span style={{ fontSize: "1.3rem" }}>13th October </span>
                <br />
                <span style={{ fontSize: "1.3rem", color: "#e88310" }}>2024</span>
              </p>
            </div>
          </Grid.Column>

          <Grid.Column width={6}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.2rem",
                  color: "black",
                  fontStyle: "italic",
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>Gemeindezentrum</span>
                <br />
                <span style={{ fontSize: "1.3rem" }}>Frauenaurach</span>
                <br />
                <span style={{ color: "#e88310" }}>Gaisbühlstraße 4 </span>
                <br />
                <span style={{ color: "#e88310" }}>91056 Erlangen</span>
                <br />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gaisbühlstraße+4+91056+Erlangen"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2e10c4", textDecoration: "none" }}
                >
                  Open in Google Maps
                </a>
              </p>
              <Icon name="map marker alternate" size="big" />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered only="mobile">
          <Grid.Column width={7}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Icon name="calendar" size="large" />
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.1rem",
                  color: "black",
                  fontStyle: "italic",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>9th October </span>
                <br />
                to
                <br />
                <span style={{ fontSize: "1.2rem" }}>13th October </span>
                <br />
                <span style={{ fontSize: "1.2rem", color: "#e88310" }}>2024</span>
              </p>
            </div>
          </Grid.Column>

          <Grid.Column width={7}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.1rem",
                  color: "black",
                  fontStyle: "italic",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>Gemeindezentrum</span>
                <br />
                <span style={{ fontSize: "1.2rem" }}>Frauenaurach</span>
                <br />
                <span style={{ color: "#e88310" }}>Gaisbühlstraße 4 </span>
                <br />
                <span style={{ color: "#e88310" }}>91056 Erlangen</span>
                <br />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gaisbühlstraße+4+91056+Erlangen"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2e10c4", textDecoration: "none", fontSize: "1.0rem" }}
                >
                  Open in Google Maps
                </a>
              </p>
              <Icon name="map marker alternate" size="large" />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered only="computer tablet">
          <div style={{ width: "80%" }}>
            <Carousel autoPlay={true} infiniteLoop={true}>
              <div>
                <Image
                  alt="Durgapujo 2024 Aarti"
                  src={pujo_2024_aarti}
                  style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                />
                <p className="legend">Durgapujo 2024 Aarti</p>
              </div>
              <div>
                <Image
                  alt="Durgapujo 2024 NariSakti"
                  src={pujo_2024_ladies}
                  style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                />
                <p className="legend">Durgapujo 2024 NariSakti</p>
              </div>
              <div>
                <Image
                  alt="Durgapujo 2024 men gang"
                  src={pujo_2024_men}
                  style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                />
                <p className="legend">Durgapujo 2024 Men's Club</p>
              </div>
            </Carousel>
          </div>
        </Grid.Row>

        <Grid.Row centered only="mobile">
          <div style={{ width: "80%" }}>
            <Carousel autoPlay={true} infiniteLoop={true}>
              <div>
                <Image
                  alt="Durgapujo 2024 Aarti"
                  src={pujo_2024_aarti}
                  style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                />
              </div>
              <div>
                <Image
                  alt="Durgapujo 2024 Narisakti"
                  src={pujo_2024_ladies}
                  style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                />
              </div>
              <div>
                <Image
                  alt="Durgapujo 2024 men gang"
                  src={pujo_2024_men}
                  style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                />
              </div>
            </Carousel>
          </div>
        </Grid.Row>

        <Grid.Row centered>
          <Schedule />
        </Grid.Row>
      </Grid>
      <Divider />
      {/* <Registration /> */}

      <Sponsors />
    </div>
  );
}

export default Durgapujo;
