import React, { useState } from 'react'
import Background from './Background'
import Greetings from './Greetings'
import Footer from './Footer'
import Navbar from './Navbar'
import Members from './Members'
import { SidebarPusher, SidebarPushable, Icon, GridColumn, Grid, Sidebar } from 'semantic-ui-react'
import { Helmet } from 'react-helmet';

import useHandleNavigation from './handleNavigation';

function DashboardMembers() {
  const [navbarVisible, setNavbarVisible] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const { handlebuttonClick, handleiconClick } = useHandleNavigation();


  const handleScroll = () => {
    // Update the scroll state when handleScrollDown is clicked in Greetings
    setScrollPosition(scrollPosition + 1)
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <Helmet>
          <title>Members - Durgaville</title>
          <meta name="description" content="Learn more about the team behind Durgaville and our mission." />
      </Helmet>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16} only="computer tablet" verticalAlign="middle" textAlign="middle">
            <Background />
            <Greetings onScrollDown={handleScroll} />
            <Navbar visible={navbarVisible} setVisible={setNavbarVisible} />

            <div>
              <Members />
            </div>
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
                style={{ background: 'white', paddingTop: '10%', paddingLeft: '10%' }}
              >
                <Grid>
                  <Grid.Row style={{ borderBottom: '.7px solid #dee0e3', paddingBottom: '6%', marginRight: '14%' }}>
                    <p onClick={() => handlebuttonClick('home')} style={{ fontWeight: 'bolder', fontFamily: 'Inter' }}>
                      HOME
                    </p>
                  </Grid.Row>

                  <Grid.Row style={{ borderBottom: '.7px solid #dee0e3', paddingBottom: '6%', marginRight: '14%' }}>
                    <p onClick={() => handlebuttonClick('upcoming-events')} style={{ fontWeight: 'bolder', fontFamily: 'Inter' }}>
                      UPCOMING EVENTS
                    </p>
                  </Grid.Row>

                  <Grid.Row style={{ borderBottom: '.7px solid #dee0e3', paddingBottom: '6%', marginRight: '14%' }}>
                    <p onClick={() => handlebuttonClick('meet-the-team')} style={{ fontWeight: 'bolder', fontFamily: 'Inter' }}>
                      MEET THE TEAM
                    </p>
                  </Grid.Row>

                  <Grid.Row style={{ borderBottom: '.7px solid #dee0e3', paddingBottom: '6%', marginRight: '14%' }}>
                    <p onClick={() => handlebuttonClick('magazine')} style={{ fontWeight: 'bolder', fontFamily: 'Inter' }}>
                      MAGAZINE
                    </p>
                  </Grid.Row>

                  <Grid.Row style={{ borderBottom: '.7px solid #dee0e3', paddingBottom: '6%', marginRight: '14%' }}>
                    <p onClick={() => handlebuttonClick('admin-portal')} style={{ fontWeight: 'bolder', fontFamily: 'Inter' }}>
                      ADMIN PORTAL
                    </p>
                  </Grid.Row>

                  <Grid.Row style={{ marginTop: '6%' }}>
                    <Grid.Column width={4}>
                      <Icon onClick={() => handleiconClick('facebook')} circular color="black" name="facebook f" size="large" />
                    </Grid.Column>

                    <Grid.Column width={4}>
                      <Icon onClick={() => handleiconClick('instagram')} circular color="black" name="instagram" size="large" />
                    </Grid.Column>

                    <Grid.Column width={4}>
                      <Icon onClick={() => handleiconClick('youtube')} circular color="black" name="youtube" size="large" />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Sidebar>

              <SidebarPusher dimmed={navbarVisible}>
                <Background />
                <Greetings onScrollDown={handleScroll} />
                <Navbar visible={navbarVisible} setVisible={setNavbarVisible} />
                {/* <div ref={homeRef}> */}
                <div>
                  <Members />
                </div>
                <Footer />
              </SidebarPusher>
            </SidebarPushable>
          </GridColumn>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default DashboardMembers
