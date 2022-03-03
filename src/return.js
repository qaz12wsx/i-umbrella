import React, { useEffect, useState } from 'react';
import { Dialog, Button, InputLabel, MenuItem, FormControl, Select, Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate, Link } from "react-router-dom";

import axios from 'axios';

import u1 from './u1.png';
import u2 from './u2.png';
import Header from './header';
import Footer from './footer';

function Return(){
    
    const navigate = useNavigate();
    
    const [location, setLocation] = useState("台北車站大廳")

    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false);
    
    const [isborrow, setIsborrow] = useState(false);
    
    const [islogin, setislogin] = useState(false);

    const [returndata, setRreturndata] = useState([{
        record_id: "R3",
        borrow_time: "2022/02/27",
        return_time: "2022/02/28",
        durationtime: "1 day",
        payment: "100",
        borrow_type: "摺疊傘",
        um_id: "UM1"
    }])

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleClick = function () {
        
        update();
    };
    
    async function update(){
        try{
            // console.log(returndata)
            const result = await axios.put("https://3m48pa2nyk.execute-api.us-west-2.amazonaws.com/Updaterecord",returndata[0])
            // console.log(result)
            Cfmreturn([result.data])
            setRreturndata([result.data])
        }catch(e){
        //   console.log(e);
        }
        setOpen(true)
        }
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleSuccessClose = () => {
        setSuccess(false);
    };
    const returnSuccess = function() {
        setSuccess(true)
        setTimeout(function(){
            navigate('/');
        },5000);
      };
    const login = window.sessionStorage.getItem('sessionUserId')
    
    function Cfmreturn(data){
        
        return(
            <div className='cfmborrow'>
                <Snackbar open={success} autoHideDuration={5000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleSuccessClose} severity="success">已扣款並確認歸還，請在五分鐘內前往機台歸還雨傘</Alert>
                </Snackbar>
                <Grid container justifyContent="center" className='returndatacheck'>
                    <Grid item xs={12} alignSelf="center" className="returnitem">
                            <h4>租借編號：{returndata[0].record_id.S}</h4>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}  className="returnitem">
                        <img src={returndata[0].borrow_type.S === "摺疊傘" ? (u1):(u2)} alt="umbrella img"/>
                    </Grid>
                    <Grid item xs={4} alignSelf="center">
                        <ul className='orderList'>
                            <li><span>雨傘編號：{returndata[0].um_id.N}</span></li>
                            <li>雨傘種類：{returndata[0].borrow_type.S}</li>
                        </ul>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}  className="returnitem">
                            <p>租借時間：{returndata[0].borrow_time.S}</p>
                    </Grid>
                    <Grid item xs={4} className="returnitem">
                            <p>歸還時間：{returndata[0].return_time.S}</p>
                    </Grid>
                    <Grid item xs={4} className="returnitem">
                            <p>租借時長：{returndata[0].durationtime.S}</p>
                    </Grid>
                    <Grid item xs={12} alignSelf="center"  className="returnitem">
                        <h5>租借金額</h5>
                        <span>{returndata[0].payment.S}</span>
                    </Grid>
                    <Grid item xs={12} alignSelf="center"  className="returnitem">
                            <Button variant="contained" onClick={returnSuccess}>確認</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

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
        
        
        async function getRecord() {
    
            try {
              const res = await axios.get("https://3m48pa2nyk.execute-api.us-west-2.amazonaws.com/GetAllRecord/"+login);
        
              if (res) {
                  
                const newlist = res.data.filter(x => 
                        { return x.payment.S === "0" })
                
                if(newlist.length !== 0){
                    
                    setRreturndata(newlist)
                    setIsborrow(true)
                    // console.log(newlist);
                }
              }
            } catch (error) {
            //   console.log(error);
            }
          };
        isLogin();
        getRecord();
    },[])

    return(
        <div>
        <Header/>
            { isborrow ? (<div className='borrow'>
                <div className='stepone'>
                    <div className="returntitle">
                        <p>1</p>
                        <h2>選擇歸還地點</h2>
                    </div>
                    <div className="select">
                        <FormControl sx={{ minWidth: 200, marginLeft: '55px' }}>
                            <InputLabel id="chooselocation">歸還地點</InputLabel>
                            <Select
                            labelId="chooselocation"
                            id="chooselocation"
                            value={location}
                            label="location"
                            onChange={handleChange}
                            >
                            <MenuItem value={"台北車站大廳"}>台北車站大廳</MenuItem>
                            <MenuItem disabled value={"象山捷運站三號出口"}>象山捷運站三號出口</MenuItem>
                            <MenuItem disabled value={"三和國中二號出口"}>三和國中二號出口</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='steptwo'>
                    <div className="returntitle">
                        <p>2</p>
                        <h2>確認資訊</h2>
                    </div>
                    <div className='returndata'>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={4} sx={{textAlign:"center"}}>
                                <h4>租借編號：{returndata[0].record_id.S}</h4>
                            </Grid>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={4}>
                                <img src={returndata[0].borrow_type.S === "摺疊傘" ? (u1):(u2)} alt="umbrella img"/>
                            </Grid>
                            <Grid item xs={8} alignSelf="start">
                                <ul className='orderList'>
                                    <li><span>雨傘編號：{returndata[0].um_id.N}</span></li>
                                    <li>雨傘種類：{returndata[0].borrow_type.S}</li>
                                    <li>租借時間：{returndata[0].borrow_time.S}</li>
                                </ul>
                            </Grid>
                            <Grid item xs={12} alignSelf="center" className='returnbtn'>
                                <Button color="primary" variant="contained" onClick={handleClick}>確認還傘</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Dialog onClose={handleClose} open={open} fullWidth maxWidth='md'>
                    <Cfmreturn data={location}/>
                </Dialog>
            </div>):
            (
            <div className="NoReturn">
                <p>尚無未歸還雨傘，請前往租借！</p>
                <Link to="/borrow">
                  <Button color="primary" variant="contained" >前往租傘</Button>
                </Link>
              </div>
            )}
            
        <Footer/>
        <Snackbar open={islogin} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error">請先登入！</Alert>
        </Snackbar>
        </div>
    )
}

export default Return;

