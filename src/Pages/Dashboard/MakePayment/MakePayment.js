import { Typography, Container } from '@mui/material';
import React from 'react';
import Footer from '../../Shared/Footer/Footer';

const MakePayment = () => {
    return (
        <>
            <Container sx={{ my: 5, mb: 60 }}>
                <Typography variant="h5">
                    Payment Syestem Is Coming Till Then....
                </Typography>
                <Typography variant="h6">
                    Talk With Your Pritoma :)
                </Typography>
            </Container>
            <Footer />
        </>
    );
};

export default MakePayment;