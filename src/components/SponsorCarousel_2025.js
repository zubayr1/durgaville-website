import React from "react";
import { Image, Grid } from "semantic-ui-react";

import Marquee from "react-fast-marquee";

import twentyfour_halves from "../assets/sponsors/24halves.png";
import cgi from "../assets/sponsors/cgi.png";
import chai_roti from "../assets/sponsors/chai_roti.png";
import royal_king from "../assets/sponsors/royal_king.png";
import indian_street_food from "../assets/sponsors/indian_street_food.png";
import kulturfoerderung_stadt_erlangen from "../assets/sponsors/kulturfoerderung_stadt_erlangen.jpg";
import rasam from "../assets/sponsors/rasam.png";
import ruchi from "../assets/sponsors/ruchi.png";
import sangam from "../assets/sponsors/sangam.png";
import stadtbubenreuth from "../assets/sponsors/stadtbubenreuth.png";
import sparkasse from "../assets/sponsors/sparkasse.jpg";
import stadt_erlangen from "../assets/sponsors/stadt_erlangen.png";
import spice_mart from "../assets/sponsors/spice_mart.jpg";
import namaste_herzo from "../assets/sponsors/namaste_herzo.png";

function SponsorSlider() {
  const sponsors = [
    twentyfour_halves,
    cgi,
    chai_roti,
    indian_street_food,
    royal_king,
    kulturfoerderung_stadt_erlangen,
    rasam,
    ruchi,
    sangam,
    stadtbubenreuth,
    sparkasse,
    stadt_erlangen,
    namaste_herzo,
    spice_mart,
  ];

  return (
    <div>
      <Grid>
        <Grid.Row only="computer">
          <Marquee gradient={true} gradientWidth={300}>
            {[...sponsors, ...sponsors].map((src, index) => (
              <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                <Image src={src} alt={`sponsor-${index}`} size="small" />
              </div>
            ))}
          </Marquee>
        </Grid.Row>

        <Grid.Row only="tablet">
          <Marquee gradient={true}>
            {[...sponsors, ...sponsors].map((src, index) => (
              <div style={{ marginLeft: "7%", marginRight: "7%" }}>
                <Image src={src} alt={`sponsor-${index}`} size="small" />
              </div>
            ))}
          </Marquee>
        </Grid.Row>

        <Grid.Row only="mobile">
          <Marquee gradient={false}>
            {[...sponsors, ...sponsors].map((src, index) => (
              <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                <Image src={src} alt={`sponsor-${index}`} size="small" />
              </div>
            ))}
          </Marquee>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default SponsorSlider;
