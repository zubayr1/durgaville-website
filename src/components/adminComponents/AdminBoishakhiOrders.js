import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase.js";
import { Table, Container, Header, Loader, Message, Button } from "semantic-ui-react";

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
        setError("Failed to load orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loader active>Loading Orders...</Loader>;
  if (error) return <Message negative>{error}</Message>;

  const foodItems = [
    "Pani Puri", "Dahi Puri", "Papri Chaat", "Dry Chilli Paneer", "Dry Chilli Chicken",
    "Chicken Momo", "Chicken Pakora", "Paneer Kathi Roll", "Mughlai Egg Roll",
    "Chicken Kathi Roll", "Mango Kesar Lassi",
  ];

  const groupOrdersByEmail = () => {
    const groupedOrders = {};
    orders.forEach(({ email, fullName, phone, totalAmount, orders: orderItems }) => {
      if (!groupedOrders[email]) {
        groupedOrders[email] = { fullName, phone, totalAmount: 0, netAmount: 0, orders: [] };
      }
      const netAmount = totalAmount - 0.4 - (0.0291 * totalAmount);
      groupedOrders[email].totalAmount += totalAmount;
      groupedOrders[email].netAmount += netAmount;

      foodItems.forEach((item) => {
        const foundItem = orderItems.find((orderItem) => orderItem.name.split(" (")[0] === item);
        if (foundItem) {
          const existingItem = groupedOrders[email].orders.find((o) => o.name === item);
          if (existingItem) existingItem.quantity += foundItem.quantity;
          else groupedOrders[email].orders.push({ name: item, quantity: foundItem.quantity });
        }
      });
    });
    return Object.keys(groupedOrders).map((email) => ({ email, ...groupedOrders[email] }));
  };

  const groupedOrders = groupOrdersByEmail();

  const totalGrossAmount = groupedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalNetAmount = groupedOrders.reduce((sum, order) => sum + order.netAmount, 0);

  const totalQuantities = foodItems.reduce((totals, item) => {
    totals[item] = groupedOrders.reduce((sum, order) => {
      const foodItem = order.orders.find((o) => o.name === item);
      return sum + (foodItem ? foodItem.quantity : 0);
    }, 0);
    return totals;
  }, {});

  const convertToCSV = (data, columns) => {
    const header = columns.join(",");
    const rows = data.map((row) => columns.map((col) => (row[col] !== undefined ? row[col] : "")).join(","));
    const totalRow = `Total,,€${totalGrossAmount.toFixed(2)},€${totalNetAmount.toFixed(2)}`;
    return [header, ...rows, totalRow].join("\n");
  };

  const downloadCSV = (data, columns, filename) => {
    const csvContent = convertToCSV(data, columns);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.click();
  };

  return (
    <Container style={{ marginTop: "2em" }}>
      <Header as="h2" textAlign="center">All Orders - Summary</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Gross Amount (€)</Table.HeaderCell>
            <Table.HeaderCell>Net Amount (€)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {groupedOrders.map(({ email, fullName, phone, totalAmount, netAmount }) => (
            <Table.Row key={email}>
              <Table.Cell>{fullName}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{phone}</Table.Cell>
              <Table.Cell>€{totalAmount.toFixed(2)}</Table.Cell>
              <Table.Cell>€{netAmount.toFixed(2)}</Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell><strong>Total</strong></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell><strong>€{totalGrossAmount.toFixed(2)}</strong></Table.Cell>
            <Table.Cell><strong>€{totalNetAmount.toFixed(2)}</strong></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Header as="h2" textAlign="center">Ordered Items by Food</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            {foodItems.map((item) => (<Table.HeaderCell key={item}>{item}</Table.HeaderCell>))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {groupedOrders.map(({ fullName, orders }) => (
            <Table.Row key={fullName}>
              <Table.Cell>{fullName}</Table.Cell>
              {foodItems.map((item) => (
                <Table.Cell key={item}>{orders.find((o) => o.name === item)?.quantity || 0}</Table.Cell>
              ))}
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell><strong>Total</strong></Table.Cell>
            {foodItems.map((item) => (
              <Table.Cell key={item}><strong>{totalQuantities[item]}</strong></Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>

      <div style={{ marginTop: "2em", textAlign: "center" }}>
        <Button
          onClick={() => downloadCSV(
            groupedOrders.map(({ fullName, orders }) => {
              const itemQuantities = foodItems.reduce((acc, item) => {
                const foodItem = orders.find((o) => o.name === item);
                acc[item] = foodItem ? foodItem.quantity : 0;
                return acc;
              }, {});
              return { "Customer Name": fullName, ...itemQuantities };
            }),
            ["Customer Name", ...foodItems],
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