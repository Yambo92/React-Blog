import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'


const layout = {
    labelCol: {
        offset:2,
      span: 6,
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
  const RegisterForm = (props) => {
    // const [form] = Form.useForm();
    const {form, register} = props
    const onFinish = async () => {
        // console.log('register:', values)
       
        try{
            let result = await form.validateFields(['username', 'password','passwordRe'])
            register(result)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <Form {...layout}
            onFinish={onFinish}
            form={form}
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
                <Input.Password placeholder="密码"  prefix={<LockOutlined className="site-form-item-icon" />} autoComplete='off' />
            </Form.Item>
            <Form.Item
                label="确认密码："
                name="passwordRe"
                dependencies={['password']}
                rules={[
                    {required: true, message: "请确认密码"},
                    ({getFieldValue}) => ({
                        validator(rule, value){
                            if(!value || getFieldValue('password') === value){
                                return Promise.resolve()
                            }
                            return Promise.reject('两次输入的密码不匹配！')
                        }
                    })
                ]}
            >
                <Input.Password placeholder="密码"  prefix={<LockOutlined className="site-form-item-icon" />} autoComplete="off" />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    )
  }

  export default RegisterForm