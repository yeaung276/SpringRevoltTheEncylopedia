import React, { useState } from 'react';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
import { Button, Form, message } from 'antd';
import NewEventForm from './NewEventForm';
import useCreateEvent from '../Services/Events/useCreateEvent';
import {EditOutlined} from '@ant-design/icons';



const UpdateEventModel = (props)=> {
    const [visible,setVisible] = useState(false)
    const [form] = Form.useForm(); 
    const [data,{loading,error,createEvent}] = useCreateEvent();

    const handleCancel = ()=>setVisible(false)

    const handleOpen = ()=>{
        setVisible(true)
        form.setFieldsValue({
            ...props.event,
            datetime: moment(props.event.datetime)
        })
    }

    const handleOk = ()=>{
        const formData = form.getFieldsValue()
        createEvent({
            ...formData,
            datetime: formData.datetime.format('YYYY-MM-DD')+'T00:00:00.000000',
            tags: [],
            title_img: formData.title_img?formData.title_img:''
        })
        .then(()=>{
            message.success('Event created.',5)
            form.resetFields()
            setVisible(false)
        })
        .catch(()=>{
            message.error(error.message)
        })
    
    }
    return(
        <React.Fragment>
            <Modal
                visible={visible}
                title="New Event"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Submit
                </Button>
                ]}
            >
                <NewEventForm form={form}/>
            </Modal>
            <EditOutlined key="edit" onClickCapture={handleOpen}/>
        </React.Fragment>
        
    )
}

export default UpdateEventModel;