"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import {
    Popover,
    Typography,
    Avatar,
    Box,
    Paper,
    Button,
    IconButton,
} from '@mui/material';
import { UserInfo } from '@/app/main/layout';

const AccountInfoContent = ({ 
    onClose, 
    userInfo 
}: { 
    onClose: () => void;
    userInfo: UserInfo | null;
}) => {
    const router = useRouter();
    const theme = useTheme();

    const signout = async () => {
        console.log('signout run');
        try {
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    endPoint: '/users/logout/',
                }),
            });
            console.log(response);
            if (response.ok) {
                onClose();
                router.push('/register');
            } else {
                const errorData = await response.json();
                console.error('Logout failed:', response.status, errorData);
            }
        } catch (error) {
            console.error('Error during signout:', error);
        }
    };

    const handleSettingsClick = () => {
        onClose();
        router.push('/main/settings');
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                width: 'auto',
                maxWidth: 350,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Avatar
                    sx={{
                        width: 56,
                        height: 56,
                        mr: 2,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    }}
                >
                    {userInfo?.emailAddress?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Box>
                    <Typography 
                        variant="h6"
                        sx={{ color: theme.palette.text.primary }}
                    >
                        {userInfo?.emailAddress?.split('@')[0] || 'ユーザー'}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        {userInfo?.emailAddress || 'メールアドレス不明'}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <Button variant="outlined" sx={{ width: '100%' }} onClick={() => {
                    onClose();
                    router.push('/main/plans');
                }}>
                    プランをアップグレード
                </Button>
                <Button variant="outlined" sx={{ width: '100%' }} onClick={handleSettingsClick}>
                    設定
                </Button>
                <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={signout}>
                    ログアウト
                </Button>
            </Box>
        </Paper>
    );
};

type UserIconProps = {
    userInfo: UserInfo | null;
};

const UserIcon: React.FC<UserIconProps> = ({ userInfo }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const theme = useTheme();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'account-popover' : undefined;

    return (
        <Box sx={{ paddingLeft: 2, paddingRight: 5 }}>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <Avatar 
                    sx={{ 
                        width: 40, 
                        height: 40,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    }}
                >
                    {userInfo?.emailAddress?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <AccountInfoContent onClose={handleClose} userInfo={userInfo} />
            </Popover>
        </Box>
    );
};

export default UserIcon;