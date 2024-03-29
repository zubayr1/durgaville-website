import React, { useState, useEffect} from 'react'
import { Grid, } from 'semantic-ui-react'
import arrow from "../assets/down_arrow.svg";
// import { Fade } from "react-awesome-reveal";

import "./greetings.css"

function Greetings({ onScrollDown }) {

  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [showSecondDiv, setShowSecondDiv] = useState(false);

  const handleScrollDown = () => {
    onScrollDown();
  };


  useEffect(() => {
    const handleScroll = () => {
        const top = window.scrollY;
        if (top === 0) {
          setShowFirstDiv(true);
          setShowSecondDiv(false);
        } else {
          setShowFirstDiv(false);
          setShowSecondDiv(true);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    
  return (
    <div className="greetings-container">
        <Grid>
            <Grid.Row>
                <Grid.Column width={16} only='computer' textAlign='center'>
                    
                    <div style={{ opacity: showFirstDiv ? 1 : 0, transition: 'opacity 0.7s ease' }}>
                        <p style={{fontFamily: 'Inter', fontSize:'7.0rem', color:'white', fontWeight: 'bold', marginBottom: '2%',
                        marginLeft:'15%', marginRight:'15%', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                            WELCOME TO {'\n'} DURGAVILLE</p>
                        <p style={{fontFamily: 'Inter', fontSize:'2.0rem', color:'white', fontStyle: 'italic',  marginBottom: '3%',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
                            The Official Website of Durgaville, Erlangen,</p> 

                        <p style={{fontFamily: 'Inter', fontSize:'2.0rem', color:'white', fontStyle: 'italic',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', marginBottom: '4%',}}>
                            a rapidly growing community of Bengalis and Indians in Erlangen, Germany and beyond!</p>

                        
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <img src={arrow} alt="Arrow" style={{ filter: 'invert(1)', width: 'auto', height: '4%', 
                            maxWidth: '4%', maxHeight: '100%', cursor: 'pointer' }} onClick={() => handleScrollDown()} />
                        </div>
                    </div>

                    <div style={{ opacity: showSecondDiv ? 1 : 0, transition: 'opacity 0.5s ease, transform 0.5s ease', 
                        transform: showSecondDiv ? 'translateY(-140px)' : 'translateY(10px)', zIndex: 1 }}>
                        {showSecondDiv  &&
                            <p style={{ fontFamily: 'Inter', fontSize: '4rem', color: 'white', fontWeight: 'bold', border: '4px solid white', 
                            padding: '20px', width: 'fit-content', margin: 'auto', textTransform: 'uppercase' }}>DURGAVILLE</p>

                        }
                    </div>
               
                </Grid.Column>

                <Grid.Column width={16} only='tablet' textAlign='center'>
                    <div style={{ opacity: showFirstDiv ? 1 : 0, transition: 'opacity 0.7s ease' }}>
                        <p style={{fontFamily: 'Inter', fontSize:'5.0rem', color:'white', fontWeight: 'bold', marginBottom: '3%',
                        marginLeft:'15%', marginRight:'15%', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                            WELCOME TO {'\n'} DURGAVILLE</p> 
                        <p style={{fontFamily: 'Inter', fontSize:'1.7rem', color:'white', fontStyle: 'italic',  marginBottom: '4%',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
                            The Official Website of Durgaville, Erlangen,</p> 

                        <p style={{fontFamily: 'Inter', fontSize:'1.7rem', color:'white', fontStyle: 'italic',
                        marginLeft:'12%', marginRight:'12%', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', marginBottom: '4%',}}>
                            a rapidly growing community of Bengalis and Indians in Erlangen, Germany and beyond!</p>


                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <img src={arrow} alt="Arrow" style={{ filter: 'invert(1)', width: 'auto', height: '6%', 
                            maxWidth: '6%', maxHeight: '100%', cursor: 'pointer' }} onClick={() => handleScrollDown()} />
                        </div>
                    </div>

                    <div style={{ opacity: showSecondDiv ? 1 : 0, transition: 'opacity 0.5s ease, transform 0.5s ease', 
                        transform: showSecondDiv ? 'translateY(-100px)' : 'translateY(10px)', zIndex: 1 }}>

                        {showSecondDiv  &&
                            <p style={{ fontFamily: 'Inter', fontSize: '3rem', color: 'white', fontWeight: 'bold', border: '3px solid white', 
                            padding: '20px', width: 'fit-content', margin: 'auto', textTransform: 'uppercase' }}>DURGAVILLE</p>
                        }
                    </div>
               
                </Grid.Column>

                <Grid.Column width={16} only='mobile' textAlign='center'>
                    <div style={{ opacity: showFirstDiv ? 1 : 0, transition: 'opacity 0.7s ease' }}>
                        <p style={{fontFamily: 'Inter', fontSize:'2.5rem', color:'white', fontWeight: 'bold', marginBottom: '5%',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                            WELCOME TO DURGAVILLE</p> 
                        <p style={{fontFamily: 'Inter', fontSize:'1.0rem', color:'white',fontStyle: 'italic', marginBottom: '7%',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
                            The Official Website of Durgaville, Erlangen,</p>   

                        <p style={{fontFamily: 'Inter', fontSize:'1.0rem', color:'white', fontStyle: 'italic',
                        marginLeft:'10%', marginRight:'10%', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', marginBottom: '10%',}}>
                            a rapidly growing community of Bengalis and Indians in Erlangen, Germany and beyond!</p>


                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <img src={arrow} alt="Arrow" style={{ filter: 'invert(1)', width: 'auto', height: '13%', 
                            maxWidth: '13%', maxHeight: '100%', cursor: 'pointer' }} onClick={() => handleScrollDown()}/>
                        </div>
                    </div>

                    <div style={{ opacity: showSecondDiv ? 1 : 0, transition: 'opacity 0.5s ease, transform 0.5s ease', 
                        transform: showSecondDiv ? 'translateY(-70px)' : 'translateY(10px)', zIndex: 1 }}>

                        {showSecondDiv  &&
                            <p style={{ fontFamily: 'Inter', fontSize: '2rem', color: 'white', fontWeight: 'bold', border: '2px solid white', 
                            padding: '16px', width: 'fit-content', margin: 'auto', textTransform: 'uppercase' }}>DURGAVILLE</p>
                        }
                    </div>
             
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
        
    </div>
  )
}

export default Greetings