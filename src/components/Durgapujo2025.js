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

function Durgapujo2025() {
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
              Sharod Utsav, 2025
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
              We are excited to announce our fifth edition of Durga Puja, taking place from
              <span style={{ color: "#e88310" }}> 28th September to 2nd October 2025. </span>
              Join us as we come together with friends and family to celebrate, pray, and seek the blessings of "Maa"
              Durga. Our commitment to honoring "Maa" Durga through pure and traditional rituals continues, and we look
              forward to creating another beautiful 'Home away from home.'
              <span style={{ color: "#e88310" }}>
                {" "}
                <br /> Thank you to everyone who has been part of our journey. We can't wait to celebrate with you in
                2025!
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
              Sharod Utsav, 2025
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
              We are excited to announce our fifth edition of Durga Puja, taking place from
              <span style={{ color: "#e88310" }}> 28th September to 2nd October 2025. </span>
              Join us as we come together with friends and family to celebrate, pray, and seek the blessings of "Maa"
              Durga. Our commitment to honoring "Maa" Durga through pure and traditional rituals continues, and we look
              forward to creating another beautiful 'Home away from home.'
              <span style={{ color: "#e88310" }}>
                {" "}
                <br /> Thank you to everyone who has been part of our journey. We can't wait to celebrate with you in
                2025!
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
              Sharod Utsav, 2025
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
              We are excited to announce our fifth edition of Durga Puja, taking place from
              <span style={{ color: "#e88310" }}> 28th September to 2nd October 2025. </span>
              Join us as we come together with friends and family to celebrate, pray, and seek the blessings of "Maa"
              Durga. Our commitment to honoring "Maa" Durga through pure and traditional rituals continues, and we look
              forward to creating another beautiful 'Home away from home.'
              <span style={{ color: "#e88310" }}>
                {" "}
                <br /> Thank you to everyone who has been part of our journey. We can't wait to celebrate with you in
                2025!
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
                <span style={{ fontSize: "1.5rem" }}>28th September </span>
                <br />
                to
                <br />
                <span style={{ fontSize: "1.5rem" }}>2nd October </span>
                <br />
                <span style={{ fontSize: "1.5rem", color: "#e88310" }}>2025</span>
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
                <span style={{ fontSize: "1.3rem" }}>28th September </span>
                <br />
                to
                <br />
                <span style={{ fontSize: "1.3rem" }}>2nd October </span>
                <br />
                <span style={{ fontSize: "1.3rem", color: "#e88310" }}>2025</span>
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
                <span style={{ fontSize: "1.2rem" }}>28th September </span>
                <br />
                to
                <br />
                <span style={{ fontSize: "1.2rem" }}>2nd October </span>
                <br />
                <span style={{ fontSize: "1.2rem", color: "#e88310" }}>2025</span>
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

export default Durgapujo2025;
