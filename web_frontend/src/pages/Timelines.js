import React from 'react';
import {Timeline,Breadcrumb,Menu,Dropdown,Button} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom';




function Timelines(props){
    const [state, setState] = React.useState('Junta');

    function onClick({key}){
        setState(key)
    }
    const menu = (
        <Menu onClick={onClick}>
          <Menu.Item key="Junta">Junta</Menu.Item>
          <Menu.Item key="CRPH">CRPH</Menu.Item>
          <Menu.Item key="People">People</Menu.Item>
          <Menu.Item key="International">International</Menu.Item>
        </Menu>
      );

    return(
        <div className=''>
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
            <Timeline mode='left' style={{backgroundColor: 'white',padding: '1rem'}}>
                <Timeline.Item label={<span className='timeline-date'>feb 1,21</span>} color='red'>Coup Occur</Timeline.Item>
                <Timeline.Item label={<span className='timeline-date'>feb 5,21</span>} color='green'>CRPH was structured</Timeline.Item>
                <Timeline.Item label={<span className='timeline-date'>feb 8,21</span>} color='blue'>Protestors began protesting</Timeline.Item>
            </Timeline>
            <Button type="primary" block onClick={()=>props.history.push('/add-new-timeline')}>Add New Timeline</Button>
        </div>
    )
}

export default withRouter(Timelines);