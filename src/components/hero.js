import React from 'react';
import Button from '@material-ui/core/Button';
import glassesHeroImg from '../assets/images/glassesClarity.jpeg';
import history from './history';

const Hero = () => {
  return (
    <section
      id="hero"
      className="blue lighten-4"
      style={{ backgroundImage: 'url(' + glassesHeroImg + ')' }}
    >
      <div className="container valign-wrapper jc-center">
        <div className="valign center-align white-text">
          <p className="flowtext hide-on-small-only">We give your business an internet presence</p>
          <h3>
            Develop, Deploy, Done
          </h3>

          <p className="big">
            We build your website using cutting edge frameworks
            <br/>
            entirely customized and made to order
          </p>

          <Button color="secondary" variant="raised" onClick={() => history.push('/register')}>
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;