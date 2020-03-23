import React from 'react'
import "./style.scss"
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router-dom'

export const AdminHeader = (props) => {
    const history = useHistory();
    const {username} = props.userInfo
    const logOut = () => {
        history.replace('/')
        props.get_logout();
    }
    const menu = (
        <Menu>
            <Menu.Item className="admin-userInfo-menu" onClick={() => history.push('/')}>
            <span>
                首页
            </span>
          </Menu.Item>
          <Menu.Item className="admin-userInfo-menu">
            <span>
                个人中心
            </span>
          </Menu.Item>
          <Menu.Item onClick={logOut} className="admin-userInfo-menu">
            <span>
                退出登录
            </span>
          </Menu.Item>
        </Menu>
      );
    return (
        <div className="admin-header-container">
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                欢迎&nbsp;<span className="username">{username}</span>&nbsp;<DownOutlined />
                </a>
            </Dropdown>
        </div>
    )
}

