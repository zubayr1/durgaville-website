import React, { useState } from "react";
import { Button, Form, Grid, Message, Segment, Image } from "semantic-ui-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { TailSpin } from "react-loader-spinner";

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

const foodItems = [
  { id: 1, name: "Jol Phuchka", price: (4.5).toFixed(2), image: jol_puchka },
  { id: 2, name: "Doi Phuchka", price: (4.5).toFixed(2), image: doi_puchka },
  { id: 3, name: "Egg Roll", price: (6.5).toFixed(2), image: egg_roll },
  { id: 4, name: "Chicken Roll", price: (8.5).toFixed(2), image: chicken_roll },
  { id: 5, name: "Paneer Roll", price: (8.5).toFixed(2), image: paneer_roll },
  { id: 6, name: "Mango Lassi", price: (3.0).toFixed(2), image: mango_lassi },
  { id: 7, name: "Chicken pakora", price: (5.5).toFixed(2), image: chicken_pakora },
  { id: 8, name: "Dry Chilli Chicken", price: (7.5).toFixed(2), image: dry_chilli_chicken },
  { id: 9, name: "Dry Chilli Paneer", price: (6.5).toFixed(2), image: dry_chilli_paneer },
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

    setLoading(true);
    try {
      await addDoc(collection(db, "boishakhi-orders"), {
        ...formData,
        orders: orderedItems,
        totalAmount: orderedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        timestamp: new Date(),
      });
      setError(0);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
  } else if (error === 0) {
    messageLayout = <Message success header="Success" content="Order submitted successfully" />;
  }

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
              <Segment padded="very">
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

              <Segment padded="very">
                <h3>Preregister Food Items</h3>
                {foodOrders.map((item) => (
                  <div key={item.id} style={{ marginBottom: "20px" }}>
                    <Grid>
                      <Grid.Row verticalAlign="middle">
                        <Grid.Column width={4}>
                          <Image
                            src={item.image}
                            size="small"
                            rounded
                            style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
                          />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <h4>{item.name}</h4>
                          <p>Price: €{item.price}</p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                          <Button.Group>
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
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                ))}
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
