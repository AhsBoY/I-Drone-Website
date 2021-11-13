import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
    return (
        <Box sx={{ mt: 25 }}>
            <ErrorOutlineIcon sx={{ width: 500, height: 300 }} />
            <Typography>
                You Shouldn't Visit Here
            </Typography>
        </Box>
    );
};

export default NotFound;