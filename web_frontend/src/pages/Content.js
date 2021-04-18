import React from 'react';
import moment from 'moment';
import { PageHeader, Button, Descriptions, Tag, Mentions, Select, message } from 'antd';
import Header from '../Components/PageHeader';
import {Layout} from 'antd';
import PageFooter from '../Components/PageFooter';
import { Option } from 'antd/lib/mentions';
import ImageGroup from '../Components/ImageGroup';
import AddImageModel from '../Components/AddImageModel';
import useGetTagsByEvent from '../Services/Events/useGetTagsByEvent';
import useGetEventDetail from '../Services/Events/useGetEventDetail';
import useGetTags from '../Services/Tags/useGetTags';
import useTagEvent from '../Services/Tags/useTagEvent';
import useUntagEvent from '../Services/Tags/useUntagEvent';
import VideoGroup from '../Components/VideoGroup';
import TextInput from '../Components/TextInput';


function Content(props){
    const [data,{refetch}] = useGetTagsByEvent(props.match.params.event_id);
    const [event_data,{loading,refetch:eventRefetch}] = useGetEventDetail(props.match.params.event_id);
    const [tag_data,{loading:tag_loading}] = useGetTags();
    const [map_data,{error:mapError,tag}] = useTagEvent();
    const [unmap_data,{error:unmapError,Untag}] = useUntagEvent();


    const handleTag = tag_id => {
        tag(props.match.params.event_id,tag_id)
        .then(()=>{
            message.success('success',5)
            refetch()
        })
        .catch(()=>message.error(mapError.meassage)) 
    }

    const handleUntag = (e,id) => {
        e.preventDefault()
        Untag(id)
        .then(()=>{
            message.success('success',5)
            refetch()
        })
        .catch(()=>message.error(unmapError.message))
    }
    
    return(
        <Layout>
            <Header/>
            <Layout.Content>
                <div className='container'>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={event_data.data &&event_data.data.title}
                        extra={[
                            <Select style={{ width: 120 }} loading={tag_loading} placeholder='select a tag to add' onChange={(id)=>handleTag(id)}>
                                {tag_data.map(x=><Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>)}
                            </Select>,
                            <AddImageModel refresh={eventRefetch}/>
                        ]}
                    >
                        <Descriptions>
                            <Descriptions.Item label="Datetime">{event_data.data&&moment(event_data.data.datetime).format('DD MMM, YY')}</Descriptions.Item>
                            <Descriptions.Item label="Location">{event_data.data&&event_data.data.location}</Descriptions.Item>
                            <Descriptions.Item label="Tags">
                                {data.tags && data.tags.map(x=><Tag key={x.id} closable onClose={(e)=>handleUntag(e,x.id)}>{x.tag.name}</Tag>)}
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    <TextInput text={event_data.text} refresh={eventRefetch}/>
                    <ImageGroup images={event_data.photos} refresh={eventRefetch}/>
                    <VideoGroup videos={event_data.videos} refresh={eventRefetch}/>
                </div>
                <PageFooter/>
            </Layout.Content>
        </Layout>
     
    )
}
export default Content;