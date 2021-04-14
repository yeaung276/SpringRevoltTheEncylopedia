import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Form, message, Input, Select } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 13 },
  };

const AddImageModel = (props)=> {
    const [visible,setVisible] = useState(false)
    const [form] = Form.useForm();

    const handleCancel = ()=>setVisible(false)

    const handleOk = ()=>{
        const formData = form.getFieldsValue()
        
    
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
                <Button key="submit" type="primary"  onClick={handleOk}>
                    Submit
                </Button>
                ]}
            >
                <Form {...layout}>
                    <Form.Item
                        label="Media Type"
                        name='media_type'
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Select.Option value={0}>Photo</Select.Option>
                            <Select.Option value={1}>Video</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Label"
                        name="Label"
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="URL"
                        name="url"
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

export default AddImageModel;