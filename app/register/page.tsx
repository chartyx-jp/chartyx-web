// ログイン画面
'use client';

import CustomTextField from '@/components/userInfoInputs';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';

import { Validator } from '@/lib/utils/validator'; // バリデーションライブラリをインポート

export default function Home() {
    const [errorMessage, setErrorMessage] = useState('');
    

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
                onChange={(e) => {
                    const emailAddress = e.target.value;
                    const validationResult = Validator.validateEmail(emailAddress);
                    setErrorMessage(validationResult.message || '');
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
            <Link href='register/create_account'>
                <Typography>
                    createAccount
                </Typography>
            </Link>
        
        </Box>
    );
}
