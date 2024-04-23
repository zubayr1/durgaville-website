import React from 'react'
import { Button, Grid, Segment } from 'semantic-ui-react'

import { useNavigate } from 'react-router-dom'

const AdminPortal = () => {
  const navigate = useNavigate()

  const handleaddpost = () => {
    navigate('/adminaddpost')
  }

  const handleaddevent = () => {
    navigate('/adminaddevent')
  }

  const handleaddmember = () => {
    navigate('/adminaddmember')
  }

  return (
    <div style={{ overflow: 'hidden', marginTop: '10%', marginLeft: '5%', marginRight: '5%' }}>
      <Segment>
        <Grid>
          <Grid.Column width={16} only="computer" verticalAlign="middle">
            <Grid centered>
              <Grid.Column width={2}>
                <Button onClick={() => handleaddpost()} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                  Add Post
                </Button>
              </Grid.Column>

              <Grid.Column width={2}>
                <Button onClick={() => handleaddevent()} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                  Add Events
                </Button>
              </Grid.Column>

              <Grid.Column width={2}>
                <Button onClick={() => handleaddmember()} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                  Add Members
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column width={16} only="tablet" verticalAlign="middle">
            <Grid centered>
              <Grid.Column width={4}>
                <Button onClick={() => handleaddpost()} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                  Add Post
                </Button>
              </Grid.Column>

              <Grid.Column onClick={() => handleaddevent()} width={4}>
                <Button style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>Add Events</Button>
              </Grid.Column>

              <Grid.Column width={4}>
                <Button onClick={() => handleaddmember()} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                  Add Members
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column width={16} only="mobile" verticalAlign="middle">
            <Grid centered>
              <Grid.Column width={5}>
                <Button onClick={() => handleaddpost()} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                  Add Post
                </Button>
              </Grid.Column>

              <Grid.Column onClick={() => handleaddevent()} width={5}>
                <Button style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>Add Events</Button>
              </Grid.Column>

              <Grid.Column width={5}>
                <Button onClick={() => handleaddmember()} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                  Add Members
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  )
}

export default AdminPortal
