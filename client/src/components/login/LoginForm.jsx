import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'


const layout = {
    labelCol: {
      offset: 2,
      span: 5,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const tailLayout = {
    wrapperCol: {
        offset: 14,
      span: 5,
    },
  };
  const LoginForm = (props) => {
    const {form} = props
    const onFinish = async() => {
        try{
            let result = await form.validateFields(['username', 'password'])
            props.login(result)
        }catch(err){
            console.log(err)
        }
        
    }

    return(
        <Form {...layout} form = {form}
            onFinish={onFinish}
        >
            <Form.Item
                label="用户名："
                name="username"
                rules={[
                    {required: true, message: "请输入用户名"},
                    {min:4, message:'用户名长度不能小于4'},
                    {max:12, message:'用户名长度不能大于12'}
                ]}
            >
                <Input placeholder="用户名" prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" />
            </Form.Item>
            <Form.Item
                label="密码："
                name="password"
                rules={[
                    {required: true, message: "请输入密码"},
                    {min:4, message:'密码长度不能小于4'},
                    {max:12, message:'密码长度不能大于12'},
                    {pattern: /^(?=.*[a-zA-Z])(?=.*[\d])[a-zA-Z\d]{4,12}$/, message:"密码至少包含一个数字和字母"}
                ]}
            >
                <Input.Password placeholder="密码"  prefix={<LockOutlined className="site-form-item-icon" />} autoComplete="off" />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
  }

  export default LoginForm