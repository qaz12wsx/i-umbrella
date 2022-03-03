import React ,{useState} from "react";
import './App.css';
import { TextField, Button, Box} from '@mui/material';
import './all.css';
import Logo from './hello.png';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from './header';
import Footer from './footer';



export default function Signup(){
  const [account, setAccount] = useState({
    email:"",
    password: "",
    card: "",
    verifycode:"",
    verifydate:"",
  });
  
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  console.log('read out sessionStorage: sessionUserId=', window.sessionStorage.getItem('sessionUserId'));
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = function (e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async function () {
    try {
      const res = await axios.post("https://3m48pa2nyk.execute-api.us-west-2.amazonaws.com/CreateUser", account);
      if (res) {
        setMessage(res.data);
        // console.log(res.statusText);
          setOpen(true);
          setTimeout(function(){
            navigate('/login');
          },5000);
      }
    } catch (error) {
      console.log(error);
      setMessage("無法註冊");
    }
  };

    return (
      <div>
        <Header/>
      <Box className="register">
      <div>
        <img className="img" src={Logo} alt="logo"></img>
        <h2 className="text">~ 歡迎註冊 ~</h2>
        <form className="loginform">
          <TextField className="input" type = "email" name = "email" value={account.email} placeholder="E-mail" label="E-mail" onChange={handleChange}/>
          <TextField className="input" type = "password" name = "password" value={account.password} placeholder="密碼" label="密碼" onChange={handleChange}/>
          <TextField className="input" type = "text" name = "card" value={account.card} placeholder="信用卡卡號(16碼)" label="信用卡卡號" onChange={handleChange}/>
          <TextField className="input" type = "text" name = "verifycode" value={account.verifycode} placeholder="驗證碼(3碼)" label="驗證碼" onChange={handleChange}/>
          <TextField className="input" type = "text" name = "verifydate" value={account.verifydate} placeholder="到期日(01/20)" label="到期日" onChange={handleChange}/>
          <Button variant="contained" color="primary" sx={{marginTop:"15px"}} onClick={handleSubmit}>確認註冊</Button>
          <Link to="/login">
            <Button variant="outlined" color="primary" sx={{marginTop:"15px"}}>返回登入</Button>
          </Link>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success">{message}！請返回登入頁進行登入</Alert>
      </Snackbar>
      </Box>
      <Footer/>
      </div>
    );
  }
