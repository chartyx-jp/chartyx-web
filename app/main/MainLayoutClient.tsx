'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import { UserInfo } from './layout';

type MainLayoutClientProps = {
    children: React.ReactNode;
    userInfo: UserInfo | null;
};

export default function MainLayoutClient({ children, userInfo }: MainLayoutClientProps) {
    const theme = useTheme();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = (isOpen: boolean) => {
        setIsMenuOpen(isOpen);
    };
    
    // プラン画面ではハンバーガーメニューを非表示
    const isPlansPage = pathname === '/main/plans';
    
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* ヘッダー */}
            <Header 
                userInfo={userInfo} 
                onMenuToggle={handleMenuToggle}
                isMenuOpen={isMenuOpen}
                showHamburgerMenu={!isPlansPage}
            />
            
            {/* メインコンテンツ */}
            <Box 
                component="main"
                sx={{ 
                    flexGrow: 1,
                    marginTop: '60px', 
                    marginLeft: !isPlansPage && isMenuOpen ? '360px' : '0px',
                    width: !isPlansPage && isMenuOpen ? 'calc(100vw - 360px)' : '100vw',
                    backgroundColor: theme.palette.background.default,
                    minHeight: 'calc(100vh - 60px)',
                    transition: !isPlansPage ? theme.transitions.create(['margin-left', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }) : 'none',
                    overflow: 'auto',
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