import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const AdminPortal = () => {
  const navigate = useNavigate();

  const handleAddPost = () => {
    navigate("/adminaddpastevent");
  };

  const handleAddEvent = () => {
    navigate("/adminaddupcomingevent");
  };

  const handleAddMember = () => {
    navigate("/adminaddmember");
  };

  const handleEditPost = () => {
    navigate("/admineditpastevent");
  };

  const handleEditEvent = () => {
    navigate("/admineditupcomingevent");
  };

  const handleEditMember = () => {
    navigate("/admineditmember");
  };

  const handleAddGallery = () => {
    navigate("/adminaddgallery");
  };

  const handleEditGallery = () => {
    navigate("/admineditgallery");
  };

  const handlecheckEntries = () => {
    navigate("/admincheckmagazineentries");
  };

  return (
    <div style={{ overflow: "hidden", marginTop: "10%", marginLeft: "5%", marginRight: "5%" }}>
      <Segment>
        <Grid>
          <Grid.Column width={16} only="computer" verticalAlign="middle">
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Button
                    onClick={handleAddPost}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Add Past Event
                  </Button>
                </Grid.Column>

                <Grid.Column width={3}>
                  <Button
                    onClick={handleAddEvent}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Add Upcoming Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={3}>
                  <Button
                    onClick={handleAddMember}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Add Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={3}>
                  <Button
                    onClick={handleAddGallery}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Add Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Button
                    onClick={handleEditPost}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Edit/ Delete Past Event
                  </Button>
                </Grid.Column>

                <Grid.Column width={3}>
                  <Button
                    onClick={handleEditEvent}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Edit/ Delete Upcoming Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={3}>
                  <Button
                    onClick={handleEditMember}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Edit/ Delete Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={3}>
                  <Button
                    onClick={handleEditGallery}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
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
                  <Button
                    onClick={handleAddPost}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Add Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleAddEvent}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Add Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleAddMember}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Add Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleAddGallery}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Add Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button
                    onClick={handleEditPost}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Edit/ Delete Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleEditEvent}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Edit/ Delete Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleEditMember}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
                    Edit/ Delete Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleEditGallery}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: "1.2rem" }}
                  >
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
                  <Button
                    onClick={handleAddPost}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: ".9rem" }}
                  >
                    Add Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleAddEvent}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: ".9rem" }}
                  >
                    Add Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleAddMember}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: ".9rem" }}
                  >
                    Add Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleAddGallery}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: ".9rem" }}
                  >
                    Add Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button
                    onClick={handleEditPost}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: ".9rem" }}
                  >
                    Edit/ Delete Post
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleEditEvent}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: ".9rem" }}
                  >
                    Edit/ Delete Events
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleEditMember}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: ".9rem" }}
                  >
                    Edit/ Delete Members
                  </Button>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    onClick={handleEditGallery}
                    style={{ backgroundColor: "white", color: "black", border: "2px solid black", fontSize: ".9rem" }}
                  >
                    Edit/ Delete Gallery
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={16}>
            <Grid centered>
              <Button
                onClick={handlecheckEntries}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid black",
                  fontSize: "1.2rem",
                  marginBottom: "1%",
                }}
              >
                Check Magazine entries
              </Button>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default AdminPortal;
