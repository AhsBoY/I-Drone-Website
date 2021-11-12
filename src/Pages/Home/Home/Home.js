import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigations from '../../Shared/Navigations/Navigations';
import Banner from '../Banner/Banner';
import Drones from '../Drones/Drones';
import Review from '../Review/Review';

const Home = () => {
    return (
        <div>
            <Navigations />
            <Banner />
            <Drones />
            <Review />
            <Footer />
        </div>
    );
};

export default Home;