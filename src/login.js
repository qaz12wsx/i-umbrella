import React, { useState, useContext } from "react";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";
import Logo from "./hello.png"
import './all.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Header from './header';
import Footer from './footer';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SignIn() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    displayName: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  
  const handleChange = function (e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async function () {
    setMessage("");
    
    try {
      const res = await axios.post("https://3m48pa2nyk.execute-api.us-west-2.amazonaws.com/GetLoginInfo", account);
      
      if (res) {
        if(res.data === "login success"){
          setSuccess(true)
          window.sessionStorage.setItem('sessionUserId', account.username);
          console.log(window.sessionStorage.getItem('sessionUserId'));
          setTimeout(function(){
            navigate('/');
          },3000);
        }else if (res.data === "account does not exist"){
          setMessage("帳號不存在，請進行註冊")
        }else if (res.data === "wrong password"){
          setMessage("密碼錯誤")
        }
        // if(res.statusText === 'OK'){
        //   navigate('/');
        // }
      }
    } catch (error) {
      console.log(error);
      setMessage("無法登入");
    }
  };
  
  const handleSuccessClose = () => {
        setSuccess(false);
  };
    
  return (
    <div>
      <Header/>
    <Box className="login">
      <div>
        <img className="img" src={Logo} alt="logo"/>
        <div className="loginform">
          <TextField
            className="input"
            type="text"
            name="username"
            value={account.username}
            placeholder="帳號"
            label="帳號"
            onChange={handleChange}
            autoComplete="username"
          />
          <TextField
            className="input"
            type="password"
            name="password"
            value={account.password}
            placeholder="密碼"
            label="密碼"
            onChange={handleChange}
            autoComplete="current-password"
          />
          {message}
          <br />
          <div>
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{margin:"10px 10px"}}>
              登入
            </Button>
            <Link to="/signup">
              <Button variant="contained" color="secondary" >
                我要註冊
              </Button>
            </Link>
          </div>
          <Button variant="text">忘記密碼</Button>
        </div>
      </div>
    </Box>
    <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={handleSuccessClose} severity="success">登入成功，三秒後將跳轉回首頁</Alert>
    </Snackbar>
    <Footer/>
    </div>
  )
}
