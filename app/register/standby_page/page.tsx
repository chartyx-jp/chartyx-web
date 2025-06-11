'use client'
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

import { useAuth } from '@/app/contexts/AuthContexts';

export default function StandbyPage() {
    const { grobalEmail } = useAuth()

        useEffect(() => {
            if(grobalEmail) {
                console.log(`email changed ${grobalEmail}`)
            } else {
                console.log('email reset')
            }
        }, [grobalEmail]);


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
                {grobalEmail}
            </Typography>
        </Box>
    )
}