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

  return (
    <div style={{ backgroundColor:"#dee0e3" }}>
      <div className="grid-container-events margin-container">
        {items.map((item) => (
          <div className="grid-item-events" key={item.id} onClick={() => handleItemClick(item)}> 
            <div className="item-content-events">
              <h4 className="item-title-events">{item.title}</h4>
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