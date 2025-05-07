import { useState } from 'react';
import { Box, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  if (!isMobile) return null;

  return (
    <>
      <IconButton
        color="white"
        onClick={toggleDrawer(true)}
        sx={{ position: 'fixed', left: 10, top: 4, zIndex: 1200, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: 300,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <SearchInput />
          <Box sx={{ flex: 1, overflowY: 'auto', my: 2 }}>
            <Conversations />
          </Box>
          <LogoutButton />
        </Box>
      </Drawer>
    </>
  );
};

export default MobileSidebar;