'use client';
import { Box, Typography } from '@mui/material';

import Header from '@/components/Header';

export default function TopPage() {

    return (
        <Box>
            <Header></Header>
            <Box
                sx={{
                    width: '100vw',
                    minHeight: 'calc(100svh - 80px)',
                    backgroundColor: '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        mb: 2,
                    }}>
                        toppage
                </Typography>
            </Box>
        </Box>
    )}