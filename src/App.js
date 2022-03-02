import React, {useState} from 'react';
import './index.css';
import Home from './home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthContext, STATUS} from './AuthContext';

import Login from './login';
import Signup from './register';
import Borrow from './borrow';
import Member from './member';
import Return from './return';

function App() {
  const [status, setStatus] = useState(STATUS.toSignIn);
  const [loginemail, setLoginemail] = useState()
    // useEffect(() => {

    //   async function fetchData () {
    //     const api = 'https://6gwc6bk2xh.execute-api.us-west-2.amazonaws.com/umbrella';
    //     const data = { "id" : "Mike" , "email": "test"};    
    //     const re = await axios.post(api, data);
    //     console.log(re.data.id)
    //   }
    //   fetchData();
    // },[]);

  return (
    <AuthContext.Provider value={{status, setStatus, loginemail, setLoginemail}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/borrow" element={<Borrow/>}/>
            <Route path="/member" element={<Member/>}/>
            <Route path="/return" element={<Return/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
