"use client";

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
};

export default function Header({ children, userInfo, onMenuToggle, isMenuOpen }: HeaderProps) {
    const theme = useTheme();
    
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0, // 常に左端から開始
                zIndex: 1300, // Drawerより高く設定
                alignItems: 'center',
                height: '60px',
                width: '100vw', // 常に全幅
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 1,
                paddingLeft: isMenuOpen ? '360px' : '0px', // パディングで調整
                transition: theme.transitions.create(['padding-left'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen, // enteringScreenからleavingScreenに変更
                }),
            }}
        >
            <HamburgerMenu onMenuToggle={onMenuToggle} />
            <Box sx={{ 
                minWidth: 0, // flexアイテムの最小幅を0に設定
                overflow: 'hidden', // オーバーフローを隠す
            }}>
                <ChartyxLogo />
            </Box>
            {children}
            <SearchBox />
            <UserIcon userInfo={userInfo} />
        </Box>
    );
}
