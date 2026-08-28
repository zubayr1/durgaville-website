import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Message, Dropdown, Segment, Header } from "semantic-ui-react";
import { db, storage } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage";
import { TailSpin } from "react-loader-spinner";

// import magazine from "../assets/magazine_entry.jpg";

const submissionTypes = [
  { key: "article", text: "Article Write-up", value: "Article Write-up" },
  { key: "travellogue", text: "Travellogue", value: "Travellogue" },
  { key: "poem", text: "Poem", value: "Poem" },
  { key: "story", text: "Story", value: "Story" },
  { key: "recipes", text: "Recipes", value: "Recipes" },
  { key: "tutorial", text: "Tutorial", value: "Tutorial" },
  { key: "promotion", text: "Promotion", value: "Promotion" },
  { key: "photography", text: "Photography", value: "Photography" },
  { key: "painting", text: "Painting", value: "Painting" },
  { key: "others", text: "Others", value: "Others" },
];

const Magazine = () => {
  const [entries, setEntries] = useState([
    { fullName: "", age: "", email: "", location: "", submissionType: "", title: "", file: null },
  ]);
  const [error, setError] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (error === 0) {
      const timer = setTimeout(() => {
        setError(-1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleFileChange = (index, file) => {
    const newEntries = [...entries];
    newEntries[index].file = file;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      { fullName: "", age: "", email: "", location: "", submissionType: "", title: "", file: null },
    ]);
  };

  const removeEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleSubmit = async () => {
    setError(-1);

    let valid = true;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      if (
        entry.fullName === "" ||
        entry.age === "" ||
        entry.email === "" ||
        entry.location === "" ||
        entry.submissionType === "" ||
        entry.title === "" ||
        entry.file === null
      ) {
        setError(1);
        valid = false;
        break;
      }

      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(entry.file.type)) {
        setError(2);
        valid = false;
        break;
      }
      if (entry.file.size > 10 * 1024 * 1024) {
        // 10MB
        setError(3);
        valid = false;
        break;
      }
    }

    if (valid) {
      setLoading(true);
      const uploadTimeout = setTimeout(() => {
        setError(4);
        setLoading(false);
      }, 80000); // 80 seconds timeout

      try {
        const uploadPromises = entries.map(async (entry) => {
          // Function to generate a random string
          const generateRandomString = (length) => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result = "";
            for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
          };

          // Generate a unique filename
          const randomString = generateRandomString(8); // Adjust the length as needed
          const fileExtension = entry.file.name.split(".").pop();
          const baseFileName = entry.file.name.replace(/\.[^/.]+$/, "");
          const uniqueFileName = `${baseFileName}_${randomString}.${fileExtension}`;

          // Create references with the unique filename
          const fileRef = ref(storage, `magazine/${uniqueFileName}`);
          const uploadTask = uploadBytesResumable(fileRef, entry.file);

          uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          });

          const snapshot = await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => reject(error),
              () => resolve(uploadTask.snapshot),
            );
          });

          // Create metadata text
          const metadataText = `Full Name: ${entry.fullName}\nAge: ${entry.age}\nEmail: ${entry.email}\nLocation:
            ${entry.location}\nSubmission Type: ${entry.submissionType}\nTitle: ${entry.title}\nFile Name: ${uniqueFileName}`;

          // Upload metadata text to storage
          await uploadString(
            ref(storage, `magazine_metadata/${baseFileName}_${randomString}.txt`),
            metadataText,
            "raw",
          );

          const fileUrl = await getDownloadURL(snapshot.ref);

          // Store entry data in Firestore
          const entryData = {
            fileUrl,
            fullName: entry.fullName,
            age: entry.age,
            email: entry.email,
            location: entry.location,
            submissionType: entry.submissionType,
            title: entry.title,
          };
          await addDoc(collection(db, "magazine_entries"), entryData);
        });

        await Promise.all(uploadPromises);
        clearTimeout(uploadTimeout);
        setLoading(false);
        setError(0);
        setEntries([{ fullName: "", age: "", email: "", location: "", submissionType: "", title: "", file: null }]);

        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach((input) => (input.value = null));
      } catch (error) {
        console.error("Error during submission:", error);
        setError(4);
        setLoading(false);
        clearTimeout(uploadTimeout);
      }
    }
  };

  let layout;

  if (error === -1) {
    layout = <div></div>;
  } else if (error === 1) {
    layout = (
      <div>
        <Message error header="Submission Error" content="One of the required entries is empty" />
      </div>
    );
  } else if (error === 2) {
    layout = (
      <div>
        <Message
          error
          header="Submission Error"
          content="Invalid file type. Only .docx, .pdf, .jpg, .jpeg, and .png files are allowed"
        />
      </div>
    );
  } else if (error === 3) {
    layout = (
      <div>
        <Message error header="Submission Error" content="File size exceeds 10MB limit" />
      </div>
    );
  } else if (error === 4) {
    layout = (
      <div>
        <Message error header="Submission Error" content="Error due to unforeseen issue" />
      </div>
    );
  } else if (error === 0) {
    layout = (
      <div>
        <Message success header="Success" content="Submission done successfully" />
      </div>
    );
  }

  return (
    <div id="magazine-section">
      <div
        style={{
          overflow: "hidden",
          // marginTop: "4.5rem",
          marginLeft: "2%",
          marginRight: "2%",
          paddingTop: "5rem",
        }}
      >
        <Grid centered>
          {/* <Grid.Row>
          <div style={{ display: "flex", justifyContent: "center", padding: "6%", marginTop: "-7%" }}>
            <Image alt="Magazine" src={magazine} style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        </Grid.Row> */}

          <Header as="h1" style={{ fontSize: "3rem", color: "#333", marginBottom: "1rem" }}>
            Add Your Entry for the magazine
          </Header>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={10} computer={8}>
              <Form onSubmit={handleSubmit}>
                {entries.map((entry, index) => (
                  <Segment key={index} padded="very">
                    <Form.Field>
                      <label htmlFor={`fullName-${index}`}>Full Name</label>
                      <input
                        placeholder="Full Name"
                        value={entry.fullName}
                        onChange={(e) => handleInputChange(index, "fullName", e.target.value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor={`age-${index}`}>Age</label>
                      <input
                        type="number"
                        placeholder="Age"
                        value={entry.age}
                        onChange={(e) => handleInputChange(index, "age", e.target.value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor={`email-${index}`}>Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={entry.email}
                        onChange={(e) => handleInputChange(index, "email", e.target.value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor={`location-${index}`}>Location</label>
                      <input
                        placeholder="Location"
                        value={entry.location}
                        onChange={(e) => handleInputChange(index, "location", e.target.value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor={`submissionType-${index}`}>Submission Type</label>
                      <Dropdown
                        placeholder="Select Submission Type"
                        fluid
                        selection
                        options={submissionTypes}
                        value={entry.submissionType}
                        onChange={(e, { value }) => handleInputChange(index, "submissionType", value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor={`title-${index}`}>Title</label>
                      <input
                        placeholder="Title"
                        value={entry.title}
                        onChange={(e) => handleInputChange(index, "title", e.target.value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor={`file-${index}`}>Upload</label>
                      <input
                        type="file"
                        accept=".docx,.pdf,image/jpeg,image/jpg,image/png"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                      />
                    </Form.Field>
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeEntry(index)}
                        style={{ backgroundColor: "#ff0000", color: "#fff", marginBottom: "1em" }}
                      >
                        Cancel
                      </Button>
                    )}
                  </Segment>
                ))}
                <div style={{ marginTop: "2%" }}>
                  <Button type="button" onClick={addEntry} style={{ backgroundColor: "#690460", color: "#fff" }}>
                    Add Another Entry
                  </Button>
                  <Button type="submit" style={{ backgroundColor: "#bb0d3b", color: "#fff" }}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Grid.Column>
          </Grid.Row>
          {loading && (
            <Grid.Row>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "2em" }}>
                <TailSpin height="80" width="80" color="#bb0d3b" ariaLabel="loading" />
              </div>
            </Grid.Row>
          )}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <Grid.Row>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "2em" }}>
                <p>Uploading... {Math.round(uploadProgress)}%</p>
              </div>
            </Grid.Row>
          )}
          <Grid.Row>{layout}</Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Magazine;
