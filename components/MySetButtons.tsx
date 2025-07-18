import { Button, Typography } from '@mui/material';

type props = {
    id: string
    name: string;
    active: boolean;
    onClick: (id: string) => void;
};

export default function MySetButtons({ id, name, active, onClick }: props) {
    return (
        <Button
            variant={active ? 'contained' : 'outlined'}
            sx={{
                backgroundColor: active ? '#73C4BF' : 'transparent',
                color: '#FFFFFF', // 白に変更
                borderColor: active ? 'transparent' : '#444444', // より見やすいボーダー色に変更
                width: 'auto',
                height: '50px',
                borderRadius: '10px',
                margin: '10px',
                '&:hover': {
                    borderColor: '#73C4BF', // ホバー時のボーダーをアクセントカラーに
                    color: '#FFFFFF',
                    backgroundColor: active ? '#4A9B96' : 'rgba(115, 196, 191, 0.1)', // ホバー時の背景
                },
            }}
            onClick={() => onClick(id)}
        >
            <Typography
                sx={{
                    fontWeight: 'bold',
                }}
            >
                {name}
            </Typography>
        </Button>
    );
}