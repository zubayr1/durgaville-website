import React from 'react'
import { Image, Grid } from 'semantic-ui-react'
import background from '../assets/background.jpg'

function Background() {
  const homeStyle = {
    width: '100%',
    overflow: 'hdden',
  }

  return (
    <div style={homeStyle}>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={16} only="computer">
            <Image alt="Durgaville Background" src={background} style={{ width: '100%', maxHeight: '100%', height: '100vh' }} />
          </Grid.Column>

          <Grid.Column width={16} only="tablet">
            <Image alt="Durgaville Background" src={background} style={{ width: '100%', maxHeight: '100%', height: '70vh' }} />
          </Grid.Column>

          <Grid.Column width={16} only="mobile">
            <Image alt="Durgaville Background" src={background} style={{ width: '100%', maxHeight: '100%', height: '50vh' }} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Background
