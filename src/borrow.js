import React, { useEffect, useState, useContext } from 'react';
import { Card, Dialog, Button, CardContent, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import {AuthContext, STATUS} from './AuthContext';
import RefreshIcon from '@mui/icons-material/Refresh';

import axios from 'axios';

import u1 from './u1.png';
import u2 from './u2.png';
import Header from './header';
import Footer from './footer';

function Borrow(){
    const navigate = useNavigate();

    const [location, setLocation] = useState("台北車站大廳")
    const [umtype, setUmtype] = useState("所有種類")
    const [open, setOpen] = useState(false)
    const [passdata, setPassdata] = useState()
    const [success, setSuccess] = useState(false);
    
    const [islogin, setislogin] = useState(false);

    const [products, setProducts ] = useState([])
    const [product, setProduct] = useState([])

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleTypeChange = (event) => {
        setUmtype(event.target.value);
        if(event.target.value === "所有種類"){
            setProduct(products)
        }else{
        const newlist = products.filter(x => 
            { return x.umbrella_type.S === event.target.value })
        setProduct(newlist)
        }
    };

    const handleClick = function (product) {
        product.location = location;
        setPassdata(product)
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSuccessClose = () => {
        setSuccess(false);
    };
    const borrowSuccess = function() {
        setSuccess(true)
        borrow();
    };
    
    const authContext = useContext(AuthContext);
    // console.log(authContext.loginemail)
    
    async function borrow(){
        try{
          passdata.email = authContext.loginemail;
          const res = await axios.post("https://3m48pa2nyk.execute-api.us-west-2.amazonaws.com/GetInsertRecord", passdata);

          if (res) {
            // console.log(res);
          }
        }
        catch(e){
        //   console.log(e);
        }
        setTimeout(function(){
            navigate('/');
        },4500);
    }

    function Cfmborrow(data){
        return(
            <div className='cfmborrow'>
                <Snackbar open={success} autoHideDuration={4000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleSuccessClose} severity="success">已成功租借雨傘，請前往機台領取</Alert>
                </Snackbar>
                <img src={data.data.umbrella_type.S === "摺疊傘" ? (u1):(u2)} alt="雨傘" />
                <h3>您確定要在</h3>
                <h5>{data.data.location}</h5>
                <p>租借一把<span>{data.data.umbrella_type.S}</span>嗎？</p>
                <div className='btn'>
                    <Button variant="outlined" onClick={handleClose}>取消</Button>
                    <Button variant="contained" onClick={borrowSuccess}>確認</Button>
                </div>
            </div>
        )
    }
     async function getUm() {
    
            try {
              const res = await axios.get("https://3m48pa2nyk.execute-api.us-west-2.amazonaws.com/GetUmbrellaStatus");
        
              if (res) {
                const list = res.data.Items.sort(function(a, b) {
                    return parseInt(a.umbrella_id.N) > parseInt(b.umbrella_id.N);
                });
                if(umtype === "所有種類"){
                    setProduct(list)
                }else if(umtype === "摺疊傘"){
                    const newlist = products.filter(x => 
                        { return x.umbrella_type.S === "摺疊傘" })
                    setProduct(newlist)
                }else{
                    const newlist = products.filter(x => 
                        { return x.umbrella_type.S === "長柄傘" })
                    setProduct(newlist)
                }
                // setProduct(list)
                setProducts(list)
              }
            } catch (error) {
            //   console.log(error);
            }
          };
          
    useEffect(() => {
        function isLogin(){
            if(authContext.status === STATUS.toSignIn){
                setislogin(true)
                setTimeout(function(){
                    navigate('/');
                },3000);
            }
        };
        isLogin();
        getUm();
    },[])

    return(
        <div>
        <Header/>
            <Snackbar open={islogin} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error">請先登入！</Alert>
            </Snackbar>
            <div className='borrow'>
                <div className='stepone'>
                    <div className="title">
                        <p>1</p>
                        <h2 className="steoponetitle">選擇地點及雨傘種類</h2>
                    </div>
                    <div className="select">
                        <FormControl sx={{ minWidth: 200, marginLeft: '55px' }}>
                            <InputLabel id="chooselocation">租借地點</InputLabel>
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
                        <FormControl sx={{ minWidth: 200, marginLeft: '55px' }}>
                            <InputLabel id="chooseumtype">租借地點</InputLabel>
                            <Select
                            labelId="chooseumtype"
                            id="chooseumtype"
                            value={umtype}
                            label="umtype"
                            onChange={handleTypeChange}
                            >
                            <MenuItem value={"所有種類"}>所有種類</MenuItem>
                            <MenuItem value={"摺疊傘"}>摺疊傘</MenuItem>
                            <MenuItem value={"長柄傘"}>長柄傘</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='steptwo'>
                    <div className="title">
                        <p>2</p>
                        <div className="steoptwotitile">
                            <h2>選擇雨傘</h2>
                            <Button color="primary" onClick={()=>{getUm()}}><RefreshIcon/></Button>
                        </div>
                    </div>
                    <div className='umlist'>
                        {product.map((product, index)=>
                            <div className='umlist-item' key={index}>
                                <Card sx={{ backgroundColor: 'rgb(242,226,207,0.3)' }}>
                                    <div onClick={()=>handleClick(product)}>
                                        <CardContent>
                                            <img src={product.umbrella_type.S === "摺疊傘" ? (u1):(u2)} alt="product img"/>
                                            <div>
                                                <span>編號：{product.umbrella_id.N}</span>
                                                <p>{product.umbrella_type.S}</p>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
                <Dialog onClose={handleClose} open={open}>
                    <Cfmborrow data={passdata}/>
                </Dialog>
            </div>
        <Footer/>
        </div>
    )
}

export default Borrow;

