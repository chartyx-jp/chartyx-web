import { Box, Typography } from '@mui/material';

export default function Header() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '80px',
                borderBottom: '1px solid white',
            }}
        >
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
        </Box>
    );
}
