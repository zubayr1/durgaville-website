import React from 'react'
import { Grid,} from 'semantic-ui-react'

function Events() {
  return (
    <div style={{marginLeft:'5%', marginRight:'5%', marginTop:'5%', paddingBottom:'5%'}}>
      <Grid centered>
        <Grid.Row only='computer'>
          <p style={{fontWeight:'bolder', fontFamily: 'Inter', fontSize:'4rem'}}>LET US LOOK
            AT OUR UPCOMING EVENTS</p>
        </Grid.Row>

        <Grid.Row only='computer'>
          <p style={{fontFamily: 'Inter', fontSize:'2rem', fontStyle:'italic'}}>
            Durgaville throughout the year organizes a lot of events which are open to you all.
            From cultural events to religious events, from watching Cricket together to playing Football together. 
            Here you will find the upcoming events.</p>
        </Grid.Row>

        <Grid.Row only='computer'>
          <p style={{fontFamily: 'Inter', fontSize:'2rem', fontStyle:'italic', marginTop:'5%'}}>
          No events right now... Please come back later...</p>
        </Grid.Row>




        <Grid.Row only='tablet'>
          <p style={{fontWeight:'bolder', fontFamily: 'Inter', fontSize:'3rem'}}>LET US LOOK
            AT OUR UPCOMING EVENTS</p>
        </Grid.Row>

        <Grid.Row only='tablet'>
          <p style={{fontFamily: 'Inter', fontSize:'1.4rem', fontStyle:'italic'}}>
            Durgaville throughout the year organizes a lot of events which are open to you all.
            From cultural events to religious events, from watching Cricket together to playing Football together. 
            Here you will find the upcoming events.</p>
        </Grid.Row>

        <Grid.Row only='tablet'>
          <p style={{fontFamily: 'Inter', fontSize:'1.4rem', fontStyle:'italic', marginTop:'5%'}}>
          No events right now... Please come back later...</p>
        </Grid.Row>



        <Grid.Row only='mobile'>
          <p style={{fontWeight:'bolder', fontFamily: 'Inter', fontSize:'1.6rem'}}>LET US LOOK
            AT OUR UPCOMING EVENTS</p>
        </Grid.Row>

        <Grid.Row only='mobile'>
          <p style={{fontFamily: 'Inter', fontSize:'1rem', fontStyle:'italic'}}>
            Durgaville throughout the year organizes a lot of events which are open to you all.
            From cultural events to religious events, from watching Cricket together to playing Football together. 
            Here you will find the upcoming events.</p>
        </Grid.Row>

        <Grid.Row only='mobile'>
          <p style={{fontFamily: 'Inter', fontSize:'1rem', fontStyle:'italic', marginTop:'5%'}}>
          No events right now... Please come back later...</p>
        </Grid.Row>
      </Grid>
      
    </div>
  )
}

export default Events