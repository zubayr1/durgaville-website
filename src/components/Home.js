import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import thakurhome from "../assets/thakurHome.jpg";

import './home.css';

function Home() {
  return (
    <div style={{backgroundColor:"#dee0e3",}}>
        <div className="margin-container">
                <Grid centered>
                    <Grid.Column only='computer' width={16} textAlign='middle'>  
                        <p style={{fontFamily: 'Zapfino', fontSize:'4.5rem', color:'black', fontWeight: 'bold', marginBottom: '5%', marginTop:'6%',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'}}>
                            ABOUT DURGAVILLE</p>  

                        <p style={{fontFamily: 'Avenir Next LT Pro, sans-serif', lineHeight: '2.5', fontSize:'1.5rem', color:'black', fontStyle:'italic', marginBottom: '5%', marginLeft:'7%', marginRight:'7%'
                        }}>
                            "Durgaville" stands as a testament to the enduring spirit of Durga Puja among Bengalis, transcending borders to find expression in Erlangen, 
                            Germany. Initiated by three Bengali families, it began as a heartfelt endeavor to recreate the essence of Durga Puja away from home. 
                            Over time, "Durgaville" has blossomed into a vibrant community, not only celebrating Durga Puja but also fostering unity through a plethora of 
                            cultural, social, and sporting events. 
                            This expansion reflects their aim to foster camaraderie and togetherness among the Indian community in Erlangen.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Image src={thakurhome} style={{ height: '96vh' }} />
                        </div>
                    </Grid.Column>

                    <Grid.Column only='tablet' width={16} textAlign='middle'>
                        <p style={{fontFamily: 'Inter', fontSize:'3.5rem', color:'black', fontWeight: 'bold', marginBottom: '5%', marginTop:'6%',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'}}>
                            ABOUT DURGAVILLE</p>

                        <p style={{fontFamily: 'Inter', lineHeight: '1.6', fontSize:'1.2rem', color:'black', fontStyle:'italic', marginBottom: '5%', marginLeft:'6%', marginRight:'6%'
                        }}>
                            "Durgaville" stands as a testament to the enduring spirit of Durga Puja among Bengalis, transcending borders to find expression in Erlangen, 
                            Germany. Initiated by three Bengali families, it began as a heartfelt endeavor to recreate the essence of Durga Puja away from home. 
                            Over time, "Durgaville" has blossomed into a vibrant community, not only celebrating Durga Puja but also fostering unity through a plethora of 
                            cultural, social, and sporting events. 
                            This expansion reflects their aim to foster camaraderie and togetherness among the Indian community in Erlangen.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', padding:'6%' }}>
                            <Image src={thakurhome} style={{ height: '80vh' }}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column only='mobile' width={16} textAlign='middle'>
                        <p style={{fontFamily: 'Inter', fontSize:'2.5rem', color:'black', fontWeight: 'bold', marginBottom: '5%', marginTop:'6%',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'}}>
                            ABOUT DURGAVILLE</p>

                        <p style={{fontFamily: 'Inter', lineHeight: '1.6', fontSize:'1.1rem', color:'black', fontStyle:'italic', marginBottom: '5%', marginLeft:'6%', marginRight:'6%'
                        }}>
                            "Durgaville" stands as a testament to the enduring spirit of Durga Puja among Bengalis, transcending borders to find expression in Erlangen, 
                            Germany. Initiated by three Bengali families, it began as a heartfelt endeavor to recreate the essence of Durga Puja away from home. 
                            Over time, "Durgaville" has blossomed into a vibrant community, not only celebrating Durga Puja but also fostering unity through a plethora of 
                            cultural, social, and sporting events. 
                            This expansion reflects their aim to foster camaraderie and togetherness among the Indian community in Erlangen.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', padding:'6%' }}>
                            <Image src={thakurhome} />
                        </div>
                    </Grid.Column>
                </Grid>
        </div>
        
    </div>
  )
}

export default Home