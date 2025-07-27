import React from "react";
import { Divider, Grid, Image, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import thakurhome from "../assets/thakurHome.jpg";
// import sparkasse from "../assets/sponsors/sparkasse.jpg";
// import boishakhi_header from "../assets/foods/boishakhi_header.png";
import pujo_2025_logo from "../assets/pujo_2025_logo.png";

import "./home.css";

export const LinkButton = ({ to, children }) => {
  return (
    <div>
      <Button
        as={Link}
        to={to}
        style={{ backgroundColor: "#ff0000", color: "#fff", marginBottom: "1em", marginTop: "1em" }}
      >
        {children}
      </Button>
    </div>
  );
};

function Home() {
  return (
    <div style={{ backgroundColor: "#dee0e3" }}>
      <div className="margin-container">
        <Grid centered>
          <Grid.Column only="computer" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "4.0rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "1%",
                marginTop: "2%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              A Bit of Background
            </p>

            <p
              style={{
                fontFamily: "Inter",
                lineHeight: "1.5",
                fontSize: "1.4rem",
                color: "black",
                fontStyle: "italic",
                marginBottom: "1%",
                marginLeft: "7%",
                marginRight: "7%",
              }}
            >
              Here at Durgaville, we are driven by a single goal: to celebrate Durga Puja in the city of Erlangen in the
              most pious way possible. We are a small group of Bengalis living in Erlangen, just like all of you - not
              special or privileged, but simply driven by passion, dedication and love for Durga Puja. From 2021, we
              decided to celebrate Durga Puja on our own, putting in extra effort in our free time to focus on something
              that brings utmost joy not only to us but to all.
            </p>

            <h3
              style={{
                fontFamily: "Inter",
                fontSize: "1.5rem",
                color: "#bb0d3b",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "1%",
                marginTop: "2%",
              }}
            >
              Turning Interest Into Action
            </h3>

            <p
              style={{
                fontFamily: "Inter",
                lineHeight: "1.5",
                fontSize: "1.4rem",
                color: "black",
                fontStyle: "italic",
                marginBottom: "2%",
                marginLeft: "7%",
                marginRight: "7%",
              }}
            >
              Performing such an event requires ample support and contribution from each and every individual. Our
              vision is that everyone contributes and owns the puja and can be proud of it in the end. We look forward
              to collaborate with all of you and convert this "yet small but big" initiative into a "home away from
              home" concept. Come let's perform and enjoy Durga Puja together and have a great time with our friends and
              family.
            </p>

            <div
              style={{
                backgroundColor: "#fff3f3",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                margin: "2rem 7%",
                border: "2px solid #ff0000",
              }}
            >
              <Image
                src={pujo_2025_logo}
                alt="Pujo 2025"
                style={{
                  width: "80%",
                  maxWidth: "600px",
                  maxHeight: "300px",
                  margin: "0 auto 1.5rem",
                  display: "block",
                  objectFit: "contain",
                }}
              />

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  as={Link}
                  to="/sharod-utsav-2025"
                  style={{ backgroundColor: "#ff0000", color: "#fff", marginBottom: "0.5em" }}
                >
                  More Details about Durga Puja 2025
                </Button>
                <Button
                  as={Link}
                  to="/sharod-utsav-2025#magazine-section"
                  style={{ backgroundColor: "#bb0d3b", color: "#fff", marginBottom: "0.5em" }}
                >
                  Submit Magazine Entry
                </Button>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.4rem",
                  color: "#333",
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                  lineHeight: "1.6",
                }}
              >
                Ready to make a difference? Join our community and help us create meaningful cultural experiences
                together.
              </p>
              <Button
                as={Link}
                to="/get-involved"
                style={{
                  backgroundColor: "#bb0d3b",
                  color: "#fff",
                  fontSize: "1.3rem",
                  padding: "1rem 2.5rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(187, 13, 59, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(187, 13, 59, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(187, 13, 59, 0.3)";
                }}
              >
                <Icon name="users" style={{ marginRight: "0.5rem" }} />
                Be a Part of Our Journey
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                alt="Thakur Durgaville"
                src={thakurhome}
                style={{ width: "90%", aspectRatio: "16 / 9", objectFit: "cover" }}
              />
            </div>
          </Grid.Column>

          <Grid.Column only="tablet" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "3.0rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "2%",
                marginTop: "2%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              A Bit of Background
            </p>

            <p
              style={{
                fontFamily: "Inter",
                lineHeight: "1.5",
                fontSize: "1.3rem",
                color: "black",
                fontStyle: "italic",
                marginBottom: "1%",
                marginLeft: "6%",
                marginRight: "6%",
              }}
            >
              Here at Durgaville, we are driven by a single goal: to celebrate Durga Puja in the city of Erlangen in the
              most pious way possible. We are a small group of Bengalis living in Erlangen, just like all of you - not
              special or privileged, but simply driven by passion, dedication and love for Durga Puja. From 2021, we
              decided to celebrate Durga Puja on our own, putting in extra effort in our free time to focus on something
              that brings utmost joy not only to us but to all.
            </p>

            <h3
              style={{
                fontFamily: "Inter",
                fontSize: "1.5rem",
                color: "#bb0d3b",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "1%",
                marginTop: "2%",
              }}
            >
              Turning Interest Into Action
            </h3>

            <p
              style={{
                fontFamily: "Inter",
                lineHeight: "1.5",
                fontSize: "1.3rem",
                color: "black",
                fontStyle: "italic",
                marginBottom: "2%",
                marginLeft: "6%",
                marginRight: "6%",
              }}
            >
              Performing such an event requires ample support and contribution from each and every individual. Our
              vision is that everyone contributes and owns the puja and can be proud of it in the end. We look forward
              to collaborate with all of you and convert this "yet small but big" initiative into a "home away from
              home" concept. Come let's perform and enjoy Durga Puja together and have a great time with our friends and
              family.
            </p>

            <div
              style={{
                backgroundColor: "#fff3f3",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                margin: "2rem 6%",
                border: "2px solid #ff0000",
              }}
            >
              <Image
                src={pujo_2025_logo}
                alt="Pujo 2025"
                style={{
                  width: "90%",
                  maxWidth: "500px",
                  maxHeight: "250px",
                  margin: "0 auto 1.5rem",
                  display: "block",
                  objectFit: "contain",
                }}
              />

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  as={Link}
                  to="/sharod-utsav-2025"
                  style={{ backgroundColor: "#ff0000", color: "#fff", marginBottom: "0.5em" }}
                >
                  More Details about Durga Puja 2025
                </Button>
                <Button
                  as={Link}
                  to="/sharod-utsav-2025#magazine-section"
                  style={{ backgroundColor: "#bb0d3b", color: "#fff", marginBottom: "0.5em" }}
                >
                  Submit Magazine Entry
                </Button>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.3rem",
                  color: "#333",
                  marginBottom: "1.2rem",
                  fontStyle: "italic",
                  lineHeight: "1.6",
                }}
              >
                Ready to make a difference? Join our community and help us create meaningful cultural experiences
                together.
              </p>
              <Button
                as={Link}
                to="/get-involved"
                style={{
                  backgroundColor: "#bb0d3b",
                  color: "#fff",
                  fontSize: "1.2rem",
                  padding: "0.8rem 2rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(187, 13, 59, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(187, 13, 59, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(187, 13, 59, 0.3)";
                }}
              >
                <Icon name="users" style={{ marginRight: "0.5rem" }} />
                Be a Part of Our Journey
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "3%" }}>
              <Image
                alt="Thakur Durgaville"
                src={thakurhome}
                style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
              />
            </div>
          </Grid.Column>

          <Grid.Column only="mobile" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "2.0rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "3%",
                marginTop: "3%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              A Bit of Background
            </p>

            <p
              style={{
                fontFamily: "Inter",
                lineHeight: "1.3",
                fontSize: "1.2rem",
                color: "black",
                fontStyle: "italic",
                marginBottom: "1%",
                marginLeft: "6%",
                marginRight: "6%",
              }}
            >
              Here at Durgaville, we are driven by a single goal: to celebrate Durga Puja in the city of Erlangen in the
              most pious way possible. We are a small group of Bengalis living in Erlangen, just like all of you - not
              special or privileged, but simply driven by passion, dedication and love for Durga Puja. From 2021, we
              decided to celebrate Durga Puja on our own, putting in extra effort in our free time to focus on something
              that brings utmost joy not only to us but to all.
            </p>

            <h3
              style={{
                fontFamily: "Inter",
                fontSize: "1.3rem",
                color: "#bb0d3b",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "1%",
                marginTop: "2%",
              }}
            >
              Turning Interest Into Action
            </h3>

            <p
              style={{
                fontFamily: "Inter",
                lineHeight: "1.3",
                fontSize: "1.2rem",
                color: "black",
                fontStyle: "italic",
                marginBottom: "2%",
                marginLeft: "6%",
                marginRight: "6%",
              }}
            >
              Performing such an event requires ample support and contribution from each and every individual. Our
              vision is that everyone contributes and owns the puja and can be proud of it in the end. We look forward
              to collaborate with all of you and convert this "yet small but big" initiative into a "home away from
              home" concept. Come let's perform and enjoy Durga Puja together and have a great time with our friends and
              family.
            </p>

            <div
              style={{
                backgroundColor: "#fff3f3",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                margin: "2rem 6%",
                border: "2px solid #ff0000",
              }}
            >
              <Image
                src={pujo_2025_logo}
                alt="Pujo 2025"
                style={{
                  width: "95%",
                  maxWidth: "400px",
                  maxHeight: "200px",
                  margin: "0 auto 1.5rem",
                  display: "block",
                  objectFit: "contain",
                }}
              />

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  as={Link}
                  to="/sharod-utsav-2025"
                  style={{ backgroundColor: "#ff0000", color: "#fff", marginBottom: "0.5em" }}
                >
                  More Details about Durga Puja 2025
                </Button>
                <Button
                  as={Link}
                  to="/sharod-utsav-2025#magazine-section"
                  style={{ backgroundColor: "#bb0d3b", color: "#fff", marginBottom: "0.5em" }}
                >
                  Submit Magazine Entry
                </Button>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.2rem",
                  color: "#333",
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                  lineHeight: "1.6",
                }}
              >
                Ready to make a difference? Join our community and help us create meaningful cultural experiences
                together.
              </p>
              <Button
                as={Link}
                to="/get-involved"
                style={{
                  backgroundColor: "#bb0d3b",
                  color: "#fff",
                  fontSize: "1.1rem",
                  padding: "0.7rem 1.8rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(187, 13, 59, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(187, 13, 59, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(187, 13, 59, 0.3)";
                }}
              >
                <Icon name="users" style={{ marginRight: "0.5rem" }} />
                Be a Part of Our Journey
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "6%" }}>
              <Image
                alt="Thakur Durgaville"
                src={thakurhome}
                style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
              />
            </div>
          </Grid.Column>
        </Grid>

        <Divider />
      </div>
    </div>
  );
}

export default Home;
