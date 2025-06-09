// メールアドレス入力画面
'use client';

import CustomTextField from '@/components/userInfoInputs';
import { Box, Button, Typography } from '@mui/material';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('メールアドレスが入力されていません');

    // const router = useRouter();

    const validateEmail = (value: string) => {
        if (value == '') {
            console.log('メールアドレスが入力されていません');
            setErrorMessage('メールアドレスが入力されていません');
        } else if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            console.log('メールアドレスの形式が正しくありません');
            setErrorMessage('メールアドレスの形式が正しくありません');
        } else {
            setErrorMessage(''); // エラーメッセージをクリア
        }
    };

    const fetchData = async () => {
        try {
            await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',   // ←重要
                body: JSON.stringify({ address })
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100svh',
                backgroundColor: '#000',
            }}
            component={'form'}
            onSubmit={(e) => {
                e.preventDefault(); // フォームのデフォルトの送信を防ぐ
                if (!errorMessage) {
                    fetchData();
                }
            }}
        >
            <Typography
                sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '2rem',
                    marginBottom: '20px',
                }}
            >
                アカウント作成
            </Typography>

            {/* メールアドレス */}
            <CustomTextField
                label="e-mail"
                placeholder=""
                value={address}
                onChange={(e) => {
                    setAddress(e.target.value);
                    validateEmail(e.target.value);
                }}
            />

            <Typography
                id="alertMessage"
                sx={{
                    color: 'red',
                    height: '20px',
                    margin: '5px',
                }}
            >
                {errorMessage}
            </Typography>

            {/* 会員登録画面へのボタン */}
            <Button
                variant="contained"
                sx={{
                    width: '200px',
                }}
                type="submit"
                disabled={!!errorMessage} // エラーメッセージがある場合はボタンを無効化
                // onClick={() => {
                //     fetchData();
                // }}
                // disabled={isLoading}
            >
                メンバー登録
            </Button>
            {/* {isLoading && <div>Loading...</div>}  ローカルなローディング表示 
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
        </Box>
    );
}
