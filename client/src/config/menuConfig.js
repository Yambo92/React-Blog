import React from 'react'
import {
    HomeOutlined ,
    FileAddOutlined,
    UserOutlined,
    TagsOutlined,
    FileOutlined
    } from '@ant-design/icons';
const menuList = [
    {
        title: '首页', 
        icon: <HomeOutlined />,
        key:'/',
        isPublic: true
    },
    {
        title: "用户管理",
        icon: <UserOutlined />,
        key: '/managerUser'
    },
    {
        title: "发布文章",
        icon: <FileAddOutlined />,
        key: "/newArticle",
    },
    {
        title: "标签管理",
        icon: <TagsOutlined />,
        key: "/managerTags"
    },
    {
        title: "文章管理",
        icon: <FileOutlined />,
        key: "/managerArticle"
    }
]

export default menuList