import React from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { NavHashLink } from "react-router-hash-link";
import pujo_2025_tagline from "../assets/pujo_2025_tagline.png";
import Registration from "./Registration";
import "./DashboardDurgapujo2025.css";

function Durgapujo2025() {
  return (
    <div style={{ marginBottom: "1%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <Grid>
          {/* Tagline */}
          <Grid.Row style={{ marginBottom: "-2rem" }}>
            <Image src={pujo_2025_tagline} alt="Pujo 2025" />
          </Grid.Row>

          {/* Location Section (Desktop/Tablet) */}
          <Grid.Row style={{ marginBottom: "-3rem" }}>
            <Grid.Column
              width={16}
              only="computer tablet"
              verticalAlign="middle"
              textAlign="middle"
            >
              <div className="location-section">
                <Grid columns={2} stackable style={{ margin: 0 }}>
                  <Grid.Column>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Icon
                        name="calendar"
                        size="large"
                        style={{ color: "#ff0000" }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: "1.1rem",
                            color: "#666",
                            marginBottom: "0.2rem",
                          }}
                        >
                          Event Dates
                        </div>
                        <div
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: "600",
                            color: "#333",
                          }}
                        >
                          28th Sep - 2nd Oct 2025
                        </div>
                      </div>
                    </div>
                  </Grid.Column>

                  <Grid.Column>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.3rem",
                      }}
                    >
                      <Icon
                        name="map marker"
                        size="large"
                        style={{ color: "#ff0000", marginTop: "0.2rem" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: "1.1rem",
                            color: "#666",
                            marginBottom: "0.2rem",
                          }}
                        >
                          Venue
                        </div>
                        <div
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "0.3rem",
                          }}
                        >
                          1st Floor, Royal King Restaurant
                        </div>
                        <div
                          style={{
                            fontSize: "1rem",
                            color: "#666",
                            lineHeight: "1.4",
                          }}
                        >
                          <span>Hauptstraße 12</span>
                          <br />
                          <span>91088 Bubenreuth, Germany</span>
                        </div>
                      </div>
                      <Button
                        as="a"
                        href="https://www.google.com/maps/place/Royal+King/@49.6272539,11.0169038,17z/data=!3m1!4b1!4m6!3m5!1s0x47a1f851ff9a13af:0x882a08fbdca459ed!8m2!3d49.6272539!4d11.0169038!16s%2Fg%2F1tdwcyq0"
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
            </Grid.Column>

            {/* Mobile Location Section */}
            <Grid.Column
              width={16}
              only="mobile"
              verticalAlign="middle"
              textAlign="middle"
            >
              <div
                style={{
                  margin: "1.5rem 8%",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  border: "1px solid #f0f0f0",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                    }}
                  >
                    <Icon
                      name="calendar"
                      size="large"
                      style={{ color: "#ff0000" }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "1rem",
                          color: "#666",
                          marginBottom: "0.1rem",
                        }}
                      >
                        Event Dates
                      </div>
                      <div
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "#333",
                        }}
                      >
                        28th Sep - 2nd Oct 2025
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.8rem",
                    }}
                  >
                    <Icon
                      name="map marker"
                      size="large"
                      style={{ color: "#ff0000", marginTop: "0.1rem" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "1rem",
                          color: "#666",
                          marginBottom: "0.1rem",
                        }}
                      >
                        Venue
                      </div>
                      <div
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "#333",
                          marginBottom: "0.2rem",
                        }}
                      >
                        1st Floor, Royal King Restaurant
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#666",
                          lineHeight: "1.3",
                        }}
                      >
                        <span>Hauptstraße 12</span>
                        <br />
                        <span>91088 Bubenreuth, Germany</span>
                      </div>
                    </div>
                    <Button
                      as="a"
                      href="https://www.google.com/maps/place/Royal+King/@49.6272539,11.0169038,17z/data=!3m1!4b1!4m6!3m5!1s0x47a1f851ff9a13af:0x882a08fbdca459ed!8m2!3d49.6272539!4d11.0169038!16s%2Fg%2F1tdwcyq0"
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
            </Grid.Column>
          </Grid.Row>

          {/* Schedule Invite Reel */}
          <Grid.Row id="schedule-invite" centered style={{ marginBottom: "-3rem" }}>
            <Grid.Column width={16} verticalAlign="middle" textAlign="middle">
              <NavHashLink smooth to="/sharod-utsav-2025#schedule-invite"></NavHashLink>

              {/* Responsive YouTube Shorts Iframe */}
              {/* Responsive YouTube Shorts Iframe */}
          <div className="reel-wrapper">
            <iframe
            src="https://www.youtube.com/embed/3M4LcttSjvM?autoplay=1&loop=1&playlist=3M4LcttSjvM&playsinline=1&modestbranding=1&controls=0"
              title="Durga Pujo 2025 Invite Reel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
            </Grid.Column>
          </Grid.Row>

          {/* Competitions Registration */}
          <Grid.Row id="competitions-registration" centered style={{ marginBottom: "-3rem" }}>
            <Grid.Column width={16} verticalAlign="middle" textAlign="middle">
              <NavHashLink smooth to="/sharod-utsav-2025#competitions-registration"></NavHashLink>
              <Registration />
            </Grid.Column>
          </Grid.Row>

          {/* Magazine Section */}
          <Grid.Row id="magazine-section" centered>
            <Grid.Column width={16} verticalAlign="middle" textAlign="middle">
              <NavHashLink smooth to="/sharod-utsav-2025#magazine-section"></NavHashLink>
              <h3
                style={{
                  color: "#333",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "2rem",
                }}
              >
                All entries for the magazine are closed
              </h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

export default Durgapujo2025;