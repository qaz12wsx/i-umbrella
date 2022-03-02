import * as React from 'react';
import Logo from './hello.png';
import './all.css';

export default function Footer() {
  
  return (
    <div className='footer'>
      <h2><a href='/home'><img src={Logo} alt="logo" /></a><span>Copyright © 2022 Hello co.</span></h2>
      <ul>
        <li>地址：地球村</li>
        <li>電話：<a href='tel:+886-2-12348888'>02-1234-8888</a></li>
        <li>信箱：<a href='mailto:hellotest@gmail.com'>hellotest@gmail.com</a></li>
      </ul>
    </div>
  );
}
