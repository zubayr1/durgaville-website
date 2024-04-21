import React, { useState, useEffect } from 'react';
import { Grid, Icon, Menu, } from 'semantic-ui-react'

import "./navbar.css"

import { useNavigate } from 'react-router-dom';

function Navbar({ visible, setVisible }) {
  const [activeItem, setActiveItem] = useState('home');

  const navigate = useNavigate();

  const currentURL = window.location.href;

  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL.includes('/home')) {
      setActiveItem('home');
    } else if (currentURL.includes('/upcoming-events')) {
      setActiveItem('upcoming-events');
    } else if (currentURL.includes('/meet-the-team')) {
      setActiveItem('meet-the-team');
    } else if (currentURL.includes('/adminlogin')) {
      setActiveItem('admin-portal');
    }
  }, []);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);

    if(name==="home")
    {
        if (!currentURL.includes("/home"))
        {
            navigate("/");
        }
    }
    if(name==="upcoming-events")
    {
        if (!currentURL.includes("/upcoming-events"))
        {
            navigate("/upcoming-events");
        }
    }
    if(name==="meet-the-team")
    {
        if (!currentURL.includes("/meet-the-team"))
        {
            navigate("/meet-the-team");
        }
    }
    if(name==="admin-portal")
    {
        if (!currentURL.includes("/admin-portal"))
        {
            navigate("/adminlogin");
        }
    }

};

const handleiconClick = (value) => {
    if(value === "facebook") {
        window.open('https://www.facebook.com/durgaville/', '_blank');
    }
    if(value === "instagram") {
        window.open('https://www.instagram.com/durgaville/', '_blank');
    }
    if(value === "youtube") {
        window.open('https://www.youtube.com/@durgaville8491', '_blank');
    }
}


  const handleSidebarIconClick = () => {setVisible(!visible);}

  return (
    <div className="navbar-container" style={{overflow:"hidden"}}>
        <Grid centered>
            <Grid.Row>
                <Grid.Column width={16} only='computer' verticalAlign='middle' textAlign='middle'>
                    <div className="custom-menu" style={{}}>

                        <Menu compact secondary attached='top' tabular>
                            <Menu.Item
                                name='home'
                                active={activeItem === 'home'}
                                onClick={handleItemClick}
                                className={activeItem === 'home' ? 'active' : ''}
                            />
                            <Menu.Item
                                name='upcoming-events'
                                active={activeItem === 'upcoming-events'}
                                onClick={handleItemClick}
                                className={activeItem === 'upcoming-events' ? 'active' : ''}
                            />
                            <Menu.Item
                                name='meet-the-team'
                                active={activeItem === 'meet-the-team'}
                                onClick={handleItemClick}
                                className={activeItem === 'meet-the-team' ? 'active' : ''}
                            />
                            <Menu.Item
                                name='admin-portal'
                                active={activeItem === 'admin-portal'}
                                onClick={handleItemClick}
                                className={activeItem === 'admin-portal' ? 'active' : ''}
                            />
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <div onClick={()=> handleiconClick("facebook")} style={{cursor:'pointer'}}>
                                        <Icon color='white' name="facebook f" size='large'/>
                                    </div>
                                </Menu.Item>

                                <Menu.Item>
                                    <div onClick={()=> handleiconClick("instagram")} style={{cursor:'pointer'}}>
                                        <Icon color='white' name="instagram" size='large'/>
                                    </div>
                                </Menu.Item>

                                <Menu.Item>
                                    <div onClick={()=> handleiconClick("youtube")} style={{cursor:'pointer'}}>
                                        <Icon color='white' name="youtube" size='large'/>
                                    </div>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>

                    </div>

                </Grid.Column>

                <Grid.Column width={16} only='tablet' verticalAlign='middle' textAlign='middle'>
                    <div className="custom-menu" style={{marginLeft:"10%", marginRight:"10%"}}>

                        <Menu compact secondary attached='top' tabular>
                            <Menu.Item
                                name='home'
                                active={activeItem === 'home'}
                                onClick={handleItemClick}
                                className={activeItem === 'home' ? 'active' : ''}
                            />
                            <Menu.Item
                                name='upcoming-events'
                                active={activeItem === 'upcoming-events'}
                                onClick={handleItemClick}
                                className={activeItem === 'upcoming-events' ? 'active' : ''}
                            />
                            <Menu.Item
                                name='meet-the-team'
                                active={activeItem === 'meet-the-team'}
                                onClick={handleItemClick}
                                className={activeItem === 'meet-the-team' ? 'active' : ''}
                            />
                            <Menu.Item
                                name='admin-portal'
                                active={activeItem === 'admin-portal'}
                                onClick={handleItemClick}
                                className={activeItem === 'admin-portal' ? 'active' : ''}
                            />
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <div onClick={()=> handleiconClick("facebook")} style={{cursor:'pointer'}}>
                                        <Icon color='white' name="facebook f" size='large'/>
                                    </div>
                                </Menu.Item>

                                <Menu.Item>
                                    <div onClick={()=> handleiconClick("instagram")} style={{cursor:'pointer'}}>
                                        <Icon color='white' name="instagram" size='large'/>
                                    </div>
                                </Menu.Item>

                                <Menu.Item>
                                    <div onClick={()=> handleiconClick("youtube")} style={{cursor:'pointer'}}>
                                        <Icon color='white' name="youtube" size='large'/>
                                    </div>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </div>

                </Grid.Column>

                <Grid.Column width={16} only='mobile' verticalAlign='middle' textAlign='middle'>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15%' }}>
                        <div onClick={()=> handleSidebarIconClick()} style={{ color: 'white', marginRight: '14px', display: 'flex', alignItems: 'center' }}>
                            <Icon name="bars" size='large' />
                            <span style={{ marginLeft: '2px' }}>
                                <p style={{fontFamily: 'Inter', fontSize:'1.0rem', color:'white', fontWeight: 'bold',}}>
                                    MENU
                                </p>
                            </span>
                        </div>
                    </div>
                    

                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
  )
}

export default Navbar