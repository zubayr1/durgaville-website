import React, { useState, useEffect } from "react";
import { Grid, Icon, Menu, Image } from "semantic-ui-react";

import "./navbar.css";
import durgavilleLogo from "../assets/durgaville_logo.png";

import { useNavigate } from "react-router-dom";

function Navbar({ visible, setVisible }) {
  const [activeItem, setActiveItem] = useState("home");

  const navigate = useNavigate();

  const currentURL = window.location.href;

  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL.includes("/home")) {
      setActiveItem("home");
    } else if (currentURL.includes("/pujo-2025")) {
      setActiveItem("Durgapujo, 2025");
    } else if (currentURL.includes("/pujo-2024")) {
      setActiveItem("Durgapujo, 2024");
    }
    // else if (currentURL.includes("/boishakhi-2025")) {
    //   setActiveItem("Boishakhi, 2025");
    // }
    else if (currentURL.includes("/upcoming-events")) {
      setActiveItem("upcoming-events");
    } else if (currentURL.includes("/past-events")) {
      setActiveItem("past-events");
    }
    // else if (currentURL.includes("/meet-the-team")) {
    //   setActiveItem("meet-the-team");
    // }
    // else if (currentURL.includes("/magazine")) {
    //   setActiveItem("magazine 2025");
    // }
    else if (currentURL.includes("/adminlogin")) {
      setActiveItem("admin-portal");
    }
  }, []);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);

    if (name === "home") {
      if (!currentURL.includes("/home")) {
        navigate("/");
      }
    }
    if (name === "Durgapujo, 2025") {
      if (!currentURL.includes("/pujo-2025")) {
        navigate("/pujo-2025");
      }
    }
    if (name === "Durgapujo, 2024") {
      if (!currentURL.includes("/pujo-2024")) {
        navigate("/pujo-2024");
      }
    }
    // if (name === "Boishakhi, 2025") {
    //   if (!currentURL.includes("/boishakhi-2025")) {
    //     navigate("/boishakhi-2025");
    //   }
    // }
    if (name === "upcoming-events") {
      if (!currentURL.includes("/upcoming-events")) {
        navigate("/upcoming-events");
      }
    }
    if (name === "past-events") {
      if (!currentURL.includes("/past-events")) {
        navigate("/past-events");
      }
    }
    // if (name === "meet-the-team") {
    //   if (!currentURL.includes("/meet-the-team")) {
    //     navigate("/meet-the-team");
    //   }
    // }
    // if (name === "magazine 2025") {
    //   if (!currentURL.includes("/magazine")) {
    //     navigate("/magazine");
    //   }
    // }
    if (name === "admin-portal") {
      if (!currentURL.includes("/admin-portal")) {
        navigate("/adminlogin");
      }
    }
  };

  const handleiconClick = (value) => {
    if (value === "facebook") {
      window.open("https://www.facebook.com/durgaville/", "_blank");
    }
    if (value === "instagram") {
      window.open("https://www.instagram.com/durgaville/", "_blank");
    }
    if (value === "youtube") {
      window.open("https://www.youtube.com/@durgaville8491", "_blank");
    }
  };

  const handleSidebarIconClick = () => {
    setVisible(!visible);
  };

  return (
    <div className="navbar-container" style={{ overflow: "hidden" }}>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={16} only="computer" verticalAlign="middle" textAlign="middle">
            <div className="custom-menu" style={{ marginLeft: "3%", marginRight: "3%" }}>
              <Menu compact secondary attached="top" tabular>
                <Menu.Item>
                  <Image src={durgavilleLogo} size="mini" style={{ height: "40px", width: "auto" }} />
                </Menu.Item>
                <Menu.Item
                  name="home"
                  active={activeItem === "home"}
                  onClick={handleItemClick}
                  className={activeItem === "home" ? "active" : ""}
                />
                {/* <Menu.Item
                  name="Boishakhi, 2025"
                  active={activeItem === "Boishakhi, 2025"}
                  onClick={handleItemClick}
                  className={activeItem === "Boishakhi, 2025" ? "active" : ""}
                /> */}
                <Menu.Item
                  name="Durgapujo, 2025"
                  active={activeItem === "Durgapujo, 2025"}
                  onClick={handleItemClick}
                  className={activeItem === "Durgapujo, 2025" ? "active" : ""}
                />
                <Menu.Item
                  name="Durgapujo, 2024"
                  active={activeItem === "Durgapujo, 2024"}
                  onClick={handleItemClick}
                  className={activeItem === "Durgapujo, 2024" ? "active" : ""}
                />
                <Menu.Item
                  name="upcoming-events"
                  active={activeItem === "upcoming-events"}
                  onClick={handleItemClick}
                  className={activeItem === "upcoming-events" ? "active" : ""}
                />
                <Menu.Item
                  name="past-events"
                  active={activeItem === "past-events"}
                  onClick={handleItemClick}
                  className={activeItem === "past-events" ? "active" : ""}
                />
                {/* <Menu.Item
                  name="meet-the-team"
                  active={activeItem === "meet-the-team"}
                  onClick={handleItemClick}
                  className={activeItem === "meet-the-team" ? "active" : ""}
                />*/}
                {/* <Menu.Item
                  name="magazine 2025"
                  active={activeItem === "magazine 2025"}
                  onClick={handleItemClick}
                  className={activeItem === "magazine 2025" ? "active" : ""}
                /> */}

                {/* <Menu.Item
                  name="admin-portal"
                  active={activeItem === "admin-portal"}
                  onClick={handleItemClick}
                  className={activeItem === "admin-portal" ? "active" : ""}
                /> */}
                <Menu.Menu position="right">
                  <Menu.Item>
                    <div onClick={() => handleiconClick("facebook")} style={{ cursor: "pointer" }}>
                      <Icon color="white" name="facebook f" size="large" />
                    </div>
                  </Menu.Item>

                  <Menu.Item>
                    <div onClick={() => handleiconClick("instagram")} style={{ cursor: "pointer" }}>
                      <Icon color="white" name="instagram" size="large" />
                    </div>
                  </Menu.Item>

                  <Menu.Item>
                    <div onClick={() => handleiconClick("youtube")} style={{ cursor: "pointer" }}>
                      <Icon color="white" name="youtube" size="large" />
                    </div>
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            </div>
          </Grid.Column>

          <Grid.Column width={16} only="tablet" verticalAlign="middle" textAlign="middle">
            <div className="custom-menu" style={{ marginLeft: "3%", marginRight: "3%" }}>
              <Menu compact secondary attached="top" tabular>
                <Menu.Item>
                  <Image src={durgavilleLogo} size="mini" style={{ height: "40px", width: "auto" }} />
                </Menu.Item>
                <Menu.Item
                  name="home"
                  active={activeItem === "home"}
                  onClick={handleItemClick}
                  className={activeItem === "home" ? "active" : ""}
                />
                {/* <Menu.Item
                  name="Boishakhi, 2025"
                  active={activeItem === "Boishakhi, 2025"}
                  onClick={handleItemClick}
                  className={activeItem === "Boishakhi, 2025" ? "active" : ""}
                /> */}
                <Menu.Item
                  name="Durgapujo, 2025"
                  active={activeItem === "Durgapujo, 2025"}
                  onClick={handleItemClick}
                  className={activeItem === "Durgapujo, 2025" ? "active" : ""}
                />
                <Menu.Item
                  name="Durgapujo, 2024"
                  active={activeItem === "Durgapujo, 2024"}
                  onClick={handleItemClick}
                  className={activeItem === "Durgapujo, 2024" ? "active" : ""}
                />
                <Menu.Item
                  name="upcoming-events"
                  active={activeItem === "upcoming-events"}
                  onClick={handleItemClick}
                  className={activeItem === "upcoming-events" ? "active" : ""}
                />
                <Menu.Item
                  name="past-events"
                  active={activeItem === "past-events"}
                  onClick={handleItemClick}
                  className={activeItem === "past-events" ? "active" : ""}
                />
                {/* <Menu.Item
                  name="meet-the-team"
                  active={activeItem === "meet-the-team"}
                  onClick={handleItemClick}
                  className={activeItem === "meet-the-team" ? "active" : ""}
                />*/}
                {/* <Menu.Item
                  name="magazine 2025"
                  active={activeItem === "magazine 2025"}
                  onClick={handleItemClick}
                  className={activeItem === "magazine 2025" ? "active" : ""}
                /> */}

                {/* <Menu.Item
                  name="admin-portal"
                  active={activeItem === "admin-portal"}
                  onClick={handleItemClick}
                  className={activeItem === "admin-portal" ? "active" : ""}
                /> */}
                <Menu.Menu position="right">
                  <Menu.Item>
                    <div onClick={() => handleiconClick("facebook")} style={{ cursor: "pointer" }}>
                      <Icon color="white" name="facebook f" size="large" />
                    </div>
                  </Menu.Item>

                  <Menu.Item>
                    <div onClick={() => handleiconClick("instagram")} style={{ cursor: "pointer" }}>
                      <Icon color="white" name="instagram" size="large" />
                    </div>
                  </Menu.Item>

                  <Menu.Item>
                    <div onClick={() => handleiconClick("youtube")} style={{ cursor: "pointer" }}>
                      <Icon color="white" name="youtube" size="large" />
                    </div>
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            </div>
          </Grid.Column>

          <Grid.Column width={16} only="mobile" verticalAlign="middle" textAlign="middle">
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2%" }}>
              <div
                onClick={() => handleSidebarIconClick()}
                style={{ color: "white", marginRight: "14px", display: "flex", alignItems: "center" }}
              >
                <Icon name="bars" size="large" />
                <span style={{ marginLeft: "2px" }}>
                  <p style={{ fontFamily: "Inter", fontSize: "1.0rem", color: "white", fontWeight: "bold" }}>MENU</p>
                </span>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Navbar;
