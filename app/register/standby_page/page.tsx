'use client'
import { Box, Typography } from '@mui/material';

export default function StandbyPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100svh',
                backgroundColor: '#000',
            }}
        >
            <Typography
                sx={{
                    color: 'white',
                    fontSize: '20pt',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                }}
            >
                
            </Typography>
        </Box>
    )
}