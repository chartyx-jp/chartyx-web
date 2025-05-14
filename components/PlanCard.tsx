import { Box, Button, Paper, Typography } from '@mui/material';
import { JSX } from 'react';

/*
[props]
コンポーネントに渡す引数のこと。
これを指定すると、タグにプロパティの形で値を渡せる
*/

type props = {
    name: string;
    price: number;
    active: boolean;
    description: JSX.Element;
    // TypeScriptの書き方として、引数につく?は「あってもなくてもいいよ」という意味(もしundefinedになっていても平気)
    onClick?: () => void;
};

export default function PlanCard({ name, price, active, description, onClick }: props) {
    return (
        <Paper
            sx={{
                height: '400px',
                width: '300px',
                backgroundColor: '#000',
                border: 'solid 1px #ccc',
                borderRadius: '10px',
                px: 2,
                pt: 1,
                pb: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-betweens',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '40pt',
                        fontWeight: 'bold',
                    }}
                >
                    {name}
                </Typography>
                <Box sx={{ display: 'flex', mr: 0, ml: 'auto', mb: 1, alignItems: 'flex-end' }}>
                    <Typography sx={{ fontSize: '25pt' }}>{price}</Typography>
                    <Typography sx={{ fontSize: '10pt', mb: '8px', ml: 0.5 }}>円/月</Typography>
                </Box>
            </Box>
            {active ? (
                // 現在のプランであれば表示する
                <Box
                    sx={{
                        my: 2,
                        height: '50px',
                        border: '2px solid orange',
                        borderRadius: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ fontWeight: 'bold' }}>現在のプラン</Typography>
                </Box>
            ) : (
                // それ以外は位置を揃えるために空白にする
                <Box sx={{ height: '50px', my: 2 }}></Box>
            )}
            <Box>{description}</Box>
            <Button sx={{ mb: 0, mt: 'auto' }} fullWidth variant="outlined" onClick={onClick}>
                選択する
            </Button>
        </Paper>
    );
}
