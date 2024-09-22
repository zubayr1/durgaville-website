import React, { useState } from "react";
import { Grid, Image, Icon, Button, Divider } from "semantic-ui-react";

import durgapujo from "../assets/durgapujo_2024.jpg";

import { ToastContainer, toast } from "react-toast";

import Sponsors from "./Sponsors";
import Registration from "./Registration";
import Schedule from "./Schedule";

function Durgapujo() {
  const [message, setMessage] = useState("clipboard");

  const handleCopy = () => {
    const email = "info@durgaville.com";

    navigator.clipboard
      .writeText(email)
      .then(() => {
        setMessage("check");
        toast.success("Mail Id Copied to Clipboard");
      })
      .catch((err) => {
        setMessage("times");
        toast.error("Cound not Copy");
      });
  };

  return (
    <div style={{ marginBottom: "5%" }}>
      <ToastContainer position="bottom-right" delay={2000} />
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
              We are very pleased to inform you that we are all set to perform our fourth edition of Durga Puja starting
              from <span style={{ color: "#e88310" }}>9th Oct 2024, Wednesday until 13th Oct, 2024, Sunday</span>.
              <br />
              We heartily invite you, along with your friends and family to the festival. Come and join us as we pray
              for speedy justice for "Abhaya" and pray to "Maa" Durga to bless us all and help catch the real demons of
              the modern society. Our motto is to devote ourselves to "Maa" Durga and perform the rituals in the purest
              and most traditional way possible. This cannot be achieved without your active participation, and hence
              let us all join hands together once again, and create a "Home away from home".
              <span style={{ color: "#e88310" }}>
                <br /> Participation, prasad and entry to the festival is and will always be free and open to all. No
                registrations are required!
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
              We are very pleased to inform you that we are all set to perform our fourth edition of Durga Puja starting
              from <span style={{ color: "#e88310" }}>9th Oct 2024, Wednesday until 13th Oct, 2024, Sunday</span>.
              <br />
              We heartily invite you, along with your friends and family to the festival. Come and join us as we pray
              for speedy justice for "Abhaya" and pray to "Maa" Durga to bless us all and help catch the real demons of
              the modern society. Our motto is to devote ourselves to "Maa" Durga and perform the rituals in the purest
              and most traditional way possible. This cannot be achieved without your active participation, and hence
              let us all join hands together once again, and create a "Home away from home".
              <span style={{ color: "#e88310" }}>
                <br /> Participation, prasad and entry to the festival is and will always be free and open to all. No
                registrations are required!
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
              We are very pleased to inform you that we are all set to perform our fourth edition of Durga Puja starting
              from <span style={{ color: "#e88310" }}>9th Oct 2024, Wednesday until 13th Oct, 2024, Sunday</span>.
              <br />
              We heartily invite you, along with your friends and family to the festival. Come and join us as we pray
              for speedy justice for "Abhaya" and pray to "Maa" Durga to bless us all and help catch the real demons of
              the modern society. Our motto is to devote ourselves to "Maa" Durga and perform the rituals in the purest
              and most traditional way possible. This cannot be achieved without your active participation, and hence
              let us all join hands together once again, and create a "Home away from home".
              <span style={{ color: "#e88310" }}>
                <br /> Participation, prasad and entry to the festival is and will always be free and open to all. No
                registrations are required!
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

        <Grid.Row centered>
          <Image
            alt="Durgapujo durgaville"
            src={durgapujo}
            style={{ width: "80%", aspectRatio: "16 / 9", objectFit: "cover" }}
          />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={4} floated="right" only="computer">
            <Button
              onClick={handleCopy}
              color="red"
              content="Contact Us"
              icon="mail"
              label={{ basic: true, color: "red", pointing: "left", icon: message }}
            />
          </Grid.Column>

          <Grid.Column width={6} floated="right" only="tablet">
            <Button
              onClick={handleCopy}
              color="red"
              content="Contact Us"
              icon="mail"
              label={{ basic: true, color: "red", pointing: "left", icon: message }}
            />
          </Grid.Column>

          <Grid.Column width={9} floated="right" only="mobile">
            <Button
              onClick={handleCopy}
              color="red"
              content="Contact Us"
              icon="mail"
              label={{ basic: true, color: "red", pointing: "left", icon: message }}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Schedule />
        </Grid.Row>
      </Grid>
      <Divider />
      <Registration />

      <Sponsors />
    </div>
  );
}

export default Durgapujo;
