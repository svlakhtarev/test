import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import style from './Nav.module.css'

const Nav: FC = () => {
  return (
    <nav className={style.nav}>
      <div>
        <NavLink to='/profile'
                 activeClassName={style.active}>
          Profile
        </NavLink>
      </div>
      <div>
        <NavLink to='/dialogs'
                 activeClassName={style.active}>
          Messages
        </NavLink>
      </div>
      <div>
        <NavLink to='/users'
                 activeClassName={style.active}>
          Users
        </NavLink>
      </div>
      {/*<div>
        <NavLink to='/news'
                 activeClassName={style.active}>
          News
        </NavLink>
      </div>
      <div>
        <NavLink to='/music'
                 activeClassName={style.active}>
          Music
        </NavLink>
      </div>
      <div>
        <NavLink to='/settings'
                 activeClassName={style.active}>
          Settings
        </NavLink>
      </div>*/}
    </nav>
  )
}

export default Nav
