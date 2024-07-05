import React, { useState } from 'react';
import { Button, Form, Grid, Message, Image } from 'semantic-ui-react';
import { db, storage } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import magazine from '../assets/magazine_entry.jpg'

const Magazine = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [entries, setEntries] = useState([{ name: '', email: '', file: null }]);
  const [error, setError] = useState(-1);

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
    if(field==='name') {
        setName(value);
    } else {
        setMail(value);
    }
  };

  const handleFileChange = (index, file) => {
    const newEntries = [...entries];
    newEntries[index].file = file;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { name: '', email: '', file: null }]);
  };

  const handleSubmit = async () => {
    let valid = true;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (i === 0 && (entry.name === '' || entry.email === '' || entry.file === null)) {
        setError(1);
        valid = false;
        break;
      }
      if (i > 0 && entry.file === null) {
        setError(1);
        valid = false;
        break;
      }
      if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(entry.file.type)) {
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
      try {
        for (let entry of entries) {
          // Upload file to Firebase Storage
          const fileRef = ref(storage, `magazine/${entry.file.name}`);
          await uploadBytes(fileRef, entry.file);

          // Get the download URL of the uploaded file
          const fileUrl = await getDownloadURL(fileRef);

          // Add document to 'magazine_entries' collection in Firestore
          const entryData = { fileUrl };
          if (entry.name) {
            entryData.name = entry.name;
          } else {
            entryData.name = name;
          }
          if (entry.email) {
            entryData.email = entry.email;
          } else {
            entryData.email = mail;
          }
          await addDoc(collection(db, 'magazine_entries'), entryData);
        }
        setError(0);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setError(4);
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
        <Message error header="Submission Error" content="Invalid file type. Only .docx and .pdf files are allowed" />
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
    <div style={{ overflow: 'hidden', marginTop: '5%', marginLeft:'2%', marginRight:'2%' }}>
      <Grid centered>
        <Grid.Row>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '6%', marginTop:'-7%' }}>
                <Image alt="Magazine" src={magazine} style={{ height: '60vh' }} />
            </div>
        </Grid.Row>

        <Grid.Row>
          <p style={{ fontWeight: 'bolder', fontSize: '4rem', fontFamily: 'Inter', marginTop:'-3%' }}>Add Your Entry for the magazine</p>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={10} computer={8}>
            <Form onSubmit={handleSubmit}>
              {entries.map((entry, index) => (
                <div key={index}>
                  {index === 0 && (
                    <>
                      <Form.Field>
                        <label htmlFor={`name-${index}`}>Name</label>
                        <input
                          placeholder="Name"
                          value={entry.name}
                          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
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
                    </>
                  )}
                  <Form.Field>
                    <label htmlFor={`file-${index}`}>Upload</label>
                    <input
                      type="file"
                      accept=".docx,.pdf"
                      onChange={(e) => handleFileChange(index, e.target.files[0])}
                    />
                  </Form.Field>
                </div>
              ))}
              <div style={{marginTop:'2%'}}>
                <Button type="button" onClick={addEntry} style={{backgroundColor:'#690460', color:'#fff'}}>Add Another Entry</Button>
                <Button type="submit" style={{backgroundColor:'#bb0d3b', color:'#fff'}}>Submit</Button>

              </div>

            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>{layout}</Grid.Row>
      </Grid>
    </div>
  );
};

export default Magazine;
