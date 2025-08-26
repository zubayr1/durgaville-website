import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ totalAmount, onPaymentSuccess }) => {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    console.error("PayPal Checkout Error:", err);
    setError(err);
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "ASYVAWTNT8VGnQITtMbFSGJPbzKHyycHS4176-qN7TUUnCz31Eib5YS55PbH96DSoTxfuPxHUPrkX9vn",
        currency: "EUR",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          console.log("Creating PayPal Order...");
          return actions.order.create({
            purchase_units: [
              {
                description: "Boishakhi Food Order",
                amount: { value: totalAmount.toFixed(2) },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          console.log("Order Approved!", data);
          const order = await actions.order.capture();
          onPaymentSuccess(order.id);
        }}
        onError={handleError}
      />

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
