import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Form, message, Input, Select } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 13 },
  };

const AddTagsModel = (props)=> {
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
                        label="Tag Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            <Button onClickCapture={()=>setVisible(true)}>Add Tag</Button>
        </React.Fragment>
        
    )
}

export default AddTagsModel;