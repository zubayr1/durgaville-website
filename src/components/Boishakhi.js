import React, { useState } from "react";
import { Button, Form, Grid, Message, Segment, Image, Modal, Card, Checkbox } from "semantic-ui-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { TailSpin } from "react-loader-spinner";
import PayPalCheckout from "./PayPalCheckout";
import { Icon } from "semantic-ui-react";

import sparkasse from "../assets/sponsors/sparkasse.jpg";
import jol_puchka from "../assets/foods/jol_puchka.jpg";
import doi_puchka from "../assets/foods/doi_puchka.jpg";
import egg_roll from "../assets/foods/egg_roll.jpg";
import chicken_roll from "../assets/foods/chicken_roll.jpg";
import paneer_roll from "../assets/foods/paneer_roll.jpg";
import mango_lassi from "../assets/foods/mango_lassi.jpg";
import chicken_pakora from "../assets/foods/chicken_pakora.jpg";
import dry_chilli_chicken from "../assets/foods/chilli_chicken_dry.jpeg";
import dry_chilli_paneer from "../assets/foods/chilli_paneer_dry.jpeg";
import chicken_momo from "../assets/foods/chicken_momo.jpg";
import papdi_chat from "../assets/foods/papdi_chaat.jpg";
import ksf_logo from "../assets/foods/ksf_logo.png";
import boishakhi_header from "../assets/foods/boishakhi_header.png";

const foodItems = [
  {
    id: 1,
    name: "Pani Puri (2)",
    price: (4.6).toFixed(2),
    image: jol_puchka,
    description:
      "Experience the soul of Kolkata with every bite of our famous Pani Puri! Crispy, hollow puris filled with exemplary potato fillings, tangy tamarind water, spices, and fresh ingredients. The perfect mix of zing, crunch, and nostalgia—just like the streets of Kolkata. A bite you'll crave again and again. Taste it during our Boishakhi event!",
  },
  {
    id: 2,
    name: "Dahi Puri (2,C)",
    price: (5.6).toFixed(2),
    image: doi_puchka,
    description:
      "A burst of cool, creamy, and tangy delight—our Kolkata-style Dahi Puri is pure indulgence! Crisp Puris filled with spiced yogurt, zesty chutneys, and a hint of magic in every bite. A refreshing twist on a classic favorite, it's the perfect balance of crunch and creaminess. Dive in at our Boishakhi evening!",
  },
  {
    id: 3,
    name: "Papri Chaat (2,C)",
    price: (7.1).toFixed(2),
    image: papdi_chat,
    description:
      "A symphony of flavors and textures—crispy papri, velvety yogurt, tangy tamarind, and a burst of spices come together in our irresistible Papri Chaat! Sweet, spicy, crunchy, and oh-so-satisfying, every bite is a celebration of taste. One plate is never enough—treat yourself to pure street food bliss at our Boishakhi event!",
  },
  {
    id: 4,
    name: "Dry Chilli Paneer (A,E)",
    price: (6.6).toFixed(2),
    image: dry_chilli_paneer,
    description:
      "Spicy, crispy, and loaded with flavor—our Dry Chili Paneer is an irresistible Indo-Chinese delight! Tossed in a smoky wok with crunchy peppers, fiery chilies, and zesty sauces, every bite is a perfect balance of heat and crunch. A dish that excites, satisfies, and keeps you coming back!",
  },
  {
    id: 5,
    name: "Dry Chilli Chicken (A,B,E)",
    price: (7.7).toFixed(2),
    image: dry_chilli_chicken,
    description:
      "Fiery, crispy, and irresistibly bold—our Dry Chili Chicken is the perfect Indo-Chinese indulgence! Tossed in smoky spices, crunchy peppers, and a sizzling wok-kissed sauce, every bite packs a punch of heat and flavor. One plate, endless satisfaction—dive in and awaken your taste buds at our Boishakhi event!",
  },
  {
    id: 6,
    name: "Chicken Momo (A)",
    price: (4.6).toFixed(2),
    image: chicken_momo,
    description:
      "Delicate dumplings bursting with juicy chicken and fresh veggies, steamed to perfection and served with fiery chutney. Every bite is a warm hug, a comforting joy, a flavor-packed escape. Whether you crave spice or soul food, our Chicken-Vegetable Momos promise pure satisfaction. One plate is never enough—taste bliss at our Boishakhi event!",
  },
  {
    id: 7,
    name: "Chicken Pakora (A,B)",
    price: (5.6).toFixed(2),
    image: chicken_pakora,
    description:
      "Crispy, golden, and packed with bold spices—our Chicken Pakoras are the perfect crunch to lift your mood! Juicy on the inside, crackling on the outside, every bite is a burst of flavor and warmth. Pair it with chutney, sip some Mango Kesar Lassi, and let the cravings take over. Grab yours now and savor them later at our Boishakhi event!",
  },
  {
    id: 8,
    name: "Paneer Kathi Roll (A,C,E)",
    price: (8.7).toFixed(2),
    image: paneer_roll,
    description:
      "Relive the charm of Kolkata with our Paneer Kathi Roll! Soft, spiced paneer grilled to perfection, wrapped in a crispy, golden paratha, and drizzled with tangy chutneys. A symphony of flavors, a taste of home—every bite takes you back to the streets you love. Indulge in nostalgia during our Boishakhi event!",
  },
  {
    id: 9,
    name: "Mughlai Egg Roll (A,B,E)",
    price: (6.6).toFixed(2),
    image: egg_roll,
    description:
      "Crispy, golden paratha hugged by two luscious eggs, filled with crunchy onions, zesty spices, and a splash of tangy chutney—our Mughlai Egg Roll is pure Kolkata nostalgia! A bite of warmth, a taste of the streets, a rush of memories. Simple, soulful, and irresistibly delicious. Grab yours now and enjoy it during our Boishakhi event!",
  },
  {
    id: 10,
    name: "Chicken Kathi Roll (A,B,E)",
    price: (8.7).toFixed(2),
    image: chicken_roll,
    description:
      "Experience the magic of Kolkata with every bite of our Chicken Kathi Roll! Tender, smoky chicken wrapped in a buttery paratha, layered with spices, onions, and chutneys. A bite of nostalgia, a burst of flavor—just like the bustling streets of Kolkata. One roll, endless memories. Taste it at our Boishakhi event!",
  },
  {
    id: 11,
    name: "Mango Kesar Lassi (C,D)",
    price: (3.5).toFixed(2),
    image: mango_lassi,
    description:
      "Cool, creamy, and bursting with tropical sweetness—our Mango Kesar Lassi is the perfect escape! The richness of ripe mangoes, combined with a hint of saffron, takes you back to sunlit afternoons and refreshing moments. A sip of pure bliss that'll leave you wanting more. Refresh yourself at our Boishakhi event!",
  },
];

