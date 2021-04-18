import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Form, message, Input, Select, Spin } from 'antd';
import useCreateContent from '../Services/Contents/useCreateContent';
import { withRouter } from 'react-router-dom';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 13 },
  };

const AddImageModel = (props)=> {
    const [visible,setVisible] = useState(false)
    const [form] = Form.useForm();
    const {event_id} = props.match.params;

    const [data,{loading,error,createContent}] = useCreateContent();

    const handleCancel = ()=>setVisible(false)

    const handleOk = ()=>{
        const formData = form.getFieldsValue()
        createContent({event_id,...formData})
        .then(()=>{
            form.resetFields()
            message.success('Content created',5)
            setVisible(false)
            props.refresh()
        })
        .catch(()=>message.error(error.message))
    
    }
    return(
        <React.Fragment>
            <Modal
                visible={visible}
                title="New Media"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary"  onClick={handleOk} loading={loading} disabled={loading}>
                    {loading?<Spin/>:'Submit'}
                </Button>
                ]}
            >
                <Form {...layout} form={form}>
                    <Form.Item
                        label="Media Type"
                        name='content_type'
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Select.Option value={1}>Photo</Select.Option>
                            <Select.Option value={2}>Video</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Label"
                        name="label"
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="URL"
                        name="content"
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            <Button onClickCapture={()=>setVisible(true)}>Add Media</Button>
        </React.Fragment>
        
    )
}

export default withRouter(AddImageModel);