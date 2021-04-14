import React, { useEffect } from 'react';
import {Layout, PageHeader, Space, DatePicker, Button} from 'antd';
import useGetEventsByDate from '../Services/Events/useGetEventsByDate';
import Header from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import EventSlider from '../Components/EventSlider';
import EventCard from '../Components/EventCard';
import Loading from '../Components/Loading';
import NewEventModel from '../Components/NewEventModel';

function Events(props){
    const [data,{loading,refetch}] = useGetEventsByDate(props.match.params.date_id)
    
    //eslint-disable-next-line
    useEffect(()=>refetch(),[props.match.params.date_id])
    return(
        <Layout style={{ height: '100vh' }}>
            <Header/>
            <Layout.Content>
                <Layout>
                    <EventSlider/>
                    <Layout.Content>
                        <div className='event-container'>
                            <PageHeader 
                                ghost={true}
                                title='Events'
                                onBack={()=>window.history.back()}
                                extra={[
                                    <DatePicker.RangePicker/>,
                                    <NewEventModel/>,
                                ]}
                            />
                            <Space size={[8,16]} wrap style={{height: '65vh',overflowX: 'auto', overflowY: 'scroll'}}>
                                {loading?<Loading/>:data.event&&data.event.map(x=><EventCard key={x.id} event={x} refresh={refetch}/>)}
                            </Space>
                               
                        </div>
                    </Layout.Content>
                </Layout>
            </Layout.Content>   
            <PageFooter/>   
        </Layout>
        
    )
}
export default Events;