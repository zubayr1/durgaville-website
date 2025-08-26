import React, { useState } from "react";
import { Grid, Button, Header, Icon, Segment, Modal, Form, Input, TextArea, Message } from "semantic-ui-react";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import "./home.css";

function GetInvolved() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    profession: "",
    residenceOption: "",
    planResideSoon: "",
    startMonth: "",
    longDistancePlan: "",
    motivation: "",
    specialSkills: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const scrollToFooter = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleInputChange = (e) => {
  const { name, value } = e.target || e; // Fallback to e if no target
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const submitToFirebase = async (formData) => {
    try {
      const currentDate = new Date();
      const docData = {
        ...formData, 
      date: currentDate.toLocaleString(),
      timestamp: currentDate,
      };

      await addDoc(collection(db, "become-member"), docData);
      return true;
    } catch (error) {
      console.error("Error submitting form:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    setErrorMessage("");

    // Validate required fields
    if (
        !formData.fullName.trim() ||
        !formData.profession.trim() ||
        !formData.residenceOption.trim() ||
        !formData.motivation.trim() ||
        !formData.mobileNumber.trim() ||
        !formData.whatsappNumber.trim() ||
        !formData.email.trim()
    ) {
        setSubmitStatus("error");
        setErrorMessage("Please fill in all required fields marked with *.");
        setLoading(false);
        return;
    }

    const isLongDistance = Number(formData.residenceOption) >= 7;
    if (isLongDistance) {
        // Check if Q4 is answered
        if (!formData.planResideSoon) {
            setSubmitStatus("error");
            setErrorMessage("Please answer if you are planning to relocate (Q4).");
            setLoading(false);
            return;
        }
        // If they are NOT relocating, check if they filled out the plan (Q6)
        if (formData.planResideSoon === "no" && !formData.longDistancePlan.trim()) {
            setSubmitStatus("error");
            setErrorMessage("Please explain how you plan to participate from a long distance (Q6).");
            setLoading(false);
            return;
        }
    }

    if ((Number(formData.residenceOption) <= 6 || formData.planResideSoon === "yes") && !formData.startMonth.trim()) {
        setSubmitStatus("error");
        setErrorMessage("Please provide your planned relocation date (Q5).");
        setLoading(false);
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("error");
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const success = await submitToFirebase(formData);

    if (success) {
      setSubmitStatus("success");
      // Give user 2 seconds to read success message, then close modal and reset form
      setTimeout(() => {
        setModalOpen(false);
        setFormData({
        fullName: "",
        profession: "",
        residenceOption: "",
        planResideSoon: "",
        startMonth: "",
        longDistancePlan: "",
        motivation: "",
        specialSkills: "",
        mobileNumber: "",
        whatsappNumber: "",
        email: "",
    });
        setSubmitStatus(null);
        setErrorMessage("");
      }, 2000);
    } else {
      setSubmitStatus("error");
      setErrorMessage("There was an error submitting your request. Please try again.");
    }

    setLoading(false);
  };


  const labelStyle = {
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#333",
    fontSize: "1rem",
    marginBottom: "0.5rem",
    display: "block",
  };

  const inputStyle = {
    fontFamily: "Inter",
    fontSize: "1rem",
    padding: "0.8rem",
  };

  const selectStyle = {
    fontFamily: "Inter",
    fontSize: "1rem",
    padding: "0.8rem",
    width: "100%",
    borderRadius: 4,
    border: "1px solid rgba(34,36,38,.15)",
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
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.6",
                      fontSize: "1rem",
                      color: "#666",
                      marginBottom: "1.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    Send us your membership request and we will soon, get back to you!
                  </p>
                  <Button
                    onClick={() => setModalOpen(true)}
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      fontSize: "1rem",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: "1rem",
                      alignSelf: "center",
                    }}
                  >
                    <Icon name="mail" />
                    Send Membership Request
                  </Button>
                  <Header as="h3" style={{ color: "#25D366", marginBottom: "1rem", fontSize: "1.1rem" }}>
                    <Icon name="whatsapp" />
                    Become Part of the Community Group
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.8",
                      fontSize: "1.2rem",
                      color: "#333",
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
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.6",
                      fontSize: "1rem",
                      color: "#666",
                      marginBottom: "1.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    Send us your membership request and we will soon, get back to you!
                  </p>
                  <Button
                    onClick={() => setModalOpen(true)}
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      fontSize: "0.9rem",
                      padding: "0.7rem 1.2rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: "1rem",
                    }}
                  >
                    <Icon name="mail" />
                    Send Membership Request
                  </Button>
                  <Header as="h3" style={{ color: "#25D366", marginBottom: "1rem", fontSize: "1rem" }}>
                    <Icon name="whatsapp" />
                    Become Part of the Community Group
                  </Header>
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.8",
                      fontSize: "1.1rem",
                      color: "#333",
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
                  <p
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "1.5",
                      fontSize: "0.9rem",
                      color: "#666",
                      marginBottom: "1.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    Send us your membership request and we will soon, get back to you!
                  </p>
                  <Button
                    onClick={() => setModalOpen(true)}
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      fontSize: "0.8rem",
                      padding: "0.6rem 1rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: "1rem",
                    }}
                  >
                    <Icon name="mail" />
                    Send Membership Request
                  </Button>
                  <Header as="h3" style={{ color: "#25D366", marginBottom: "0.8rem", fontSize: "1.1rem" }}>
                    <Icon name="whatsapp" />
                    Become Part of the Community Group
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

      {/* Contact Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="small" style={{ fontFamily: "Inter" }}>
        <Modal.Header
          style={{
            backgroundColor: "#fff",
            color: "#333",
            textAlign: "center",
            borderBottom: "3px solid #25D366",
            padding: "1.5rem 1rem",
            fontSize: "1.3rem",
            fontWeight: "600",
          }}
        >
          <Icon name="users" style={{ marginRight: "0.5rem", color: "#25D366" }} />
          Become a Member
        </Modal.Header>
        
        <Modal.Content style={{ padding: "2rem" }}>
  {submitStatus === "success" && (
    <Message
      success
      header="Success!"
      content="Your membership request has been submitted successfully. We'll get back to you shortly!"
      style={{ marginBottom: "1rem" }}
    />
  )}
  {submitStatus === "error" && (
    <Message error header="Error!" content={errorMessage} style={{ marginBottom: "1rem" }} />
  )}
  <Form onSubmit={handleSubmit}>
    {/* Q1 */}
    <Form.Field>
      <label style={labelStyle}>Q1) Full Name *</label>
      <Input
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        placeholder="Enter your full name"
        required
        style={inputStyle}
      />
    </Form.Field>

    {/* Q2 */}
    <Form.Field>
      <label style={labelStyle}>Q2) Profession *</label>
      <Input
        name="profession"
        value={formData.profession}
        onChange={handleInputChange}
        placeholder="Enter your profession"
        required
        style={inputStyle}
      />
    </Form.Field>


