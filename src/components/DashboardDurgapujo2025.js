import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Greetings from "./Greetings";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { SidebarPusher, SidebarPushable, GridColumn, Grid, Sidebar, Image, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import MobileView from "./MobileView";
import Magazine from "./Magazine";
// import Durgapujo2025 from "./Durgapujo2025";
import pujo_2025_tagline from "../assets/pujo_2025_tagline.png";
import "./DashboardDurgapujo2025.css";

function DashboardDurgapujo2025() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  const handleScroll = () => {
    setScrollPosition(scrollPosition + 1);
  };

  useEffect(() => {
    // Handle anchor link scrolling
    if (location.hash === "#magazine-section") {
      const magazineElement = document.getElementById("magazine-section");
      if (magazineElement) {
        // Calculate position with 20% offset
        const elementTop = magazineElement.offsetTop;
        const offset = window.innerHeight * 0.1; // 20% of viewport height
        const scrollPosition = elementTop - offset;

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [location.hash]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Helmet>
        <title>Pujo, 2025 - Durgaville</title>
        <meta name="description" content="Welcome to Sharod Utsav, 2025, organized by Durgaville" />
      </Helmet>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16} only="computer tablet" verticalAlign="middle" textAlign="middle">
            <Greetings onScrollDown={handleScroll} />
            <Navbar visible={navbarVisible} setVisible={setNavbarVisible} />
            <div style={{ display: "flex", justifyContent: "center", paddingLeft: "10%", paddingRight: "10%" }}>
              <Image src={pujo_2025_tagline} alt="Pujo 2025" />
            </div>

            {/* Compact Location Section */}
            <div className="location-section">
              <Grid columns={2} stackable style={{ margin: 0 }}>
                <Grid.Column>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Icon name="calendar" size="large" style={{ color: "#ff0000" }} />
                    <div>
                      <div style={{ fontSize: "1.1rem", color: "#666", marginBottom: "0.2rem" }}>Event Dates</div>
                      <div style={{ fontSize: "1.3rem", fontWeight: "600", color: "#333" }}>
                        28th Sep - 2nd Oct 2025
                      </div>
                    </div>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.3rem" }}>
                    <Icon name="map marker" size="large" style={{ color: "#ff0000", marginTop: "0.2rem" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "1.1rem", color: "#666", marginBottom: "0.2rem" }}>Venue</div>
                      <div style={{ fontSize: "1.3rem", fontWeight: "600", color: "#333", marginBottom: "0.3rem" }}>
                        1st Floor, Royal King Restaurant
                      </div>
                      <div style={{ fontSize: "1rem", color: "#666", lineHeight: "1.4" }}>
                        <span>Hauptstraße 12</span>
                        <br />
                        <span>91088 Bubenreuth, Germany</span>
                      </div>
                    </div>
                    <Button
                      as="a"
                      href="https://www.google.com/maps/place/Royal+King/@49.6272539,11.0169038,17z/data=!3m1!4b1!4m6!3m5!1s0x47a1f851ff9a13af:0x882a08fbdca459ed!8m2!3d49.6272539!4d11.0169038!16s%2Fg%2F1tdwcyq0?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="mini"
                      style={{
                        backgroundColor: "#ff0000",
                        color: "#fff",
                        alignSelf: "flex-start",
                        marginTop: "2.5rem",
                      }}
                    >
                      <Icon name="external alternate" />
                      Maps
                    </Button>
                  </div>
                </Grid.Column>
              </Grid>
            </div>

            <Magazine />
            <Footer />
          </Grid.Column>

          <GridColumn width={16} only="mobile" verticalAlign="middle" textAlign="middle">
            <SidebarPushable>
              <Sidebar
                as={Grid.Row}
                animation="overlay"
                icon="labeled"
                onHide={() => setNavbarVisible(false)}
                vertical
                visible={navbarVisible}
                width="wide"
                direction="right"
                style={{ background: "white", paddingTop: "10%", paddingLeft: "10%" }}
              >
                <MobileView />
              </Sidebar>

              <SidebarPusher dimmed={navbarVisible}>
                <Greetings onScrollDown={handleScroll} />
                <Navbar visible={navbarVisible} setVisible={setNavbarVisible} />
                <div style={{ display: "flex", justifyContent: "center", paddingLeft: "5%", paddingRight: "5%" }}>
                  <Image src={pujo_2025_tagline} alt="Pujo 2025" />
                </div>

                {/* Mobile Location Section */}
                <div
                  style={{
                    margin: "1.5rem 8%",
                    padding: "1rem",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <Icon name="calendar" size="large" style={{ color: "#ff0000" }} />
                      <div>
                        <div style={{ fontSize: "1rem", color: "#666", marginBottom: "0.1rem" }}>Event Dates</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "#333" }}>
                          28th Sep - 2nd Oct 2025
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                      <Icon name="map marker" size="large" style={{ color: "#ff0000", marginTop: "0.1rem" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "1rem", color: "#666", marginBottom: "0.1rem" }}>Venue</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "#333", marginBottom: "0.2rem" }}>
                          1st Floor, Royal King Restaurant
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#666", lineHeight: "1.3" }}>
                          <span>Hauptstraße 12</span>
                          <br />
                          <span>91088 Bubenreuth, Germany</span>
                        </div>
                      </div>
                      <Button
                        as="a"
                        href="https://www.google.com/maps/place/Royal+King/@49.6272539,11.0169038,17z/data=!3m1!4b1!4m6!3m5!1s0x47a1f851ff9a13af:0x882a08fbdca459ed!8m2!3d49.6272539!4d11.0169038!16s%2Fg%2F1tdwcyq0?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="mini"
                        style={{
                          backgroundColor: "#ff0000",
                          color: "#fff",
                          alignSelf: "flex-start",
                          marginTop: "2rem",
                        }}
                      >
                        <Icon name="external alternate" />
                        Maps
                      </Button>
                    </div>
                  </div>
                </div>

                <Magazine />
                <Footer />
              </SidebarPusher>
            </SidebarPushable>
          </GridColumn>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default DashboardDurgapujo2025;
