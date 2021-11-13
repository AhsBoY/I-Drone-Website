import { TextField, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import Footer from '../../../Shared/Footer/Footer';

const AddProducts = () => {
    const [productsInfo, setProductsInfo] = useState({})


    const handleOnblur = e => {
        const field = e.target.name
        const value = e.target.value
        const newInfo = { ...productsInfo }
        newInfo[field] = value
        setProductsInfo(newInfo)
    }

    const handleSubmit = e => {
        console.log(productsInfo)
        axios.post("http://localhost:5000/drone", productsInfo)
            .then(res => {
                if (res.data.insertedId) {
                    alert("Added SuccessFully")
                    setProductsInfo("")
                    setProductsInfo("")
                }
            })
        e.preventDefault()
    }
    return (
        <>
            <Box sx={{ my: 10 }}>
                <Typography sx={{ my: 3 }} variant="h4">
                    Add Products
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField id="standard-basic" onBlur={handleOnblur} type="text" name="name" label="Drone Name" variant="standard" required />
                    <br />
                    <TextField id="standard-basic" onBlur={handleOnblur} name="img" label="Give Your Image Link" variant="standard" />
                    <br />
                    <br />
                    <TextField
                        id="outlined-textarea"
                        label="Give Your Description"
                        name="describe"
                        onBlur={handleOnblur}
                        placeholder="Placeholder"
                        multiline
                        required
                    />
                    <br />
                    <TextField id="standard-basic" onBlur={handleOnblur} name="price" label="Price" type="number" variant="standard" required />
                    <br />
                    <br />
                    <Button type="submit" typeof="submit" variant="contained">Add Products</Button>
                </form>
            </Box>
            <Footer />
        </>
    );
};

export default AddProducts;