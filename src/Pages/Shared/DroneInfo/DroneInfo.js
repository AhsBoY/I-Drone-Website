import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const DroneInfo = ({ droneInfo }) => {
    // console.log(droneInfo)
    const { img, price, name, describe, _id } = droneInfo
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={img}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {describe}
                </Typography>
            </CardContent>
            <CardActions className="m-3 d-flex justify-content-between">
                <Typography variant="h5"> ${price} </Typography>
                <NavLink to={`/buy/${_id}`}><Button variant="contained" size="small">Buy Now</Button></NavLink>
            </CardActions>
        </Card>
    );
};

export default DroneInfo;