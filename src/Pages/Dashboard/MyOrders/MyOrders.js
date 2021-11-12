import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from "../../../Hooks/useAuth"
import Container from '@mui/material/Container';
import { Typography, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';


const MyOrders = () => {
    const { user } = useAuth()
    const [ordersInfo, setOrdersInfo] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${user.email}`)
            .then(data => setOrdersInfo(data.data))
    }, [ordersInfo])

    const handleCancelNow = id => {
        const confirmation = window.confirm("Are You Sure??")
        if (confirmation) {
            axios.delete(`http://localhost:5000/order/${id}`)
                .then(data => {
                    if (data.data.deletedCount > 0) {
                        alert("Now Admin Will Cry")
                        const remainingOrders = ordersInfo.filter(orderInfo => orderInfo._Id !== id)
                        setOrdersInfo(remainingOrders)
                    }
                })
        }
    }

    return (
        <Container>
            <Typography variant="h4">
                You Have Placed {ordersInfo.length || 0} Orders
            </Typography>
            <Box sx={{ my: 5 }}>
                {ordersInfo.length && ordersInfo.map(orderInfo => <Box key={orderInfo._id}>
                    <Typography variant="h5">
                        Drone Name:{orderInfo.droneName}
                    </Typography>
                    <Typography variant="body1">
                        Phone Number:{orderInfo.phoneNumber}
                    </Typography>
                    <Typography variant="body2">
                        Status:{orderInfo.status}
                    </Typography>
                    <Button onClick={() => handleCancelNow(orderInfo._id)} variant="contained" color="error" size="small"> Cancel Now</Button>
                </Box>)
                }
            </Box>
        </Container>
    );
};

export default MyOrders;