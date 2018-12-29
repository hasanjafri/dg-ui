import React from 'react';
import Hero from '../hero';
import NavBar from '../navbar';

function Home(props) {
    const { classes } = props;

    return(
        <React.Fragment>
            <NavBar/>
            <Hero/>
        </React.Fragment>
    );
}

export default Home;