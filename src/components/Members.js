import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Modal, Button } from "semantic-ui-react";

import "./members.css";
import "./home.css";

function Members() {
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
        const querySnapshot = await getDocs(query(collection(db, "members"), orderBy("date", "asc")));
        const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(newData);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "#dee0e3" }}>
      <div className="grid-container-member margin-container">
        {items.map((item) => (
          <div className="grid-item-member" key={item.id} onClick={() => handleItemClick(item)}>
            <div className="item-content-member">
              <div className="content-container">
                <img src={item.imageUrl} alt={item.title} className="item-image-member" />
                <p className="item-description-member">{item.description}</p>
              </div>
            </div>
            <h4 className="item-title-member">{item.title}</h4>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={handleModalClose} style={{ width: "auto", height: "auto" }}>
        <Modal.Header>{selectedItem?.title}</Modal.Header>
        <Modal.Content>
          <p>{selectedItem?.description}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={selectedItem?.imageUrl} alt={selectedItem?.title} style={{ maxWidth: "70vw", maxHeight: "50vh" }} />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleModalClose}>Close</Button>
        </Modal.Actions>
      </Modal>

      <p style={{ textAlign: "center", fontSize: "15px" }}>*members' names are posted in random order</p>
    </div>
  );
}

export default Members;
