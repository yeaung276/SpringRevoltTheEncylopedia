import React from 'react';
import {Form,Input,Button,Select, Layout, PageHeader, Spin, message} from 'antd';
import Header from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import useGetTags from '../Services/Tags/useGetTags';
import { reverseTimelineTypes } from '../utils/types';
import useCreateTag from '../Services/Tags/useCreateTag';
import useDeleteTag from '../Services/Tags/useDeleteTag';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
const tailLayout = {
wrapperCol: { span: 24 },
};

function ManageTags(){
    //eslint-disable-next-line
    const [data,{loading,refetch}] = useGetTags();
    const [tag_data,{loading:addLoading,error:addError,createTag}] = useCreateTag();
    const [delete_data,{loading:deleteLoading,error:deleteError,deleteTag}] = useDeleteTag();
    const [addForm] = Form.useForm();
    const [deleteForm] = Form.useForm();

    const onAdd=()=>{
        const formData = addForm.getFieldsValue()
        createTag(formData)
        .then(()=>{
            message.success('Tag created.',5)
            addForm.resetFields()
            refetch()
        })
        .catch(()=>message.error(addError.message))
    }

    const onDelete= () => {
        const formData = deleteForm.getFieldValue()
        deleteTag(formData.id)
        .then(()=>{
            message.success("Tag deleted.",5)
            deleteForm.resetFields()
            refetch()
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
                            title='Manage Tags'
                            className='page-title'
                        />
                        <Form
                        {...layout}
                        name="basic"
                        form={addForm}
                        onFinish={onAdd}
                        >
                        <Form.Item
                            label="Tag Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input date!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>                            
                            <Button type="primary" htmlType="submit" block disabled={addLoading}>{addLoading?<Spin/>:'Add'}</Button> 
                        </Form.Item>

                    </Form>
                    <Form
                        {...layout}
                        name="basic"
                        form={deleteForm}
                        onFinish={onDelete}
                    >
                        <Form.Item 
                            label="Tags"
                            name="id"
                            rules={[{ required: true, message: 'Please specified the tag'}]}
                        >
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                                loading={loading}
                                >
                                {data.map(x=><Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>)}
 
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>                            
                            <Button type="primary" style={{backgroundColor: '#ca3020'}} htmlType="submit" block disabled={deleteLoading}>{deleteLoading?<Spin/>:'Delete'}</Button> 
                        </Form.Item>
                    </Form>
                        
                    </div>
                </div>
            </Layout.Content>
            <PageFooter/>
        </Layout>
        
    )
}
export default ManageTags;