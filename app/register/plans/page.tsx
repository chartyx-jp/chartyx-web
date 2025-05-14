// プラン一覧
'use client';

import PlanCard from '@/components/PlanCard';
import { Box, Typography } from '@mui/material';

export default function plans() {
    return (
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
            {/* メインコンテナ */}
            <Box
                sx={{
                    display: 'flex',
                    width: {
                        xs: '90%',
                        md: '60%',
                    },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                    mt: {
                        xs: 2,
                        md: 0,
                    },
                }}
            >
                {/* フリープラン */}
                <PlanCard name="Free" price={0} active={true} description={<Typography>無料です</Typography>}></PlanCard>
                {/* ノーマルプラン */}
                <PlanCard name="Base" price={1240} active={false} description={<Typography>有料です</Typography>}></PlanCard>
                {/* PROプラン */}
                <PlanCard name="Pro" price={3250} active={false} description={<Typography>帰りたいです</Typography>}></PlanCard>
            </Box>
        </Box>
    );
}
