import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Form, message } from 'antd';
import NewEventForm from './NewEventForm';
import useCreateEvent from '../Services/Events/useCreateEvent';



const NewEventModel = (props)=> {
    const [visible,setVisible] = useState(false)
    const [form] = Form.useForm(); 
    const [data,{loading,error,createEvent}] = useCreateEvent();

    const handleCancel = ()=>setVisible(false)

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
            <Button type='primary' onClickCapture={()=>setVisible(true)}>New Event</Button>
        </React.Fragment>
        
    )
}

export default NewEventModel;