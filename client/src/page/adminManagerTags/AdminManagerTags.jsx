import React, {useState, useRef, useEffect} from 'react'
import { Tag, Input, Tooltip, Card, message, Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import "./style.scss"
import {connect} from 'react-redux'
import {actions} from '../../reducers/adminManagerTags'
import {bindActionCreators} from 'redux'

const {add_tag, get_all_tags, del_tag} = actions
const { confirm } = Modal;
const AdminManagerTags = (props) => {
    const {tags} = props;
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null);
    
    const handleClose = (e,removedTag) => {
        e.preventDefault();
        const confirmTitle = (
            <span>确认删除<strong>{removedTag}</strong>标签吗？</span>
            )
        confirm({
            title: confirmTitle,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                props.del_tag(removedTag)
            }
          });
     
     
    }
    const handleAdd = () => {
            setInputVisible(true);
    }
    const handleInputChange = e => {
        setInputValue(e.target.value)
    };
    const handleInputConfirm = async () => {
        if(inputValue && tags.indexOf(inputValue)=== -1){
             await props.addTag(inputValue)
            setInputValue('')
            setInputVisible(false)
        }else if(inputValue && tags.indexOf(inputValue)!== -1){
            message.error('标签已存在')
        }else{
            setInputVisible(false)
        }
    }
    useEffect(() => {
        props.get_all_tags();
    }, [])
    useEffect(() => {
        if(inputVisible){
            inputRef.current.focus();
        }
    }, [inputVisible]) 
    return (
            <Card title="标签管理" className="adminManagerTags-container">
                {tags && tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                <Tag key={tag} closable={index !== 0} onClose={(e) => handleClose(e, tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
                );
                return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                    {tagElem}
                </Tooltip>
                ) : (
                tagElem
                );
            })}
            {inputVisible && (
                <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={handleAdd}>
                        <PlusOutlined /> 添加标签
                    </Tag>
                    )}
            </Card>
      );
}

function mapStateToProps(state){
    return {
        tags: state.admin.tags.reduce((prev, item) =>{
            prev.push(item.name)
            return prev
        },[])
    }
}

function mapDispatchToProps(dispatch){
    return {
        addTag: bindActionCreators(add_tag, dispatch),
        del_tag: bindActionCreators(del_tag, dispatch),
        get_all_tags: bindActionCreators(get_all_tags, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminManagerTags)