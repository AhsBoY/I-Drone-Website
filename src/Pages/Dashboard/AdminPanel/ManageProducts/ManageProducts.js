import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, IconButton, Container, CircularProgress, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import useAuth from '../../../../Hooks/useAuth';
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

const ManageProducts = () => {
    const [dronesInfo, setDronesInfo] = useState([])
    const { isLoading } = useAuth()

    const handleDelete = id => {
        const confrimation = window.confirm("You Sure , User Will Be Very Mad At You?")
        if (confrimation) {

            axios.delete(`https://tranquil-castle-61630.herokuapp.com/drone/${id}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.deletedCount > 0) {
                        alert("User Is Crying")
                        if (isLoading) {
                            return <CircularProgress animation="border" variant="danger" />
                        }
                        else {
                            const remainingDronesInfo = dronesInfo.slice(1,).map(droneInfo => droneInfo._id !== id)
                            setDronesInfo(remainingDronesInfo)
                        }
                    }
                })
        }
    }
    useEffect(() => {
        axios.get("https://tranquil-castle-61630.herokuapp.com/drone")
            .then(data => setDronesInfo(data.data))
    }, [dronesInfo])
    return (
        <>
            <Container sx={{ my: "50px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Box>
                            <Typography sx={{ mb: 2 }} variant="h3">
                                Your Site Has {dronesInfo.length - 1} Products
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Price</StyledTableCell>
                                            <StyledTableCell align="center">Image</StyledTableCell>
                                            <StyledTableCell align="center">Admin Panel</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dronesInfo.length && dronesInfo.slice(1,).map((info) => (
                                            <StyledTableRow key={info._id}>
                                                <StyledTableCell align="center">{info.name}</StyledTableCell>
                                                <StyledTableCell align="center">{info.price}</StyledTableCell>
                                                <StyledTableCell align="center">{info.img}</StyledTableCell>
                                                <StyledTableCell align="center"><IconButton onClick={() => handleDelete(info._id)} aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid >
                </Grid >
            </Container >
            <Footer />
        </>
    );
};

export default ManageProducts;