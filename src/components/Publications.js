import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button, Segment, Header, Icon } from "semantic-ui-react";
import PrevMagazines from "./PrevMagazines";
import Blogs from "./Blogs";

function Publications() {
  const location = useLocation();
  const navigate = useNavigate();

  const isPreviousMagazines = location.pathname === "/publications/annual-magazines";
  const isBlogs = location.pathname === "/publications/press-releases";
  const isMainPublications = location.pathname === "/publications";

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ padding: "2rem 0" }}>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header
              as="h1"
              style={{
                fontFamily: "Inter",
                fontSize: "3.5rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "2rem",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Publications
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Segment style={{ backgroundColor: "#fff3f3", border: "2px solid #ff0000", borderRadius: "10px" }}>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.2rem",
                  color: "#333",
                  marginBottom: "2rem",
                  lineHeight: "1.6",
                }}
              >
                Explore our collection of publications, including previous years' Sharodiya magazines and blog posts.
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  size="large"
                  style={{
                    backgroundColor: isPreviousMagazines ? "#ff0000" : "#bb0d3b",
                    color: "#fff",
                    marginBottom: "0.5em",
                  }}
                  onClick={() => handleNavigation("/publications/annual-magazines")}
                >
                  <Icon name="book" style={{ marginRight: "0.5rem" }} />
                  Annual Magazines
                </Button>
                <Button
                  size="large"
                  style={{
                    backgroundColor: isBlogs ? "#ff0000" : "#bb0d3b",
                    color: "#fff",
                    marginBottom: "0.5em",
                  }}
                  onClick={() => handleNavigation("/publications/press-releases")}
                >
                  <Icon name="pencil" style={{ marginRight: "0.5rem" }} />
                  Press Releases
                </Button>
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            {isPreviousMagazines && <PrevMagazines />}
            {isBlogs && <Blogs />}
            {isMainPublications && (
              <Segment textAlign="center" style={{ marginTop: "2rem" }}>
                <Icon name="info circle" size="huge" color="grey" />
                <Header as="h3" style={{ marginTop: "1rem", color: "#666" }}>
                  Select a section above to explore our publications
                </Header>
              </Segment>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Publications;
