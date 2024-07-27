import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase"; // Adjust this import to match your project's structure
import { useNavigate } from "react-router-dom";
import { Button, Card, Modal, Form, Image } from "semantic-ui-react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const AdminEditEvent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "info@durgaville.com") {
        navigate("/adminlogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Sort events by date in descending order
        eventsList.sort((a, b) => b.date.localeCompare(a.date));

        setEvents(eventsList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setEditData({ title: event.title, description: event.description });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const eventRef = doc(db, "events", selectedEvent.id);
      await updateDoc(eventRef, {
        title: editData.title,
        description: editData.description,
      });
      setEvents(events.map((event) => (event.id === selectedEvent.id ? { ...event, ...editData } : event)));
      setModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e, { name, value }) => {
    setEditData({ ...editData, [name]: value });
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "events", eventToDelete.id));
      setEvents(events.filter((event) => event.id !== eventToDelete.id));
      setDeleteModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ textAlign: "center", marginTop: "2%", marginBottom: "3%" }}>
        <h1 style={{ fontSize: "4rem" }}>Edit Event</h1>
      </div>
      <Card.Group stackable itemsPerRow={3}>
        {events.map((event) => (
          <Card key={event.id}>
            <Image src={event.imageUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{event.title}</Card.Header>
              <Card.Meta>{event.date}</Card.Meta>
              <Card.Description>{event.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => handleEdit(event)} primary>
                Edit
              </Button>
              <Button onClick={() => openDeleteModal(event)} secondary>
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Edit Event</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input label="Title" name="title" value={editData.title} onChange={handleChange} />
            <Form.TextArea label="Description" name="description" value={editData.description} onChange={handleChange} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} primary>
            Save
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
        <Modal.Header>Delete Event</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this event?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button onClick={handleDelete} negative>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AdminEditEvent;
