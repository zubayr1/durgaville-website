import React, { useState, useEffect } from "react";
import { Grid, Segment, Header, Icon, Label } from "semantic-ui-react";
import Papa from "papaparse";
import publicationsCSV from "../assets/publications.csv";

function Blogs() {
  const [publicationsData, setPublicationsData] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState("2024");

  // Parse CSV data and organize by year
  useEffect(() => {
    const parseCSV = async () => {
      try {
        const response = await fetch(publicationsCSV);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const organizedData = {};

            results.data.forEach((row) => {
              if (row.Year && row["News Outlet"] && row.Type) {
                const year = row.Year;
                const publication = {
                  id: parseInt(row["Publication #"]),
                  newsOutlet: row["News Outlet"],
                  type: row.Type,
                  url: row.URL === "NA" ? null : row.URL,
                  printDigital: row["Print/Digital"],
                };

                if (!organizedData[year]) {
                  organizedData[year] = [];
                }
                organizedData[year].push(publication);
              }
            });

            setPublicationsData(organizedData);
            setLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
        setLoading(false);
      }
    };

    parseCSV();
  }, []);

  const generateYearOptions = () => {
    return Object.keys(publicationsData).sort((a, b) => b - a);
  };

  const yearOptions = generateYearOptions();

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const getTypeColor = (type) => {
    const typeColors = {
      "News Article": "blue",
      "Live TV Interview": "green",
      "News Coverage on TV": "teal",
      "Video Log": "purple",
      "Pujo Coverage on TV": "orange",
      "Live Coverage on TV": "red",
    };
    return typeColors[type] || "grey";
  };

  const getPrintDigitalColor = (pd) => {
    const pdColors = {
      Print: "brown",
      Digital: "blue",
      "Print + Digital": "purple",
    };
    return pdColors[pd] || "grey";
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#dee0e3",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Segment style={{ padding: "3rem", textAlign: "center" }}>
          <Icon name="spinner" loading size="huge" />
          <Header as="h3" style={{ marginTop: "1rem" }}>
            Loading publications...
          </Header>
        </Segment>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#dee0e3", minHeight: "100vh" }}>
      {/* Year Headers */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "2rem 0",
          backgroundColor: "#f8f9fa",
        }}
      >
        {yearOptions.map((year) => (
          <div
            key={year}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: selectedYear === year ? "#bb0d3b" : "#fff",
              color: selectedYear === year ? "#fff" : "#333",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              border: selectedYear === year ? "2px solid #bb0d3b" : "2px solid #dee2e6",
            }}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </div>
        ))}
      </div>

      {/* Publications Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem 2rem 2rem",
        }}
      >
        <Grid centered stackable>
          {publicationsData[selectedYear]?.map((publication) => (
            <Grid.Row key={publication.id}>
              <Grid.Column mobile={16} tablet={14} computer={12}>
                <Segment
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "15px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <Header
                          as="h3"
                          style={{
                            color: "#333",
                            marginBottom: "1rem",
                            fontSize: "1.5rem",
                          }}
                        >
                          {publication.newsOutlet}
                        </Header>

                        <div
                          style={{
                            marginBottom: "1rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Label
                            color={getPrintDigitalColor(publication.printDigital)}
                            size="large"
                            style={{ borderRadius: "20px" }}
                          >
                            <Icon name={publication.printDigital === "Print" ? "file text outline" : "desktop"} />
                            {publication.printDigital}
                          </Label>

                          <Label color={getTypeColor(publication.type)} size="large" style={{ borderRadius: "20px" }}>
                            <Icon name="newspaper outline" />
                            {publication.type}
                          </Label>
                        </div>

                        {publication.url && (
                          <div style={{ marginTop: "1rem" }}>
                            <a
                              href={publication.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "0.5rem 1rem",
                                backgroundColor: "#bb0d3b",
                                color: "#fff",
                                textDecoration: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                transition: "background-color 0.3s ease",
                              }}
                              onMouseEnter={(e) => (e.target.style.backgroundColor = "#8a0a2a")}
                              onMouseLeave={(e) => (e.target.style.backgroundColor = "#bb0d3b")}
                            >
                              <Icon name="external alternate" style={{ marginRight: "0.5rem" }} />
                              Read Article
                            </a>
                          </div>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>

        {/* No publications message */}
        {(!publicationsData[selectedYear] || publicationsData[selectedYear].length === 0) && (
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={16} textAlign="center">
                <Segment
                  style={{
                    backgroundColor: "#f8f9fa",
                    border: "2px solid #dee2e6",
                    borderRadius: "15px",
                    padding: "3rem 2rem",
                    margin: "2rem 0",
                  }}
                >
                  <Icon name="newspaper outline" size="massive" color="grey" style={{ marginBottom: "1rem" }} />
                  <Header
                    as="h2"
                    style={{
                      color: "#666",
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      marginTop: "1rem",
                    }}
                  >
                    No publications for {selectedYear}
                  </Header>
                  <p
                    style={{
                      color: "#888",
                      fontSize: "1.1rem",
                      fontFamily: "Inter",
                      marginTop: "1rem",
                    }}
                  >
                    Check other years for publications.
                  </p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    </div>
  );
}

export default Blogs;
