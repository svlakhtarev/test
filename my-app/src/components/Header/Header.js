import React from 'react';
import {NavLink} from "react-router-dom";
import style from './Header.module.css';
import logo from './../../assets/images/featured_channel.jpg';
import {MyButton} from '../common/FormsControls/formsContorls';

const Header = ({isAuth, login, logout}) => {
  return (
    <header className={style.header}>
      <div>
        <NavLink to={'/'}>
          <img src={logo} alt={''}/>
        </NavLink>
      </div>
      <div className={style.loginBlock}>
        {isAuth
          ? <div>{login} - <MyButton onClick={logout} title={'Log out'}/></div>
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header;
