'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SettingsPage from '@/app/main/settings/SettingsPage';
import { UserInfo } from '@/app/main/layout';

export default function Settings() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/api/proxy?endPoint=/users/auth/user-info/');
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                }
            } catch (error) {
                console.error('ユーザー情報取得エラー:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#000',
            paddingTop: '20px',
        }}>
            <SettingsPage userInfo={userInfo} />
        </Box>
    );
}