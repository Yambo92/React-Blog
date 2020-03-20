import React from "react";
import "./style.scss";
import { Button } from "antd";
import {useHistory} from 'react-router-dom'
import Img from "./timg.jpeg"
 const Logined = props => {
  const history = useHistory();
  return (
    <div className="logined-container">
      <img src={Img} />
      <p>欢迎：{props.userInfo.username}</p>
      <p className="centerP">光临我的博客</p>
      {props.userInfo.userType === "admin" ? (
        <Button onClick={() => history.push("/admin")} type="primary">
          点击进入管理页面
        </Button>
      ) : null}
    </div>
  );
};
export default Logined