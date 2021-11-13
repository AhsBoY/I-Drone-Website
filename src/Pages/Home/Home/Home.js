import { Box } from '@mui/system';
import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigations from '../../Shared/Navigations/Navigations';
import Banner from '../Banner/Banner';
import Drones from '../Drones/Drones';
import Reviews from '../Review/Reviews';
import Utilities from '../Utilities/Utilities';

const Home = () => {
    return (
        <Box>
            <Navigations />
            <Banner />
            <Drones />
            <Reviews />
            <Utilities />
            <Footer />
        </Box>
    );
};

export default Home;