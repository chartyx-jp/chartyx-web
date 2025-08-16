'use client';

import PlanCard from '@/components/PlanCard';
import { Box, Typography } from '@mui/material';

export default function Plans() {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 10px',
            }}
        >
            {/* メインコンテナ */}
            <Box
                sx={{
                    display: 'flex',
                    width: {
                        xs: '90%',
                        md: '60%',
                    },
                    maxWidth: '1200px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                    gap: {
                        xs: 3,
                        md: 2,
                    },
                }}
            >
                {/* フリープラン */}
                <PlanCard 
                    name="Free" 
                    price={0} 
                    active={true} 
                    description={<Typography>無料です</Typography>}
                />
                {/* ノーマルプラン */}
                <PlanCard 
                    name="Base" 
                    price={1240} 
                    active={false} 
                    description={<Typography>有料です</Typography>}
                />
                {/* PROプラン */}
                <PlanCard 
                    name="Pro" 
                    price={3250} 
                    active={false} 
                    description={<Typography>プレミアムプランです</Typography>}
                />
            </Box>
        </Box>
    );
}