// ログイン画面
'use client';

import CustomTextField from '@/components/userInfoInputs';
import { Box, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import{ useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContexts';

import { Validator } from '@/lib/utils/validator'; // バリデーションライブラリをインポート
import { ApiClient } from '@/lib/api/apiClient';

const apiClient = new ApiClient

export default function Home() {
    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    // const [validationResult, setValidResult] = useState('');
    
    const { grobalEmail, setEmail } = useAuth();
    
    useEffect(() => {
        if(grobalEmail) {
            console.log(`email changed ${grobalEmail}`)
        } else {
            console.log('email reset')
        }
    }, [grobalEmail]);

    const signin = async() => {
        setIsButtonDisabled(true)
        try{
            const response = await apiClient.request(`/users/auth/login/`, 'POST', {emailAddress: emailAddress, password: password})
            if (response.ok){
                setEmail(emailAddress)
                console.log(response)
                router.push('/main/graph')
            }
        }catch(error){
            console.log(error)
        }
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
                ログイン
            </Typography>

            {/* メールアドレス */}
            <CustomTextField
                label="e-mail"
                placeholder=""
                onChange={(e) => {
                    setEmailAddress(e.target.value);
                    const validationResult = Validator.validateEmail(emailAddress);
                    if (validationResult.isValid == true){
                        console.log(validationResult)
                        setIsButtonDisabled(false)
                    }
                    setErrorMessage(validationResult.message || '');
                }}
            />

            {/* メールアドレス */}
            <CustomTextField
                label="password"
                placeholder=""
                onChange={(e) => {
                    setPassword(e.target.value);
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
                disabled={isButtonDisabled}
                onClick={() => {
                    signin();
                }}
            >
                ログイン
            </Button>
            {/* {isLoading && <div>Loading...</div>}  ローカルなローディング表示 
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
            <Link href='register/create_account'
                style={{
                    textDecoration: 'none',
                    color: 'white',
                    margin: '20px',
                }}
            >
                アカウントをお持ちでない方はこちら
            </Link>
        
        </Box>
    );
}
