import React, { useState, useEffect } from "react";

import ReactSimplyCarousel from "react-simply-carousel";

import { Image } from "semantic-ui-react";

import cgi from "../assets/sponsors/cgi.png";
import chai_roti from "../assets/sponsors/chai_roti.png";
import d4dance from "../assets/sponsors/d4dance.png";
import ergo from "../assets/sponsors/ergo.png";
import indian_street_food from "../assets/sponsors/indian_street_food.png";
import kulturfoerderung_stadt_erlangen from "../assets/sponsors/kulturfoerderung_stadt_erlangen.jpg";
import rasam from "../assets/sponsors/rasam.png";
import ruchi from "../assets/sponsors/ruchi.png";
import sangam from "../assets/sponsors/sangam.png";
import sparkasse from "../assets/sponsors/sparkasse.jpg";
import toms_ok from "../assets/sponsors/toms_ok.png";

function SponsorCarousel({ deviceType }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(2);
  const [itemsToScroll, setItemsToScroll] = useState(1);
  const [dimension, setDimension] = useState(100);

  useEffect(() => {
    if (deviceType === "computer") {
      setItemsToShow(5);
      setItemsToScroll(2);
      setDimension(300);
    } else if (deviceType === "tablet") {
      setItemsToShow(3);
      setItemsToScroll(1);
      setDimension(200);
    } else {
      setItemsToShow(1);
      setItemsToScroll(1);
      setDimension(120);
    }
  }, [deviceType]);

  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={itemsToShow}
        itemsToScroll={itemsToScroll}
        autoplay={true}
        autoplayDirection={"forward"}
        autoplayDelay={2000}
        infinite={true}
        forwardBtnProps={{
          style: {
            alignSelf: "center",
            background: "#daffffff",
            border: "none",
            borderRadius: "50%",
            color: "black",
            cursor: "pointer",
            height: 20,
            lineHeight: 1,
            textAlign: "center",
            width: 20,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          style: {
            alignSelf: "center",
            background: "#daffffff",
            border: "none",
            borderRadius: "50%",
            color: "black",
            cursor: "pointer",
            height: 20,
            lineHeight: 1,
            textAlign: "center",
            width: 20,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: itemsToShow,
            itemsToScroll: itemsToScroll,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {[
          cgi,
          chai_roti,
          d4dance,
          ergo,
          indian_street_food,
          kulturfoerderung_stadt_erlangen,
          rasam,
          ruchi,
          sangam,
          sparkasse,
          toms_ok,
        ].map((src, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: dimension,
              width: dimension,
              margin: "0 7%",
              background: "#ffffff",
            }}
          >
            <Image alt={`sponsor-${index}`} src={src} style={{ maxHeight: "100%", maxWidth: "100%" }} />
          </div>
        ))}
      </ReactSimplyCarousel>
    </div>
  );
}

export default SponsorCarousel;
