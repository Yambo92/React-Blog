import React from 'react'
import { Spin } from 'antd';
import  './style.scss'
export const Loading=()=>(
        <div className="loading_container">
            <Spin size="large"/>
        </div>
);