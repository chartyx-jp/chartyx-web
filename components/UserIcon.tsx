"use client";

import * as React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // アカウントアイコンの例
import { useRouter } from 'next/navigation';

import { ApiClient } from '@/lib/api/apiClient';

const apiClient = new ApiClient

// Tooltipのスタイルをカスタマイズして、よりリッチな表示領域にする
const RichTooltip = styled(
  ({ className, ...props }: React.ComponentProps<typeof Tooltip> & { className?: string }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="bottom-start" arrow />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[3], // 少し濃い影
    fontSize: theme.typography.pxToRem(12),
    padding: 0, // Paperコンポーネント側でパディングを制御するため0に
    maxWidth: 350, // 最大幅を指定
    borderRadius: theme.shape.borderRadius,
  },
  [`& .${tooltipClasses.arrow}`]: { // 矢印の色もPaperに合わせる
    color: theme.palette.background.paper,
    '&:before': {
       boxShadow: theme.shadows[3], // 矢印にも影を適用
    }
  },
}));  

// Tooltip内に表示するコンテンツ
const AccountInfoContent = () => {
    const router = useRouter()

    const signout = async() => {
        console.log('signout run')
        try {
            const response = await apiClient.request('/users/logout/', 'POST')
            if(response.ok) {
                router.push('/register')
            }
        }catch(error) {
            console.log(error)
        }
    }
    return(
    // Paperでコンテンツを囲む
    <Paper 
        elevation={0}
        sx={{
            p: 2,
            width: 'auto',
        }}
    > 
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
            }}
        >
            {/* アイコン */}
            <Avatar
                sx={{
                    width: 56,
                    height: 56,
                    mr: 2,
                }}
            >
                a{/* アカウントアイコン */}
            </Avatar>
            <Box>
                <Typography variant="h6">
                    user@example.com
                </Typography>
            </Box>
        </Box>
        {/* ユーザーが操作するボタン */}
        <Box
            sx={{
                gap: 1,
            }}
        >
             <Button variant="outlined"
                sx={{
                    width: '100%',
                    mb: 1,
                }}
             >
                プランをアップグレード
            </Button>
            <Button variant="outlined"
                sx={{
                    width: '100%',
                    mb: 1,
                }}
             >
                設定
            </Button>
            <Button variant="contained" color="primary"
                sx={{
                    width: '100%',
                    mb: 1,
                }}
                onClick={
                    signout
                }
            >
                ログアウト
            </Button>
        </Box>
    </Paper>
    );
};

// Reactコンポーネントとしてエクスポート
const UserIcon: React.FC = () => {
  return (
      <Box sx={{
        padding: 5, /* 表示確認用の余白 */ 
        }}>
        <RichTooltip title={<AccountInfoContent />}>
          <IconButton>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </RichTooltip>
      </Box>
  );
};

export default UserIcon;