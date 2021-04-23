import React, { useState } from 'react';
import {Card,message, Popconfirm} from 'antd';
import {AlignLeftOutlined,DeleteOutlined} from '@ant-design/icons';
import useDeleteEvent from '../Services/Events/useDeleteEvent';
import UpdateEventModel from './UpdateEventModel';
import { withRouter } from 'react-router-dom';


function EventCard({event,refresh,history}){
    const [visible, setVisible] = useState(false)
    const [data,{loading,error,deleteEvent}] = useDeleteEvent(event.id)

    const handleDelete = ()=>{
        deleteEvent()
        .then(()=>{
            setVisible(false)
            message.success('Event deleted!',5)
            refresh()
        })
        .catch(()=>{
            message.error(error.message)
        })
    }

    const goPage = ()=>{
        history.push('/content/'+event.id)
    }
    return(
        <Card
            style={{ width: 300,margin: '1rem' }}
            cover={
            <img
                alt="example"
                src={event.title_img===''?"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png":event.title_img}
            />
            }
            actions={[
            <UpdateEventModel key='submit' event={event} refresh={refresh}/>,
            <Popconfirm
            title="Are you sure to delete this task?"
            visible={visible}
            onConfirm={handleDelete}
            onCancel={()=>setVisible(false)}
            okButtonProps={loading}
            okText="Yes"
            cancelText="No"
            ><DeleteOutlined key='delete' onClick={()=>setVisible(true)}/></Popconfirm>,
            <AlignLeftOutlined onClickCapture={goPage}/>
            ]}
        >
            <Card.Meta
                title={event.title}
            />
        </Card>

    )
}

export default withRouter(EventCard);