import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Utilities.css"

const Utilities = () => {
    const [image, setImage] = useState({})
    useEffect(() => {
        axios.get("https://tranquil-castle-61630.herokuapp.com/drone")
            .then(res => setImage(res.data[0]))
    }, [])
    return (
        <Box sx={{ backgroundColor: "#efefef" }}>
            <Box className="style" >
                <Box sx={{ textAlign: "start", py: 5 }}>
                    <Typography sx={{ fontWeight: "bold" }} variant="h4">
                        Show Your Great Preformance <br /> With Designed  Custom Icons
                    </Typography>
                    <Typography sx={{ py: 2 }} color="text.secondary">
                        Custom created icons crafted for drone photography, videos,
                        camera etc. including the most popular ones like
                        FontAwesome or Icon 7 Stroke.
                    </Typography>
                    <Button variant="contained">Learn More</Button>
                </Box>
                <Box>
                    <img className="image" src={image.img1} alt="" />
                </Box>
            </Box>
        </Box>
    );
};

export default Utilities;