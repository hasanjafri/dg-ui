import React from 'react';
import About from '../about';
import Exemplar from '../exemplar';
import Features from '../features';
import Footer from '../footer';
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
            <About/>
            <Footer/>
        </React.Fragment>
    );
}

export default Home;