"use client";

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';

import UserIcon from './UserIcon';
import HamburgerMenu from './HamburgerMenu';
import SearchBox from '@/components/searchBox';
import ChartyxLogo from '@/components/icon';
import { UserInfo } from '@/app/main/layout';

type HeaderProps = {
    children?: React.ReactNode;
    userInfo: UserInfo | null;
    onMenuToggle?: (isOpen: boolean) => void;
    isMenuOpen?: boolean;
    showHamburgerMenu?: boolean;
    showSearchBox?: boolean;
};

export default function Header({ 
    children, 
    userInfo, 
    onMenuToggle, 
    isMenuOpen, 
    showHamburgerMenu = true, 
    showSearchBox = true 
}: HeaderProps) {
    const theme = useTheme();
    const pathname = usePathname();
    
    // プラン画面では検索ボックスを非表示
    const isPlansPage = pathname === '/main/plans';
    const shouldShowSearchBox = showSearchBox && !isPlansPage;
    
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1300,
                alignItems: 'center',
                height: '60px',
                width: '100vw',
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 1,
                paddingLeft: showHamburgerMenu && isMenuOpen ? '360px' : '0px',
                transition: showHamburgerMenu ? theme.transitions.create(['padding-left'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }) : 'none',
            }}
        >
            {/* ハンバーガーメニューの固定スペース */}
            {showHamburgerMenu && (
                <Box sx={{ 
                    width: '64px', // ボタンの幅を固定（48px + margin 16px）
                    flexShrink: 0, // 縮小を防ぐ
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <HamburgerMenu onMenuToggle={onMenuToggle} />
                </Box>
            )}
            
            {/* ロゴエリア */}
            <Box sx={{ 
                flexShrink: 0, // ロゴの縮小を防ぐ
                marginLeft: showHamburgerMenu ? '8px' : '16px', // ハンバーガーメニューがない場合は左マージンを増やす
            }}>
                <ChartyxLogo />
            </Box>
            
            {/* 中央のコンテンツエリア */}
            <Box sx={{ flex: 1 }}>
                {children}
            </Box>
            
            {/* 右側のコンテンツ */}
            {shouldShowSearchBox && <SearchBox />}
            <UserIcon userInfo={userInfo} />
        </Box>
    );
}
