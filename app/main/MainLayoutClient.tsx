'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Header from '@/components/Header';
import { UserInfo } from './layout';

type MainLayoutClientProps = {
    children: React.ReactNode;
    userInfo: UserInfo | null;
};

export default function MainLayoutClient({ children, userInfo }: MainLayoutClientProps) {
    const theme = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = (isOpen: boolean) => {
        setIsMenuOpen(isOpen);
    };
    
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* ヘッダー */}
            <Header 
                userInfo={userInfo} 
                onMenuToggle={handleMenuToggle}
                isMenuOpen={isMenuOpen}
            />
            
            {/* メインコンテンツ */}
            <Box 
                component="main"
                sx={{ 
                    flexGrow: 1,
                    marginTop: '60px', 
                    marginLeft: isMenuOpen ? '360px' : '0px',
                    width: isMenuOpen ? 'calc(100vw - 360px)' : '100vw',
                    backgroundColor: theme.palette.background.default,
                    minHeight: 'calc(100vh - 60px)',
                    transition: theme.transitions.create(['margin-left', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    overflow: 'auto', // スクロール可能にする
                    // カスタムスクロールバー
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: theme.palette.divider,
                        borderRadius: '4px',
                        '&:hover': {
                            background: theme.palette.action.hover,
                        },
                    },
                    // Firefox用
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${theme.palette.divider} transparent`,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}