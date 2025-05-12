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
                    width: '100%',
                    height: '80px',
                    borderBottom: 'solid 1px #fff',
                }}
            >
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
                    プラン一覧
                </Typography>
            </Box>

{/* ボタンコンテナ */}
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '80%',
                    margin: '0 auto',
                    alignItems: 'center',
                    border: 'solid 1px #fff',
                }}>

{/* フリープラン */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '90%',
                        marginLeft: '20%',
                    }}>
                        <Link href=''
                            style={{
                                textDecoration: 'none',
                                width: '100%',
                                height: '100%',
                            }}>
                            <Box
                                sx={{
                                    width: '350px',
                                    height: '100%',
                                    color: 'white',
                                    display: 'flex',
                                    border: 'solid 1px #fff',
                                    borderRadius: '10px',
                                    $hover: {
                                        backgroundColor: '#00ff00', // ホバー時の色
                                    },
                                }}>
                                    <h2 style={{
                                        margin: '0 auto',
                                    }}>
                                        FREE
                                    </h2>
                            </Box>
                        </Link>
                </Box>

{/* ノーマルプラン */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '90%',
                    }}>
                        <Link href=''
                            style={{
                                textDecoration: 'none',
                                width: '100%',
                                height: '100%',
                            }}>
                            <Box
                                sx={{
                                    width: '350px',
                                    height: '100%',
                                    color: 'white',
                                    display: 'flex',
                                    border: 'solid 1px #fff',
                                    borderRadius: '10px',
                                    $hover: {
                                        backgroundColor: '#00ff00', // ホバー時の色
                                    },
                                }}>
                                    <h2 style={{
                                        margin: '0 auto',
                                    }}>
                                        NORMAL
                                    </h2>
                            </Box>
                        </Link>
                </Box>

{/* PROプラン */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '90%',
                        marginRight: '20%',
                    }}>
                        <Link href=''
                            style={{
                                textDecoration: 'none',
                                width: '100%',
                                height: '100%',
                            }}>
                            <Box
                                sx={{
                                    width: '350px',
                                    height: '100%',
                                    color: 'white',
                                    display: 'flex',
                                    border: 'solid 1px #fff',
                                    borderRadius: '10px',
                                    $hover: {
                                        backgroundColor: '#00ff00', // ホバー時の色
                                    },
                                }}>
                                    <h2 style={{
                                        margin: '0 auto',
                                    }}>
                                        PRO
                                    </h2>
                            </Box>
                        </Link>
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
                    borderTop: 'solid 1px #fff',
                }}>
                footer
            </Box>
        </Box>
    );
}