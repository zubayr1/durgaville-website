import React from 'react';
import { Divider, Grid, Image } from 'semantic-ui-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MagazineDeclare from './MagazineDeclare';
import './home.css';
import thakurhome from '../assets/thakurHome.jpg';

// Dynamically create an array of image paths
const imagePaths = [];
for (let i = 1; i <= 26; i++) {
  imagePaths.push(require(`../assets/slide/slide${i}.jpeg`));
}

function Home() {
  const sliderSettings = {
    dots: false, // Set dots to false to remove the dots under the slider
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false, // Ensure dots are also disabled for smaller screen sizes
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false, // Ensure dots are also disabled for smaller screen sizes
        },
      },
    ],
  };

  return (
    <div style={{ backgroundColor: '#dee0e3' }}>
      <div className="margin-container">
        <Grid centered>
          <Grid.Column only="computer" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '4.5rem',
                color: 'black',
                fontWeight: 'bold',
                marginBottom: '5%',
                marginTop: '6%',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              ABOUT DURGAVILLE
            </p>

            <p style={{ fontFamily: 'Inter', lineHeight: '2.0', fontSize: '1.6rem', color: 'black', fontStyle: 'italic', marginBottom: '5%', marginLeft: '7%', marginRight: '7%' }}>
              "Durgaville" stands as a testament to the enduring spirit of Durga Puja among Bengalis, transcending borders to find expression in Erlangen, Germany. Initiated by
              three Bengali families, it began as a heartfelt endeavor to recreate the essence of Durga Puja away from home. Over time, "Durgaville" has blossomed into a vibrant
              community, not only celebrating Durga Puja but also fostering unity through a plethora of cultural, social, and sporting events. This expansion reflects their aim to
              foster camaraderie and togetherness among the Indian community in Erlangen.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image alt="Thakur Durgaville" src={thakurhome} style={{ height: '96vh' }} />
            </div>

            {/* Embed Video */}
            <div className="video-container">
              <iframe
                width="100%"
                height="auto"
                src="https://www.youtube.com/embed/tofLwpMQ0LI?si=uLsQfkEp-WofoZFm"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Grid.Column>

          <Grid.Column only="tablet" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '3.5rem',
                color: 'black',
                fontWeight: 'bold',
                marginBottom: '5%',
                marginTop: '6%',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              ABOUT DURGAVILLE
            </p>

            <p style={{ fontFamily: 'Inter', lineHeight: '1.8', fontSize: '1.4rem', color: 'black', fontStyle: 'italic', marginBottom: '5%', marginLeft: '6%', marginRight: '6%' }}>
              "Durgaville" stands as a testament to the enduring spirit of Durga Puja among Bengalis, transcending borders to find expression in Erlangen, Germany. Initiated by
              three Bengali families, it began as a heartfelt endeavor to recreate the essence of Durga Puja away from home. Over time, "Durgaville" has blossomed into a vibrant
              community, not only celebrating Durga Puja but also fostering unity through a plethora of cultural, social, and sporting events. This expansion reflects their aim to
              foster camaraderie and togetherness among the Indian community in Erlangen.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '6%' }}>
              <Image alt="Thakur Durgaville" src={thakurhome} style={{ height: '80vh' }} />
            </div>

            {/* Embed Video */}
            <div className="video-container">
              <iframe
                width="100%"
                height="auto"
                src="https://www.youtube.com/embed/tofLwpMQ0LI?si=uLsQfkEp-WofoZFm"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Grid.Column>

          <Grid.Column only="mobile" width={16} textAlign="middle">
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '2.5rem',
                color: 'black',
                fontWeight: 'bold',
                marginBottom: '5%',
                marginTop: '6%',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              ABOUT DURGAVILLE
            </p>

            <p style={{ fontFamily: 'Inter', lineHeight: '1.5', fontSize: '1.2rem', color: 'black', fontStyle: 'italic', marginBottom: '5%', marginLeft: '6%', marginRight: '6%' }}>
              "Durgaville" stands as a testament to the enduring spirit of Durga Puja among Bengalis, transcending borders to find expression in Erlangen, Germany. Initiated by
              three Bengali families, it began as a heartfelt endeavor to recreate the essence of Durga Puja away from home. Over time, "Durgaville" has blossomed into a vibrant
              community, not only celebrating Durga Puja but also fostering unity through a plethora of cultural, social, and sporting events. This expansion reflects their aim to
              foster camaraderie and togetherness among the Indian community in Erlangen.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '6%' }}>
              <Image alt="Thakur Durgaville" src={thakurhome} />
            </div>

            {/* Embed Video */}
            <div className="video-container">
              <iframe
                width="100%"
                height="auto"
                src="https://www.youtube.com/embed/tofLwpMQ0LI?si=uLsQfkEp-WofoZFm"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Grid.Column>
        </Grid>

        <Divider />

        <Grid centered>
          <MagazineDeclare />
        </Grid>

        <div style={{ marginTop: '5%', maxWidth: '80%', margin: '0 auto' }}>
          <Slider {...sliderSettings}>
            {imagePaths.map((image, index) => (
              <div key={index} className="slider-item">
                <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Home;