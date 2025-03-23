import React, { useState } from "react";
import { Button, Form, Grid, Message, Segment, Image, Modal, Card } from "semantic-ui-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { TailSpin } from "react-loader-spinner";
import PayPalCheckout from "./PayPalCheckout";

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

const foodItems = [
  { id: 1, name: "Pani Puri (5pieces)", price: (4.6).toFixed(2), image: jol_puchka },
  { id: 2, name: "Dahi Puri (5pieces)", price: (5.6).toFixed(2), image: doi_puchka },
  { id: 3, name: "Papri Chaat", price: (7.1).toFixed(2), image: papdi_chat },
  { id: 4, name: "Dry Chilli Chicken", price: (7.7).toFixed(2), image: dry_chilli_chicken },
  { id: 5, name: "Dry Chilli Paneer", price: (6.6).toFixed(2), image: dry_chilli_paneer },
  { id: 6, name: "Chicken Momo (5pieces)", price: (4.6).toFixed(2), image: chicken_momo },
  { id: 7, name: "Chicken Pakora", price: (5.6).toFixed(2), image: chicken_pakora },
  { id: 8, name: "Mughlai Egg Roll", price: (6.6).toFixed(2), image: egg_roll },
  { id: 9, name: "Chicken Kathi Roll", price: (8.7).toFixed(2), image: chicken_roll },
  { id: 10, name: "Paneer Kathi Roll", price: (8.7).toFixed(2), image: paneer_roll },
  { id: 11, name: "Mango Kesar Lassi", price: (3.5).toFixed(2), image: mango_lassi },
];

const Boishakhi = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
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

    if (!formData.fullName || !formData.email || !formData.phone) {
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
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "3.5rem",
                color: "black",
                fontWeight: "bold",
                marginTop: "3%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Boishakhi 2025
            </p>
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
              </Segment>

              <Segment padded>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Cooked and delivered to you with love by our own</h3>
                  <Image
                    src={ksf_logo}
                    alt="KSF Logo"
                    style={{
                      height: "80px",
                      margin: "0 auto",
                    }}
                  />
                </div>
                <h3>Preorder Your Favourite Kolkata Street Food Items</h3>
                <Grid>
                  <Grid.Row columns={2}>
                    {foodOrders.map((item) => (
                      <Grid.Column key={item.id} mobile={16} tablet={8} computer={8}>
                        <Card fluid style={{ marginBottom: "1rem" }}>
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
                          <Card.Content>
                            <Card.Header style={{ fontSize: "1.2em", marginBottom: "0.5em" }}>{item.name}</Card.Header>
                            <Card.Description style={{ fontSize: "0.9em", color: "#666", marginBottom: "1em" }}>
                              Authentic Kolkata street food, made with fresh ingredients and traditional spices.
                            </Card.Description>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                  Place Order
                </Button>
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
            <Image alt="sponsor: Sparkasse" src={sparkasse} style={{ width: "10%" }} />
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
            <Image alt="sponsor: Sparkasse" src={sparkasse} style={{ width: "20%" }} />
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
            <Image alt="sponsor: Sparkasse" src={sparkasse} style={{ width: "40%" }} />
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Boishakhi;
