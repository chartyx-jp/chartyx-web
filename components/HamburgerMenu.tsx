import { Drawer, IconButton, List, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(!open)}>
        <MenuIcon/>
      </IconButton>

      <Drawer variant="temporary" anchor="left" open={open} hideBackdrop={true}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000',
            color: '#fff',
            borderRight: '1px solid #555',
            
          },  
        }}
        ModalProps={{
          disableScrollLock: true, // ★★★ ここを追加 ★★★
          // keepMounted: true, // これはDrawerが常にDOMにマウントされるようにするもので、Persistent Drawerでは自動的にtrueになります
        }}
      >
        <List>
          <ListItemButton onClick={() => setOpen(!open)}>close</ListItemButton>
          <ListItemButton>設定</ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
