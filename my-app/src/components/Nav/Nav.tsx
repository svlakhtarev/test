import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {UserOutlined, LaptopOutlined} from '@ant-design/icons'
import {Menu} from 'antd'

const {SubMenu} = Menu

export const NavMenu: FC = () => {
  return (
    <Menu
      mode='inline'
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{height: '100%'}}
    >
      <SubMenu key='sub1' icon={<UserOutlined/>} title='My Profile'>
        <Menu.Item key='1'><NavLink to='/profile'>
          Profile
        </NavLink></Menu.Item>
        <Menu.Item key='2'><NavLink to='/dialogs'>
          Messages
        </NavLink></Menu.Item>
        <Menu.Item key='3'><NavLink to='/chat'>
          Chat
        </NavLink></Menu.Item>
      </SubMenu>
      <SubMenu key='sub2' icon={<LaptopOutlined/>} title='Users'>
        <Menu.Item key='5'><NavLink to='/users'>
          All Users
        </NavLink></Menu.Item>
      </SubMenu>
    </Menu>
  )
}
