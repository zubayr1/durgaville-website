import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Modal, Form, Image } from 'semantic-ui-react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AdminEditPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: '', description: '' });

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
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditData({ title: post.title, description: post.description });
    setModalOpen(true);
  };

  const handleSave = async () => {
    const postRef = doc(db, 'posts', selectedPost.id);
    await updateDoc(postRef, {
      title: editData.title,
      description: editData.description
    });
    setPosts(posts.map(post => (post.id === selectedPost.id ? { ...post, ...editData } : post)));
    setModalOpen(false);
  };

  const handleChange = (e, { name, value }) => {
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Card.Group itemsPerRow={3}>
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
              <Button secondary>Delete</Button>
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
    </div>
  );
};

export default AdminEditPost;
