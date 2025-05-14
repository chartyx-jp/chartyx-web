// プラン一覧
'use client';

import PlanCard from '@/components/PlanCard';
import { Box, Typography } from '@mui/material';

export default function plans() {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100svh',
                backgroundColor: '#000',
            }}
        >
            {/* ヘッダー */}
            <Box
                sx={{
                    display: 'flex',
                    position: 'relative',
                    width: '100%',
                    height: '80px',
                }}
            >
                <Typography
                    sx={{
                        width: '120px',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        textAlign: 'center',
                        lineHeight: '80px',
                        font: 'sans-serif',
                        color: 'white',
                        fontSize: '1.5rem',
                    }}
                >
                    Chartyx
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: '2rem',
                        margin: '0 auto',
                    }}
                    component={'h1'}
                    textAlign={'center'}
                >
                    Plans
                </Typography>
            </Box>

            {/* メインコンテナ */}
            <Box
                sx={{
                    display: 'flex',
                    width: '1200px',
                    height: '80%',
                    margin: '0 auto',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* フリープラン */}
                <PlanCard name="Free" price={0} active={true} description={<Typography>無料です</Typography>}></PlanCard>
                {/* ノーマルプラン */}
                <PlanCard name="Base" price={1240} active={false} description={<Typography>有料です</Typography>}></PlanCard>
                {/* PROプラン */}
                <PlanCard name="Pro" price={3250} active={false} description={<Typography>帰りたいです</Typography>}></PlanCard>
            </Box>

            {/* フッター */}
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
                footer
            </Box>
        </Box>
    );
}
