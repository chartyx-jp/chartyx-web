// メールアドレス入力画面
'use client';

import CustomTextField from '@/components/userInfoInputs';
import { Box, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import{ useRouter } from 'next/navigation';

import { Validator } from '@/lib/utils/validator'; // バリデーションライブラリをインポート
import { useAuth } from '@/app/contexts/AuthContexts';
// import { validateDomainForEmail } from '@/lib/utils/validateDomain';

export default function Signup() {
    const { grobalEmail, setEmail } = useAuth()
    // const[isLoading, setIsLoading] = useState(false)
    const[errorMessage, setErrorMessage] = useState('')
    // const[validationMessage, setValidationMessage] = useState('')
    // const[isDomainValid, setIsDomainValid] = useState(false)
    const[inputEmail, setInputEmail] = useState('')
    const[isButtonDisabled, setIsButtonDisabled] = useState(true)

    const router = useRouter()

    // 全てのページでユーザーの検証に使うメールアドレスのセット
    useEffect(() => {
        if(grobalEmail) {
            console.log(`email changed ${grobalEmail}`)
        } else {
            console.log('email reset')
        }
    }, [grobalEmail]);

    // ドメインチェック
    // useEffect(() => {
    //     const domain = inputEmail.split('@')[1];
    //     if (domain) {
    //         validateDomainForEmail(domain)
    //     } else {
    //         setValidationMessage('')
    //         setIsDomainValid(false)
    //     }
    // }, [grobalEmail])

    // ユーザーのタイプ毎にバリデーションチェックをする関数
    const realTimeValidation = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newestEmail = e.target.value;
        setInputEmail(newestEmail)
        setEmail(newestEmail)
        const validationResult = Validator.validateEmail(newestEmail);
        if(validationResult.isValid) {
            setErrorMessage('')
            setIsButtonDisabled(false)
        } else {
            setErrorMessage(validationResult.message)
            setIsButtonDisabled(true)
            console.log(isButtonDisabled)
        }
    }

        // pythonサーバーにサインアップ要求をかける関数
        const signup = async() => {
            setIsButtonDisabled(true);
            // 1. メールアドレスの存在チェック
            try {
                // GET /api/proxy 経由で Django のメールアドレス存在チェック API を呼び出す
                const checkEmailResponse = await fetch(`/api/proxy?endPoint=/users/auth/check-email/&emailAddress=${grobalEmail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (checkEmailResponse.ok) {
                    console.log('メールアドレスのチェック成功:', checkEmailResponse);
    
                    // 2. OTP メール送信
                    // POST /api/proxy 経由で Django の OTP 送信 API を呼び出す
                    const sendOtpResponse = await fetch('/api/proxy', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            endPoint: '/users/auth/send-otp-signup/', // OTP 送信のエンドポイント
                            emailAddress: grobalEmail, // メールアドレスを渡す
                        }),
                    });
    
                    if (sendOtpResponse.ok) {
                        console.log('OTP メール送信成功:', sendOtpResponse);
                        router.push('/register/standby_page');
                    } else {
                        console.error('OTP メール送信失敗:', sendOtpResponse);
                        setErrorMessage('メール送信に失敗しました。もう一度お試しください。');
                    }
                } else {
                    console.error('メールアドレスのチェック失敗:', checkEmailResponse);
                    setErrorMessage('メールアドレスのチェックに失敗しました。');
                }
            } catch (error) {
                console.error('予期せぬエラー:', error);
                setErrorMessage('予期せぬエラーが発生しました。');
            } finally {
                setIsButtonDisabled(false); // 処理が終わったらボタンを再び有効にする
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
                    // {signup}
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
                    value = {inputEmail}
                    onChange={realTimeValidation}
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
                    disabled={isButtonDisabled}
                    onClick={() => {
                        signup();
                    }}
                >
                    メンバー登録
                </Button>
                {/* {isLoading && <div>Loading...</div>}  ローカルなローディング表示 
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
            </Box>
        );
    }