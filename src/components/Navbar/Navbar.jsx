import React from 'react';
import s from './Navbar.module.css';

const Navbar = () =>{
    return <nav className={s.nav}>
    <div className={s.item}>
      <a>Profile</a>
    </div>
    <div  className={s.item}>
      <a>Message</a>
    </div>
    <div  className={`${s.item} ${s.active}`}>
      <a>Music</a>
    </div>
    <div  className={s.item}>
      <a>Settings</a>
    </div>
  </nav>
}
export default Navbar;