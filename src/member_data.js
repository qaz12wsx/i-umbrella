import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Input from '@mui/material/Input';
import './all.css';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

export default function MemberData(props) {
    const url = "https://picsum.photos/150/150";
    // console.log(props)
    const [user, setuser] = useState({
      buyer_id: props.member.buyer_id,
      buyer_name: props.member.buyer_name,
      buyer_mail: props.member.buyer_mail,
      buyer_phone: props.member.buyer_phone,
      buyer_address: props.member.buyer_address,
      credit: props.member.credit,
      password: props.member.password,
    });
    // const [buyer_name, setbuyer_name] = useState(props.member.buyer_name);
    // const [buyer_mail, setbuyer_mail] = useState(props.member.buyer_mail);
    // const [buyer_phone, setbuyer_phone] = useState(props.member.buyer_phone);
    // const [buyer_address, setbuyer_address] = useState(props.member.buyer_address);

    const [open, setOpen] = useState(false); 

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
        // console.log(newMemberData);
        update(user)
    }
    async function update(user){
        try{
          await axios.put("/buyer",user);
        }
        catch(e){
          console.log(e);
        }
        setOpen(false)
        props.MemberEdit();
      }
    useEffect(() =>{
        if(props.member){
            setuser(props.member)
            // setbuyer_mail(props.member.buyer_mail)
            // setbuyer_phone(props.member.buyer_phone)
            // setbuyer_address(props.member.buyer_address)
        }
    },[props.member])
    
    return(
      <Grid container spacing={4} className="MemberData">
        <Grid item xs={5}>
          <h3>Email：</h3>
        </Grid>
        <Grid item xs={6}>
          <p>{props.member.buyer_mail}</p>
        </Grid>
        <Grid item xs={5}>
          <h3>電話：</h3>
        </Grid>
        <Grid item xs={6}>
          <p>{props.member.buyer_phone}</p>
        </Grid>
        <Grid item xs={5}>
          <h3>地址：</h3>
        </Grid>
        <Grid item xs={6}>
          <p>{props.member.buyer_address}</p>
        </Grid>
        <Grid item xs={12}>
        <div>
          <Button variant="outlined" onClick={handleClickOpen} size="large">
            編輯資料
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
                  <label>會員名稱：</label>
                </Grid>
                <Grid item xs={8}>
                  <Input sx={{width:"100%"}} onChange={handleChange} name ="buyer_name" value={user.buyer_name}/>
                </Grid>
                <Grid item xs={3} sx={{textAlign:'right'}}>
                  <label>Email：</label>
                </Grid>
                <Grid item xs={8}>
                  <Input sx={{width:"100%"}} disabled name ="buyer_mail" value={user.buyer_mail}/>
                </Grid>
                <Grid item xs={3} sx={{textAlign:'right'}}>
                  <label>Password：</label>
                </Grid>
                <Grid item xs={8}>
                  <Input sx={{width:"100%"}} disabled type="password" name ="password" value={user.password}/>
                </Grid>
                <Grid item xs={3} sx={{textAlign:'right'}}>
                  <label>電話：</label>
                </Grid>
                <Grid item xs={8}>
                  <Input sx={{width:"100%"}} onChange={handleChange} name ="buyer_phone" value={user.buyer_phone}/>
                </Grid>
                <Grid item xs={3} sx={{textAlign:'right'}}>
                  <label>地址：</label>
                </Grid>
                <Grid item xs={8}>
                  <Input sx={{width:"100%"}} onChange={handleChange} name ="buyer_address" value={user.buyer_address}/>
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
  }