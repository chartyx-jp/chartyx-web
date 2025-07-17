'use client'
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useAuth } from '@/app/contexts/AuthContexts';
import { useRouter } from 'next/navigation';

export default function StandbyPage() {
    const [otp, setOtp] = useState('');
    const { grobalEmail } = useAuth()
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // 6桁入力されていなければ認証処理を呼び出す
        if (otp.length < 6) return;
        authOtp();
    };

    const authOtp = async () => {
        // const authDict = {'emailAddress': grobalEmail, 'otp': otp}
        try{
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    endPoint: '/users/auth/verify-otp-signup/',
                    emailAddress: grobalEmail,
                    otp: otp
                })
            });
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
                color: 'white',
                textAlign: 'center',
                px: 2,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 'bold',
                    mb: 2,
                }}
            >
                認証コードの入力
            </Typography>
            <Typography
                sx={{
                    color: '#e0e0e0',
                    mb: 1,
                }}
            >
                {grobalEmail}
            </Typography>
              <Typography variant="body2" sx={{ color: '#bdbdbd', mb: 4 }}>
                上記メールアドレスに送信された6桁の認証コードを入力してください。
            </Typography>
            <Box component="form" onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: '100%'
                }}>
                </Box>

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span style={{ width: '12px' }}></span>}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={{
                        justifyContent: 'center',
                        marginBottom: '24px',
                    }}
                    inputStyle={{
                        width: 'clamp(35px, 10vw, 50px)', // レスポンシブ対応
                        height: 'clamp(45px, 12vw, 60px)', // レスポンシブ対応
                        fontSize: '1.5rem',
                        borderRadius: '8px',
                        border: '1px solid #424242',
                        backgroundColor: '#212121',
                        color: 'white',
                        textAlign: 'center',
                        outline: 'none',
                    }}
                    // エラー時のスタイルも指定可能
                    // hasErrored={isError}
                    // errorStyle={{ border: '1px solid red' }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{
                            width: '200px',
                            color: 'white',
                        }}
                        type="submit"
                        disabled={otp.length < 6}
                        onClick={() => {
                            authOtp()
                        }}
                    >
                        認証
                    </Button>
                </Box>
        </Box>
    )
}