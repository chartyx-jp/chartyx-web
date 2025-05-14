'use client';
import { TextField, TextFieldProps } from '@mui/material';

export default function UserInfoInputs(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            sx={{
                width: '300px',
                mt: 2,
                input: {
                    color: '#ffffff',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'gray', // 通常時の枠線の色
                    },
                    '&:hover fieldset': {
                        borderColor: 'gray', // ホバー時の枠線の色
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white', // フォーカス時の枠線の色
                    },
                },
                '& .MuiInputLabel-root': {
                    color: 'gray', // 通常時のラベル色
                    '&.Mui-focused': {
                        color: 'white', // フォーカス時のラベル色
                    },
                },
                ...props.sx,
            }}
        />
    );
}
