import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase.js";
import { Table, Container, Header, Loader, Message, Segment } from "semantic-ui-react";
import { format } from "date-fns";

function AdminBoishakhiOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersQuery = query(collection(db, "boishakhi-orders"), orderBy("timestamp", "desc"));

        const querySnapshot = await getDocs(ordersQuery);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
        }));

        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container style={{ marginTop: "2em" }}>
        <Loader active>Loading Orders...</Loader>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: "2em" }}>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "2em", marginBottom: "2em" }}>
      <Header as="h2" textAlign="center">
        Boishakhi 2025 Orders
      </Header>

      {orders.map((order) => (
        <Segment key={order.id} style={{ marginBottom: "2em" }}>
          <Header as="h3">Order Details</Header>
          <Table basic="very">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={4}>
                  <strong>Order ID:</strong>
                </Table.Cell>
                <Table.Cell>{order.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <strong>Customer Name:</strong>
                </Table.Cell>
                <Table.Cell>{order.fullName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <strong>Email:</strong>
                </Table.Cell>
                <Table.Cell>{order.email}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <strong>Phone:</strong>
                </Table.Cell>
                <Table.Cell>{order.phone}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <strong>Order Date:</strong>
                </Table.Cell>
                <Table.Cell>{order.timestamp ? format(order.timestamp, "PPpp") : "N/A"}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <strong>Payment ID:</strong>
                </Table.Cell>
                <Table.Cell>{order.paymentId}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <strong>Payment Status:</strong>
                </Table.Cell>
                <Table.Cell>{order.paymentStatus}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Header as="h4">Ordered Items</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Item</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {order.orders.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                  <Table.Cell>€{item.price}</Table.Cell>
                  <Table.Cell>€{(item.price * item.quantity).toFixed(2)}</Table.Cell>
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell colSpan="3">
                  <strong>Total Amount</strong>
                </Table.Cell>
                <Table.Cell>
                  <strong>€{order.totalAmount.toFixed(2)}</strong>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      ))}
    </Container>
  );
}

export default AdminBoishakhiOrders;
