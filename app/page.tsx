'use client';

import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Home() {
    const router = useRouter();
    const theme = useTheme();

    const handleLoginClick = () => {
        router.push('/register');
    };

    const handleRegisterClick = () => {
        router.push('/register/create_account');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                backgroundColor: theme.palette.background.default,
                padding: '20px',
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        padding: { xs: 3, sm: 5 },
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    {/* アプリケーションタイトル */}
                    <Box sx={{ mb: 4 }}>
                        <TrendingUpIcon 
                            sx={{ 
                                fontSize: 60, 
                                color: theme.palette.primary.main,
                                mb: 2 
                            }} 
                        />
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.text.primary,
                                mb: 1,
                                fontSize: { xs: '2rem', sm: '3rem' }
                            }}
                        >
                            Chartyx
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 400,
                            }}
                        >
                            株価チャート分析プラットフォーム
                        </Typography>
                    </Box>

                    {/* アプリケーション説明 */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.secondary,
                                lineHeight: 1.6,
                                maxWidth: '400px',
                                margin: '0 auto',
                            }}
                        >
                            リアルタイムの株価データと高度なチャート分析機能で、
                            投資の意思決定をサポートします。
                        </Typography>
                    </Box>

                    {/* ボタンエリア */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<LoginIcon />}
                            onClick={handleLoginClick}
                            sx={{
                                minWidth: '200px',
                                height: '56px',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                            }}
                        >
                            ログイン
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<PersonAddIcon />}
                            onClick={handleRegisterClick}
                            sx={{
                                minWidth: '200px',
                                height: '56px',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.divider,
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            新規登録
                        </Button>
                    </Box>

                    {/* フッター情報 */}
                    <Box sx={{ mt: 4, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.disabled,
                                fontSize: '0.75rem',
                            }}
                        >
                            © 2025 Chartyx
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}