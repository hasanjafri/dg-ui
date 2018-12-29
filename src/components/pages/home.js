import React from 'react';
import Exemplar from '../exemplar';
import Hero from '../hero';
import NavBar from '../navbar';

function Home(props) {
    const { classes } = props;

    return(
        <React.Fragment>
            <NavBar/>
            <Hero/>
            <Exemplar/>
        </React.Fragment>
    );
}

export default Home;