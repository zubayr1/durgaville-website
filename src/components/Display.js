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
      <div className="grid-container margin-container">
        {items.map((item) => (
          <div className="grid-item" key={item.id}>            
            <h3 className="item-title">{item.title}</h3>
            <p className="item-date">{formatDate(item.date)}</p>
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
