import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Button, Card, Modal, Form, Image, Grid } from "semantic-ui-react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const AdminEditMembers = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "info@durgaville.com") {
        navigate("/adminlogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersCollection = collection(db, "members");
        const membersSnapshot = await getDocs(membersCollection);
        const membersList = membersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Sort members by date in ascending order
        membersList.sort((a, b) => a.date.localeCompare(b.date));

        setMembers(membersList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleEdit = (member) => {
    setSelectedMember(member);
    setEditData({ title: member.title });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const memberRef = doc(db, "members", selectedMember.id);
      await updateDoc(memberRef, {
        title: editData.title,
      });
      setMembers(members.map((member) => (member.id === selectedMember.id ? { ...member, ...editData } : member)));
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
      let imagetoDelete = memberToDelete.imageUrl.split("%2F")[1].split("?alt")[0];
      const imageRef = ref(storage, `imagesMembers/${imagetoDelete}`);
      await deleteObject(imageRef);

      await deleteDoc(doc(db, "members", memberToDelete.id));
      setMembers(members.filter((member) => member.id !== memberToDelete.id));
      setDeleteModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteModal = (member) => {
    setMemberToDelete(member);
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
        <h1 style={{ fontSize: "4rem" }}>Edit/ Delete Members</h1>
      </div>

      <Grid centered>
        <Grid.Column width={12}>
          <Card.Group stackable itemsPerRow={3}>
            {members.map((member) => (
              <Card key={member.id}>
                <Image src={member.imageUrl} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{member.title}</Card.Header>
                  <Card.Meta>{member.date}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button onClick={() => handleEdit(member)} primary>
                    Edit
                  </Button>
                  <Button onClick={() => openDeleteModal(member)} secondary>
                    Delete
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Edit Member</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input label="Title" name="title" value={editData.title} onChange={handleChange} />
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
        <Modal.Header>Delete Member</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this member?</p>
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

export default AdminEditMembers;
