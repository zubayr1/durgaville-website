import React, { useState } from 'react'
import { Grid, FormField, Button, Form, Image, Message } from 'semantic-ui-react'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'

import { useNavigate } from 'react-router-dom'

import logo from '../assets/durgaville_logo.png'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission
    try {
      if (email === 'info@durgaville.com') {
        await signInWithEmailAndPassword(auth, email, password)

        navigate('/adminportal')
      } else {
        setMessage('Access denied!')
      }
    } catch (_) {
      setMessage('Access denied!')
    }
  }

  let layout

  if (message !== '') {
    layout = (
      <div>
        <Message error header="Authentication failed due to one of these reasons:" list={['Access denied', 'Service not available at the moment']} />
      </div>
    )
  }

  return (
    <div style={{ marginLeft: '20%', marginRight: '20%' }}>
      <Grid centered>
        <Grid.Row>
          <Image src={logo} size="small" />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign="center" width={16}>
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <p style={{ fontWeight: 'bolder', fontFamily: 'Inter', fontSize: '1.5rem' }}>Admin Portal</p>
              <FormField>
                <label style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: '1.3rem' }}>Admin Email</label>
                <input placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormField>
              <FormField>
                <label style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: '1.3rem' }}>Admin Password</label>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormField>
              <Button type="submit" style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                Sign In
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>{layout}</Grid.Row>
      </Grid>
    </div>
  )
}

export default AdminLogin
