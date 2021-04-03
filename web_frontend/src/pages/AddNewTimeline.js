import React from 'react';
import {Form,Input,Button,Select,DatePicker, Layout, PageHeader} from 'antd';
import Header from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

function AddNewTimeline(){
    return(
        <Layout>
            <Header/>
            <Layout.Content>
                <div className='container'>
                    <div className='white-container'>
                        <PageHeader
                            ghost={false}
                            onBack={()=>window.history.back()}
                            title='Add New Timeline'
                            className='page-title'
                        />
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
                </div>
            </Layout.Content>
            <PageFooter/>
        </Layout>
        
    )
}
export default AddNewTimeline;