import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function AdminCheckMagazineEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "magazine_entries"));
        const entriesList = querySnapshot.docs.map((doc) => doc.data());
        setEntries(entriesList);
      } catch (error) {
        console.error("Error fetching magazine entries: ", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <Segment>
      <h2>Magazine Entries</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {entries.map((entry, index) => (
          <li key={index} style={{ marginBottom: "1em" }}>
            <strong>Full Name:</strong> {entry.fullName}, <strong>Title:</strong> {entry.title},{" "}
            <strong>Submission Type:</strong> {entry.submissionType}, <strong>URL:</strong>{" "}
            <a href={entry.fileUrl} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </li>
        ))}
      </ul>
    </Segment>
  );
}

export default AdminCheckMagazineEntries;
