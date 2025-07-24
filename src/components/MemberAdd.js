import React, { useState } from "react";
import { Divider, Grid, Image, Button, Form, Message, Segment, Container, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import thakurhome from "../assets/thakurHome.jpg";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

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

function MemberAdd() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    introduction: "",
    howDidYouLearn: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e, { name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "address",
        "mobileNumber",
        "email",
        "introduction",
        "howDidYouLearn",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field].trim());

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(", ")}`);
      }

      // Add timestamp
      const submissionData = {
        ...formData,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "membership-applications"), submissionData);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        mobileNumber: "",
        whatsappNumber: "",
        email: "",
        introduction: "",
        howDidYouLearn: "",
      });
    } catch (err) {
      console.error("Error submitting membership application:", err);
      setError(err.message || "An error occurred while submitting your application. Please try again.");
    } finally {
      setLoading(false);
    }
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
                marginBottom: "2%",
                marginTop: "2%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Join Durgaville Community
            </Header>

            <Segment
              style={{
                backgroundColor: "#fff3f3",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                margin: "2rem 7%",
                border: "2px solid #ff0000",
              }}
            >
              <Header as="h2" style={{ color: "#bb0d3b", marginBottom: "1rem" }}>
                <Icon name="users" />
                Voluntary Group - No Membership Fee!
              </Header>
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "1.8",
                  fontSize: "1.4rem",
                  color: "black",
                  marginBottom: "1.5rem",
                }}
              >
                Everyone is welcome to be part of Durga Puja celebrations with Durgaville! We are a voluntary community
                group with no membership fees.
              </p>

              <Header as="h3" style={{ color: "#bb0d3b", marginBottom: "1rem" }}>
                <Icon name="whatsapp" />
                Become Part of the Community Group
              </Header>
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "1.6",
                  fontSize: "1.2rem",
                  color: "black",
                  marginBottom: "1.5rem",
                }}
              >
                Join our WhatsApp group for announcements and stay connected with the community.
              </p>

              <Button
                as="a"
                href="https://chat.whatsapp.com/your-group-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#25D366", color: "#fff", marginBottom: "1rem" }}
              >
                <Icon name="whatsapp" />
                Join WhatsApp Group
              </Button>

              {/* <Header as="h3" style={{ color: "#bb0d3b", marginBottom: "1rem" }}>
                <Icon name="user plus" />
                Register with Us
              </Header>
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "1.6",
                  fontSize: "1.2rem",
                  color: "black",
                  marginBottom: "2rem",
                }}
              >
                Become part of the group by filling in the form below and one of our members will reach out to you.
              </p> */}
            </Segment>

            {success && (
              <Message positive style={{ margin: "2rem 7%" }}>
                <Message.Header>Application Submitted Successfully!</Message.Header>
                <p>Thank you for your interest in joining Durgaville. One of our members will reach out to you soon.</p>
              </Message>
            )}

            {error && (
              <Message negative style={{ margin: "2rem 7%" }}>
                <Message.Header>Error</Message.Header>
                <p>{error}</p>
              </Message>
            )}

            {/* <Container style={{ margin: "2rem 7%" }}>
              <Form onSubmit={handleSubmit} loading={loading} size="large">
                <Grid columns={2} stackable>
                  <Grid.Column>
                    <Form.Input
                      label="First Name *"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                      label="Last Name *"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your last name"
                    />
                  </Grid.Column>
                </Grid>

                <Form.TextArea
                  label="Address *"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your complete address"
                  rows={3}
                />

                <Grid columns={2} stackable>
                  <Grid.Column>
                    <Form.Input
                      label="Mobile Phone Number *"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your mobile number"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                      label="WhatsApp Number (if different)"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      placeholder="Enter WhatsApp number if different from mobile"
                    />
                  </Grid.Column>
                </Grid>

                <Form.Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />

                <Form.TextArea
                  label="Introduce Yourself *"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about yourself, your background, and why you'd like to join our community"
                  rows={4}
                />

                <Form.TextArea
                  label="How Did You Learn About Us? *"
                  name="howDidYouLearn"
                  value={formData.howDidYouLearn}
                  onChange={handleInputChange}
                  required
                  placeholder="How did you come to know about Durgaville? (e.g., social media, friend, website, etc.)"
                  rows={3}
                />

                <Button type="submit" primary size="large" style={{ backgroundColor: "#ff0000", marginTop: "1rem" }}>
                  Submit Application
                </Button>
              </Form>
            </Container> */}

            <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
              <Image
                alt="Thakur Durgaville"
                src={thakurhome}
                style={{ width: "90%", aspectRatio: "16 / 9", objectFit: "cover" }}
              />
            </div>
          </Grid.Column>

          <Grid.Column only="tablet" width={16} textAlign="middle">
            <Header
              as="h1"
              style={{
                fontFamily: "Inter",
                fontSize: "3.5rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "2%",
                marginTop: "2%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Join Durgaville Community
            </Header>

            <Segment
              style={{
                backgroundColor: "#fff3f3",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                margin: "2rem 6%",
                border: "2px solid #ff0000",
              }}
            >
              <Header as="h2" style={{ color: "#bb0d3b", marginBottom: "1rem" }}>
                <Icon name="users" />
                Voluntary Group - No Membership Fee!
              </Header>
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "1.6",
                  fontSize: "1.2rem",
                  color: "black",
                  marginBottom: "1.5rem",
                }}
              >
                Everyone is welcome to be part of Durga Puja celebrations with Durgaville! We are a voluntary community
                group with no membership fees.
              </p>

              <Header as="h3" style={{ color: "#bb0d3b", marginBottom: "1rem" }}>
                <Icon name="whatsapp" />
                Become Part of the Community Group
              </Header>
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "1.5",
                  fontSize: "1.1rem",
                  color: "black",
                  marginBottom: "1.5rem",
                }}
              >
                Join our WhatsApp group for announcements and stay connected with the community.
              </p>

              <Button
                as="a"
                href="https://chat.whatsapp.com/your-group-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#25D366", color: "#fff", marginBottom: "1rem" }}
              >
                <Icon name="whatsapp" />
                Join WhatsApp Group
              </Button>

              {/* <Header as="h3" style={{ color: "#bb0d3b", marginBottom: "1rem" }}>
                <Icon name="user plus" />
                Register with Us
              </Header>
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "1.5",
                  fontSize: "1.1rem",
                  color: "black",
                  marginBottom: "2rem",
                }}
              >
                Become part of the group by filling in the form below and one of our members will reach out to you.
              </p> */}
            </Segment>

            {success && (
              <Message positive style={{ margin: "2rem 6%" }}>
                <Message.Header>Application Submitted Successfully!</Message.Header>
                <p>Thank you for your interest in joining Durgaville. One of our members will reach out to you soon.</p>
              </Message>
            )}

            {error && (
              <Message negative style={{ margin: "2rem 6%" }}>
                <Message.Header>Error</Message.Header>
                <p>{error}</p>
              </Message>
            )}

            {/* <Container style={{ margin: "2rem 6%" }}>
              <Form onSubmit={handleSubmit} loading={loading} size="large">
                <Form.Input
                  label="First Name *"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your first name"
                />
                <Form.Input
                  label="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your last name"
                />
                <Form.TextArea
                  label="Address *"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your complete address"
                  rows={3}
                />
                <Form.Input
                  label="Mobile Phone Number *"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your mobile number"
                />
                <Form.Input
                  label="WhatsApp Number (if different)"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  placeholder="Enter WhatsApp number if different from mobile"
                />
                <Form.Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
                <Form.TextArea
                  label="Introduce Yourself *"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about yourself, your background, and why you'd like to join our community"
                  rows={4}
                />
                <Form.TextArea
                  label="How Did You Learn About Us? *"
                  name="howDidYouLearn"
                  value={formData.howDidYouLearn}
                  onChange={handleInputChange}
                  required
                  placeholder="How did you come to know about Durgaville? (e.g., social media, friend, website, etc.)"
                  rows={3}
                />
                <Button type="submit" primary size="large" style={{ backgroundColor: "#ff0000", marginTop: "1rem" }}>
                  Submit Application
                </Button>
              </Form>
            </Container> */}

            <div style={{ display: "flex", justifyContent: "center", padding: "6%" }}>
              <Image
                alt="Thakur Durgaville"
                src={thakurhome}
                style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
              />
            </div>
          </Grid.Column>

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
              Join Durgaville Community
            </Header>

            <Segment
              style={{
                backgroundColor: "#fff3f3",
                padding: "1.5rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                margin: "2rem 6%",
                border: "2px solid #ff0000",
              }}
            >
              <Header as="h2" style={{ color: "#bb0d3b", marginBottom: "1rem", fontSize: "1.5rem" }}>
                <Icon name="users" />
                Voluntary Group - No Membership Fee!
              </Header>
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "1.4",
                  fontSize: "1rem",
                  color: "black",
                  marginBottom: "1.5rem",
                }}
              >
                Everyone is welcome to be part of Durga Puja celebrations with Durgaville! We are a voluntary community
                group with no membership fees.
              </p>

              <Header as="h3" style={{ color: "#bb0d3b", marginBottom: "1rem", fontSize: "1.3rem" }}>
                <Icon name="whatsapp" />
                Become Part of the Community Group
              </Header>
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "1.4",
                  fontSize: "1rem",
                  color: "black",
                  marginBottom: "1.5rem",
                }}
              >
                Join our WhatsApp group for announcements and stay connected with the community.
              </p>

              <Button
                as="a"
                href="https://chat.whatsapp.com/your-group-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#25D366", color: "#fff", marginBottom: "1rem" }}
                size="small"
              >
                <Icon name="whatsapp" />
                Join WhatsApp Group
              </Button>

              {/* <Header as="h3" style={{ color: "#bb0d3b", marginBottom: "1rem", fontSize: "1.3rem" }}>
                <Icon name="user plus" />
                Register with Us
              </Header>
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "1.4",
                  fontSize: "1rem",
                  color: "black",
                  marginBottom: "2rem",
                }}
              >
                Become part of the group by filling in the form below and one of our members will reach out to you.
              </p> */}
            </Segment>

            {success && (
              <Message positive style={{ margin: "2rem 6%" }}>
                <Message.Header>Application Submitted Successfully!</Message.Header>
                <p>Thank you for your interest in joining Durgaville. One of our members will reach out to you soon.</p>
              </Message>
            )}

            {error && (
              <Message negative style={{ margin: "2rem 6%" }}>
                <Message.Header>Error</Message.Header>
                <p>{error}</p>
              </Message>
            )}

            {/* <Container style={{ margin: "2rem 6%" }}>
              <Form onSubmit={handleSubmit} loading={loading} size="small">
                <Form.Input
                  label="First Name *"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your first name"
                />
                <Form.Input
                  label="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your last name"
                />
                <Form.TextArea
                  label="Address *"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your complete address"
                  rows={3}
                />
                <Form.Input
                  label="Mobile Phone Number *"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your mobile number"
                />
                <Form.Input
                  label="WhatsApp Number (if different)"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  placeholder="Enter WhatsApp number if different from mobile"
                />
                <Form.Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
                <Form.TextArea
                  label="Introduce Yourself *"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about yourself, your background, and why you'd like to join our community"
                  rows={4}
                />
                <Form.TextArea
                  label="How Did You Learn About Us? *"
                  name="howDidYouLearn"
                  value={formData.howDidYouLearn}
                  onChange={handleInputChange}
                  required
                  placeholder="How did you come to know about Durgaville? (e.g., social media, friend, website, etc.)"
                  rows={3}
                />
                <Button type="submit" primary size="large" style={{ backgroundColor: "#ff0000", marginTop: "1rem" }}>
                  Submit Application
                </Button>
              </Form>
            </Container> */}

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

export default MemberAdd;
