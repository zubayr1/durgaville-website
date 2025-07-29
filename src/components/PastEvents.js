import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import "./pastEvents.css";
import "./home.css";

const PastEvents = () => {
  const [items, setItems] = useState([]);
  const [clickedImage, setClickedImage] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2021;
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year.toString());
    }
    return years;
  };

  const yearOptions = generateYearOptions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, `pastEvents/${selectedYear}/entries`), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

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

  const handleImageClick = (imageUrl) => {
    setClickedImage((prevState) => (prevState === imageUrl ? null : imageUrl));
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const wrapURLs = (text) => {
    if (!text) return '';
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  };

  return (
    <div style={{ backgroundColor: "#dee0e3" }}>
      <div className="year-header-container margin-container">
        {yearOptions.map((year) => (
          <div
            key={year}
            className={`year-header ${selectedYear === year ? "active" : ""}`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </div>
        ))}
      </div>

      <div className="grid-container margin-container">
        {items.map((item) => (
          <div className="grid-item" key={item.id}>
            <div className="item-content">
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`item-image ${clickedImage === item.imageUrl ? "enlarged" : ""}`}
                onClick={() => handleImageClick(item.imageUrl)}
              />
              
              <div className="item-text-content">
                <h3 className="item-title">{item.title}</h3>
                {/* The date has been moved here, under the title */}
                <p className="item-date">{formatDate(item.date)}</p>
                <p className="item-description" dangerouslySetInnerHTML={{ __html: wrapURLs(item.description) }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastEvents;