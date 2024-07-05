import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const AdminPortal = () => {
  const navigate = useNavigate();

  const handleAddPost = () => {
    navigate('/adminaddpost');
  };

  const handleAddEvent = () => {
    navigate('/adminaddevent');
  };

  const handleAddMember = () => {
    navigate('/adminaddmember');
  };

  const handleEditPost = () => {
    navigate('/admineditpost');
  };

  const handleEditEvent = () => {
    navigate('/admineditevent');
  };

  const handleEditMember = () => {
    navigate('/admineditmember');
  };

  const handleAddGallery = () => {
    navigate('/adminaddgallery');
  };

  const handleEditGallery = () => {
    navigate('/admineditgallery');
  };

  return (
    <div style={{ overflow: 'hidden', marginTop: '10%', marginLeft: '5%', marginRight: '5%' }}>
      <Segment>
        <Grid>
          <Grid.Column width={16} only="computer" verticalAlign="middle">
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Button onClick={handleAddPost} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Add Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={2}>
                  <Button onClick={handleAddEvent} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Add Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={2}>
                  <Button onClick={handleAddMember} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Add Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={2}>
                  <Button onClick={handleAddGallery} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Add Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Button onClick={handleEditPost} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Edit/ Delete Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={2}>
                  <Button onClick={handleEditEvent} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Edit/ Delete Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={2}>
                  <Button onClick={handleEditMember} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Edit/ Delete Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={2}>
                  <Button onClick={handleEditGallery} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Edit/ Delete Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={16} only="tablet" verticalAlign="middle">
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button onClick={handleAddPost} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Add Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleAddEvent} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Add Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleAddMember} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Add Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleAddGallery} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Add Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button onClick={handleEditPost} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Edit/ Delete Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleEditEvent} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Edit/ Delete Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleEditMember} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Edit/ Delete Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleEditGallery} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '1.3rem' }}>
                    Edit/ Delete Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={16} only="mobile" verticalAlign="middle">
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button onClick={handleAddPost} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                    Add Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleAddEvent} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                    Add Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleAddMember} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                    Add Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleAddGallery} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                    Add Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button onClick={handleEditPost} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                    Edit/ Delete Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleEditEvent} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                    Edit/ Delete Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleEditMember} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                    Edit/ Delete Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button onClick={handleEditGallery} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black', fontSize: '.9rem' }}>
                    Edit/ Delete Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default AdminPortal;
