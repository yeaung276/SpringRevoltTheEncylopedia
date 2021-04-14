import React from 'react';
import { PageHeader, Button, Descriptions, Tag, Mentions, Select } from 'antd';
import Header from '../Components/PageHeader';
import {Layout} from 'antd';
import PageFooter from '../Components/PageFooter';
import { Option } from 'antd/lib/mentions';
import ImageGroup from '../Components/ImageGroup';
import AddImageModel from '../Components/AddImageModel';
import AddTagsModel from '../Components/AddTagsModel';
import useGetTagsByEvent from '../Services/Events/useGetTagsByEvent';


function Content(props){
    const [data,{refetch}] = useGetTagsByEvent(props.match.params.event_id);
    
    return(
        <Layout>
            <Header/>
            <Layout.Content>
                <div className='container'>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="Title"
                        subTitle="This is a subtitle"
                        extra={[
                            <Select defaultValue="lucy" style={{ width: 120 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>,
                            <AddTagsModel/>,
                            <AddImageModel/>,
                            <Button key="1" type="primary">Save</Button>,
                        ]}
                    >
                        <Descriptions>
                            <Descriptions.Item label="Datetime">3 April, 21</Descriptions.Item>
                            <Descriptions.Item label="Location">Bago</Descriptions.Item>
                            <Descriptions.Item label="Tags">
                                {data.tags.map(x=><Tag key={x.id}>{x.name}</Tag>)}
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    <Mentions autoSize style={{padding: '.2rem 1rem .2rem 1rem'}} placeholder="You can use @ to mention event here">
                        <Option value="afc163">afc163</Option>
                        <Option value="zombieJ">zombieJ</Option>
                        <Option value="yesmeck">yesmeck</Option>
                    </Mentions>
                    <ImageGroup/>
                </div>
                <PageFooter/>
            </Layout.Content>
        </Layout>
     
    )
}
export default Content;