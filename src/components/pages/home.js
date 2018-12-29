import React from 'react';
import Exemplar from '../exemplar';
import Features from '../features';
import Hero from '../hero';
import NavBar from '../navbar';

function Home(props) {
    const { classes } = props;

    return(
        <React.Fragment>
            <NavBar/>
            <Hero/>
            <Exemplar/>
            <Features/>
        </React.Fragment>
    );
}

export default Home;