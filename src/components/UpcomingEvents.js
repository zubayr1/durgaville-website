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
        const querySnapshot = await getDocs(query(collection(db, "upcomingEvents"), orderBy("date", "desc")));
        const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(newData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${day}${suffix} ${month}, ${date.getFullYear()}`;
  }
  
  const wrapURLs = (text) => {
    if (!text) return '';
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  };

  return (
    <div style={{ backgroundColor: "#dee0e3" }}>
      <div className="grid-container-events">
        {items.map((item) => (
          <div className="grid-item-events" key={item.id} onClick={() => handleItemClick(item)}>
            {/* This is now a flex container for the row layout */}
            <div className="item-content-events">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="item-image-events"
              />
              {/* This new wrapper groups all text content */}
              <div className="item-text-content-events">
                <h4 className="item-title-events">{item.title}</h4>
                <p className="item-date-events">{formatDate(item.date)}</p>
                <p
                  className="item-description-events"
                  dangerouslySetInnerHTML={{ __html: wrapURLs(item.description) }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={handleModalClose} basic size="small">
        <Modal.Content>
            <img src={selectedItem?.imageUrl} alt={selectedItem?.title} style={{ width: '100%', borderRadius: '8px' }} />
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Events;