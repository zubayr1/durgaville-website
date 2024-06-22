import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase'; // Adjust this import to match your project's structure
import { useNavigate } from 'react-router-dom';
import { Button, Card, Modal, Form, Image } from 'semantic-ui-react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const AdminEditPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Add delete modal state
  const [postToDelete, setPostToDelete] = useState(null); // Track post to delete

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== 'info@durgaville.com') {
        navigate('/adminlogin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditData({ title: post.title, description: post.description });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const postRef = doc(db, 'posts', selectedPost.id);
      await updateDoc(postRef, {
        title: editData.title,
        description: editData.description
      });
      setPosts(posts.map(post => (post.id === selectedPost.id ? { ...post, ...editData } : post)));
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
      await deleteDoc(doc(db, 'posts', postToDelete.id));
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      setDeleteModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

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
    <div style={{ padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginTop: '2%', marginBottom: '3%' }}>
        <h1 style={{ fontSize: '4rem' }}>Edit/ Delete Post</h1>
      </div>
      <Card.Group stackable itemsPerRow={3}>
        {posts.map(post => (
          <Card key={post.id}>
            <Image src={post.imageUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{post.title}</Card.Header>
              <Card.Meta>{post.date}</Card.Meta>
              <Card.Description>{post.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => handleEdit(post)} primary>Edit</Button>
              <Button onClick={() => openDeleteModal(post)} secondary>Delete</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Edit Post</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Title"
              name="title"
              value={editData.title}
              onChange={handleChange}
            />
            <Form.TextArea
              label="Description"
              name="description"
              value={editData.description}
              onChange={handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} primary>Save</Button>
        </Modal.Actions>
      </Modal>

      <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
        <Modal.Header>Delete Post</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button onClick={handleDelete} negative>Delete</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AdminEditPost;
