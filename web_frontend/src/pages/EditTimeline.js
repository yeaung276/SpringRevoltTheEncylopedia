import React, { useEffect } from 'react';
import moment from 'moment';
import {Form,Input,Button,Select,DatePicker, Layout, PageHeader, Spin, message, Row, Col} from 'antd';
import Header from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import { reverseTimelineTypes } from '../utils/types';
import useGetTimeline from '../Services/useGetTimeline';
import useEditTimeline from '../Services/useEditTimeline';
import useDeleteTimeline from '../Services/useDeleteTimeline';
import Loading from '../Components/Loading';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
const tailLayout = {
    labelCol: {span: 5},
    wrapperCol: { span: 16 },
};

function EditTimeline(props){

    const [data,{success,loading}] = useGetTimeline(props.match.params.id);
    //eslint-disable-next-line
    const [editdata,{loading: editLoading,error:editError,editTimeline}] = useEditTimeline(props.match.params.id);
    //eslint-disable-next-line
    const [deletedata,{loading: deleteLoading,error:deleteError,deleteTimeline}] = useDeleteTimeline(props.match.params.id); 
    const [form] = Form.useForm();

    useEffect(()=>{
        if(success){
            const fieldData = {
                ...data,
                datetime: moment(data.datetime),
            }
            form.setFieldsValue(fieldData)
        }
          
    //eslint-disable-next-line
    },[success,loading])

    const onSubmit=()=>{
        const formData = form.getFieldsValue()
        editTimeline({...formData,create_event: false})
        .then(()=>{
            message.success('Timeline edited.',5)
            form.resetFields()
        })
        .catch(()=>message.error(editError.message))
    }

    const onDelete=()=>{
        deleteTimeline()
        .then(()=>{
            message.success('Timeline deleted.',5)
            form.resetFields()
        })
        .catch(()=>message.error(deleteError.message))
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
                            title='Edit Timeline'
                            className='page-title'
                        />{loading?<Loading/>:
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
                             label='Event Id'
                             name='event_id' 
                        >
                           <Input placeholder='fill in event id'/>
                        </Form.Item>
                        <Form.Item {...tailLayout} label=" ">   
                            <Row>
                                <Col span={11}>
                                    <Button type="primary" htmlType="submit" block disabled={editLoading}>{editLoading?<Spin/>:'Edit'}</Button> 
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11}>
                                    <Button type='dashed' htmlType="button" block disabled={deleteLoading} style={{color: 'red'}} onClickCapture={onDelete}>{deleteLoading?<Spin/>:'Delete'}</Button>
                                </Col>
                            </Row>
                                            
                        </Form.Item>
                        </Form>}
                    </div>
                </div> 
            </Layout.Content>
            <PageFooter/>
        </Layout>
        
    )
}
export default EditTimeline;