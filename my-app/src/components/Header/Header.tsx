import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import logo from './../../assets/images/featured_channel.jpg'
import {Avatar, Button, Col, Layout, Row} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {selectIsAuth, selectLogin} from '../../redux/authSelectors'
import {logout} from '../../redux/authReducer'
import style from './../Header/Header.module.css'

export const Header: FC<MapPropsType> = () => {
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectLogin)
  const dispatch = useDispatch()
  const logoutCallback = () => {
    dispatch(logout())
  }
  const {Header} = Layout

  return (
    <Header className="header">
      <Row>
        <Col span={1}>
          <Link to={'/'}>
            <img className={style.logo} src={logo} alt={''}/>
          </Link></Col>
        <Col span={20}></Col>
        {isAuth
          ? <><Col span={1}>
            <Avatar alt={login || ''} size={50} icon={<UserOutlined/>}/>
          </Col>
            <Col span={2}>
              <Button onClick={logoutCallback}>Log out</Button>
            </Col>
          </>
          : <Col span={3}>
            <Button><Link to={'/login'}>Login</Link></Button>
          </Col>}
      </Row>
    </Header>
  )
}

export type MapPropsType = {}
