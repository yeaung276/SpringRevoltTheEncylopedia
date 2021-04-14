import React from 'react';
import moment from 'moment';
import {Timeline,Breadcrumb,Menu,Dropdown,Button, Layout} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import useGetTimelines from '../Services/useGetTimelines';
import {timelineColorMap,timelineTypes, reverseTimelineTypes} from '../utils/types';
import Loading from '../Components/Loading';
import {CheckCircleOutlined} from '@ant-design/icons';




function Timelines(props){
    const [state, setState] = React.useState('all');

    const [ data, {loading, success, error}] = useGetTimelines()//add error handling

    function onClick({key}){
        setState(key)
    }

    function filter(data){
        if (state==='all')
            return data
        return data.filter(x=>x.timeline_type===timelineTypes[state])
    }

    function handleClick(id){
        props.history.push('/edit-timeline/'+id)
    }

    const menu = (
        <Menu onClick={onClick}>
          <Menu.Item key="all">All</Menu.Item>
          {reverseTimelineTypes.map((x,ind)=><Menu.Item key={x}><CheckCircleOutlined style={{ fontSize: '16px', color: timelineColorMap[ind] }} />{x}</Menu.Item>)}
        </Menu>
      );

    return(
        <Layout>
            <PageHeader/>
            <Layout.Content>
            <div className='container'>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>            
                    <Dropdown overlay={menu}>
                        {/* eslint-disable-next-line*/}
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {state} <DownOutlined />
                        </a>
                        </Dropdown>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {loading?<Loading/>:
                <Timeline mode='left' style={{backgroundColor: 'white',padding: '1rem'}}>
                    {filter(data).map(x=>
                        <Timeline.Item key={x.id} className='timeline-item' onClick={()=>handleClick(x.id)} label={<span className='timeline-date'>{moment(x.datetime).format('DD MMM,YY')}</span>} color={timelineColorMap[x.timeline_type]}>{x.title}</Timeline.Item>)}
                </Timeline>
}               
                <Button type="primary" block onClick={()=>props.history.push('/add-new-timeline')}>Add New Timeline</Button>
            </div>
            </Layout.Content>
            <PageFooter/>

        </Layout>
    )
}

export default withRouter(Timelines);