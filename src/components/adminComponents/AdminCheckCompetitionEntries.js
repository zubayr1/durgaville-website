import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function AdminCheckCompetitionEntries() {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "info@durgaville.com") {
        navigate("/adminlogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "competitions2025"));
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
      {entries.map((entry, index) => {
        const fullName =
          entry.kidsName || entry.kidName || entry.name || entry.fullName || "N/A";

        return (
          <li key={index} style={{ marginBottom: "1em" }}>
            <strong>Full Name:</strong> {fullName},{" "}
            <strong>Competition:</strong> {entry.competition}
          </li>
        );
      })}
    </ul>
  </Segment>
);
}

export default AdminCheckCompetitionEntries;
