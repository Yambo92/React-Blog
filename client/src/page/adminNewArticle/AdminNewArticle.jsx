import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {actions as articleActions} from '../../reducers/adminManagerArticle'
import {actions as tagActions} from '../../reducers/adminManagerTags'
import {Card,
        Select,
        Modal,
        Form,
        Input,
        Button} from 'antd'
const ReactMarkdown = require('react-markdown')
const {add_article} = articleActions
const {get_all_tags} = tagActions
const {TextArea} = Input
const {Option} = Select
const AdminNewArticle = (props) => {
    const [form] = Form.useForm()
    const [markdownV, setMarkdownV] = useState('')
    const [modalStatus, setModalStatus] = useState(false)

    const handleTextarea = (e) => {
        setMarkdownV(e.target.value)
    }
    function handleSelectChange(value) {
        console.log(`selected ${value}`);
      }
    
    const handlePublish = async() => {
        try{
            let values = await form.validateFields(['title','content','tags'])
            let time = Date.now() 
            let isPublish = true;
            props.add_article({...values, time, isPublish})
        }catch(err){
            console.log(err)
        }
    }
    const handleSave = async() => {
        try{
            let values = await form.validateFields(['title','content','tags'])
            let time = Date.now()
            let isPublish = false;
            props.add_article({...values, time, isPublish})
        }catch(err){
            console.log(err)
        }
    }
    const handlePreview = () => {
        setModalStatus(true)
    }
   
    const formLayout = {
        labelCol: {span:4},
        wrapperCol:{span:18}
    }
    useEffect(() => {
        props.get_all_tags()
    },[])
    return (
        <Card title="发布文章" style={{height: "100%"}}>
            <Form  form={form}
                {...formLayout}
            >
                <Form.Item
                    label="文章标题："
                    name="title"
                    rules={[
                        {required: true, message: "文章标题不能为空"},
                    ]}
                > 
                  <Input placeholder="请填写文章标题" autoComplete="off" />
                </Form.Item>
                <Form.Item
                    label="文章内容："
                    name="content"
                    rules={[
                        {required: true, message: "文章内容不能为空"}
                    ]}
                > 
                  <TextArea autoSize={{minRows: 10}} placeholder="请使用MarkDown语法编辑" value={markdownV} onChange={(e) => {handleTextarea(e)}} />
                </Form.Item>
                <Form.Item
                    label="文章所属标签："
                    name="tags"
                    rules={[
                        {required: true, message: "标签不能为空"}
                    ]}
                > 
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择标签"
                    onChange={handleSelectChange}
                >
                    {
                        props.tags.filter((tag) => tag.name !== '首页' ).map((tag) => <Option key={tag._id} value={tag.name}>{tag.name}</Option>)
                    }
                </Select>
                </Form.Item>
                <Form.Item style={{textAlign:"right", marginTop: 40}} wrapperCol={{span:22}}>
                <Button type="primary" htmlType="submit" onClick={handlePublish}>发布</Button>&nbsp;&nbsp;
                <Button type="primary" htmlType="submit" onClick={handleSave}>保存</Button>&nbsp;&nbsp;
                <Button type="primary"  onClick={handlePreview}>预览</Button>
                </Form.Item>     
            </Form>
            <Modal
                 visible={modalStatus}
                 onCancel={() => setModalStatus(false)}
                 onOk={() => setModalStatus(false)}
            >
                <ReactMarkdown source={markdownV} />
            </Modal>
        </Card>
    )
}

export default connect(
    (state) => {
        return {
            tags: state.admin.tags
        }
    },
    {add_article, get_all_tags}
)(AdminNewArticle)