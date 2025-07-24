import React from 'react'
import { Grid, Image, Button, Divider} from 'semantic-ui-react'

import magazine from '../assets/magazine_entry.jpg'

import { useNavigate } from 'react-router-dom'

function MagazineDeclare() {
    const navigate = useNavigate()

    const buttonClick = () =>{
        navigate('/magazine');
    }
  return (
    <div style={{marginTop:'3%', marginBottom:'3%'}}>
      <Grid centered>
        <Grid.Row centered only='computer'>
            <p style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '4.0rem', color: 'black', marginBottom: '5%', marginLeft: '7%', marginRight: '7%', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Showcase Your talent!
            </p>
        </Grid.Row>
        <Grid.Row centered only='tablet'>
            <p style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '3.0rem', color: 'black', marginBottom: '5%', marginLeft: '7%', marginRight: '7%', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Showcase Your talent!
            </p>
        </Grid.Row>
        <Grid.Row centered only='mobile'>
            <p style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '2.0rem', color: 'black', marginBottom: '5%', marginLeft: '7%', marginRight: '7%', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Showcase Your talent!
            </p>
        </Grid.Row>
        <Grid.Row>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '6%', marginTop:'-7%' }}>
                <Image alt="Magazine" src={magazine} style={{ maxWidth: "100%", height: "auto" }} />
            </div>
        </Grid.Row>

        <Grid.Row only='computer' style={{marginTop:'-5%'}}>
            <p style={{ fontFamily: 'Inter', lineHeight: '2.0', fontSize: '1.6rem', color: 'black', marginBottom: '5%', marginLeft: '7%', marginRight: '7%' }}>
            Pujo is approaching! And with it comes our cherished tradition: the Sharodiya magazine.
            As the calendar edges closer to Durga Pujo, we're eagerly preparing to welcome Maa Durga with grandeur and celebration.
            </p>
            <p style={{ fontFamily: 'Inter', lineHeight: '2.0', fontSize: '1.6rem', color: 'black', marginBottom: '5%', marginLeft: '7%', marginRight: '7%', marginTop:'-3%' }}>
            With excitement bubbling in our hearts, we're glad to kick off the submission phase for our illustrious magazine.
            Are you a secret storyteller, or a poetic genius? Does your canvas echo your imagination?
            Or do your lenses reveal the hidden wonders? we invite you to contribute your unique flair to our Pujo special edition.
            </p>
            <p style={{ fontFamily: 'Inter', lineHeight: '2.0', fontSize: '1.6rem', color: 'black', marginBottom: '5%', marginLeft: '7%', marginRight: '7%', marginTop:'-3%' }}>
            Send us your creative masterpieces and let us celebrate your brilliance.
            We can’t wait to showcase your exceptional work as we embark on this artistic adventure together. Here’s to a joyous collaboration and the magic of Durga Pujo!
            </p>
        </Grid.Row>

        <Grid.Row only='tablet' style={{marginTop:'-5%'}}>
            <p style={{ fontFamily: 'Inter', lineHeight: '1.8', fontSize: '1.4rem', color: 'black', marginBottom: '5%', marginLeft: '6%', marginRight: '6%' }}>
            Pujo is approaching! And with it comes our cherished tradition: the Sharodiya magazine.
            As the calendar edges closer to Durga Pujo, we're eagerly preparing to welcome Maa Durga with grandeur and celebration.
            </p>
            <p style={{ fontFamily: 'Inter', lineHeight: '1.8', fontSize: '1.4rem', color: 'black', marginBottom: '5%', marginLeft: '6%', marginRight: '6%', marginTop:'-2%'  }}>
            With excitement bubbling in our hearts, we're glad to kick off the submission phase for our illustrious magazine.
            Are you a secret storyteller, or a poetic genius? Does your canvas echo your imagination?
            Or do your lenses reveal the hidden wonders? we invite you to contribute your unique flair to our Pujo special edition.
            </p>
            <p style={{ fontFamily: 'Inter', lineHeight: '1.8', fontSize: '1.4rem', color: 'black', marginBottom: '5%', marginLeft: '6%', marginRight: '6%', marginTop:'-2%'  }}>
            Send us your creative masterpieces and let us celebrate your brilliance.
            We can’t wait to showcase your exceptional work as we embark on this artistic adventure together. Here’s to a joyous collaboration and the magic of Durga Pujo!
            </p>
        </Grid.Row>

        <Grid.Row only='mobile' style={{marginTop:'-5%'}}>
            <p style={{ fontFamily: 'Inter', lineHeight: '1.5', fontSize: '1.2rem', color: 'black', marginBottom: '5%', marginLeft: '6%', marginRight: '6%' }}>
            Pujo is approaching! And with it comes our cherished tradition: the Sharodiya magazine.
            As the calendar edges closer to Durga Pujo, we're eagerly preparing to welcome Maa Durga with grandeur and celebration.
            </p>
            <p style={{ fontFamily: 'Inter', lineHeight: '1.5', fontSize: '1.2rem', color: 'black', marginBottom: '5%', marginLeft: '6%', marginRight: '6%', marginTop:'-2%'  }}>
            With excitement bubbling in our hearts, we're glad to kick off the submission phase for our illustrious magazine.
            Are you a secret storyteller, or a poetic genius? Does your canvas echo your imagination?
            Or do your lenses reveal the hidden wonders? we invite you to contribute your unique flair to our Pujo special edition.
            </p>
            <p style={{ fontFamily: 'Inter', lineHeight: '1.5', fontSize: '1.2rem', color: 'black', marginBottom: '5%', marginLeft: '6%', marginRight: '6%', marginTop:'-2%'  }}>
            Send us your creative masterpieces and let us celebrate your brilliance.
            We can’t wait to showcase your exceptional work as we embark on this artistic adventure together. Here’s to a joyous collaboration and the magic of Durga Pujo!
            </p>
        </Grid.Row>

        <Grid.Row>
            <Button onClick={buttonClick} style={{backgroundColor:'#bb0d3b', color:'#fff', marginTop:'-3%'}}>Go to Magazine</Button>
        </Grid.Row>
      </Grid>

      <Divider/>
    </div>
  )
}

export default MagazineDeclare
