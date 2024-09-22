import React from "react";
import { Image, Grid } from "semantic-ui-react";

import Marquee from "react-fast-marquee";

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

function SponsorSlider() {
  const sponsors = [
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
