'use client';
import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        allVariants: {
            color: '#222222',
        },
    },
});

export default theme;
