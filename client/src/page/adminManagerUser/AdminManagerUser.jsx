import React, {useState, useEffect, useRef} from 'react'
import {
    Card,
    Table,
    Button,
    Select,
    Modal,
    message,
    Form
} from 'antd'
import {PAGE_SIZE} from '../../constants'
import { bindActionCreators } from 'redux';
import {actions} from  "../../reducers/adminManagerUser"
import {connect} from 'react-redux'
import LinkButton from '../../components/link-button/LinkButton'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { Option } = Select;
const {get_all_users, del_user,change_role} = actions

const AdminManagerUser = (props) => {
    const tableRef = useRef({_id: '', type: ''})
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(props.total)
    const [selectedKeys, setSelectedKeys] = useState([])
    const [type, setType] = useState('')
    const [id, setId] = useState('')
    const [visible, setVisible] = useState(false)
    let dataSource =  props.list.map((data) => {
        return {...data, key:data._id}
    });
     

    const handleEdit = (record) => {
        const {_id, type} = record
        setId(_id)
        setType(type)
        setVisible(true)
        tableRef.current = {
            _id:_id,
            type:type
        }
    }
    const handleDelete = (record) => {
        confirm({
            title: `您确定删除${record.username}吗？`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                props.del_user(record._id)
              }          
        })
    }
    const handleDeletes = () => {
        if(!selectedKeys.length){
            message.error('请选择要删除的数据')
        }else{
            confirm({
                title: `您确定删除吗？`,
                icon: <ExclamationCircleOutlined />,
                onOk() {
                    props.del_user(selectedKeys)
                  }          
            })
        }
    }
    const columns=[
        {
            title: "用户名",
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: "用户ID",
            key: '_id',
            dataIndex: '_id'
        },
        {
            title: "密码",
            key: 'password',
            dataIndex: 'password'
        },
        {
            title: "角色",
            key: "type",
            dataIndex: "type"
        },
        {
            title: "操作",
            key: "operate",
            render: (text, record) => {
                return (
                    <span>
                        <LinkButton onClick={() => { handleEdit(record) } }>
                            编辑
                        </LinkButton>
                        <LinkButton onClick={() => handleDelete(record)}>
                            删除
                        </LinkButton>
                    </span>
                )
            }
        }
    ]
    const extra = (
        <Button onClick={() => handleDeletes()}>批量删除</Button>
    )
    const onSelectChange = (selectedRowKeys) => {
        setSelectedKeys(selectedRowKeys)
    }

   
    const handleOk = (e) => {
        setVisible(false)
        const values = form.getFieldsValue(['type']);
        const _id = id;
        const type = values.type
        props.changeRole(_id, type)
    }
    const formStyle = {
        labelCol: {span:4, offset:2},
        wrapperCol:{span: 14}
    }
    useEffect(() => {
        props.getAllUsers(current)
    }, [current])
    useEffect(() => {
        setCurrent(1)
        setSelectedKeys([])
        setTotal(props.total)
    }, [props.total])
  
    useEffect(() => {
        if(visible){ //Warning: Instance created by `useForm` is not connect to any Form element. Forget to pass `form` prop?
                    //check visible before use the form instance
            form.resetFields();
        }
    }, [visible])
    return (
        <Card title="用户管理" extra={extra}>
            <Table dataSource={dataSource} columns={columns} bordered={true} 
                pagination={{
                    current: current,
                    pageSize: PAGE_SIZE,
                    total: total,
                    onChange: (page) => {
                        setCurrent(page)
                    }
                }}
                rowSelection={{
                    type: 'checkbox',
                    onChange: onSelectChange,
                  }}
            />
            <Modal 
                title="修改角色"
                forceRender = {true}
                visible={visible}
                onOk= {(e) => handleOk(e)}
                onCancel={(e) => setVisible(false)}
            >
                  <Form {...formStyle} form={form}
                    initialValues={{
                        type: tableRef.current.type
                    }}
                  >
                      <Form.Item
                        name="type"
                        label="角色："
                      >
                            <Select
                              onChange={(value) => {setType(value)}}
                            >
                                <Option value="admin">admin</Option>
                                <Option value="user">user</Option>
                            </Select>
                      </Form.Item>
                  </Form>
            </Modal>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        total: state.admin.users.total,
        list: state.admin.users.list
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: bindActionCreators(get_all_users, dispatch),
        del_user: bindActionCreators(del_user, dispatch),
        changeRole: bindActionCreators(change_role, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminManagerUser)