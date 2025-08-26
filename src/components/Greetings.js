import React from "react";

import background from "../assets/background.jpg";

import "./greetings.css";

function Greetings() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="greetings-container"
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <p className="welcome-text">Welcome to Durgaville</p>
          <p
            className="tag-text"
            style={{
              fontFamily: "Inter",
              color: "white",
              fontStyle: "italic",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            The Official Website of Durgaville, Erlangen,
          </p>

          <p
            className="desc-text"
            style={{
              fontFamily: "Inter",
              color: "white",
              fontStyle: "italic",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            a rapidly growing community of Bengalis and Indians in Erlangen, Germany and beyond!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Greetings;
