import { Grid, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import axios from 'axios';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

const PlaceOrder = ({ id, droneInfo }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useAuth()
    const { name, img, price, describe } = droneInfo
    const defaultInfo = { name: user.displayName, email: user.email, phoneNumber: "", droneName: name, address: "", status: "Pending" }
    const [orderInfo, setOrderInfo] = useState(defaultInfo)
    const handleOrdeInfo = e => {
        const field = e.target.name
        const value = e.target.value
        const newUser = { ...orderInfo }
        newUser[field] = value
        setOrderInfo(newUser)
    }
    const handleSubmit = e => {
        // console.log(orderInfo)
        axios.post("http://localhost:5000/orders", orderInfo)
            .then(data => {
                // console.log(data.data)
                if (data.data.insertedId) {
                    handleOpen()
                }
            })
        e.preventDefault()
    }
    return (
        <Container sx={{ marginTop: "50px" }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item md={8} sm={12}>
                    <Box container>
                        <img style={{ width: "600px" }} src={img} alt="" srcset="" />
                        <Typography variant="h3">
                            {name}
                        </Typography>
                        <Typography variant="body1">
                            {describe}
                        </Typography>
                        <Box sx={{ marginX: "20px", display: "flex", justifyContent: "center" }}>
                            <Typography variant="h5">
                                ${price}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid sx={{ marginTop: "130px" }} item md={4} sm={12}>
                    <Typography variant="h4" >
                        Place Your Order
                    </Typography>
                    <Box sx={{ marginTop: "20px" }}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                disabled
                                sx={{ width: "90%", m: 1 }}
                                id="outlined-size-small"
                                label="Drone Name"
                                name="droneName"
                                defaultValue={name}
                                size="small"
                            />
                            <TextField
                                sx={{ width: "90%", m: 1 }}
                                id="outlined-size-small"
                                label="Email"
                                name="email"
                                onBlur={handleOrdeInfo}
                                defaultValue={user.email}
                                size="small"
                            />
                            <TextField
                                sx={{ width: "90%", m: 1 }}
                                id="outlined-size-small"
                                label="Name"
                                name="name"
                                onBlur={handleOrdeInfo}
                                defaultValue={user.displayName}
                                size="small"
                            />
                            <TextField
                                sx={{ width: "90%", m: 1 }}
                                id="outlined-size-small"
                                label="Phone Number"
                                name="phoneNumber"
                                onBlur={handleOrdeInfo}
                                size="small"
                                required
                            />
                            <TextField
                                sx={{ width: "90%", m: 1 }}
                                id="outlined-size-small"
                                name="address"
                                label="Address"
                                onBlur={handleOrdeInfo}
                                size="small"
                                type="text"
                                required
                            />
                            <Box sx={{ display: 'flex', justifyContent: "center", mr: 4 }}>
                                <Button variant="contained" type="submit">Send</Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Your Ordered Placed Successfully
                        </Typography>
                        <Typography variant="subtitle2" id="modal-modal-description" sx={{ mt: 2, ml: 6 }}>
                            Shipping Will Be Started Soon
                        </Typography>
                    </Box>
                </Modal>
            </Grid>
        </Container>
    );
};

export default PlaceOrder;