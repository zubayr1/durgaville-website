import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js'; 
import {
    collection,    
    getDocs,    
    query,
    orderBy
} from 'firebase/firestore'

import './display.css';
import './home.css';

const DisplayData = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'posts'), orderBy('date', 'desc'))
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
      <div className="grid-container margin-container">
        {items.map((item) => (
          <div className="grid-item" key={item.id}>
            <p className="item-date">{item.date}</p>
            <h3 className="item-title">{item.title}</h3>
            <div className="item-content">
              <img src={item.imageUrl} alt={item.title} className="item-image" />
              <p className="item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayData;
