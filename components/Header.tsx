"use client";

import { Box, Typography } from '@mui/material';

import UserIcon from './UserIcon';

type props = {
    children?: React.ReactNode;
}

export default function Header({children}: props) {
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'fixed',
                top: 0,
                zIndex: 999,
                alignItems: 'center',
                width: '100%',
                height: '60px',
                borderBottom: '0.5px solid #ddd',
                backgroundColor: '#000',
            }}
        >
            {children}
            <Typography
                sx={{
                    color: 'white',
                    fontSize: '25pt',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    ml: 2,
                }}
                component={'a'}
                href="/"
            >
                Chartyx
            </Typography>
            <UserIcon></UserIcon>
        </Box>
    );
}
