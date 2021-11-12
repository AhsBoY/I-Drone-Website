import { Typography, Container, TextField, Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Review = () => {
    const { user } = useAuth()
    const [reviewInfo, setReviewInfo] = useState({ name: `${user.displayName}` })
    const history = useHistory()

    const handleReviewInfo = e => {
        const field = e.target.name
        const value = e.target.value
        const newReviewInfo = { ...reviewInfo }
        newReviewInfo[field] = value
        setReviewInfo(newReviewInfo)
    }

    const handleSubmitReviewInfo = e => {
        e.preventDefault()
        console.log(reviewInfo)
        axios.post("http://localhost:5000/review", reviewInfo)
            .then(res => {
                // console.log(res.data)
                if (res.data.insertedId) {
                    const confirm = window.confirm("Your Review Submitted Successfully...Want To See Your Review??")
                    if (confirm) {
                        history.replace("/")
                    }
                }
            })
    }

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" component="div">
                Please Give Your Valueable Review !!!
            </Typography>
            <Box sx={{ my: 5 }}>
                <form onSubmit={handleSubmitReviewInfo}>
                    <TextField
                        sx={{ width: "30%", m: 1 }}
                        id="outlined-size-small"
                        label="Name"
                        defaultValue={user.displayName}
                        size="small"
                        disabled
                    />
                    <br />
                    <TextField
                        sx={{ width: "30%", m: 1 }}
                        id="outlined-textarea"
                        label="Give Your Description"
                        name="describe"
                        onBlur={handleReviewInfo}
                        placeholder="Placeholder"
                        type="text"
                        multiline
                        required
                    />
                    <br />
                    <TextField
                        sx={{ width: "30%", m: 1 }}
                        type="number"
                        id="outlined-size-small"
                        name="ratings"
                        label="Give Your Ratings"
                        onBlur={handleReviewInfo}
                        size="small"
                        InputProps={{
                            inputProps: {
                                max: 5, min: 0
                            }
                        }}
                        required
                    />
                    <Box sx={{ display: 'flex', justifyContent: "center", }}>
                        <Button sx={{ width: "30%" }} variant="contained" type="submit">Submit</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Review;