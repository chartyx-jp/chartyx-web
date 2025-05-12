// プラン一覧
'use client';

import { Box, Button, Typography, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
                }}>

{/* フリープラン */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: 'auto',
                        height: '90%',
                    }}>
                        <Box
                            sx={{
                                width: '350px',
                                height: '100%',
                                color: 'white',
                                display: 'flex',
                                position: 'relative',
                                border: 'solid 1px #ccc',
                                borderRadius: '10px',
                            }}>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '5%',
                                        left: '10%',
                                        fontWeight: 'bold',
                                        fontFamily: 'sans-serif',
                                        fontSize: '3.5rem',
                                        color: 'white',
                                    }}>
                                    Free
                                </Typography>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '10%',
                                        left: '65%',
                                        fontSize: '1.75rem',
                                        color: 'white',
                                    }}>
                                    ￥0
                                </Typography>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '11.5%',
                                        left: '82.5%',
                                        fontSize: '1.5rem',
                                        color: '#ccc',
                                    }}>
                                    /月
                                </Typography>
                                <Link
                                    sx={{
                                        display: 'flex',
                                        position: 'absolute',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        top: '20%',
                                        left: '10%',
                                        width: '30%',
                                        height: '40px',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '30px',
                                        border: 'solid 2px #66B290',
                                    }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            color: 'white',
                                        }}
                                    >
                                        現在のプラン
                                    </Typography>
                                </Link>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '30%',
                                        left: '12.5%',
                                        fontSize: '1.2rem',
                                        color: 'white',
                                    }}>
                                    ※特典など
                                </Typography>
                        </Box>
                </Box>

{/* ノーマルプラン */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: 'auto',
                        height: '90%',
                    }}>
                        <Box
                            sx={{
                                width: '350px',
                                height: '100%',
                                color: 'white',
                                display: 'flex',
                                position: 'relative',
                                border: 'solid 1px #ccc',
                                borderRadius: '10px',
                            }}>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '5%',
                                        left: '10%',
                                        fontWeight: 'bold',
                                        fontFamily: 'sans-serif',
                                        fontSize: '3.5rem',
                                        color: 'white',
                                    }}>
                                    Base
                                </Typography>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '10%',
                                        left: '53%',
                                        fontSize: '1.75rem',
                                        color: 'white',
                                    }}>
                                    ￥1240
                                </Typography>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '11.5%',
                                        left: '82.5%',
                                        fontSize: '1.5rem',
                                        color: '#ccc',
                                    }}>
                                    /月
                                </Typography>
                                <Link href='#'
                                    sx={{
                                        display: 'flex',
                                        position: 'absolute',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        top: '20%',
                                        left: '10%',
                                        width: '30%',
                                        height: '40px',
                                        color: 'white',
                                        textDecoration: 'none',
                                        backgroundColor: '#66B290',
                                        borderRadius: '30px',
                                    }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            color: 'white',
                                            '&:hover': {
                                                filter: 'brightness(0.8)',
                                            },
                                        }}
                                    >
                                        今すぐ始める
                                    </Typography>
                                </Link>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '30%',
                                        left: '12.5%',
                                        fontSize: '1.2rem',
                                        color: 'white',
                                    }}>
                                    ※特典など
                                </Typography>
                        </Box>
                </Box>

{/* PROプラン */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: 'auto',
                        height: '90%',
                    }}>
                        <Box
                            sx={{
                                width: '350px',
                                height: '100%',
                                color: 'white',
                                display: 'flex',
                                position: 'relative',
                                border: 'solid 1px #ccc',
                                borderRadius: '10px',
                            }}>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '5%',
                                        left: '10%',
                                        fontWeight: 'bold',
                                        fontFamily: 'sans-serif',
                                        fontSize: '3.5rem',
                                        color: 'white',
                                    }}>
                                    Pro
                                </Typography>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '10%',
                                        left: '53%',
                                        fontSize: '1.75rem',
                                        color: 'white',
                                    }}>
                                    ￥3250
                                </Typography>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '11.5%',
                                        left: '82.5%',
                                        fontSize: '1.5rem',
                                        color: '#ccc',
                                    }}>
                                    /月
                                </Typography>
                                <Link href='#'
                                    sx={{
                                        display: 'flex',
                                        position: 'absolute',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        top: '20%',
                                        left: '10%',
                                        width: '30%',
                                        height: '40px',
                                        color: 'white',
                                        textDecoration: 'none',
                                        backgroundColor: '#66B290',
                                        borderRadius: '30px',
                                    }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            color: 'white',
                                            '&:hover': {
                                                filter: 'brightness(0.8)',
                                            },
                                        }}
                                    >
                                        今すぐ始める
                                    </Typography>
                                </Link>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '30%',
                                        left: '12.5%',
                                        fontSize: '1.2rem',
                                        color: 'white',
                                    }}>
                                    ※特典など
                                </Typography>
                        </Box>
                </Box>
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
                }}>
                footer
            </Box>
        </Box>
    );
}