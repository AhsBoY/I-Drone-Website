import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../Shared/Footer/Footer';
import Navigations from '../Shared/Navigations/Navigations';
import PlaceOrder from './PlaceOrder';
import Container from '@mui/material/Container';


const Purchase = () => {
    const [droneInfo, setDroneInfo] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:5000/drone/${id}`)
            .then(data => setDroneInfo(data.data))
    }, [])

    return (
        <Container>
            <Navigations />
            <PlaceOrder key={droneInfo._id} droneInfo={droneInfo} id={id} />
            <Footer />
        </Container>
    );
};

export default Purchase;