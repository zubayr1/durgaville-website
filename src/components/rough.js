import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import arrow from '../assets/down_arrow.svg';
import './greetings.css';

function Greetings({ onScrollDown }) {
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [showSecondDiv, setShowSecondDiv] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleScrollDown = () => {
    let targetScroll;
    const viewportHeight = window.innerHeight;

    if (window.innerWidth >= 1024) {
      targetScroll = viewportHeight / 1.1;
    } else if (window.innerWidth >= 768) {
      targetScroll = viewportHeight / 1.5;
    } else {
      targetScroll = viewportHeight / 2;
    }

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
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

  const showTooltipText = () => {
    setShowTooltip(true);
  };

  const hideTooltipText = () => {
    setShowTooltip(false);
  };

  return (
    <div className="greetings-container">
      <Grid>
        <Grid.Row>
          {/* Your Grid.Column components here */}
        </Grid.Row>
      </Grid>
      
      {/* Arrow component with tooltip */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer'
        }}
        onClick={handleScrollDown}
        onMouseEnter={showTooltipText}
        onMouseLeave={hideTooltipText}
      >
        <img
          src={arrow}
          alt="Arrow"
          style={{
            filter: 'invert(1)',
            width: 'auto',
            height: '30px',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
        {showTooltip && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              right: '50%',
              transform: 'translateX(50%)',
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          >
            Go down
          </div>
        )}
      </div>
    </div>
  );
}

export default Greetings;