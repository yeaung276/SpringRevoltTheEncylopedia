import React, { useEffect } from 'react';
import {Layout,Timeline, Badge, Spin} from 'antd';
import moment from 'moment';
import useGetDates from '../Services/Dates/useGetDates';
import { withRouter } from 'react-router-dom';

function EventSlider(props){
    const [data,{loading,refetch}] = useGetDates();

    const handleClick = (id)=>{
        props.history.push('/events/'+id)
    }
    useEffect(()=>refetch(),[props.refetch])
    return(
        <Layout.Sider 
            breakpoint="lg"
            style={{
                overflow: 'auto',
                height: '90vh',
                left: 0,
                backgroundColor: '#0b032d',
            }}
        >
            <div className='timeline-slider-container'>
                <Timeline style={{color: '#4b4b4b'}}>
                    {loading?<Spin/>:data.map(x=><Timeline.Item key={x.id} onClick={()=>handleClick(x.id)}><Badge  count={x.event.length} style={{ backgroundColor: '#52c41a' }}><span className='item'>{moment(x.datetime).format('MMM DD, YY')+', '+x.event.length+' events'}</span></Badge></Timeline.Item>)}
                </Timeline>
            </div>
            
        </Layout.Sider>
    )
}

export default withRouter(EventSlider);