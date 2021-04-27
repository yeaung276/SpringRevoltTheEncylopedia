import React from 'react';
import {Breadcrumb, Layout, List,Avatar, Dropdown, Menu} from 'antd';
import {withRouter} from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import Loading from '../Components/Loading';
import useGetPersons from '../Services/Persons/useGetPersons';
import { DownOutlined } from '@ant-design/icons';
import { reverseTimelineTypes } from '../utils/types';


function Persons(props){
    const [state, setState] = React.useState('all'); 

    const [ data, {loading}] = useGetPersons();

    function onClick({key}){
        setState(key)
    }

    function filter(data){
        if (state==='all')
            return data
        return data.filter(x=>x.org===state)
    }

    function handleClick(id){
        props.history.push('persons/'+id)
    }


    const menu = (
        <Menu onClick={onClick}>
          <Menu.Item key="all">All</Menu.Item>
          {reverseTimelineTypes.map(x=><Menu.Item key={x}>{x}</Menu.Item>)}
        </Menu>
      );

    return(
        <Layout>
            <PageHeader/>
            <Layout.Content>
            <div className='container'>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Location</Breadcrumb.Item>
                    <Breadcrumb.Item>Person and Organizations</Breadcrumb.Item>
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
                 <List
                    itemLayout="horizontal"
                    dataSource={filter(data)}
                    renderItem={item => (
                    <List.Item key={item.id} onClick={()=>handleClick(item.id)} className='location-item'>
                        <List.Item.Meta
                        avatar={<Avatar src={item.photo} />}
                        title={`${item.name}(${item.org})`}
                        description={`${item.desc}`}
                        />
                    </List.Item>
                    )}
                />}               
            </div>
            </Layout.Content>
            <PageFooter/>

        </Layout>
    )
}

export default withRouter(Persons);