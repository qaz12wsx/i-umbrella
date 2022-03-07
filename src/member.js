import './all.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Input from '@mui/material/Input';
import { Card, CardContent } from '@mui/material';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { Link } from "react-router-dom";

import axios from 'axios';

import u1 from './u1.png';
import u2 from './u2.png';
import Header from './header';
import Footer from './footer';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

function Member_index() {
    const navigate = useNavigate();
    
    const [success, setSuccess] = useState(false);
    
    const [islogin, setislogin] = useState(false);
    const [islogind, setislogind] = useState(false);
    
    const url = "https://picsum.photos/150/150";
    const [account, setCustomer] = useState({
      email:"123",
      card:"123",
      password:"!@#"
    });
    
    const [MemberEdit, setMemberEdit] = useState(false);
    const login = window.sessionStorage.getItem('sessionUserId')
    
    const handleSuccessClose = () => {
        setSuccess(false);
    };
    
    const handleSuccess = () => {
        setSuccess(true);
    };
    
    useEffect(() => {
      function isLogin(){
        const login = window.sessionStorage.getItem('sessionUserId')
            if(login === "null"){
                setislogin(true)
                setTimeout(function(){
                    navigate('/');
                },2000);
            }
        };
      async function fetchData () {
        const login = window.sessionStorage.getItem('sessionUserId')
        const result = await axios.get("https://3m48pa2nyk.execute-api.us-west-2.amazonaws.com/GetUser/"+login);
        setCustomer(result.data)
        setislogind(true)
      }
      isLogin();
      fetchData();
    },[MemberEdit]);

  return (
    <div className="memberIndex">
      <Header/>
      <Snackbar open={islogin} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error">請先登入！</Alert>
        </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleSuccessClose} severity="success">修改成功</Alert>
        </Snackbar>
        {islogind ? (
          <div className='memberContainer'>
            <Avatar src={url} alt="頭像" className="memberImg" sx={{ width: 150, height: 150 }}/>
            <h2>{account.email.S}</h2>
            <MemberData member={account} success={handleSuccess}/>
            <h3>所有租借紀錄</h3>
            <MemberHistory />
          </div>
        ):(<div className="loading">
                <CircularProgress />
            </div>)}
      
      <Footer/>
    </div>
  );
}

function MemberData(data){

    const url = "https://picsum.photos/150/150";

    const [open, setOpen] = useState(false); 
    const [user, setuser] = useState({
          email: data.member.email.S,
              password: data.member.password.S,
              card: data.member.card.S
    })
    
    const handleChange = function (e) {
      setuser({ ...user, [e.target.name]: e.target.value });
    };
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClick = () =>{
        update()
    }
    
    async function update(){
        try{
          // console.log(user)
          const reponse = await axios.put("https://3m48pa2nyk.execute-api.us-west-2.amazonaws.com/Updatecardwithemail",user);
          if(reponse === "Yes"){
            // setSuccess(true)
            data.success()
          }
        }
        catch(e){
          // console.log(e);
        }
        setOpen(false)
      }
    
    
  
    useEffect(() =>{
            setuser({
              email: data.member.email.S,
              password: data.member.password.S,
              card: data.member.card.S
            })

    },[data.member])

    return(
        <Grid container spacing={4} className="MemberData">
        <Grid item xs={12}>
        <div>
          <Button variant="outlined" onClick={handleClickOpen} >
            編輯信用卡資料
          </Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth={true}
          >
            <DialogContent>
              <Grid container spacing={3} sx={{alignItems:'center', justifyContent:'center'}}>
                <Grid item xs={12}><Avatar src={url} alt="頭像" className="memberImg" sx={{ width: 150, height: 150 }}/></Grid>
                <Grid item xs={3} sx={{textAlign:'right'}}>
                  <label>Email：</label>
                </Grid>
                <Grid item xs={8}>
                  <Input sx={{width:"100%"}} disabled name ="buyer_mail" value={user.email}/>
                </Grid>
                <Grid item xs={3} sx={{textAlign:'right'}}>
                  <label>Password：</label>
                </Grid>
                <Grid item xs={8}>
                  <Input sx={{width:"100%"}} disabled type="password" name ="password" value={user.password}/>
                </Grid>
                <Grid item xs={3} sx={{textAlign:'right'}}>
                  <label>信用卡：</label>
                </Grid>
                <Grid item xs={8}>
                  <Input sx={{width:"100%"}} onChange={handleChange} type="text" name ="card" value={user.card}/>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{justifyContent:"center"}}>
              <Button onClick={handleClose} variant="outlined">
                取消
              </Button>
              <Button autoFocus onClick={handleClick} variant="contained">
                儲存
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
        </Grid>
      </Grid>
    )
};

export default Member_index;





function MemberHistory(){

    const login = window.sessionStorage.getItem('sessionUserId')
    const [record, serRecord] = useState([])

    record.sort(function(a, b) {
        // boolean false == 0; true == 1
        return parseInt(a.record_id.S) < parseInt(b.record_id.S);
    });

    const handleClick = function (record) {
    };
    
    useEffect(() => {
      async function fetchData () {
        
        const result = await axios.get("https://3m48pa2nyk.execute-api.us-west-2.amazonaws.com/GetAllRecord/"+login);
        result.data.sort(function(a, b) {
        // boolean false == 0; true == 1
        return parseInt(a.record_id.S) < parseInt(b.record_id.S);
        });
        serRecord(result.data)
      }
      fetchData();
    },[]);

    return(
        <div className='MemberOrder'>
            {record.length === 0 ? (
          <div className="NoOrder">
            <p>目前沒有租借雨傘的紀錄<br/>趕快去借一把雨傘吧！</p>
            <Link to="/borrow">
              <Button color="primary" variant="contained" >前往租傘</Button>
            </Link>
          </div>
        ):(
          <div>
            {record.map((record, index) => 
              <Card sx={{ margin: "10px 0"}} key={index}>
                  <CardContent className="itemList" >
                  <Grid container spacing={2}   justifyContent="center" alignItems="end">
                    <Grid item xs={2}>
                        <img src={record.borrow_type.S === "摺疊傘" ? (u1):(u2)} alt="umbrella img"/>
                    </Grid>
                    <Grid item xs={4} alignSelf="start">
                        <ul className='orderList'>
                          <li><span>租借編號：{record.record_id.S}</span></li>
                          <li>租借日期：{record.borrow_time.S}</li>
                          {record.return_time.S === "" ? (<li></li>):(<li>歸還日期：{record.return_time.S}</li>)}
                          
                        </ul>
                    </Grid>
                    <Grid item xs={4}>
                        <ul className='orderList'>
                        {record.durationtime.S === "0" ? (<li></li>):(<li>租借時間：{record.durationtime.S}</li>)}
                        {record.payment.S === "0" ? (<li></li>):(<li>租借金額：{record.payment.S}</li>)}
                        </ul>
                    </Grid>
                    <Grid item xs={2} alignSelf="center">
                    {record.payment.S === "0" ? (<Button color="primary" variant="outlined"><Link to='/return' className="link">前往還傘</Link></Button>):(<p>已歸還</p>)}
                        
                    </Grid>
                  </Grid>

                  </CardContent>
              </Card>
            )}
          </div>
          )}
        </div>
    )
}