import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CallMadeIcon from '@mui/icons-material/CallMade';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import Collapse from '@mui/material/Collapse';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import Logo from "./hello.png";
import { Link, useNavigate } from 'react-router-dom';

import './all.css'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  
  const navigate = useNavigate();
  
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const login = window.sessionStorage.getItem('sessionUserId');
  console.log(login)
  const [menuopen, setmenuOpen] = useState(false);
  const [sidemenuopen, setsidemenuOpen] = useState(false);

  const handleClick = () => {
    setmenuOpen(!menuopen);
  };
  const handlesidemenuClick = () => {
    setsidemenuOpen(!sidemenuopen);
  };

  function logout(){
    window.sessionStorage.setItem('sessionUserId', "null");
     setTimeout(function(){
      navigate('/');
    });
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
          <div style={{display:"flex"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }),padding:0 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
              <Link to="/">
                <img src={Logo} alt="LOGO" className='headerLogo'/>
              </Link>
          </Typography>
          </div>
            <ul className="menu">
              <li><Link to="/">首頁</Link></li>
              <li onClick={handleClick} className={menuopen ? ("active"):("")}><p>借/還傘</p>
              <Collapse  className="activemenu" in={menuopen} timeout="auto" unmountOnExit>
                <ul>
                  <li><Link to="/borrow">我要借傘</Link></li>
                  <li><Link to="/return">我要還傘</Link></li>
                </ul>
            </Collapse></li>
              { login === "null" || login === null ? (<li><Link to="/login">登入</Link></li>):(<li className="logoutbtn" onClick={logout}>登出</li>)}
            </ul>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          padding:0,
          backgroundColor:'#EAD8CB'
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
            sx={{backgroundColor:'rgb(234,216,203,0.6)'}}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
            sx={{backgroundColor:'rgb(234,216,203,0.6)', height:'100%'}}
            className="drawerMenu"
        >
          <ListItem button>
            <Link to='/'>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary='首頁' />
            </Link>
          </ListItem>
          <ListItem button onClick={handlesidemenuClick}>
            <ListItemIcon><UmbrellaIcon/></ListItemIcon>
            <ListItemText primary='借/還傘' sx={{color: '#804f30'}}/>
          </ListItem>
            <Collapse className="sidemenu" in={sidemenuopen} timeout="auto" unmountOnExit>
                <ul>
                  <li><Link to="/borrow"><CallMadeIcon/>我要借傘</Link></li>
                  <li><Link to="/return"><CallReceivedIcon/>我要還傘</Link></li>
                </ul>
            </Collapse>
          <ListItem button>
          <Link to='/member'>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary='會員中心' />
            </Link>
          </ListItem>
          <ListItem button>
            <a href="mailto:testhello@gmail.com">
              <ListItemIcon><EmailIcon /></ListItemIcon>
              <ListItemText primary='聯絡我們' />
            </a>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open} sx={{padding:0}}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
