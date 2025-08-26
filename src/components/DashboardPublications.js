import React, { useState } from "react";
import Greetings from "./Greetings";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Publications from "./Publications";
import { SidebarPusher, SidebarPushable, GridColumn, Grid, Sidebar } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import MobileView from "./MobileView";

const DashboardPublications = () => {
  const [navbarVisible, setNavbarVisible] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    // Update the scroll state when handleScrollDown is clicked in Greetings
    setScrollPosition(scrollPosition + 1);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Helmet>
        <title>Publications - Durgaville</title>
        <meta name="description" content="Welcome to Durgaville, your go-to place for everything about publications" />
      </Helmet>

      <Grid>
        <Grid.Row>
          <Grid.Column width={16} only="computer tablet" verticalAlign="middle" textAlign="middle">
            <Greetings onScrollDown={handleScroll} />
            <Navbar visible={navbarVisible} setVisible={setNavbarVisible} />
            <Publications />
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
                <Publications />
                <Footer />
              </SidebarPusher>
            </SidebarPushable>
          </GridColumn>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default DashboardPublications;
