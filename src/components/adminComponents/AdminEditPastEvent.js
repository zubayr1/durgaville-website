import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Button, Card, Modal, Form, Image, Dropdown } from "semantic-ui-react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const AdminEditPastEvent = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Add delete modal state
  const [postToDelete, setPostToDelete] = useState(null); // Track post to delete
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "info@durgaville.com") {
        navigate("/adminlogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2021;
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({
        key: year.toString(),
        text: year.toString(),
        value: year.toString(),
      });
    }
    return years;
  };

  const yearOptions = generateYearOptions();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, `pastEvents/${selectedYear}/entries`);
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Sort posts by date in descending order
        postsList.sort((a, b) => b.date.localeCompare(a.date));

        setPosts(postsList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedYear]);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditData({ title: post.title, description: post.description });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const postRef = doc(db, `pastEvents/${selectedYear}/entries`, selectedPost.id);
      await updateDoc(postRef, {
        title: editData.title,
        description: editData.description,
      });
      setPosts(posts.map((post) => (post.id === selectedPost.id ? { ...post, ...editData } : post)));
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
      // Delete the image from Firebase Storage
      let imagetoDelete = postToDelete.imageUrl.split("%2F")[1].split("?alt")[0];
      const imageRef = ref(storage, `imagesPastEvents/${imagetoDelete}`);
      await deleteObject(imageRef);

      await deleteDoc(doc(db, `pastEvents/${selectedYear}/entries`, postToDelete.id));
      setPosts(posts.filter((post) => post.id !== postToDelete.id));
      setDeleteModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDropdown = (e, { value }) => {
    setSelectedYear(value);
  }

  const openDeleteModal = (post) => {
    setPostToDelete(post);
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
        <h1 style={{ fontSize: "4rem" }}>Edit/ Delete Past Events</h1>
      </div>
      <div style={{display:'flex', justifyContent:'end', paddingRight:'5%', marginBottom:'2%'}}>
      <Dropdown placeholder="Select Year" selection options={yearOptions} defaultValue={selectedYear} onChange={handleDropdown}/>
      </div>
      <Card.Group stackable itemsPerRow={3}>
        {posts.map((post) => (
          <Card key={post.id}>
            <Image src={post.imageUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{post.title}</Card.Header>
              <Card.Meta>{post.date}</Card.Meta>
              <Card.Description>{post.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => handleEdit(post)} primary>
                Edit
              </Button>
              <Button onClick={() => openDeleteModal(post)} secondary>
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Edit Post</Modal.Header>
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
        <Modal.Header>Delete Post</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this post?</p>
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

export default AdminEditPastEvent;
