

import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase.js";
import { Table, Container, Header, Loader, Message, Button } from "semantic-ui-react";
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

  // Food items list
  const foodItems = [
    "Pani Puri",
    "Dahi Puri",
    "Papri Chaat",
    "Dry Chilli Paneer",
    "Dry Chilli Chicken",
    "Chicken Momo",
    "Chicken Pakora",
    "Paneer Kathi Roll",
    "Mughlai Egg Roll",
    "Chicken Kathi Roll",
    "Mango Kesar Lassi",
  ];

  // Group orders by email
  const groupOrdersByEmail = () => {
    const groupedOrders = {};

    orders.forEach((order) => {
      const { email, fullName, phone, timestamp, totalAmount, orders: orderItems, receivedBy } = order;
      if (!groupedOrders[email]) {
        groupedOrders[email] = {
          fullName,
          phone,
          timestamp,
          totalAmount: 0,
          orders: [],
          receivedBy,  // Add the "Received by Durgaville" information
        };
      }

      // Add the order to the grouped data
      groupedOrders[email].totalAmount += totalAmount;

      // Aggregate the food item quantities
      foodItems.forEach((item) => {
        const foodItem = orderItems.find((orderItem) => orderItem.name.split(" (")[0] === item);
        if (foodItem) {
          const existingItem = groupedOrders[email].orders.find(
            (orderItem) => orderItem.name === item
          );
          if (existingItem) {
            existingItem.quantity += foodItem.quantity;
          } else {
            groupedOrders[email].orders.push({
              name: item,
              quantity: foodItem.quantity,
            });
          }
        }
      });
    });

    // Convert the grouped orders back to an array format
    return Object.keys(groupedOrders).map((email) => ({
      email,
      ...groupedOrders[email],
    }));
  };

  const groupedOrders = groupOrdersByEmail();

  // Function to convert data to CSV format
  const convertToCSV = (data, columns) => {
    const header = columns.join(",");
    const rows = data.map((row) =>
      columns
        .map((col) => (row[col] !== undefined ? `"${row[col]}"` : ""))
        .join(",")
    );
    return [header, ...rows].join("\n");
  };

  // Function to trigger CSV download
  const downloadCSV = (data, columns, filename) => {
    // Calculate totals for food items
    const totalQuantities = foodItems.reduce((totals, item) => {
      totals[item] = groupedOrders.reduce((sum, order) => {
        const foodItem = order.orders.find((orderItem) => orderItem.name === item);
        return sum + (foodItem ? foodItem.quantity : 0);
      }, 0);
      return totals;
    }, {});

    // Add total row at the end of the data
    const totalRow = { "Customer Name": "Total" };
    foodItems.forEach((item) => {
      totalRow[item] = totalQuantities[item];
    });

    // Append total row to the data
    data.push(totalRow);

    // Convert data to CSV format
    const csvContent = convertToCSV(data, columns);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.click();
  };

  // Columns for Ordered Items by Food Table CSV
  const orderedItemsColumns = ["Customer Name", ...foodItems];

  return (
    <Container style={{ marginTop: "2em", marginBottom: "2em" }}>
      {/* 1st Table - All Orders-Summary (Including Order ID, Phone, and other details) */}
      <Header as="h2" textAlign="center" style={{ marginTop: "3em" }}>
        All Orders - Summary
      </Header>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Order Date</Table.HeaderCell>
            <Table.HeaderCell>Total Amount</Table.HeaderCell>
            <Table.HeaderCell>Received by Durgaville</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orders.map((order) => {
            const receivedAmount = (order.totalAmount - 0.4 - 0.0291 * order.totalAmount).toFixed(2);
            return (
              <Table.Row key={order.id}>
                <Table.Cell>{order.fullName}</Table.Cell>
                <Table.Cell>{order.email}</Table.Cell>
                <Table.Cell>{order.phone}</Table.Cell>
                <Table.Cell>{order.timestamp ? format(order.timestamp, "PPpp") : "N/A"}</Table.Cell>
                <Table.Cell>€{order.totalAmount.toFixed(2)}</Table.Cell>
                <Table.Cell>€{receivedAmount}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      {/* 2nd Table - Ordered Items by Food (Grouped by Email) */}
      <Header as="h2" textAlign="center" style={{ marginTop: "3em" }}>
        Ordered Items by Food (Grouped by Email)
      </Header>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            {foodItems.map((item, index) => (
              <Table.HeaderCell key={index}>{item}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {groupedOrders.map((order) => {
            const itemQuantities = foodItems.reduce((acc, item) => {
              const foodItem = order.orders.find((orderItem) => orderItem.name === item);
              acc[item] = foodItem ? foodItem.quantity : 0;
              return acc;
            }, {});

            return (
              <Table.Row key={order.email}>
                <Table.Cell>{order.fullName}</Table.Cell>
                {foodItems.map((item, index) => (
                  <Table.Cell key={index}>{itemQuantities[item]}</Table.Cell>
                ))}
              </Table.Row>
            );
          })}

          {/* Row to show total quantity for each food item */}
          <Table.Row>
            <Table.Cell><strong>Total</strong></Table.Cell>
            {foodItems.map((item, index) => (
              <Table.Cell key={index}><strong>{groupedOrders.reduce((sum, order) => {
                const foodItem = order.orders.find((orderItem) => orderItem.name === item);
                return sum + (foodItem ? foodItem.quantity : 0);
              }, 0)}</strong></Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>

      {/* Download Button */}
      <div style={{ marginTop: "2em", display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => downloadCSV(
            groupedOrders.map((order) => {
              const itemQuantities = foodItems.reduce((acc, item) => {
                const foodItem = order.orders.find((orderItem) => orderItem.name === item);
                acc[item] = foodItem ? foodItem.quantity : 0;
                return acc;
              }, {});
              return { "Customer Name": order.fullName, ...itemQuantities };
            }),
            orderedItemsColumns,
            "ordered_items_by_food.csv"
          )}
          primary
        >
          Download Ordered Items CSV
        </Button>
      </div>
    </Container>
  );
}

export default AdminBoishakhiOrders;