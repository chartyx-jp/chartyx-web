import { Button, Typography } from '@mui/material';
import { useState } from 'react';


type props = {
    id: string
    name: string;
    active: boolean;
    onClick?: () => void;
};

export default function MySetButtons({ name, active }: props) {
    const [isActive, setActive] = useState(active);

    const switchActive = () => {
        setActive(active => !active);
        active = isActive
        console.log(active, isActive);
    };

    return (
        <Button
            sx={{
                width: '100px',
                height: '50px',
                borderRadius: '10px',
                margin: '10px',
                backgroundColor: isActive ? '#000' : '#fff',
            }}
            fullWidth variant="outlined"
            onClick={switchActive}
        >
            <Typography
                sx={{
                    fontWeight: 'bold',
                    color: isActive ? '#fff' : '#000',
                }}
            >{name}</Typography>
        </Button>
    );}