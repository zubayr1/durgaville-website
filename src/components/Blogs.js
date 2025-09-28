import React, { useState, useEffect } from "react";
import {
  Grid,
  Segment,
  Header,
  Icon,
  Label,
  Dropdown,
  Image, // Import Image component
} from "semantic-ui-react";
import Papa from "papaparse";
import publicationsCSV from "../assets/publications.csv";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

function Blogs() {
  const [publicationsData, setPublicationsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [pressReleaseImages, setPressReleaseImages] = useState({});

  const [selectedYear, setSelectedYear] = useState(() => {
    return sessionStorage.getItem("selectedYear") || "2024";
  });

  // Parse CSV data and organize by year
  useEffect(() => {
    const parseCSV = async () => {
      try {
        const response = await fetch(publicationsCSV);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: async (results) => {
            const organizedData = {};

            results.data.forEach((row) => {
              if (row.Year && row["News Outlet"] && row.Type) {
                const year = row.Year;
                const newsOutlet = row["News Outlet"];

                const publication = {
                  id: parseInt(row["Publication #"]),
                  newsOutlet: newsOutlet,
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

            // Sort publications within each year by ID in descending order
            for (const year in organizedData) {
              organizedData[year].sort((a, b) => b.id - a.id);
            }

            setPublicationsData(organizedData);
            await fetchPressReleaseImages();
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

    const fetchPressReleaseImages = async () => {
      try {
        const pressReleasesSnapshot = await getDocs(collection(db, "pressreleases"));
        const imagesMap = {};

        pressReleasesSnapshot.forEach((doc) => {
          const data = doc.data();
          imagesMap[data.name + data.year] = {
            imageUrl: data.imageUrl,
            year: data.year,
          };
        });

        setPressReleaseImages(imagesMap);
      } catch (error) {
        console.error("Error fetching press release images:", error);
      }
    };

    parseCSV();
  }, []);

  const generateYearOptions = () => {
    return Object.keys(publicationsData)
      .sort((a, b) => b - a)
      .map((year) => ({
        key: year,
        text: year,
        value: year,
      }));
  };

  const yearOptions = generateYearOptions();

  const handleYearClick = (year) => {
    setSelectedYear(year);
    sessionStorage.setItem("selectedYear", year);
  };

  const handleYearDropdownChange = (e, { value }) => {
    setSelectedYear(value);
    sessionStorage.setItem("selectedYear", value);
  };

  // Helper functions for styling
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

  const getPublicationImage = (newsOutlet, year) => {
    const imageData = pressReleaseImages[newsOutlet + year];
    return imageData ? imageData.imageUrl : null;
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
      {/* Year Headers Section */}
      <div style={{ backgroundColor: "#f8f9fa", padding: "2rem 1rem" }}>
        <Grid centered>
          {/* ## Desktop and Tablet Year Selector ## */}
          <Grid.Row only="computer tablet">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              {yearOptions.map(({ value: year }) => (
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
          </Grid.Row>

          {/* ## Mobile Year Selector ## */}
          <Grid.Row only="mobile">
            <Grid.Column width={14}>
              <Dropdown
                placeholder="Select Year"
                fluid
                selection
                options={yearOptions}
                value={selectedYear}
                onChange={handleYearDropdownChange}
                style={{
                  borderRadius: "25px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  border: "2px solid #bb0d3b",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      {/* Publications Grid Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <Grid centered>
          {publicationsData[selectedYear]?.map((publication) => (
            <React.Fragment key={publication.id}>
              {/* ## Desktop and Tablet Publication Card ## */}
              <Grid.Row only="computer tablet">
                <Grid.Column computer={12} tablet={14}>
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
                        <Grid.Column width={12}>
                          <Header
                            as="h3"
                            style={{
                              color: "#333",
                              marginBottom: "1rem",
                              fontSize: "1.5rem",
                            }}
                          >
                            {publication.newsOutlet.replace(/\d+$/, "")}
                          </Header>
                          <div
                            style={{
                              marginBottom: "1rem",
                              display: "flex",
                              gap: "1rem",
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
                            <a
                              href={publication.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                marginTop: "1rem",
                                padding: "0.5rem 1rem",
                                backgroundColor: "#bb0d3b",
                                color: "#fff",
                                textDecoration: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                transition: "background-color 0.3s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8a0a2a")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#bb0d3b")}
                            >
                              <Icon name="external alternate" style={{ marginRight: "0.5rem" }} />
                              Read Article
                            </a>
                          )}
                        </Grid.Column>
                        <Grid.Column width={4} verticalAlign="middle">
                          {getPublicationImage(publication.newsOutlet, selectedYear) && (
                            <Image
                              src={getPublicationImage(publication.newsOutlet, selectedYear)}
                              alt={`${publication.newsOutlet} thumbnail`}
                              style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "cover",
                                borderRadius: "12px",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)",
                                border: "3px solid #fff",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow =
                                  "0 12px 35px rgba(0,0,0,0.2), 0 6px 15px rgba(0,0,0,0.15)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow =
                                  "0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)";
                              }}
                            />
                          )}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              {/* ## Mobile Publication Card ## */}
              <Grid.Row only="mobile">
                <Grid.Column mobile={16}>
                  <Segment
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "15px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      border: "1px solid #dee2e6",
                      textAlign: "center", // Center content for mobile
                    }}
                  >
                    {getPublicationImage(publication.newsOutlet, selectedYear) && (
                      <Image
                        src={getPublicationImage(publication.newsOutlet, selectedYear)}
                        alt={`${publication.newsOutlet} thumbnail`}
                        centered
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          border: "3px solid #fff",
                          marginBottom: "1rem",
                        }}
                      />
                    )}
                    <Header as="h4" style={{ color: "#333" }}>
                      {publication.newsOutlet.replace(/\d+$/, "")}
                    </Header>
                    <Label.Group
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <Label color={getPrintDigitalColor(publication.printDigital)} style={{ borderRadius: "20px" }}>
                        <Icon name={publication.printDigital === "Print" ? "file text outline" : "desktop"} />
                        {publication.printDigital}
                      </Label>
                      <Label color={getTypeColor(publication.type)} style={{ borderRadius: "20px" }}>
                        <Icon name="newspaper outline" /> {publication.type}
                      </Label>
                    </Label.Group>

                    {publication.url && (
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
                        }}
                      >
                        <Icon name="external alternate" style={{ marginRight: "0.5rem" }} />
                        Read Article
                      </a>
                    )}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </React.Fragment>
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
