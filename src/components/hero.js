import React from 'react';
import glassesHeroImg from '../assets/images/glassesClarity.jpeg';

const Hero = () => {
  return (
    <section
      id="hero"
      className="blue lighten-4"
      style={{ backgroundImage: 'url(' + glassesHeroImg + ')'}}
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

          <a className="btn waves-light waves-effect m-r-16">Sign Up</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;