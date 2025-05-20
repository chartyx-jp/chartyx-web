import { Drawer, IconButton, List, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItemButton>ホーム</ListItemButton>
          <ListItemButton>設定</ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
