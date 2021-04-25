import React from 'react';
import {withRouter} from 'react-router-dom';
import {Layout,Button, Space, Menu, Dropdown} from 'antd';
import {UnorderedListOutlined} from '@ant-design/icons';

function PageHeader(props){
    const tags = [
        <Button ghost={true} onClick={()=>props.history.push('/home')}>Home</Button>,
        <Button ghost={true} onClick={()=>props.history.push('/timelines')}>Timelines</Button>,
        <Button ghost={true} onClick={()=>props.history.push('/events/1')}>Events</Button>
    ]
console.log(window.Width)
    return(
        <Layout.Header style={{backgroundColor: '#843b62'}} className='header'>
            <span style={{color: '#0b032d',fontSize: window.innerWidth > 370 ?'1.5rem':'1rem',fontWeight: 'bold'}} className='logo'>Spring Revolution Myanmar</span>
            {window.innerWidth > 370 ? <Space style={{float: 'right'}}>
                {tags.map(x=>x)}
            </Space>:
            <Space style={{float: 'right'}}>
                <Dropdown overlay={<Menu theme='dark'>{tags.map((x,ind)=><Menu.Item key={ind}>{x}</Menu.Item>)}</Menu>}>
                <UnorderedListOutlined />
                </Dropdown>
            </Space>}
            
        </Layout.Header>
    )
}

export default withRouter(PageHeader);