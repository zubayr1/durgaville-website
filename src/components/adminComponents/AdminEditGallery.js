import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebase"; // Adjust this import to match your project's structure
import { useNavigate } from "react-router-dom";
import { Button, Card, Modal, Form, Image, Grid } from "semantic-ui-react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const AdminEditGallery = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "info@durgaville.com") {
        navigate("/adminlogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const galleryCollection = collection(db, "gallery");
        const gallerySnapshot = await getDocs(galleryCollection);
        const galleryList = gallerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Sort gallery by date in descending order
        galleryList.sort((a, b) => b.date.localeCompare(a.date));

        setGallery(galleryList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleEdit = (image) => {
    setSelectedImage(image);
    setEditDate(image.date);
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const imageRef = doc(db, "gallery", selectedImage.id);
      await updateDoc(imageRef, {
        date: editDate,
      });
      setGallery(gallery.map((image) => (image.id === selectedImage.id ? { ...image, date: editDate } : image)));
      setModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete the image from Firebase Storage
      const imageRef = ref(storage, `gallery/${imageToDelete.imageUrl.split("/").pop().split("?")[0]}`);
      await deleteObject(imageRef);

      // Delete the document from Firestore
      await deleteDoc(doc(db, "gallery", imageToDelete.id));
      setGallery(gallery.filter((image) => image.id !== imageToDelete.id));
      setDeleteModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteModal = (image) => {
    setImageToDelete(image);
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
        <h1 style={{ fontSize: "4rem" }}>Edit/ Delete Gallery</h1>
      </div>
      <Grid centered>
        <Grid.Column width={12}>
          <Card.Group stackable itemsPerRow={3}>
            {gallery.map((image) => (
              <Card key={image.id}>
                <Image src={image.imageUrl} wrapped ui={false} />
                <Card.Content>
                  <Card.Meta>{image.date}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button onClick={() => handleEdit(image)} primary>
                    Edit
                  </Button>
                  <Button onClick={() => openDeleteModal(image)} secondary>
                    Delete
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Edit Image Date</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input label="Date" name="date" type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
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
        <Modal.Header>Delete Image</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this image?</p>
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

export default AdminEditGallery;
