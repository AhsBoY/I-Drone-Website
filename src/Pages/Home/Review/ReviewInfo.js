import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Box } from '@mui/system';
import { Rating } from '@mui/material';

const ReviewInfo = ({ reviewInfo }) => {
    const { name, describe, ratings } = reviewInfo
    return (
        <Card sx={{ minWidth: 205, border: 0, boxShadow: 0 }}>
            <CardContent>
                <Box>
                    <Rating name="read-only" value={ratings} readOnly />
                </Box>
                <Typography sx={{ fontWeight: "bold" }} color="text.dark" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="h5" component="div">
                    {describe}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Our Regular Visitor
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ReviewInfo;