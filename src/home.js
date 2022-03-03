import React, { useEffect, useState } from 'react';
import { Card,CardContent, Typography, Button, Skeleton } from '@mui/material';
import { Link } from "react-router-dom";
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import axios from 'axios';

import u1 from './u1.png';
import u2 from './u2.png'

import Header from './header';
import Footer from './footer';
import Lexbox from './lextest';

function Home(){
    const [temp, setTemp] = useState();
    const [weather, setweather] = useState();
    const [weatherimg, setweatherimg] = useState();
    const [isload, setisload] = useState(false);
    
    const [geo, setGeo] = useState(true)
    
    useEffect(() => {
        // async function getWeather(){
        //     try{
        //         if (!navigator.geolocation) {
        //             console.log('Geolocation is not supported by your browser');
        //           } else {
        //             navigator.geolocation.getCurrentPosition((position) => {
                      
        //               const lat = position.coords.latitude
        //               const lon = position.coords.longitude
        //               const url = "http://api.openweathermap.org/data/2.5/weather?lat=25.077330452500306&lon=121.4861129306876&lang=zh_tw&appid=c1e08fdf6d7196ea9115f64114cb39b6"
        //               const url1 = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyAKAxA-GJnoPsdnfYwW202l6GwLvugXWOc"
        //               allget(url,url1);
                      
        //             }, () => {
        //               console.log('Unable to retrieve your location');
        //               setisload(true)
        //               setGeo(false)
        //             });
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        async function allget(){
            const url = "http://api.openweathermap.org/data/2.5/weather?lat=25.077330452500306&lon=121.4861129306876&lang=zh_tw&appid=c1e08fdf6d7196ea9115f64114cb39b6"
            const re = await axios.get(url);
            // const re1 = await axios.get(url1);
            const tempC = parseInt(re.data.main.temp - 273.15)
            // const loc = re1.data.plus_code.compound_code.split(" ")
            setTemp(tempC)
            setweather(re.data.weather[0].description)
            // setAddress(loc[1])
            const imgurl = "http://openweathermap.org/img/wn/"+re.data.weather[0].icon+"@2x.png"
            setweatherimg(imgurl)
        
            setisload(true)
            setGeo(true)
        }
        allget();
    },[isload])

    return(
        <div>
        <Header/>
        <div className='index'>
            {isload ? (
                   <Card className='banner' variant="outlined">
                   { geo ? (
                   <div className='bannercontain'>
                   <div  className="weatherdes">
                       <p>目前位置</p>
                       <h3>台灣新北市三重區</h3>
                       <h4>{temp}°C<span>{weather}</span></h4>
                   </div>
                   <div className="weatherimg"><img src={weatherimg} alt={"天氣"}/></div>
                   </div>):(
                   <div><h5>無法取得目前地理位置</h5></div>
                   )}
                    </Card>
               ):(<Skeleton variant="rectangular" height={120}/>)}
                
            <div className='title'>
                <h3><UmbrellaIcon fontSize="large"/>我們提供的雨傘種類</h3>
                <Button variant="contained" sx={{marginBottom:"5px"}}><Link to='/borrow' className="link">前往租傘</Link></Button>
            </div>
            <div className="typelist">
            <div className="typeitem">
                    <Card sx={{ backgroundColor: 'rgb(242,226,207,0.3)' }}>
                    <CardContent>
                        <img src={u1} alt="product img"/>
                        <Typography variant="h5" sx={{color:"#87614a", fontWeight:"bold"}}>
                            摺疊傘
                        </Typography>
                    </CardContent>
                    </Card>
                </div>
                <div className="typeitem">
                    <Card sx={{ backgroundColor: 'rgb(242,226,207,0.3)' }}>
                    <CardContent>
                        <img src={u2} alt="product img"/>
                        <Typography variant="h5" sx={{color:"#87614a", fontWeight:"bold"}}>
                            長柄傘
                        </Typography>
                    </CardContent>
                    </Card>
                </div>
            </div>
            <br/>
            <Button variant="contained" sx={{marginBottom:"30px"}}><Link to='/borrow' className="link">我要租傘</Link></Button>
        </div>
        <Lexbox/>
        <Footer/>
        </div>
    )
}

export default Home;