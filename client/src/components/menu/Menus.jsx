import React, {useState, useEffect} from "react"
import './style.scss'
import {Menu} from 'antd'
import {useHistory} from 'react-router-dom'
import LinkButton from "../link-button/LinkButton"


export default function Menus(props) {
    const history = useHistory();
    const [current, setCurrent] = useState(props.categories[0]._id)
    const onClick = (e) => {
        if(e.key === '首页'){
            //如果是首页就获取所有atitcle
            props.getArticleList('')
        }else{
            //获取当前category下的article
            props.getArticleList(e.item.props.name)
        }
        let toPath = e.item.props.name === '首页' ? '/' : '/' + e.item.props.name
       
        setCurrent(e.key);
        history.push(toPath)
    }
    const logOut = () => {
        props.logout()
    }
    useEffect(() => {
        let pathName = history.location.pathname.replace('\/', '');
        let matched = pathName ? props.categories.find((c) => c.name === pathName ) : {}
        setCurrent(matched._id || '首页')
    }, [])
    return (
        <div className="menu-container">
            <Menu className="top-menu"
                  mode='horizontal'
                  defaultSelectedKeys={current}
                  selectedKeys={current}
                  onClick={onClick}>
                {
                    props.categories.map((category, index) => (
                    <Menu.Item key={category._id} name={category.name}>
                        {category.name}
                    </Menu.Item>
                    ))
                }
                
            </Menu>
            {props.userInfo.userId ? <span className="logout"><LinkButton  onClick={logOut}>退出</LinkButton></span> : null}
        </div>
        
    )
}