const Boishakhi = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agreement: false,
  });

  const [foodOrders, setFoodOrders] = useState(foodItems.map((item) => ({ ...item, quantity: 0 })));

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuantityChange = (id, change) => {
    setFoodOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item)),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName || !formData.email || !formData.phone || !formData.agreement) {
      setError(1);
      return;
    }

    const orderedItems = foodOrders.filter((item) => item.quantity > 0);
    if (orderedItems.length === 0) {
      setError(3);
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (orderID) => {
    setLoading(true);
    try {
      const orderedItems = foodOrders.filter((item) => item.quantity > 0);
      const orderData = {
        ...formData,
        orders: orderedItems,
        totalAmount: orderedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        timestamp: new Date(),
        paymentId: orderID,
        paymentStatus: "completed",
      };

      await addDoc(collection(db, "boishakhi-orders"), orderData);
      setOrderDetails(orderData);
      setShowPaymentModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setError(2);
    } finally {
      setLoading(false);
    }
  };

  let messageLayout;
  if (error === 1) {
    messageLayout = <Message error header="Submission Error" content="Please fill in all required fields" />;
  } else if (error === 2) {
    messageLayout = <Message error header="Submission Error" content="Error submitting your order" />;
  } else if (error === 3) {
    messageLayout = <Message error header="Submission Error" content="Please select at least one food item" />;
  }

  const totalAmount = foodOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ overflow: "hidden" }}>
      <Grid centered>
        <Grid.Row centered>
          <Grid.Column width={16} textAlign="middle">
            <Image
              src={boishakhi_header}
              alt="Boishakhi 2025"
              style={{
                width: "60%",
                maxWidth: "600px",
                maxHeight: "300px",
                margin: "0.5% auto",
                display: "block",
                objectFit: "contain",
              }}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16} textAlign="middle">
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "1.5rem",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontFamily: "Inter",
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#333",
                  marginBottom: "1.5rem",
                  textAlign: "justify",
                }}
              >
                As we start taking our first steps to the fifth edition of Durga Puja in 2025, we cordially invite you
                to Join us for an enchanting evening as we honor the legacy of the illustrious Rabindranath Tagore
              </p>

              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#333",
                  marginBottom: "1.5rem",
                  textAlign: "justify",
                }}
              >
                Immerse yourself in the vibrant culture of Bengal with a delightful array of cultural programs featuring
                traditional, folk & modern dance forms that will captivate your heart. Groove into the live music
                performances from our in-house music band that will resonate with the spirit of Tagore and various
                others!
              </p>

              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#333",
                  marginBottom: "1.5rem",
                  textAlign: "justify",
                  fontWeight: "bold",
                }}
              >
                Culinary Delights Await!
                <br />
                Savor the flavors of Bengal with our exquisite food stalls from "Kolkata Street Food"
              </p>

              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#333",
                  marginBottom: "1.5rem",
                  textAlign: "justify",
                }}
              >
                Registrations are needed to attend the event. Although registration is free and everyone is welcome to
                register, pre-booking of food is mandatory.
              </p>

              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#333",
                  marginBottom: "1.5rem",
                  textAlign: "justify",
                }}
              >
                Don't miss this opportunity to celebrate a cultural and food festival like non other here in Erlangen.
                Let's come together to create beautiful memories!
                <br />
                We look forward to celebrating Boishaki with you!
              </p>

              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#bb0d3b",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Please register by 3rd May 2025.
              </p>

              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "#fff",
                  // padding: "2rem",
                  marginTop: "2rem",
                }}
              >
                <Icon name="map marker alternate" size="huge" style={{ color: "#bb0d3b", marginBottom: ".1rem" }} />
                <h3
                  style={{
                    fontFamily: "Inter",
                    fontSize: "1.8rem",
                    color: "#333",
                    marginBottom: "0.1rem",
                    fontWeight: "600",
                  }}
                >
                  Gemeindezentrum Frauenaurach
                </h3>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "1.2rem",
                    color: "#666",
                    marginBottom: "0.5rem",
                  }}
                >
                  Gaisbühlstraße 4
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "1.2rem",
                    color: "#666",
                    marginBottom: "1.5rem",
                  }}
                >
                  91056 Erlangen
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gaisbühlstraße+4+91056+Erlangen"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#bb0d3b",
                    textDecoration: "none",
                    fontFamily: "Inter",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    display: "inline-block",
                    padding: "0.5rem 1.5rem",
                    border: "2px solid #bb0d3b",
                    borderRadius: "25px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#bb0d3b";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#bb0d3b";
                  }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16} textAlign="middle">
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
                marginTop: "3%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Registration
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile={14} tablet={10} computer={8}>
            <Form onSubmit={handleSubmit}>
              <Segment padded>
                <Form.Field>
                  <label>Full Name</label>
                  <input
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Phone Number</label>
                  <input
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    label={
                      <label style={{ fontSize: "0.9em", lineHeight: "1.4" }}>
                        I agree that my name, email id and phone number is required by durgaville team to organize the
                        program smoothly and my data shall not be processed or forwarded otherwise. My data shall be
                        deleted from all durgaville systems and databases after the conclusion of the event
                      </label>
                    }
                    checked={formData.agreement}
                    onChange={(e, data) => handleInputChange("agreement", data.checked)}
                  />
                </Form.Field>
              </Segment>

              <Segment padded>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Cooked and delivered to you with love by our own</h3>
                  <Image
                    src={ksf_logo}
                    size="large"
                    alt="KSF Logo"
                    style={{
                      // height: "80px",
                      margin: "0 auto",
                    }}
                  />
                </div>
                <h3>Preorder Your Favourite Kolkata Street Food Items</h3>
                <p
                  style={{
                    color: "#bb0d3b",
                    fontSize: "1.1em",
                    marginBottom: "1.5rem",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  On-spot registrations and food orders are subjected to availability. We highly recommend you to
                  register online and pre-order your food!
                </p>
                <Grid>
                  <Grid.Row columns={2}>
                    {foodOrders.map((item) => (
                      <Grid.Column key={item.id} mobile={16} tablet={8} computer={8} style={{ marginBottom: "1rem" }}>
                        <Card
                          fluid
                          style={{
                            marginBottom: ".1rem",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Image
                            src={item.image}
                            ui={false}
                            style={{
                              width: "100%",
                              height: "30vh",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                          <Card.Content
                            style={{
                              flex: "1",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Card.Header style={{ fontSize: "1.2em", marginBottom: "0.5em" }}>{item.name}</Card.Header>
                            <Card.Description
                              style={{
                                fontSize: "0.9em",
                                color: "#666",
                                marginBottom: "1em",
                                flex: "1",
                              }}
                            >
                              {item.description}
                            </Card.Description>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "auto",
                              }}
                            >
                              <div style={{ fontSize: "1.1em", fontWeight: "bold", color: "#bb0d3b" }}>
                                €{item.price}
                              </div>
                              <Button.Group size="small">
                                <Button
                                  icon="minus"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleQuantityChange(item.id, -1);
                                  }}
                                  disabled={item.quantity === 0}
                                />
                                <Button.Or text={item.quantity.toString()} />
                                <Button
                                  icon="plus"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleQuantityChange(item.id, 1);
                                  }}
                                />
                              </Button.Group>
                            </div>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
                <Segment
                  basic
                  style={{
                    marginTop: "20px",
                    borderTop: "2px solid #eee",
                    paddingTop: "20px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    padding: "2rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2rem",
                      maxWidth: "600px",
                      margin: "0 auto",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          color: "#333",
                          marginBottom: "1rem",
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          borderBottom: "2px solid #bb0d3b",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        Zusatzstoffe:
                      </h4>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                          gap: "0.5rem",
                        }}
                      >
                        <p style={{ margin: "0.2rem 0", fontSize: "0.95em", display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#bb0d3b",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              marginRight: "0.5rem",
                              fontSize: "0.9em",
                            }}
                          >
                            1
                          </span>
                          mit Konservierungsstoff
                        </p>
                        <p style={{ margin: "0.2rem 0", fontSize: "0.95em", display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#bb0d3b",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              marginRight: "0.5rem",
                              fontSize: "0.9em",
                            }}
                          >
                            2
                          </span>
                          mit Geschmacksverstärker
                        </p>
                        <p style={{ margin: "0.2rem 0", fontSize: "0.95em", display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#bb0d3b",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              marginRight: "0.5rem",
                              fontSize: "0.9em",
                            }}
                          >
                            6
                          </span>
                          mit Süßungsmittel
                        </p>
                        <p style={{ margin: "0.2rem 0", fontSize: "0.95em", display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#bb0d3b",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              marginRight: "0.5rem",
                              fontSize: "0.9em",
                            }}
                          >
                            7
                          </span>
                          koffeinhaltig
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4
                        style={{
                          color: "#333",
                          marginBottom: "1rem",
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          borderBottom: "2px solid #bb0d3b",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        Enthält folgende Allergene:
                      </h4>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                          gap: "0.5rem",
                        }}
                      >
                        <p style={{ margin: "0.2rem 0", fontSize: "0.95em", display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#bb0d3b",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              marginRight: "0.5rem",
                              fontSize: "0.9em",
                            }}
                          >
                            A
                          </span>
                          Weizen
                        </p>
                        <p style={{ margin: "0.2rem 0", fontSize: "0.95em", display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#bb0d3b",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              marginRight: "0.5rem",
                              fontSize: "0.9em",
                            }}
                          >
                            B
                          </span>
                          Eier
                        </p>
                        <p style={{ margin: "0.2rem 0", fontSize: "0.95em", display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#bb0d3b",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              marginRight: "0.5rem",
                              fontSize: "0.9em",
                            }}
                          >
                            C
                          </span>
                          Milch und Milchprodukte (einschließlich Laktose)
                        </p>
                        <p style={{ margin: "0.2rem 0", fontSize: "0.95em", display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#bb0d3b",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              marginRight: "0.5rem",
                              fontSize: "0.9em",
                            }}
                          >
                            D
                          </span>
                          Pistazie
                        </p>
                        <p style={{ margin: "0.2rem 0", fontSize: "0.95em", display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              backgroundColor: "#bb0d3b",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              marginRight: "0.5rem",
                              fontSize: "0.9em",
                            }}
                          >
                            E
                          </span>
                          SenfÖl
                        </p>
                      </div>
                    </div>
                  </div>
                </Segment>
                <Segment
                  basic
                  style={{
                    marginTop: "20px",
                    borderTop: "2px solid #eee",
                    paddingTop: "20px",
                  }}
                >
                  <Grid>
                    <Grid.Row>
                      <Grid.Column floated="right" width={16}>
                        <h3
                          style={{
                            textAlign: "right",
                            color: "#bb0d3b",
                            fontFamily: "Inter",
                          }}
                        >
                          Total Amount: €
                          {foodOrders.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                        </h3>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Segment>

              <div style={{ marginTop: "2%" }}>
                <Button type="submit" style={{ backgroundColor: "#bb0d3b", color: "#fff" }}>
                  Pay & Register
                </Button>
                <p
                  style={{
                    color: "#bb0d3b",
                    fontSize: "1.1em",
                    marginTop: "1rem",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  Orders, once processed cannot be cancelled. For further information please contact durgaville team
                  directly via info@durgaville.com
                </p>
              </div>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Modal open={showPaymentModal} onClose={() => setShowPaymentModal(false)} size="small" closeIcon>
          <Modal.Header>Complete Your Payment</Modal.Header>
          <Modal.Content>
            <p>Please complete your payment to confirm your order.</p>
            <p>Total Amount: €{totalAmount.toFixed(2)}</p>
            <PayPalCheckout totalAmount={totalAmount} onPaymentSuccess={handlePaymentSuccess} />
          </Modal.Content>
        </Modal>

        <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} size="small" closeIcon>
          <Modal.Header style={{ color: "#28a745" }}>Order Placed Successfully!</Modal.Header>
          <Modal.Content>
            <div style={{ marginBottom: "1rem" }}>
              <p>
                <strong>Customer Name:</strong> {orderDetails?.fullName}
              </p>
              <p>
                <strong>Order Total:</strong> €{orderDetails?.totalAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: "0.5rem" }}>Order Details:</h4>
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "4px",
                  border: "1px solid #dee2e6",
                }}
              >
                {orderDetails?.orders.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      paddingBottom: "0.5rem",
                      borderBottom: index < orderDetails.orders.length - 1 ? "1px solid #dee2e6" : "none",
                    }}
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Content>
        </Modal>

        {loading && (
          <Grid.Row>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2em" }}>
              <TailSpin height="80" width="80" color="#bb0d3b" ariaLabel="loading" />
            </div>
          </Grid.Row>
        )}

        <Grid.Row>{messageLayout}</Grid.Row>

        <Grid.Row only="computer" centered>
          <p
            style={{
              fontFamily: "Inter",
              lineHeight: "2.0",
              fontSize: "1.4rem",
              color: "black",
              fontStyle: "italic",
              marginTop: "0",
              marginBottom: "1.0rem",
            }}
          >
            Proudly Sponsored by:
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2%" }}>
            <Image
              alt="sponsor: Sparkasse"
              src={sparkasse}
              style={{ width: "10%" }}
              href="https://www.sparkasse-erlangen.de/"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </Grid.Row>

        <Grid.Row only="tablet" centered>
          <p
            style={{
              fontFamily: "Inter",
              lineHeight: "2.0",
              fontSize: "1.4rem",
              color: "black",
              fontStyle: "italic",
              marginTop: "0",
              marginBottom: "1.0rem",
            }}
          >
            Proudly Sponsored by:
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2%" }}>
            <Image
              alt="sponsor: Sparkasse"
              src={sparkasse}
              style={{ width: "20%" }}
              href="https://www.sparkasse-erlangen.de/"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </Grid.Row>

        <Grid.Row only="mobile" centered>
          <p
            style={{
              fontFamily: "Inter",
              lineHeight: "2.0",
              fontSize: "1.4rem",
              color: "black",
              fontStyle: "italic",
              marginTop: "0",
              marginBottom: "1.0rem",
            }}
          >
            Proudly Sponsored by:
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2%" }}>
            <Image
              alt="sponsor: Sparkasse"
              src={sparkasse}
              style={{ width: "40%" }}
              href="https://www.sparkasse-erlangen.de/"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Boishakhi;
