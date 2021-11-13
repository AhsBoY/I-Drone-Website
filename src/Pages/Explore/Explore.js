import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import DroneInfo from '../Shared/DroneInfo/DroneInfo';
import Navigations from '../Shared/Navigations/Navigations';
import Footer from '../Shared/Footer/Footer';


const Explore = () => {
    const [dronesInfo, setDronesInfo] = useState([])

    useEffect(() => {
        axios.get("https://tranquil-castle-61630.herokuapp.com/drone")
            .then(data => setDronesInfo(data.data))
    }, [])

    return (
        <>
            <Navigations />
            <Container sx={{ my: 5 }}>
                <h2>Our <span style={{ color: "orange" }}>Collections</span></h2>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="mt-5">
                    {dronesInfo.slice(1,).map((droneInfo) => (
                        <Grid item xs={4} sm={4} md={4} key={droneInfo._id}>
                            <DroneInfo droneInfo={droneInfo} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default Explore;