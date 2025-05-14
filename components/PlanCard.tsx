import { Box, Paper, Typography } from '@mui/material';
import { JSX } from 'react';

type props = {
    name: string;
    price: number;
    active: boolean;
    description: JSX.Element;
};

export default function PlanCard({ name, price, active, description }: props) {
    return (
        <Paper
            sx={{
                height: '90%',
                width: '350px',
                backgroundColor: '#000',
                border: 'solid 1px #ccc',
                borderRadius: '10px',
                px: 3,
                py: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-betweens',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '40pt',
                        fontWeight: 'bold',
                    }}
                >
                    {name}
                </Typography>
                <Box sx={{ display: 'flex', mr: 0, ml: 'auto', mb: 1, alignItems: 'flex-end' }}>
                    <Typography sx={{ fontSize: '25pt' }}>{price}</Typography>
                    <Typography sx={{ fontSize: '10pt', mb: '8px', ml: 0.5 }}>円/月</Typography>
                </Box>
            </Box>
            {active ? (
                // 現在のプランであれば表示する
                <Box
                    sx={{
                        my: 2,
                        height: '50px',
                        border: '2px solid orange',
                        borderRadius: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ fontWeight: 'bold' }}>現在のプラン</Typography>
                </Box>
            ) : (
                // それ以外は位置を揃えるために空白にする
                <Box sx={{ height: '50px', my: 2 }}></Box>
            )}
            <Box>{description}</Box>
        </Paper>
    );
}
