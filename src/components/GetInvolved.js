import React from "react";
import { Grid, Button, Header, Icon, Segment } from "semantic-ui-react";
import "./home.css";

function GetInvolved() {
  const scrollToFooter = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "#dee0e3" }}>
      <div className="margin-container">
        <Grid centered>
          <Grid.Column only="computer" width={16} textAlign="middle">
            <Header
              as="h1"
              style={{
                fontFamily: "Inter",
                fontSize: "4.5rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "3%",
                marginTop: "2%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Get Involved
            </Header>

            <Grid columns={3} stackable style={{ margin: "2rem 5%" }}>
              {/* Column 1: PARTNER WITH US */}
              <Grid.Column>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #bb0d3b",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Header as="h2" style={{ color: "#bb0d3b", marginBottom: "1.5rem", textAlign: "center" }}>
                    <Icon name="handshake" />
                    PARTNER WITH US
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.8",
                      fontSize: "1.2rem",
                      color: "#333",
                      marginBottom: "2rem",
                      flex: "1",
                    }}
                  >
                    Our group always appreciates the generosity and involvement of people like you, with every
                    contribution going towards making Durgaville an even better Non-Profit Organization than it already
                    is. We want to provide you with the correct and appropriate information pertaining to your mode of
                    support, so don't hesitate to contact us with your questions.
                  </p>
                  <Button
                    onClick={scrollToFooter}
                    style={{
                      backgroundColor: "#bb0d3b",
                      color: "#fff",
                      fontSize: "1.1rem",
                      padding: "1rem 2rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      alignSelf: "center",
                    }}
                  >
                    <Icon name="mail" />
                    Contact Us
                  </Button>
                </Segment>
              </Grid.Column>

              {/* Column 2: BECOME A MEMBER */}
              <Grid.Column>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #25D366",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Header as="h2" style={{ color: "#25D366", marginBottom: "1.5rem", textAlign: "center" }}>
                    <Icon name="users" />
                    BECOME A MEMBER
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.8",
                      fontSize: "1.2rem",
                      color: "#333",
                      marginBottom: "1rem",
                      flex: "1",
                    }}
                  >
                    This is one of the simplest ways to help out our cause. We believe the best way for our initiatives
                    to be successful is for the community to actively get involved. Everyone is welcome to be part of
                    Durga Puja celebrations with Durgaville! We are a voluntary community group with no membership fees.
                  </p>
                  <Header as="h3" style={{ color: "#25D366", marginBottom: "1rem", fontSize: "1.1rem" }}>
                    <Icon name="whatsapp" />
                    Become Part of the Community Group
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.6",
                      fontSize: "1rem",
                      color: "#666",
                      marginBottom: "1.5rem",
                      flex: "1",
                    }}
                  >
                    Join our WhatsApp group for announcements and stay connected with the community.
                  </p>
                  <Button
                    as="a"
                    href="https://chat.whatsapp.com/BP36i7vFS4BKAIclXCxRk8?mode=ac_t"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      fontSize: "1.1rem",
                      padding: "1rem 2rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      alignSelf: "center",
                    }}
                  >
                    <Icon name="whatsapp" />
                    Join WhatsApp Group
                  </Button>
                </Segment>
              </Grid.Column>

              {/* Column 3: MAKE A DONATION */}
              <Grid.Column>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #ff6b35",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Header as="h2" style={{ color: "#ff6b35", marginBottom: "1.5rem", textAlign: "center" }}>
                    <Icon name="heart" />
                    MAKE A DONATION
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.8",
                      fontSize: "1.2rem",
                      color: "#333",
                      marginBottom: "1rem",
                      flex: "1",
                    }}
                  >
                    Want to join our efforts but not sure where to start? Make a Donation and take advantage of this
                    incredible opportunity to lend your support. It's a great way to contribute to our cause, and every
                    little bit counts towards paving the path for a better tomorrow. Contact us for more details:
                  </p>
                  <div
                    style={{
                      marginBottom: "1.5rem",
                      padding: "1rem",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontSize: "1rem",
                        color: "#666",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                      }}
                    >
                      Bank Account Details:
                    </p>
                    <div style={{ marginBottom: "1rem" }}>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          marginBottom: "0.3rem",
                          fontStyle: "italic",
                        }}
                      >
                        Account Name: Durgaville
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#fff",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "#333",
                            fontFamily: "monospace",
                            margin: 0,
                          }}
                        >
                          DE75 7635 0000 0060 1590 18
                        </p>
                        <Icon
                          name="copy"
                          style={{ cursor: "pointer", color: "#666", transition: "color 0.2s" }}
                          onClick={(e) => {
                            navigator.clipboard.writeText("DE75 7635 0000 0060 1590 18");
                            e.target.style.color = "#25D366";
                            setTimeout(() => {
                              e.target.style.color = "#666";
                            }, 500);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          marginBottom: "0.3rem",
                          fontStyle: "italic",
                        }}
                      >
                        Account Name: Durgaville
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#fff",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "#333",
                            fontFamily: "monospace",
                            margin: 0,
                          }}
                        >
                          DE79 1001 1001 2621 8434 02
                        </p>
                        <Icon
                          name="copy"
                          style={{ cursor: "pointer", color: "#666", transition: "color 0.2s" }}
                          onClick={(e) => {
                            navigator.clipboard.writeText("DE79 1001 1001 2621 8434 02");
                            e.target.style.color = "#25D366";
                            setTimeout(() => {
                              e.target.style.color = "#666";
                            }, 500);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={scrollToFooter}
                    style={{
                      backgroundColor: "#ff6b35",
                      color: "#fff",
                      fontSize: "1.1rem",
                      padding: "1rem 2rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      alignSelf: "center",
                    }}
                  >
                    <Icon name="mail" />
                    Contact Us
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          {/* Tablet View */}
          <Grid.Column only="tablet" width={16} textAlign="middle">
            <Header
              as="h1"
              style={{
                fontFamily: "Inter",
                fontSize: "3.5rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "3%",
                marginTop: "2%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Get Involved
            </Header>

            <Grid columns={1} stackable style={{ margin: "2rem 5%" }}>
              {/* Column 1: PARTNER WITH US */}
              <Grid.Column>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #bb0d3b",
                    marginBottom: "2rem",
                  }}
                >
                  <Header as="h2" style={{ color: "#bb0d3b", marginBottom: "1.5rem", textAlign: "center" }}>
                    <Icon name="handshake" />
                    PARTNER WITH US
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.8",
                      fontSize: "1.1rem",
                      color: "#333",
                      marginBottom: "2rem",
                    }}
                  >
                    Our group always appreciates the generosity and involvement of people like you, with every
                    contribution going towards making Durgaville an even better Non-Profit Organization than it already
                    is. We want to provide you with the correct and appropriate information pertaining to your mode of
                    support, so don't hesitate to contact us with your questions.
                  </p>
                  <Button
                    onClick={scrollToFooter}
                    style={{
                      backgroundColor: "#bb0d3b",
                      color: "#fff",
                      fontSize: "1rem",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="mail" />
                    Contact Us
                  </Button>
                </Segment>
              </Grid.Column>

              {/* Column 2: BECOME A MEMBER */}
              <Grid.Column>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #25D366",
                    marginBottom: "2rem",
                  }}
                >
                  <Header as="h2" style={{ color: "#25D366", marginBottom: "1.5rem", textAlign: "center" }}>
                    <Icon name="users" />
                    BECOME A MEMBER
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.8",
                      fontSize: "1.1rem",
                      color: "#333",
                      marginBottom: "1rem",
                    }}
                  >
                    This is one of the simplest ways to help out our cause. We believe the best way for our initiatives
                    to be successful is for the community to actively get involved. Everyone is welcome to be part of
                    Durga Puja celebrations with Durgaville! We are a voluntary community group with no membership fees.
                  </p>
                  <Header as="h3" style={{ color: "#25D366", marginBottom: "1rem", fontSize: "1rem" }}>
                    <Icon name="whatsapp" />
                    Become Part of the Community Group
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.6",
                      fontSize: "1rem",
                      color: "#666",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Join our WhatsApp group for announcements and stay connected with the community.
                  </p>
                  <Button
                    as="a"
                    href="https://chat.whatsapp.com/BP36i7vFS4BKAIclXCxRk8?mode=ac_t"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      fontSize: "1rem",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="whatsapp" />
                    Join WhatsApp Group
                  </Button>
                </Segment>
              </Grid.Column>

              {/* Column 3: MAKE A DONATION */}
              <Grid.Column>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #ff6b35",
                  }}
                >
                  <Header as="h2" style={{ color: "#ff6b35", marginBottom: "1.5rem", textAlign: "center" }}>
                    <Icon name="heart" />
                    MAKE A DONATION
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.8",
                      fontSize: "1.1rem",
                      color: "#333",
                      marginBottom: "1rem",
                    }}
                  >
                    Want to join our efforts but not sure where to start? Make a Donation and take advantage of this
                    incredible opportunity to lend your support. It's a great way to contribute to our cause, and every
                    little bit counts towards paving the path for a better tomorrow. Contact us for more details:
                  </p>
                  <div
                    style={{
                      marginBottom: "1.5rem",
                      padding: "1rem",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontSize: "0.9rem",
                        color: "#666",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                      }}
                    >
                      Bank Account Details:
                    </p>
                    <div style={{ marginBottom: "1rem" }}>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          marginBottom: "0.3rem",
                          fontStyle: "italic",
                        }}
                      >
                        Account Name: Durgaville
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#fff",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#333",
                            fontFamily: "monospace",
                            margin: 0,
                          }}
                        >
                          DE75 7635 0000 0060 1590 18
                        </p>
                        <Icon
                          name="copy"
                          style={{ cursor: "pointer", color: "#666", transition: "color 0.2s" }}
                          onClick={(e) => {
                            navigator.clipboard.writeText("DE75 7635 0000 0060 1590 18");
                            e.target.style.color = "#25D366";
                            setTimeout(() => {
                              e.target.style.color = "#666";
                            }, 500);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          marginBottom: "0.3rem",
                          fontStyle: "italic",
                        }}
                      >
                        Account Name: Durgaville
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#fff",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#333",
                            fontFamily: "monospace",
                            margin: 0,
                          }}
                        >
                          DE79 1001 1001 2621 8434 02
                        </p>
                        <Icon
                          name="copy"
                          style={{ cursor: "pointer", color: "#666", transition: "color 0.2s" }}
                          onClick={(e) => {
                            navigator.clipboard.writeText("DE79 1001 1001 2621 8434 02");
                            e.target.style.color = "#25D366";
                            setTimeout(() => {
                              e.target.style.color = "#666";
                            }, 500);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={scrollToFooter}
                    style={{
                      backgroundColor: "#ff6b35",
                      color: "#fff",
                      fontSize: "1rem",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="mail" />
                    Contact Us
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          {/* Mobile View */}
          <Grid.Column only="mobile" width={16} textAlign="middle">
            <Header
              as="h1"
              style={{
                fontFamily: "Inter",
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "3%",
                marginTop: "3%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Get Involved
            </Header>

            <Grid columns={1} stackable style={{ margin: "2rem 5%" }}>
              {/* Column 1: PARTNER WITH US */}
              <Grid.Column>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    padding: "1.5rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #bb0d3b",
                    marginLeft: "2%",
                    marginRight: "2%",
                    marginBottom: "2rem",
                  }}
                >
                  <Header
                    as="h2"
                    style={{ color: "#bb0d3b", marginBottom: "1rem", textAlign: "center", fontSize: "1.5rem" }}
                  >
                    <Icon name="handshake" />
                    PARTNER WITH US
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.6",
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Our group always appreciates the generosity and involvement of people like you, with every
                    contribution going towards making Durgaville an even better Non-Profit Organization than it already
                    is. We want to provide you with the correct and appropriate information pertaining to your mode of
                    support, so don't hesitate to contact us with your questions.
                  </p>
                  <Button
                    onClick={scrollToFooter}
                    style={{
                      backgroundColor: "#bb0d3b",
                      color: "#fff",
                      fontSize: "0.9rem",
                      padding: "0.7rem 1.2rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="mail" />
                    Contact Us
                  </Button>
                </Segment>
              </Grid.Column>

              {/* Column 2: BECOME A MEMBER */}
              <Grid.Column>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    padding: "1.5rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #25D366",
                    marginLeft: "2%",
                    marginRight: "2%",
                    marginBottom: "2rem",
                  }}
                >
                  <Header
                    as="h2"
                    style={{ color: "#25D366", marginBottom: "1rem", textAlign: "center", fontSize: "1.5rem" }}
                  >
                    <Icon name="users" />
                    BECOME A MEMBER
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.6",
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "1rem",
                    }}
                  >
                    This is one of the simplest ways to help out our cause. We believe the best way for our initiatives
                    to be successful is for the community to actively get involved. Everyone is welcome to be part of
                    Durga Puja celebrations with Durgaville! We are a voluntary community group with no membership fees.
                  </p>
                  <Header as="h3" style={{ color: "#25D366", marginBottom: "0.8rem", fontSize: "1.1rem" }}>
                    <Icon name="whatsapp" />
                    Become Part of the Community Group
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.5",
                      fontSize: "0.9rem",
                      color: "#666",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Join our WhatsApp group for announcements and stay connected with the community.
                  </p>
                  <Button
                    as="a"
                    href="https://chat.whatsapp.com/BP36i7vFS4BKAIclXCxRk8?mode=ac_t"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      fontSize: "0.9rem",
                      padding: "0.7rem 1.2rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="whatsapp" />
                    Join WhatsApp Group
                  </Button>
                </Segment>
              </Grid.Column>

              {/* Column 3: MAKE A DONATION */}
              <Grid.Column>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    padding: "1.5rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #ff6b35",
                    marginLeft: "2%",
                    marginRight: "2%",
                  }}
                >
                  <Header
                    as="h2"
                    style={{ color: "#ff6b35", marginBottom: "1rem", textAlign: "center", fontSize: "1.5rem" }}
                  >
                    <Icon name="heart" />
                    MAKE A DONATION
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.6",
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "1rem",
                    }}
                  >
                    Want to join our efforts but not sure where to start? Make a Donation and take advantage of this
                    incredible opportunity to lend your support. It's a great way to contribute to our cause, and every
                    little bit counts towards paving the path for a better tomorrow. Contact us for more details:
                  </p>
                  <div
                    style={{
                      marginBottom: "1.5rem",
                      padding: "1rem",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontSize: "0.9rem",
                        color: "#666",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                      }}
                    >
                      Bank Account Details:
                    </p>
                    <div style={{ marginBottom: "1rem" }}>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          marginBottom: "0.3rem",
                          fontStyle: "italic",
                        }}
                      >
                        Account Name: Durgaville
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#fff",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#333",
                            fontFamily: "monospace",
                            margin: 0,
                          }}
                        >
                          DE75 7635 0000 0060 1590 18
                        </p>
                        <Icon
                          name="copy"
                          style={{ cursor: "pointer", color: "#666", transition: "color 0.2s" }}
                          onClick={(e) => {
                            navigator.clipboard.writeText("DE75 7635 0000 0060 1590 18");
                            e.target.style.color = "#25D366";
                            setTimeout(() => {
                              e.target.style.color = "#666";
                            }, 500);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          marginBottom: "0.3rem",
                          fontStyle: "italic",
                        }}
                      >
                        Account Name: Durgaville
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#fff",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#333",
                            fontFamily: "monospace",
                            margin: 0,
                          }}
                        >
                          DE79 1001 1001 2621 8434 02
                        </p>
                        <Icon
                          name="copy"
                          style={{ cursor: "pointer", color: "#666", transition: "color 0.2s" }}
                          onClick={(e) => {
                            navigator.clipboard.writeText("DE79 1001 1001 2621 8434 02");
                            e.target.style.color = "#25D366";
                            setTimeout(() => {
                              e.target.style.color = "#666";
                            }, 500);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={scrollToFooter}
                    style={{
                      backgroundColor: "#ff6b35",
                      color: "#fff",
                      fontSize: "0.9rem",
                      padding: "0.7rem 1.2rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="mail" />
                    Contact Us
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}

export default GetInvolved;
