"use client";

import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
    const theme = useTheme();
    
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`,
                py: 3,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    align="center"
                    sx={{ 
                        color: theme.palette.text.secondary 
                    }}
                >
                    © 2024 Chartyx. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}
