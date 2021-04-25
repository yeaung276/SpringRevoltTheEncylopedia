import React from 'react';
import moment from 'moment';
import { PageHeader, Descriptions, Tag, Result } from 'antd';
import Header from '../Components/PageHeader';
import {Layout} from 'antd';
import PageFooter from '../Components/PageFooter';
import ImageGroup from '../Components/ImageGroup';
import useGetTagsByEvent from '../Services/Events/useGetTagsByEvent';
import useGetEventDetail from '../Services/Events/useGetEventDetail';
import VideoGroup from '../Components/VideoGroup';
import TextInput from '../Components/TextInput';


function Content(props){
    const event_id = props.match.params.event_id;
    const [data] = useGetTagsByEvent(event_id);
    const [event_data] = useGetEventDetail(event_id);
    
    return(
        <Layout>
            <Header/>
            <Layout.Content>
            {event_id==='null'?<Result
                status="404"
                title="404"
                subTitle="Sorry, event doesn't exist for this timeline."
            />:
                <div className='container'> 
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={event_data.data &&event_data.data.title}
                    >
                        <Descriptions>
                            <Descriptions.Item label="Datetime">{event_data.data&&moment(event_data.data.datetime).format('DD MMM, YY')}</Descriptions.Item>
                            <Descriptions.Item label="Location">{event_data.data&&event_data.data.location}</Descriptions.Item>
                            <Descriptions.Item label="Tags">
                                {data.tags && data.tags.map(x=><Tag key={x.id}>{x.tag.name}</Tag>)}
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    <TextInput text={event_data.text}/>
                    <ImageGroup images={event_data.photos}/>
                    <VideoGroup videos={event_data.videos}/>
                </div>}
                <PageFooter/>
            </Layout.Content>
        </Layout>
     
    )
}
export default Content;