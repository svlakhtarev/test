import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import style from './Header.module.css'
import logo from './../../assets/images/featured_channel.jpg'
import {MyButtonClick} from '../common/FormsControls/formsContorls'

export type MapPropsType = {
  isAuth: boolean
  login: string | null
}
export type DispatchPropsType = {
  logout: () => void
}

const Header: FC<MapPropsType & DispatchPropsType> = ({isAuth, login, logout}) => {
  return (
    <header className={style.header}>
      <div>
        <NavLink to={'/'}>
          <img src={logo} alt={''}/>
        </NavLink>
      </div>
      <div className={style.loginBlock}>
        {isAuth
          ? <div>{login} - <MyButtonClick onClick={logout} title={'Log out'}/></div>
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header
