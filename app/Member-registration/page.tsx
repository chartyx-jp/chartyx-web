'use client';

import { Box, TextField, Typography, Button, TypographyClasses } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import CustomTextField from '../Member-registration/userInfoInputs';
import { error } from 'console';


export default function Home() {
    const [userAddress, setAddress] = useState('');
    let [errorMessage, setErrorMessage] = useState('メールアドレスを入力してください');
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
    })
    const router = useRouter();

    const isAddress = () => {
        if(userAddress == '') {
            console.log('メールアドレスが入力されていません');
            setErrorMessage('メールアドレスが入力されていません');
            setClicked(true); // クリックされたらtrueにする
            return
        } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(userAddress)) {
                console.log('メールアドレスの形式が正しくありません');
                setErrorMessage('メールアドレスの形式が正しくありません');
                setClicked(true); // クリックされたらtrueにする
                return
            }
        }
        setErrorMessage(''); // エラーメッセージをクリア
    }

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
            component={"form"}
            onSubmit = {(e) => {
                e.preventDefault(); // フォームのデフォルトの送信を防ぐ
                if (errorMessage == '') {
                    router.push('/graph');
                }
            }}
        >
            {/*　○○さんこんにちは */}
            {/* <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    color: 'white',
                }}
            >
                {name || '名無し'}さん、こんにちは！
            </Typography> */}

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
                    setAddress(e.target.value)
                    isAddress()
                }}
            />

            <Typography id='alertMessage'
                sx={{
                    visibility: clicked ? 'visible' : 'hidden',
                    color: 'red',
                    height: '20px',
                    margin: '5px',
                }}
            >
                {errorMessage}
            </Typography>

            {/* 会員登録画面へのボタン */}
            <Button
                sx ={{
                    color: 'white',
                    backgroundColor: '#FF0000',
                    '&:hover': {
                        backgroundColor: '#FF0000',
                    },
                    width: '200px',
                }}
                type='submit'
            >
                メンバー登録
            </Button>

        </Box>
    );
}
