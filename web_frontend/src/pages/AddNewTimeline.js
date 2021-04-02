import React from 'react';
import {Form,Input,Button,Select,DatePicker} from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

function AddNewTimeline(){
    return(
        <div className='white-container'>
            <h1 className='page-title'>Add New Timeline</h1>
            <Form
            {...layout}
            name="basic"
            >
            <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please input date!' }]}
            >
                <DatePicker/>
            </Form.Item>

            <Form.Item
                label="Summary of Event"
                name="summary"
                rules={[{ required: true, message: 'Please input summary of event!' }]}
            >
                <Input placeholder='summary of the event'/>
            </Form.Item>
            <Form.Item 
                label="Tags"
                name="tag"
                rules={[{ required: true, message: 'Please specified the tag'}]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                    >
                    <Select.Option value="junta">Junta</Select.Option>
                    <Select.Option value="crph">CRPH</Select.Option>
                    <Select.Option value="people">People</Select.Option>
                    <Select.Option value='international'>International</Select.Option>
                </Select>
            </Form.Item>
                <Button type="primary" htmlType="submit" block>Add</Button>
            </Form>
        </div>
    )
}
export default AddNewTimeline;