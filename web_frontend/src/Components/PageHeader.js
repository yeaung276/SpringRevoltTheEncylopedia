import React from 'react';
import {withRouter} from 'react-router-dom';
import {Layout,Button, Space} from 'antd';

function PageHeader(props){
    return(
        <Layout.Header style={{backgroundColor: '#843b62'}} className='header'>
            <span style={{color: '#0b032d',fontSize: '1.5rem',fontWeight: 'bold'}} className='logo'>Spring Revolution Myanmar</span>
            <Space style={{float: 'right'}}>
                <Button ghost={true} onClick={()=>props.history.push('/timelines')}>Timelines</Button>
                <Button ghost={true} onClick={()=>props.history.push('/events/1')}>Events</Button>
            </Space>
                
        </Layout.Header>
    )
}

export default withRouter(PageHeader);