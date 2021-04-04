import React from 'react';
import {Layout, PageHeader, Space, DatePicker, Button} from 'antd';
import Header from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import EventSlider from '../Components/EventSlider';
import EventCard from '../Components/EventCard';

function Events(){
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
                                    <Button type='primary'>New Event</Button>,
                                ]}
                            />
                            <Space size={[8,16]} wrap style={{height: '65vh',overflowX: 'auto', overflowY: 'scroll'}}>
                                <EventCard />
                                <EventCard />
                                <EventCard />
                                <EventCard />
                                <EventCard />
                                <EventCard />
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