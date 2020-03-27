import React, {useState, useEffect} from 'react'
import {
    Card,
    Table,
    Button,
    Select,
    Modal,
    message
} from 'antd'
import {PAGE_SIZE} from '../../constants'
import { bindActionCreators } from 'redux';
import {actions} from  "../../reducers/adminManagerUser"
import {connect} from 'react-redux'
import LinkButton from '../../components/link-button/LinkButton'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

const {get_all_users, del_user} = actions
const AdminManagerUser = (props) => {
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(props.total)
    const [selectedKeys, setSelectedKeys] = useState([])
 
    let dataSource =  props.list.map((data) => {
        return {...data, key:data._id}
    });
     

    const handleEdit = (record) => {
        console.log(record)
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
                        <LinkButton onClick={() => handleEdit(record)}>
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
    useEffect(() => {
        props.getAllUsers(current)
    }, [current])
    useEffect(() => {
        setCurrent(1)
        setSelectedKeys([])
        setTotal(props.total)
    }, [props.total])
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
        del_user: bindActionCreators(del_user, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminManagerUser)