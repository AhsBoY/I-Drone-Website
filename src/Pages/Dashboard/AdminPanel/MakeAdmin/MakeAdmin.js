import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const MakeAdmin = () => {
    const [email, setEmail] = useState("")
    const handleOnBlur = e => {
        setEmail(e.target.value)
    }
    const handleAdminSubmit = e => {
        const confirm = window.confirm(`You Are Making ${email} A Admin`)
        if (confirm) {
            const user = { email }
            axios.put("http://localhost:5000/users/admin", user)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.modifiedCount) {
                        alert(`Now ${email} Becomes New Admin `)
                        setEmail('')
                    }
                })
        }
        e.preventDefault()
    }
    return (
        <Container sx={{ my: 6 }}>
            <Typography variant="h4">
                Make Admin For Managing Your Site
            </Typography>
            {/* {success && <Alert severity="success">Yo Is Our New Admin</Alert>} */}
            <form onSubmit={handleAdminSubmit}>
                <TextField sx={{ width: "25%" }} id="standard-basic" type="email" onBlur={handleOnBlur} label="Your Email" variant="standard" ></TextField>
                <br />
                <br />
                <Button type="submit" variant="contained">Make Admin</Button>
            </form>
        </Container>
    );
};

export default MakeAdmin;