
import React,{useState, useEffect} from 'react'
import {Tabs, Form} from 'antd'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
const { TabPane } = Tabs;

export default function Login(props) {
  const [form] = Form.useForm();
    const {login, register} = props
    const [tabs, setTabs] = useState('login')
    function callback(key) {
        setTabs(key)
      }
    useEffect(() => {
      form.resetFields();
    }, [tabs])
    return (
        <Tabs defaultActiveKey={tabs} onChange={callback} animated={false} className="login-tabs">
        <TabPane tab="登录" key="login">
          <LoginForm login={login} form={form} />
        </TabPane>
        <TabPane tab="注册" key="register">
            <RegisterForm register={register} form={form} />
        </TabPane>
      </Tabs>
    )
}