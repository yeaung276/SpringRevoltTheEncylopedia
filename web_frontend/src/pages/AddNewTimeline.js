import React from 'react';
import moment from 'moment';
import {Form,Input,Button,Select,DatePicker, Layout, PageHeader, Radio, Spin, message} from 'antd';
import Header from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import useCreateTimelines from '../Services/useCreateTimelines';
import { reverseTimelineTypes } from '../utils/types';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
const tailLayout = {
wrapperCol: { span: 24 },
};

function AddNewTimeline(){
    //eslint-disable-next-line
    const [data,{loading,error,createTimeline}] = useCreateTimelines();
    const [form] = Form.useForm();

    const onSubmit=()=>{
        const formData = form.getFieldsValue()
        createTimeline({...formData,datetime: moment(formData.datetime).format('YYYY-MM-DD')+'T00:00:00.000000'})
        .then(()=>{
            message.success('Timeline created.',5)
            form.resetFields()
        })
        .catch(()=>message.error(error.message))
    }

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
                        form={form}
                        onFinish={onSubmit}
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
                            label="Tags"
                            name="timeline_type"
                            rules={[{ required: true, message: 'Please specified the tag'}]}
                        >
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                                >
                                {reverseTimelineTypes.map((x,ind)=><Select.Option key={ind} value={ind}>{x}</Select.Option>)}
 
                            </Select>
                        </Form.Item>
                        <Form.Item
                             label='Create Event'
                             name='create_event' 
                             rules={[{ required: true,message: "Please select create event"}]}
                        >
                            <Radio.Group>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...tailLayout}>                            
                            <Button type="primary" htmlType="submit" block disabled={loading}>{loading?<Spin/>:'Add'}</Button> 
                        </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout.Content>
            <PageFooter/>
        </Layout>
        
    )
}
export default AddNewTimeline;