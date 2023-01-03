import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';


const colors = "#272130"

const options = [
  { label: 'Totodile', id: 1 },
  { label: 'Charmander', id: 2 },
  { label: 'Treeko', id: 3 },
];


export default function TitleBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = () => {console.error("TODO")}//useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMenuOpen(open);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
			      onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton >
		      <Drawer
            anchor={'left'}
            open={menuOpen}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>

          <Box
            component="img"
            sx={{
              height: 45,
              width: 39,
              maxHeight: { xs: 39, md: 39 },
              maxWidth: { xs: 45, md: 45 },
            }}
            alt="Pokemon Crown"
            src="/logo-icon.png"
            onClick={() => navigate('/')}
          />
          <Box sx={{width: 10, height: 45}} onClick={() => navigate('/')}/>
          <Typography variant="h6" component="div" onClick={() => navigate('/')}>
            Pokemon Crown
          </Typography>

          <Box sx={{ flexGrow: 1 }} ></Box>
          
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Pokemon" />}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}