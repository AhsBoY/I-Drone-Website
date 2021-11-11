import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigations from '../../Shared/Navigations/Navigations';
import Banner from '../Banner/Banner';
import Drones from '../Drones/Drones';

const Home = () => {
    return (
        <div>
            <Navigations />
            <Banner />
            <Drones />
            <Footer />
        </div>
    );
};

export default Home;