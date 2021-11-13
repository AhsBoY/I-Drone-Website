import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PendingIcon from '@mui/icons-material/Pending';
import { Grid, IconButton, Container, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import Footer from '../../../Shared/Footer/Footer';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const ManageOrders = () => {
    const [ordersInfo, setOrdersInfo] = useState([])
    useEffect(() => {
        axios.get("https://tranquil-castle-61630.herokuapp.com/orders")
            .then(res => setOrdersInfo(res.data))
    }, [ordersInfo])


    const { isLoading } = useAuth()

    const handleDelete = id => {
        const confrimation = window.confirm("You Sure , User Will Be Very Mad At You?")
        if (confrimation) {

            axios.delete(`https://tranquil-castle-61630.herokuapp.com/orders/${id}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.deletedCount > 0) {
                        alert("User Is Crying")
                        if (isLoading) {
                            return <CircularProgress animation="border" variant="danger" />
                        }
                        else {
                            setOrdersInfo(res.data)
                        }
                    }
                })
        }
    }

    const handleUpdate = id => {
        const orderInfo = ordersInfo.filter(info => info._id === id)
        orderInfo[0].status = "Shipped"
        axios.put(`https://tranquil-castle-61630.herokuapp.com/orders/${id}`, orderInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    alert("Now User Will Be Happyy!!!!!")
                    setOrdersInfo(res.data)
                }
            })
    }

    return (
        <>
            <Container sx={{ my: "50px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Email</StyledTableCell>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Email</StyledTableCell>
                                            <StyledTableCell align="center">Drone Name</StyledTableCell>
                                            <StyledTableCell align="center">Phone Number</StyledTableCell>
                                            <StyledTableCell align="center">Address</StyledTableCell>
                                            <StyledTableCell align="center">Status</StyledTableCell>
                                            <StyledTableCell align="center">Admin Control</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ordersInfo.length && ordersInfo.map((info) => (
                                            <StyledTableRow key={info._id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {info.email}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{info.name}</StyledTableCell>
                                                <StyledTableCell align="center">{info.email}</StyledTableCell>
                                                <StyledTableCell align="center">{info.droneName}</StyledTableCell>
                                                <StyledTableCell align="center">{info.phoneNumber}</StyledTableCell>
                                                <StyledTableCell align="center">{info.address}</StyledTableCell>
                                                <StyledTableCell align="center">{info.status}</StyledTableCell>
                                                <StyledTableCell align="center"><IconButton onClick={() => handleDelete(info._id)} aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                                    <IconButton onClick={() => handleUpdate(info._id)} aria-label="delete">
                                                        <PendingIcon />
                                                    </IconButton>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default ManageOrders;