{/* Q3 */}
<Form.Field>
  <label style={labelStyle}>Q3) Your current residence City *</label>
  <select
    name="residenceOption"
    value={formData.residenceOption}
    onChange={(e) => {
      handleInputChange(e);
      // Reset dependent fields
      setFormData((prev) => ({
        ...prev,
        planResideSoon: "",
        startMonth: "",
        longDistancePlan: "",
      }));
    }}
    required
    style={selectStyle}
  >
    <option value="">Select one</option>
    <option value="1">01. Erlangen</option>
    <option value="2">02. Nürnberg</option>
    <option value="3">03. Fürth</option>
    <option value="4">04. Forchheim</option>
    <option value="5">05. Bamberg</option>
    <option value="6">06. Inside of Franconia</option>
    <option value="7">07. Outside of Franconia</option>
    <option value="8">08. Munich</option>
    <option value="9">09. Inside of Bayern</option>
    <option value="10">10. Outside of Bayern</option>
    <option value="11">11. Outside of Germany</option>
  </select>
</Form.Field>

{/* Q4 (Only if Q3 >= 7) */}
{Number(formData.residenceOption) >= 7 && (
  <Form.Field>
    <label style={labelStyle}>
      Q4) Are you planning to reside in Erlangen or any nearby city of Erlangen soon? *
    </label>
    <div style={{ display: "flex", gap: "1rem" }}>
      <label>
        <input
          type="radio"
          name="planResideSoon"
          value="yes"
          checked={formData.planResideSoon === "yes"}
          onChange={handleInputChange}
          required
        />{" "}
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="planResideSoon"
          value="no"
          checked={formData.planResideSoon === "no"}
          onChange={handleInputChange}
          required
        />{" "}
        No
      </label>
    </div>
  </Form.Field>
)}

