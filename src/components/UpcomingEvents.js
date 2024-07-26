import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Modal, Button } from "semantic-ui-react";

import "./upcomingEvents.css";
import "./home.css";

function Events() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "events"), orderBy("date", "desc")));
        const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(newData);
      } catch (error) {}
    };

    fetchData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    const month = formattedDate.split(" ")[0];
    const dayWithSuffix = addDaySuffix(date.getDate());

    return `${dayWithSuffix} ${month}, ${date.getFullYear()}`;
  }

  function addDaySuffix(day) {
    if (day === 1 || day === 21 || day === 31) {
      return day + "st";
    } else if (day === 2 || day === 22) {
      return day + "nd";
    } else if (day === 3 || day === 23) {
      return day + "rd";
    } else {
      return day + "th";
    }
  }

  // Function to wrap URLs in anchor tags
  const wrapURLs = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
  };

  // Function to handle clicking on links
  // const handleLinkClick = (url) => {
  //   window.open(url, '_blank'); // Open link in a new tab
  // };

  return (
    <div style={{ backgroundColor: "#dee0e3" }}>
      <div className="grid-container-events events-container">
        {items.map((item) => (
          <div className="grid-item-events" key={item.id} onClick={() => handleItemClick(item)}>
            <div className="item-content-events">
              <h4 className="item-title-events">{item.title}</h4>
              <p className="item-date-events">{formatDate(item.date)}</p>
              <div className="content-container">
                <img src={item.imageUrl} alt={item.title} className="item-image-events" />
                <p
                  className="item-description-events"
                  dangerouslySetInnerHTML={{ __html: wrapURLs(item.description) }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Modal.Header style={{ textAlign: "center" }}>{selectedItem?.title}</Modal.Header>
        <Modal.Content>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "400px" }}>
            <img src={selectedItem?.imageUrl} alt={selectedItem?.title} style={{ height: "400px" }} />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleModalClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Events;
