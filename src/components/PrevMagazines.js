import React, { useState, useEffect } from "react";
import { Grid, Card, Header, Segment, Icon, Loader, Message } from "semantic-ui-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.js";

function PrevMagazines() {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const magazinesQuery = query(collection(db, "magazines"), orderBy("year", "asc"));
        const querySnapshot = await getDocs(magazinesQuery);
        const magazinesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMagazines(magazinesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching magazines:", err);
        setError("Failed to load magazines");
        setLoading(false);
      }
    };

    fetchMagazines();
  }, []);

  const handleMagazineClick = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem 0", textAlign: "center" }}>
        <Loader active size="large">
          Loading magazines...
        </Loader>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem 0" }}>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      </div>
    );
  }

  if (magazines.length === 0) {
    return (
      <div style={{ padding: "2rem 0" }}>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Header as="h2" style={{ marginBottom: "2rem" }}>
                Previous Years' Sharodiya Magazines
              </Header>
              <Message info>
                <Message.Header>No magazines available</Message.Header>
                <p>Magazines will be uploaded here once they are published.</p>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem 0" }}>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header
              as="h2"
              style={{
                fontFamily: "Inter",
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
                marginBottom: "1rem",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Previous Years' Sharodiya Magazines
            </Header>
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "1.1rem",
                color: "#666",
                marginBottom: "2rem",
                lineHeight: "1.6",
                maxWidth: "800px",
                margin: "0 auto 2rem auto",
              }}
            >
              Explore our collection of Sharodiya magazines from previous years. Each edition captures the spirit of our
              community, featuring articles, poems, stories, and memories from our Durga Puja celebrations in Erlangen.
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Grid centered stackable columns={3}>
              {magazines.map((magazine) => (
                <Grid.Column key={magazine.id} mobile={16} tablet={8} computer={5} textAlign="center">
                  <Card
                    fluid
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      marginBottom: "2rem",
                      maxWidth: "350px",
                      margin: "0 auto 2rem auto",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                    }}
                    onClick={() => handleMagazineClick(magazine.pdfUrl)}
                  >
                    <div
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "0.5rem",
                        textAlign: "center",
                        borderBottom: "1px solid #dee2e6",
                      }}
                    >
                      {magazine.imageUrl ? (
                        <img
                          src={magazine.imageUrl}
                          alt={magazine.name}
                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                            marginBottom: "0.5rem",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <Icon name="file pdf outline" size="huge" color="red" style={{ marginBottom: "0.5rem" }} />
                      )}
                      <Header
                        as="h3"
                        style={{
                          color: "#333",
                          fontFamily: "Inter",
                          margin: "0",
                        }}
                      >
                        {magazine.name}
                      </Header>
                    </div>
                    <Card.Content style={{ height: "120px", display: "flex", flexDirection: "column" }}>
                      <Card.Description
                        style={{
                          fontFamily: "Inter",
                          lineHeight: "1.6",
                          color: "#666",
                          flex: 1,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {magazine.description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div style={{ textAlign: "center" }}>
                        <Icon name="download" color="blue" />
                        <span style={{ color: "#666", marginLeft: "0.5rem" }}>Click to view PDF</span>
                      </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Segment
              style={{
                backgroundColor: "#fff3f3",
                border: "1px solid #ffcdd2",
                borderRadius: "10px",
                marginTop: "2rem",
              }}
            >
              <Icon name="info circle" color="red" />
              <span style={{ marginLeft: "0.5rem", color: "#666" }}>
                Click on any magazine to open it in a new tab. PDFs will open in your browser's PDF viewer.
              </span>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default PrevMagazines;
