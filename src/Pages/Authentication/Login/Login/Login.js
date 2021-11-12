import React, { useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { Container, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { NavLink, useLocation, useHistory } from 'react-router-dom';


const Login = () => {
    const { user, isLoading, authError, loginUser } = useAuth()
    const [userInfo, setUserInfo] = useState({})

    const location = useLocation()
    const history = useHistory()

    const handleOnChange = e => {
        const field = e.target.name
        const value = e.target.value
        const newLoginData = { ...userInfo }
        newLoginData[field] = value
        setUserInfo(newLoginData)
    }
    const handleLoginSubmit = e => {
        console.log(userInfo)
        loginUser(userInfo.Email, userInfo.Password, location, history)
        e.preventDefault()
    }
    return (
        <Container sx={{ marginTop: "100px" }}>
            <Typography variant="h3" sx={{ fontStyle: 'oblique' }} gutterBottom>Login</Typography>
            <form onSubmit={handleLoginSubmit}>
                <TextField name="Email" onBlur={handleOnChange} sx={{ width: "30%", m: 1 }} id="standard-basic" label="Your Email" variant="standard" />
                <br />
                <TextField
                    sx={{ width: "30%", m: 1, mb: 2 }}
                    name="Password"
                    onBlur={handleOnChange}
                    id="standard-password-input"
                    label="Your Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                />
                <br />
                <Button sx={{ width: "20%" }} variant="contained" type="submit">Sign In</Button>
                <br />
                <NavLink
                    to="/register"
                    style={{ textDecoration: "none" }}
                >
                    <Button sx={{ width: "30%" }} variant="text">New User? Please Register</Button>
                </NavLink>
            </form>
            <p>----------------------------------------------</p>
            <Button sx={{ width: "30%" }} variant="outlined">Google Sign In</Button>
            <br />
            {isLoading && <CircularProgress />}
            <br />
            {user?.email && <Alert severity="success">Login Successfully!</Alert>}
            {authError && <Alert severity="error">{authError}</Alert>}
        </Container >
    );
};

export default Login;