{/* Q5 (Only if Q4 = Yes) */}
{formData.planResideSoon === "yes" && (
  <Form.Field>
    <label style={labelStyle}>
      Q5) When are you planning to start residing in your chosen city? *
    </label>
    <Input
      type="month"
      name="startMonth"
      value={formData.startMonth}
      onChange={handleInputChange}
      placeholder="MM/YYYY"
      required
      style={inputStyle}
    />
  </Form.Field>
)}

{/* Q6 (Only if Q4 = No) */}
{formData.planResideSoon === "no" && (
  <Form.Field>
    <label style={labelStyle}>
      Q6) How do you plan to attend monthly meetings and volunteer in events with a long distance? *
    </label>
    <Input
      name="longDistancePlan"
      value={formData.longDistancePlan}
      onChange={(e) =>
        handleInputChange({
          target: { name: "longDistancePlan", value: e.target.value.slice(0, 100) },
        })
      }
      placeholder="Max 100 characters"
      required
      style={inputStyle}
    />
  </Form.Field>
)}

{/* Q7 and onward always appear */}
<Form.Field>
  <label style={labelStyle}>Q7) Why do you want to be part of Durgaville? *</label>
  <TextArea
    name="motivation"
    value={formData.motivation}
    onChange={(e) =>
      handleInputChange({
        target: { name: "motivation", value: e.target.value.slice(0, 200) },
      })
    }
    placeholder="Max 200 characters"
    rows={4}
    required
    style={inputStyle}
  />
</Form.Field>

    {/* Q8 */}
    <Form.Field>
      <label style={labelStyle}>
        Q8) Any special skills, values you bring that you want to tell us about? (Optional)
      </label>
      <Input
        name="specialSkills"
        value={formData.specialSkills}
        onChange={(e) =>
          handleInputChange({
            target: { name: "specialSkills", value: e.target.value.slice(0, 100) },
          })
        }
        placeholder="Max 100 characters"
        style={inputStyle}
      />
    </Form.Field>

    {/* Q9 */}
    <Form.Field>
      <label style={labelStyle}>Q9) Mobile Number *</label>
      <Input
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleInputChange}
        placeholder="Enter your mobile number"
        required
        style={inputStyle}
      />
    </Form.Field>

    {/* Q10 */}
    <Form.Field>
      <label style={labelStyle}>Q10) WhatsApp Number *</label>
      <Input
        name="whatsappNumber"
        value={formData.whatsappNumber}
        onChange={handleInputChange}
        placeholder="Enter your WhatsApp number"
        required
        style={inputStyle}
      />
    </Form.Field>

    {/* Q11 */}
    <Form.Field>
      <label style={labelStyle}>Q11) Email ID *</label>
      <Input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email address"
        required
        style={inputStyle}
      />
    </Form.Field>
  </Form>
</Modal.Content>

        <Modal.Actions
          style={{
            textAlign: "center",
            padding: "1.5rem 2rem",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Button
            onClick={() => setModalOpen(false)}
            style={{
              backgroundColor: "#f5f5f5",
              color: "#666",
              marginRight: "1rem",
              border: "1px solid #ddd",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
            style={{
              backgroundColor: "#25D366",
              color: "#fff",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "500",
              boxShadow: "0 2px 4px rgba(37, 211, 102, 0.3)",
            }}
          >
            <Icon name="send" style={{ marginRight: "0.5rem" }} />
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default GetInvolved;
