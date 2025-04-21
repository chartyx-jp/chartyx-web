'use client';

import { Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
    const [name, setName] = useState('');
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100svh',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                }}
            >
                {name || '名無し'}さん、こんにちは！
            </Typography>
            <TextField
                sx={{
                    width: '300px',
                    mt: 2,
                }}
                label="名前"
                placeholder="あなたの名前は？"
                onChange={(e) => setName(e.target.value)}
            ></TextField>
            <Link href={'/graph'}>
                <Typography>チャートを開く</Typography>
            </Link>
        </Box>
    );
}
