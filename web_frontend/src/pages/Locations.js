import React from 'react';
import {Breadcrumb,Menu,Dropdown, Layout, List,Avatar} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import {regions} from '../utils/types';
import Loading from '../Components/Loading';
import useGetLocations from '../Services/Locations/useGetLocations';




function Locations(props){
    const [state, setState] = React.useState('all'); 

    const [ data, {loading}] = useGetLocations();

    function onClick({key}){
        setState(key)
    }

    function filter(data){
        if (state==='all')
            return data
        return data.filter(x=>x.region===state)
    }

    function handleClick(id){
        props.history.push('/locations/'+id)
    }


    const menu = (
        <Menu onClick={onClick}>
          <Menu.Item key="all">All</Menu.Item>
          {regions.map(x=><Menu.Item key={x}>{x}</Menu.Item>)}
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
                        avatar={<Avatar src={item.cover_img} />}
                        title={item.name}
                        description={`Location: ${item.address}, Region: ${item.region}`}
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

export default withRouter(Locations);