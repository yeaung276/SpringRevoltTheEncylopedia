import React from 'react';
import { DatePicker, Input,Form } from 'antd';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 13 },
  };

const NewEventForm = ({form})=>{
    return(
        <Form
        {...layout}
        name="basic" 
        form={form}
        >
        <Form.Item
            label="Date"
            name="datetime"
            rules={[{ required: true, message: 'Please input date!' }]}
        >
            <DatePicker/>
        </Form.Item>

        <Form.Item
            label="Summary of Event"
            name="title"
            rules={[{ required: true, message: 'Please input summary of event!' }]}
        >
            <Input placeholder='summary of the event'/>
        </Form.Item>

        <Form.Item
            label="Title image"
            name="title_img"
        >
            <Input placeholder='url of the title image'/>
        </Form.Item>

        <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please input summary of event!' }]}
        >
            <Input placeholder='location of the event'/>
        </Form.Item>
        
        </Form>
    )
}

export default NewEventForm;