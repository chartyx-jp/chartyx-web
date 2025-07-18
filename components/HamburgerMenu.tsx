"use client";

import React, { useState } from 'react';
import {
    Box,
    Drawer,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    Divider,
    Paper,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    ShowChart as ShowChartIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// ランキングデータの型定義
type RankingItem = {
    id: string;
    name: string;
    code: string;
    price: number;
    change: number;
    changePercent: number;
};

// サンプルランキングデータ
const sampleRankingData: RankingItem[] = [
    { id: '1', name: 'トヨタ自動車', code: '7203', price: 2800, change: 50, changePercent: 1.82 },
    { id: '2', name: 'ソフトバンクグループ', code: '9984', price: 5200, change: -120, changePercent: -2.26 },
    { id: '3', name: '任天堂', code: '7974', price: 8900, change: 200, changePercent: 2.30 },
    { id: '4', name: 'ファーストリテイリング', code: '9983', price: 12000, change: -300, changePercent: -2.44 },
    { id: '5', name: 'キーエンス', code: '6861', price: 45000, change: 1000, changePercent: 2.27 },
];

type HamburgerMenuProps = {
    onMenuToggle?: (isOpen: boolean) => void;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onMenuToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();

    const toggleDrawer = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        onMenuToggle?.(newIsOpen);
    };

    const RankingList = ({ title, data }: { title: string; data: RankingItem[] }) => (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ 
                color: theme.palette.text.primary, 
                mb: 2,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <ShowChartIcon sx={{ color: theme.palette.primary.main }} />
                {title}
            </Typography>
            <List sx={{ p: 0 }}>
                {data.map((item, index) => (
                    <Paper
                        key={item.id}
                        sx={{
                            mb: 1,
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            overflow: 'hidden',
                        }}
                    >
                        <ListItem sx={{ py: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Box sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                    }}>
                                        {index + 1}
                                    </Box>
                                </ListItemIcon>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Typography variant="body2" sx={{ 
                                            color: theme.palette.text.primary,
                                            fontWeight: 500
                                        }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ 
                                            color: theme.palette.text.secondary,
                                            backgroundColor: theme.palette.background.default,
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                        }}>
                                            {item.code}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body2" sx={{ 
                                            color: theme.palette.text.primary,
                                            fontWeight: 600,
                                        }}>
                                            ¥{item.price.toLocaleString()}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            {item.change > 0 ? (
                                                <TrendingUpIcon sx={{ 
                                                    color: theme.palette.success.main,
                                                    fontSize: 16 
                                                }} />
                                            ) : (
                                                <TrendingDownIcon sx={{ 
                                                    color: theme.palette.error.main,
                                                    fontSize: 16 
                                                }} />
                                            )}
                                            <Typography variant="caption" sx={{ 
                                                color: item.change > 0 ? theme.palette.success.main : theme.palette.error.main,
                                                fontWeight: 500,
                                            }}>
                                                {item.change > 0 ? '+' : ''}{item.change} ({item.changePercent > 0 ? '+' : ''}{item.changePercent}%)
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </ListItem>
                    </Paper>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {/* メニューが閉じている時のみハンバーガーボタンを表示 */}
            {!isOpen && (
                <IconButton
                    onClick={toggleDrawer}
                    sx={{
                        color: theme.palette.text.primary,
                        ml: 2,
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                anchor="left"
                open={isOpen}
                variant="persistent"
                transitionDuration={{
                    enter: theme.transitions.duration.enteringScreen,
                    exit: theme.transitions.duration.leavingScreen,
                }}
                PaperProps={{
                    sx: {
                        width: 360,
                        backgroundColor: theme.palette.background.default,
                        borderRight: `1px solid ${theme.palette.divider}`,
                        zIndex: 1200,
                    },
                }}
            >
                <Box sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}>
                    {/* ヘッダー部分 - ヘッダーと同じ高さに調整 */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end', // 右寄せに変更
                        height: '60px', // ヘッダーと同じ高さ
                        px: 2, // 左右のパディングのみ
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                    }}>
                        <IconButton
                            onClick={toggleDrawer}
                            sx={{
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* メインコンテンツ */}
                    <Box sx={{ 
                        flex: 1,
                        overflow: 'auto',
                        p: 2,
                        // カスタムスクロールバー
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: theme.palette.divider,
                            borderRadius: '3px',
                            '&:hover': {
                                background: theme.palette.action.hover,
                            },
                        },
                        // Firefox用
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${theme.palette.divider} transparent`,
                    }}>
                        {/* 値上がり率ランキング */}
                        <RankingList 
                            title="値上がり率ランキング"
                            data={sampleRankingData.filter(item => item.change > 0).slice(0, 3)}
                        />

                        <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

                        {/* 値下がり率ランキング */}
                        <RankingList 
                            title="値下がり率ランキング"
                            data={sampleRankingData.filter(item => item.change < 0).slice(0, 3)}
                        />

                        <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

                        {/* 出来高ランキング */}
                        <RankingList 
                            title="出来高ランキング"
                            data={sampleRankingData.slice(0, 3)}
                        />
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default HamburgerMenu;
