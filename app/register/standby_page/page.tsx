'use client'
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useAuth } from '@/app/contexts/AuthContexts';
import { useRouter } from 'next/navigation';

import { ApiClient } from '@/lib/api/apiClient';

const apiClient = new ApiClient
export default function StandbyPage() {
    const [otp, setOtp] = useState('');
    const { grobalEmail } = useAuth()
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // ここでバックエンドにOTPを送信して検証する処理を呼び出す
        console.log('入力されたコード:', otp);
        // 例: verifyOtp(otp);
    };

    const authOtp = async() => {
        const authDict = {'emailAddress': grobalEmail, 'otp': otp}
        try{
            const response = await apiClient.request('/users/auth/verify-otp-signup/', 'POST', authDict)
            if(response.ok) {
                router.push('/register/get_pass')
            }
        }catch{
            console.log('予期せぬエラーが発生しました')
        }
    }


        useEffect(() => {
            if(grobalEmail) {
                console.log(`email changed ${grobalEmail}`)
            } else {
                console.log('email reset')
            }
        }, [grobalEmail]);


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
        >
            <Typography
                sx={{
                    color: 'white',
                    fontSize: '20pt',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                }}
            >
                {grobalEmail}
            </Typography>
            <form onSubmit={handleSubmit}>
                <p>メールアドレスに送信された6桁の認証コードを入力してください。</p>

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span style={{ width: '8px' }}></span>}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={{
                    justifyContent: 'center',
                    marginBottom: '24px',
                    }}
                    inputStyle={{
                    width: '40px',
                    height: '40px',
                    margin: '0 4px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    }}
                    // エラー時のスタイルも指定可能
                    // hasErrored={isError}
                    // errorStyle={{ border: '1px solid red' }}
                />

                <Button
                    variant="contained"
                    sx={{
                        width: '200px',
                        margin: '0 auto'
                    }}
                    type="submit"
                    disabled={otp.length < 6}
                    onClick={() => {
                        authOtp()
                    }}
                >
                    認証
                </Button>
            </form>
        </Box>
    )
}