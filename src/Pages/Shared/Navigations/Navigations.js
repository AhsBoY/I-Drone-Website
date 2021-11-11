import { Box } from '@mui/system';
import React from 'react';
import { Container, Form, FormControl, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Navigations = () => {
    const { user, logout } = useAuth()
    return (
        <Container className="sticky-top">
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand className="fst-italic" style={{ color: 'orange' }}>I Drone</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link ><NavLink className="text-decoration-none text-dark fs-5" to="/home">Home</NavLink></Nav.Link>
                            <Nav.Link ><NavLink className="text-decoration-none text-dark fs-5" to="/explore">Explore</NavLink></Nav.Link>
                            {user.email && <Nav.Link ><NavLink className="text-decoration-none text-dark fs-5" to="/dasboard">Dashboard</NavLink></Nav.Link>}
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Box sx={{ marginX: "10px" }}>
                            {
                                user?.email ?
                                    <Button onClick={logout} color="inherit">Logout</Button>
                                    :
                                    <NavLink style={{ textDecoration: "none", color: "white" }} to="/login"><Button color="inherit">Login</Button></NavLink>
                            }
                        </Box>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
};

export default Navigations;