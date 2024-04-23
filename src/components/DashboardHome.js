import React, { useState, useEffect, useRef } from 'react'
import Background from './Background'
import Greetings from './Greetings'
import Footer from './Footer'
import Navbar from './Navbar'
import Home from './Home'
import Display from './Display'
import { SidebarPusher, SidebarPushable, Icon, GridColumn, Grid, Sidebar } from 'semantic-ui-react'

import { useNavigate } from 'react-router-dom'

function DashboardHome() {
  const [navbarVisible, setNavbarVisible] = useState(false)

  const [scrollPosition, setScrollPosition] = useState(0)

  const homeRef = useRef()

  useEffect(() => {
    // Scroll to the Home component when scrollPosition changes
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [scrollPosition])

  const handleScroll = () => {
    // Update the scroll state when handleScrollDown is clicked in Greetings
    setScrollPosition(scrollPosition + 1)
  }

  const navigate = useNavigate()
  const handlebuttonClick = (value) => {
    const currentURL = window.location.href

    if (value === 'home') {
      if (!currentURL.includes('/home')) {
        navigate('/')
      }
    }
    if (value === 'upcoming-events') {
      if (!currentURL.includes('/upcoming-events')) {
        navigate('/upcoming-events')
      }
    }
    if (value === 'meet-the-team') {
      if (!currentURL.includes('/meet-the-team')) {
        navigate('/meet-the-team')
      }
    }
    if (value === 'admin-portal') {
      if (!currentURL.includes('/admin-portal')) {
        navigate('/adminlogin')
      }
    }
  }

  const handleiconClick = (value) => {
    if (value === 'facebook') {
      window.location.href = 'https://www.facebook.com/durgaville/'
    }
    if (value === 'instagram') {
      window.location.href = 'https://www.instagram.com/durgaville/'
    }
    if (value === 'youtube') {
      window.location.href = 'https://www.youtube.com/@durgaville8491'
    }
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16} only="computer tablet" verticalAlign="middle" textAlign="middle">
            <Background />
            <Greetings onScrollDown={handleScroll} />
            <Navbar visible={navbarVisible} setVisible={setNavbarVisible} />
            <Home />
            <div ref={homeRef}>
              <Display />
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
                <Home />
                <div ref={homeRef}>
                  <Display />
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

export default DashboardHome
