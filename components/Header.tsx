"use client";

import { Box } from '@mui/material';

import UserIcon from './UserIcon';
import HamburgerMenu from './HamburgerMenu';
import SearchBox from '@/components/searchBox';
import ChartyxLogo from '@/components/icon';

type props = {
    children?: React.ReactNode;
}

export default function Header({children}: props) {
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'fixed',
                top: 0,
                zIndex: 999,
                alignItems: 'center',
                width: '100vw',
                height: '60px',
                borderBottom: '0.5px solid #ddd',
                backgroundColor: '#000',
            }}
        >
            <HamburgerMenu />
            <ChartyxLogo />
            {children}
            <SearchBox />
            <UserIcon />
        </Box>
    );
}
