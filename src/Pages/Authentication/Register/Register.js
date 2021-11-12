import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import useAuth from '../../../Hooks/useAuth';
import { NavLink, useHistory } from 'react-router-dom';


const Register = () => {
    const [registerData, setRegisterData] = useState({})
    const { user, registerUser, isLoading, authError } = useAuth();
    const history = useHistory()
    const handleOnBlur = e => {
        const field = e.target.name
        const value = e.target.value
        const newRegisterData = { ...registerData }
        newRegisterData[field] = value
        setRegisterData(newRegisterData)
    }
    const handleLoginSubmit = e => {
        registerUser(registerData.email, registerData.password, history, registerData.name)
        e.preventDefault()

    }

    return (
        <Container sx={{ marginTop: "100px" }}>
            <Typography variant="body1" gutterBottom>Register</Typography>
            <br />
            {!isLoading && <form onSubmit={handleLoginSubmit}>
                <TextField
                    sx={{ width: '30%', m: 1 }}
                    id="standard-basic"
                    label="Your Name"
                    name="name"
                    onBlur={handleOnBlur}
                    variant="standard" />
                <br />
                <TextField
                    sx={{ width: '30%', m: 1 }}
                    id="standard-basic"
                    label="Your Email"
                    name="email"
                    type="email"
                    onBlur={handleOnBlur}
                    variant="standard" />
                <br />
                <TextField
                    sx={{ width: '30%', m: 1 }}
                    id="standard-basic"
                    label="Your Password"
                    type="password"
                    name="password"
                    onBlur={handleOnBlur}
                    variant="standard" />
                <br />
                <TextField
                    sx={{ width: '30%', m: 1 }}
                    id="standard-basic"
                    label="ReType Your Password"
                    type="password"
                    name="password2"
                    onBlur={handleOnBlur}
                    variant="standard" />
                <br />
                <Button sx={{ width: '20%', m: 1 }} type="submit" variant="contained">Register</Button>
                <br />
                <NavLink
                    style={{ textDecoration: 'none' }}
                    to="/login">
                    <Button variant="text">Already Registered? Please Login</Button>
                </NavLink>
            </form>}
            {isLoading && <CircularProgress />}
            {user?.email && <Alert severity="success">User Created successfully!</Alert>}
            {authError && <Alert severity="error">{authError}</Alert>}

        </Container >
    );
};

export default Register;