import { Box, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '80px',
                borderTop: 'solid 1px #ccc',
            }}
        >
            <Typography>Footer!</Typography>
        </Box>
    );
}
