import { Container, Grid, Paper, Rating, Typography } from '@mui/material';
import { Box, textAlign } from '@mui/system';
import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import ReviewInfo from './ReviewInfo';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const Reviews = () => {
    const [reviewInfo, setReviewInfo] = useState([])

    useEffect(() => {
        axios.get("https://tranquil-castle-61630.herokuapp.com/review")
            .then(res => setReviewInfo(res.data))
    }, [])

    return (
        <Container sx={{ mt: 5 }}>
            <Box>
                <Typography variant="h4" sx={{ color: " orange" }}>
                    Reviews
                </Typography>
            </Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    reviewInfo.length && reviewInfo.map(info =>
                        <Grid item xs={12} md={4}>
                            <ReviewInfo key={info._Id} reviewInfo={info} ></ReviewInfo>
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
};

export default Reviews;