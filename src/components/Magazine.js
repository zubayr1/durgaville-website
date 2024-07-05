import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Message, Image, Dropdown, Segment } from 'semantic-ui-react';
import { db, storage } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { TailSpin } from 'react-loader-spinner';

import magazine from '../assets/magazine_entry.jpg';

const submissionTypes = [
  { key: 'article', text: 'Article Write-up', value: 'Article Write-up' },
  { key: 'travellogue', text: 'Travellogue', value: 'Travellogue' },
  { key: 'poem', text: 'Poem', value: 'Poem' },
  { key: 'story', text: 'Story', value: 'Story' },
  { key: 'recipes', text: 'Recipes', value: 'Recipes' },
  { key: 'tutorial', text: 'Tutorial', value: 'Tutorial' },
  { key: 'promotion', text: 'Promotion', value: 'Promotion' },
  { key: 'photography', text: 'Photography', value: 'Photography' },
  { key: 'painting', text: 'Painting', value: 'Painting' },
  { key: 'others', text: 'Others', value: 'Others' }
];

const Magazine = () => {
  const [entries, setEntries] = useState([
    { fullName: '', age: '', email: '', location: '', submissionType: '', title: '', file: null }
  ]);
  const [error, setError] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error === 0 || error > 0) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleFileChange = (index, file) => {
    const newEntries = [...entries];
    newEntries[index].file = file;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      { fullName: '', age: '', email: '', location: '', submissionType: '', title: '', file: null }
    ]);
  };

  const removeEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleSubmit = async () => {
    let valid = true;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (
        entry.fullName === '' ||
        entry.age === '' ||
        entry.email === '' ||
        entry.location === '' ||
        entry.submissionType === '' ||
        entry.title === '' ||
        entry.file === null
      ) {
        setError(1);
        valid = false;
        break;
      }

      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/jpg',
        'image/png'
      ];
      if (!allowedTypes.includes(entry.file.type)) {
        setError(2);
        valid = false;
        break;
      }
      if (entry.file.size > 10 * 1024 * 1024) { // 10MB
        setError(3);
        valid = false;
        break;
      }
    }
    if (valid) {
      setLoading(true);
      const uploadTimeout = setTimeout(() => {
        setError(4);
        setLoading(false);
      }, 10000); // 10 seconds timeout

      try {
        const uploadPromises = entries.map(async (entry) => {
          const fileRef = ref(storage, `magazine/${entry.file.name}`);
          const uploadTask = uploadBytesResumable(fileRef, entry.file);

          uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          });

          const snapshot = await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
              null,
              (error) => reject(error),
              () => resolve(uploadTask.snapshot)
            );
          });

          const fileUrl = await getDownloadURL(snapshot.ref);
          const entryData = {
            fileUrl,
            fullName: entry.fullName,
            age: entry.age,
            email: entry.email,
            location: entry.location,
            submissionType: entry.submissionType,
            title: entry.title
          };
          await addDoc(collection(db, 'magazine_entries'), entryData);
        });

        await Promise.all(uploadPromises);
        clearTimeout(uploadTimeout);
        setLoading(false);
        setError(0);
      } catch (error) {
        clearTimeout(uploadTimeout);
        console.error('Error adding document:', error);
        setError(4);
        setLoading(false);
      }
    }
  };

  let layout;

  if (error === -1) {
    layout = <div></div>;
  } else if (error === 1) {
    layout = (
      <div>
        <Message error header="Submission Error" content="One of the required entries is empty" />
      </div>
    );
  } else if (error === 2) {
    layout = (
      <div>
        <Message error header="Submission Error" content="Invalid file type. Only .docx, .pdf, .jpg, .jpeg, and .png files are allowed" />
      </div>
    );
  } else if (error === 3) {
    layout = (
      <div>
        <Message error header="Submission Error" content="File size exceeds 10MB limit" />
      </div>
    );
  } else if (error === 4) {
    layout = (
      <div>
        <Message error header="Submission Error" content="Error due to unforeseen issue" />
      </div>
    );
  } else if (error === 0) {
    layout = (
      <div>
        <Message success header="Success" content="Submission done successfully" />
      </div>
    );
  }

  return (
    <div style={{ overflow: 'hidden', marginTop: '5%', marginLeft: '2%', marginRight: '2%' }}>
      <Grid centered>
        <Grid.Row>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '6%', marginTop: '-7%' }}>
            <Image alt="Magazine" src={magazine} style={{ height: '60vh' }} />
          </div>
        </Grid.Row>

        <Grid.Row>
          <p style={{ fontWeight: 'bolder', fontSize: '4rem', fontFamily: 'Inter', marginTop: '-3%' }}>Add Your Entry for the magazine</p>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={10} computer={8}>
            <Form onSubmit={handleSubmit}>
              {entries.map((entry, index) => (
                <Segment key={index} padded="very">
                  <Form.Field>
                    <label htmlFor={`fullName-${index}`}>Full Name</label>
                    <input
                      placeholder="Full Name"
                      value={entry.fullName}
                      onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor={`age-${index}`}>Age</label>
                    <input
                      type="number"
                      placeholder="Age"
                      value={entry.age}
                      onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor={`email-${index}`}>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={entry.email}
                      onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor={`location-${index}`}>Location</label>
                    <input
                      placeholder="Location"
                      value={entry.location}
                      onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor={`submissionType-${index}`}>Submission Type</label>
                    <Dropdown
                      placeholder="Select Submission Type"
                      fluid
                      selection
                      options={submissionTypes}
                      value={entry.submissionType}
                      onChange={(e, { value }) => handleInputChange(index, 'submissionType', value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor={`title-${index}`}>Title</label>
                    <input
                      placeholder="Title"
                      value={entry.title}
                      onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor={`file-${index}`}>Upload</label>
                    <input
                      type="file"
                      accept=".docx,.pdf,image/jpeg,image/jpg,image/png"
                      onChange={(e) => handleFileChange(index, e.target.files[0])}
                    />
                  </Form.Field>
                  {index > 0 && (
                    <Button type="button" onClick={() => removeEntry(index)} style={{ backgroundColor: '#ff0000', color: '#fff', marginBottom: '1em' }}>
                      Cancel
                    </Button>
                  )}
                </Segment>
              ))}
              <div style={{ marginTop: '2%' }}>
                <Button type="button" onClick={addEntry} style={{ backgroundColor: '#690460', color: '#fff' }}>Add Another Entry</Button>
                <Button type="submit" style={{ backgroundColor: '#bb0d3b', color: '#fff' }}>Submit</Button>
              </div>
            </Form>
          </Grid.Column>
        </Grid.Row>
        {loading && (
          <Grid.Row>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
              <TailSpin
                height="80"
                width="80"
                color="#bb0d3b"
                ariaLabel="loading"
              />
            </div>
          </Grid.Row>
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <Grid.Row>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
              <p>Uploading... {Math.round(uploadProgress)}%</p>
            </div>
          </Grid.Row>
        )}
        <Grid.Row>{layout}</Grid.Row>
      </Grid>
    </div>
  );
};

export default Magazine;
