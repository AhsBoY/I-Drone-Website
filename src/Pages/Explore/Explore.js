import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import DroneInfo from '../Shared/DroneInfo/DroneInfo';
import Navigations from '../Shared/Navigations/Navigations';


const Explore = () => {
    const [dronesInfo, setDronesInfo] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/drone")
            .then(data => setDronesInfo(data.data))
    }, [])

    return (
        <>
            <Navigations />
            <Container>
                <h2>Our Drones</h2>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="mt-5">
                    {dronesInfo.slice(1, 7).map((droneInfo) => (
                        <Grid item xs={4} sm={4} md={4} key={droneInfo._id}>
                            <DroneInfo droneInfo={droneInfo} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Explore;