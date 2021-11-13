import { Typography, Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: "#424242" }}>
            <Container sx={{ py: 5 }}>
                <Typography color="white">
                    All Rights Reserved By Priotomoa Inc , 2021
                    <br />
                    <InstagramIcon />
                    <FacebookIcon />
                    <TwitterIcon />
                </Typography>

            </Container>
        </Box>
    );
};

export default Footer;