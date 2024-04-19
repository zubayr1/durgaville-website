import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js'; 
import {
    collection,    
    getDocs,    
    query,
    orderBy
} from 'firebase/firestore'
import { Modal, Button, } from 'semantic-ui-react';

import './events.css';
import './home.css';

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
        const querySnapshot = await getDocs(
          query(collection(db, 'events'), orderBy('date', 'desc'))
        );
        const newData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    
    // Extract day, month, and year
    const month = formattedDate.split(' ')[0];
    
    // Add suffix to the day
    const dayWithSuffix = addDaySuffix(date.getDate());

    return `${dayWithSuffix} ${month}, ${date.getFullYear()}`;
  }

  // Function to add suffix to the day (e.g., 1st, 2nd, 3rd, 4th, ...)
  function addDaySuffix(day) {
    console.log(day);
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

  return (
    <div style={{ backgroundColor:"#dee0e3" }}>
      <div className="grid-container-events margin-container">
        {items.map((item) => (
          <div className="grid-item-events" key={item.id} onClick={() => handleItemClick(item)}> 
            <div className="item-content-events">
              <h4 className="item-title-events">{item.title}</h4>
              <p className="item-date-events">{formatDate(item.date)}</p>
              <div className="content-container">
                <img src={item.imageUrl} alt={item.title} className="item-image-events" />
                <p className="item-description-events">{item.description}</p>
              </div>
            </div>            
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Modal.Header>{selectedItem?.title}</Modal.Header>
        <Modal.Content>
          <p>{selectedItem?.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
            <img src={selectedItem?.imageUrl} alt={selectedItem?.title} style={{ height: '400px' }} />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleModalClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default Events