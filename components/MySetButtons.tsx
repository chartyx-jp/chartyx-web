import { Button, Typography } from '@mui/material';


type props = {
    id: string
    name: string;
    active: boolean;
    onClick: (id: string) => void;
};

export default function MySetButtons({ id, name, active, onClick }: props) {
    // const [isActive, setActive] = useState(active);

    // const switchActive = () => {
    //     setActive(active => !active);
    //     active = isActive
    //     console.log(active, isActive);
    // };

    return (
        <Button
            variant={active ? 'contained' : 'outlined'}
            sx={{
                color: active ? '#fff' : '#aaa',
                width: 'auto',
                height: '50px',
                borderRadius: '10px',
                margin: '10px',
                '&:hover': {
                    borderColor: '#888',
                    color: '#fff',
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
    );}