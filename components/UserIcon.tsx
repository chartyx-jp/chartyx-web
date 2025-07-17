"use client";

import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

// RichTooltipの定義は不要になります。
// 必要であればPopoverのPaperPropsでスタイルを調整します。

// Popover内に表示するコンテンツ
// Popoverを閉じるためのonCloseプロパティを受け取るように変更
const AccountInfoContent = ({ onClose }: { onClose: () => void }) => {
    const router = useRouter();

    const signout = async () => {
        console.log('signout run'); // ここが動作することを確認
        try {
            const response = await fetch('/api/proxy', // Next.jsのAPIルートを使用
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        endPoint: '/users/logout/',
                    }),
                }
            );
            console.log(response)
            if (response.ok) {
                onClose(); // サインアウト成功時にポップオーバーを閉じる
                router.push('/register');
            } else {
                // エラーレスポンスの場合もログを出す
                const errorData = await response.json();
                console.error('Logout failed:', response.status, errorData);
            }
        } catch (error) {
            console.error('Error during signout:', error); // エラーメッセージをより詳細に
        }
    };

    return (
        // Paperでコンテンツを囲む。PopoverのスタイルはPaperPropsで調整するため、ここでは基本的な設定のみ。
        <Paper
            // PopoverのPaperPropsでshadows[3]に相当するelevationを指定するため、ここでは0
            // もしPaper自体に影が必要なら、elevationを設定
            elevation={0}
            sx={{
                p: 2,
                width: 'auto',
                maxWidth: 350,
                // borderRadiusはPopoverのPaperPropsで設定することが多い
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
                    }}
                >
                    A
                </Avatar>
                <Box>
                    <Typography variant="h6">
                        user@example.com
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // ボタンを縦に並べる
                    gap: 1,
                }}
            >
                <Button variant="outlined"
                    sx={{
                        width: '100%',
                    }}
                >
                    プランをアップグレード
                </Button>
                <Button variant="outlined"
                    sx={{
                        width: '100%',
                    }}
                >
                    設定
                </Button>
                <Button variant="contained" color="primary"
                    sx={{
                        width: '100%',
                    }}
                    onClick={signout}
                >
                    ログアウト
                </Button>
            </Box>
        </Paper>
    );
};

// Reactコンポーネントとしてエクスポート
const UserIcon: React.FC = () => {
    // Popoverの開閉状態と、アンカー要素（クリックされた要素）を管理
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl); // anchorElがnullでなければ開いている状態
    const id = open ? 'account-popover' : undefined; // アクセシビリティのためのID

    return (
        <Box sx={{
            paddingLeft: 2,
            paddingRight: 5,
        }}>
            <IconButton
                aria-describedby={id} // PopoverのIDを関連付ける
                onClick={handleClick} // クリックでPopoverを開く
            >
                <AccountCircleIcon sx={{ fontSize: 40 }} />
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl} // どの要素の横に表示するか
                onClose={handleClose} // Popoverの外をクリックしたときに閉じる
                anchorOrigin={{
                    vertical: 'bottom', // アンカー要素の下端に合わせる
                    horizontal: 'left', // アンカー要素の左端に合わせる
                }}
                transformOrigin={{
                    vertical: 'top', // Popoverの上端をアンカー要素に合わせる
                    horizontal: 'left', // Popoverの左端をアンカー要素に合わせる
                }}
                // Popover内部のPaperコンポーネントにスタイルを適用
                PaperProps={{
                    sx: {
                        boxShadow: 3, // 少し濃い影 (theme.shadows[3]に相当)
                        borderRadius: 1, // Material-UIのデフォルトborderRadius
                    }
                }}
            >
                {/* Popover内に表示するコンテンツ。onCloseを渡して、内部から閉じられるようにする */}
                <AccountInfoContent onClose={handleClose} />
            </Popover>
        </Box>
    );
};

export default UserIcon;