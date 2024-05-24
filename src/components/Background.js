import React, { useEffect } from 'react';
import { Image, Grid } from 'semantic-ui-react';
import background from '../assets/background.jpg';

function Background() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = background;
    link.as = 'image';
    document.head.appendChild(link);

    return () => {
      // Clean up: remove the preload link when the component unmounts
      document.head.removeChild(link);
    };
  }, []);

  const homeStyle = {
    width: '100%',
    overflow: 'hidden',
  };

  return (
    <div style={homeStyle}>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={16} only="computer">
            <Image src={background} style={{ width: '100%', maxHeight: '100%', height: '100vh' }} />
          </Grid.Column>

          <Grid.Column width={16} only="tablet">
            <Image src={background} style={{ width: '100%', maxHeight: '100%', height: '70vh' }} />
          </Grid.Column>

          <Grid.Column width={16} only="mobile">
            <Image src={background} style={{ width: '100%', maxHeight: '100%', height: '50vh' }} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Background;
