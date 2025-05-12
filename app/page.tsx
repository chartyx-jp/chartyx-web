'use client';

import { Box, TextField, Typography, TypographyClasses } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';


export default function Home() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100svh',
                backgroundColor: '#000',
            }}
        >
            {/* チャートページへのボタン */}
            <button
                style={{ 
                    background: 'none', 
                    border: 'solid 1px #fff', 
                    cursor: 'pointer',
                    margin: '20px',
                }}
            >
                <Link href='/graph'
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            '&:hover': {
                                color: '#00ff00', // ホバー時の色
                            }
                        }}
                    >
                        チャート
                    </Typography>
                </Link>
            </button>


            {/* メンバー登録ページへのボタン */}
            <button
                style={{ 
                    background: 'none', 
                    border: 'solid 1px #fff', 
                    cursor: 'pointer',
                    margin: '20px',
                }}
            >
                <Link href='/Member-registration'
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            '&:hover': {
                                color: '#00ff00', // ホバー時の色
                            }
                        }}
                    >
                        メンバー登録
                    </Typography>
                </Link>
            </button>


        </Box>
    );
}
