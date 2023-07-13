import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Link,
} from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TopBar from '../TopBar';
import { Favorite } from '@mui/icons-material';

const LINKS = [
  { to: '/', icon: HomeIcon, text: 'Home' },
  { to: '/beer', icon: SportsBar, text: 'Beer List' },
  { to: '/favorites', icon: Favorite, text: 'Favorite beers' }
];

const drawerWidth = 240;

type LinkItemProps = {
  to: string;
  icon: React.ElementType;
  text: string;
};

function LinkItem({ to, icon: Icon, text }: LinkItemProps) {
  return (
    <Link component={RouterLink} to={to}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

interface Props {
  children: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Divider />
      <List>
        {LINKS.map(({ to, icon, text }) => (
          <LinkItem key={to} to={to} icon={icon} text={text} />
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='article'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)`, background: '#f7f7f7' },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
