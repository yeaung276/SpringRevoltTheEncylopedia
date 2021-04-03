import React from 'react';
import {Layout} from 'antd';
import Header from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import EventSlider from '../Components/EventSlider';

function Events(){
    return(
        <Layout style={{ minHeight: '100vh' }}>
            <Header/>
            <Layout.Content>
                <Layout>
                    <EventSlider/>
                </Layout>
            </Layout.Content>   
            <PageFooter/>   
        </Layout>
        
    )
}
export default Events;