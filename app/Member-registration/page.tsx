// メールアドレス入力画面
'use client';

import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CustomTextField from '../Member-registration/userInfoInputs';

export default function Home() {
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('メールアドレスを入力してください');

    const router = useRouter();

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

    // const [data, setData] = useState(null)
    // const [isLoading, setIsLoading] = useState(false)

    // const fetchData = async () => {
    //         setIsLoading(true);
    // NProgress.start();
    // try {
    //     const response = await fetch('');
    //     const result = await response.json();
    //     setData(result);
    // } catch (error) {
    //     console.error('データの取得に失敗しました', error);
    // } finally {
    //     setIsLoading(false);
    //     NProgress.done();
    // }
    // };

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
                    router.push('/Member-registration/plans');
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
