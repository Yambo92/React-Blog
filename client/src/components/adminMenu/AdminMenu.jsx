import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import "./style.scss";
import { Menu, Button } from "antd";
import menuList from "../../config/menuConfig";
import SubMenu from "antd/lib/menu/SubMenu";
import logo from  "../../assets/imgs/react_logo.png"
const AdminMenu = props => {
  let openKey; //获取默认sub展开菜单key;
  const location = useLocation();
  const history = useHistory();
  const initMenu = menuList => {
    return menuList.reduce((prevMenu, item) => {
      if (!item.children) {
        prevMenu.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        const cItem = item.children.find(
          cItem => location.pathname.indexOf(cItem.key) === 0
        );
        if (cItem) {
          openKey = item.key;
        }
        prevMenu.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                {item.icon}
                <span>{item.title}</span>
              </span>
            }
          >
            {initMenu(item.children)}
          </SubMenu>
        );
      }

      return prevMenu;
    }, []);
  };
  const [initialMenu, setInitialMenu] = useState(() => {
    const result = initMenu(menuList);
    return result;
  });
  return (
      <div>
        <Link to="/admin">
            <header className="admin-menu-link">
                <img src={logo} alt=""/>
                <h1>博客后台管理</h1>
            </header>
        </Link>
        <Menu
        selectedKeys={[props.url]}
        onClick={({ key }) => {
            props.changeUrl(key);
            props.history.push(`/admin${key}`);
        }}
        theme="dark"
        >
        {initialMenu}
        </Menu>
    </div>
  );
};

export default AdminMenu;
