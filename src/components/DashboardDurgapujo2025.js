import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Greetings from "./Greetings";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { SidebarPusher, SidebarPushable, GridColumn, Grid, Sidebar, Image } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import MobileView from "./MobileView";
import Magazine from "./Magazine";
// import Durgapujo2025 from "./Durgapujo2025";
import pujo_2025_tagline from "../assets/pujo_2025_tagline.png";

function DashboardDurgapujo2025() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  const handleScroll = () => {
    setScrollPosition(scrollPosition + 1);
  };

  useEffect(() => {
    // Handle anchor link scrolling
    if (location.hash === "#magazine-section") {
      const magazineElement = document.getElementById("magazine-section");
      if (magazineElement) {
        // Calculate position with 20% offset
        const elementTop = magazineElement.offsetTop;
        const offset = window.innerHeight * 0.1; // 20% of viewport height
        const scrollPosition = elementTop - offset;

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [location.hash]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Helmet>
        <title>Pujo, 2025 - Durgaville</title>
        <meta name="description" content="Welcome to Durgapujo, 2025, organized by Durgaville" />
      </Helmet>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16} only="computer tablet" verticalAlign="middle" textAlign="middle">
            <Greetings onScrollDown={handleScroll} />
            <Navbar visible={navbarVisible} setVisible={setNavbarVisible} />
            <div style={{ display: "flex", justifyContent: "center", paddingLeft: "10%", paddingRight: "10%" }}>
              <Image src={pujo_2025_tagline} alt="Pujo 2025" />
            </div>
            <Magazine />
            <Footer />
          </Grid.Column>

          <GridColumn width={16} only="mobile" verticalAlign="middle" textAlign="middle">
            <SidebarPushable>
              <Sidebar
                as={Grid.Row}
                animation="overlay"
                icon="labeled"
                onHide={() => setNavbarVisible(false)}
                vertical
                visible={navbarVisible}
                width="wide"
                direction="right"
                style={{ background: "white", paddingTop: "10%", paddingLeft: "10%" }}
              >
                <MobileView />
              </Sidebar>

              <SidebarPusher dimmed={navbarVisible}>
                <Greetings onScrollDown={handleScroll} />
                <Navbar visible={navbarVisible} setVisible={setNavbarVisible} />
                <div style={{ display: "flex", justifyContent: "center", paddingLeft: "5%", paddingRight: "5%" }}>
                  <Image src={pujo_2025_tagline} alt="Pujo 2025" />
                </div>
                <Magazine />
                <Footer />
              </SidebarPusher>
            </SidebarPushable>
          </GridColumn>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default DashboardDurgapujo2025;
