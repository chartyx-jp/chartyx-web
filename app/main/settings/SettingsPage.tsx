'use client';

import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Avatar,
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert,
    Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { UserInfo } from '@/app/main/layout';

type ProfileData = {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    address: string;
    gender: string;
    birthday: string;
};

type SettingsPageProps = {
    userInfo: UserInfo | null;
};

export default function SettingsPage({ userInfo }: SettingsPageProps) {
    const theme = useTheme();
    const [profileData, setProfileData] = useState<ProfileData>({
        firstName: '',
        lastName: '',
        emailAddress: userInfo?.emailAddress || '',
        phoneNumber: '',
        address: '',
        gender: '',
        birthday: '',
    });
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketAlerts: true,
    });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // プロフィール情報を取得
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/proxy?endPoint=/users/profile-settings/');
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(prev => ({
                        ...prev,
                        ...data.member,
                    }));
                }
            } catch (error) {
                console.error('プロフィール取得エラー:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleProfileUpdate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    endPoint: '/users/profile-settings/',
                    ...profileData,
                }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'プロフィールを更新しました' });
            } else {
                setMessage({ type: 'error', text: 'プロフィールの更新に失敗しました' });
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setMessage({ type: 'error', text: 'エラーが発生しました' });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'パスワードが一致しません' });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    endPoint: '/users/profile-settings/',
                    password: newPassword,
                }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'パスワードを更新しました' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setMessage({ type: 'error', text: 'パスワードの更新に失敗しました' });
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setMessage({ type: 'error', text: 'エラーが発生しました' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ 
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
        }}>
            <Typography variant="h4" sx={{ 
                color: theme.palette.text.primary,
                mb: 3,
                fontWeight: 600,
            }}>
                設定
            </Typography>

            {message && (
                <Alert 
                    severity={message.type} 
                    sx={{ mb: 3 }}
                    onClose={() => setMessage(null)}
                >
                    {message.text}
                </Alert>
            )}

            {/* プロフィール設定 */}
            <Paper sx={{ 
                p: 3, 
                mb: 3, 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ 
                        width: 80, 
                        height: 80, 
                        mr: 3,
                        backgroundColor: theme.palette.primary.main,
                        fontSize: '2rem',
                    }}>
                        {profileData.emailAddress?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                            プロフィール情報
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            基本情報を管理できます
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="姓"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                    </Grid>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="名"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                    </Grid>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="メールアドレス"
                            type="email"
                            value={profileData.emailAddress}
                            onChange={(e) => setProfileData(prev => ({ ...prev, emailAddress: e.target.value }))}
                        />
                    </Grid>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="電話番号"
                            value={profileData.phoneNumber}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        />
                    </Grid>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>性別</InputLabel>
                            <Select
                                value={profileData.gender}
                                label="性別"
                                onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                            >
                                <MenuItem value="male">男性</MenuItem>
                                <MenuItem value="female">女性</MenuItem>
                                <MenuItem value="other">その他</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="住所"
                            value={profileData.address}
                            onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        />
                    </Grid>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="生年月日"
                            type="date"
                            value={profileData.birthday}
                            onChange={(e) => setProfileData(prev => ({ ...prev, birthday: e.target.value }))}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        variant="contained" 
                        onClick={handleProfileUpdate}
                        disabled={loading}
                    >
                        プロフィールを更新
                    </Button>
                </Box>
            </Paper>

            {/* パスワード変更 */}
            <Paper sx={{ 
                p: 3, 
                mb: 3, 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
            }}>
                <Typography variant="h6" sx={{ 
                    color: theme.palette.text.primary, 
                    mb: 2 
                }}>
                    パスワード変更
                </Typography>
                
                <Grid container spacing={2}>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="現在のパスワード"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </Grid>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="新しいパスワード"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Grid>
                    {/* @ts-expect-error Grid item props type issue */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="新しいパスワード（確認）"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        variant="contained" 
                        onClick={handlePasswordUpdate}
                        disabled={loading || !newPassword || !confirmPassword}
                    >
                        パスワードを更新
                    </Button>
                </Box>
            </Paper>

            {/* 通知設定 */}
            <Paper sx={{ 
                p: 3, 
                mb: 3, 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
            }}>
                <Typography variant="h6" sx={{ 
                    color: theme.palette.text.primary, 
                    mb: 2 
                }}>
                    通知設定
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={notifications.email}
                                onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                            />
                        }
                        label="メール通知"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={notifications.push}
                                onChange={(e) => setNotifications(prev => ({ ...prev, push: e.target.checked }))}
                            />
                        }
                        label="プッシュ通知"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={notifications.marketAlerts}
                                onChange={(e) => setNotifications(prev => ({ ...prev, marketAlerts: e.target.checked }))}
                            />
                        }
                        label="マーケットアラート"
                    />
                </Box>
            </Paper>

            {/* 危険なアクション */}
            <Paper sx={{ 
                p: 3, 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.error.main}`,
            }}>
                <Typography variant="h6" sx={{ 
                    color: theme.palette.error.main, 
                    mb: 2 
                }}>
                    危険なアクション
                </Typography>
                
                <Typography variant="body2" sx={{ 
                    color: theme.palette.text.secondary, 
                    mb: 2 
                }}>
                    アカウントを削除すると、すべてのデータが失われます。この操作は取り消せません。
                </Typography>
                
                <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => {
                        if (window.confirm('本当にアカウントを削除しますか？この操作は取り消せません。')) {
                            // アカウント削除のロジック
                            console.log('アカウント削除');
                        }
                    }}
                >
                    アカウントを削除
                </Button>
            </Paper>
        </Box>
    );
}