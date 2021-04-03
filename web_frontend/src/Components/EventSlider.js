import React from 'react';
import {Layout,Timeline} from 'antd';

function EventSlider(){
    return(
        <Layout.Sider 
            breakpoint="lg"
            style={{
                overflow: 'auto',
                height: '100vh',
                left: 0,
                backgroundColor: '#0b032d',
            }}
        >
            <div classname='timeline-slider-container'>
                <Timeline style={{color: '#4b4b4b'}}>
                    <Timeline.Item>2015-09-01   13-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   10-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   1-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   0-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   13-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   10-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   1-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   0-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   13-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   10-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   1-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   0-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   13-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   10-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   1-recorded event</Timeline.Item>
                    <Timeline.Item>2015-09-01   0-recorded event</Timeline.Item>
                </Timeline>
            </div>
            
        </Layout.Sider>
    )
}

export default EventSlider;