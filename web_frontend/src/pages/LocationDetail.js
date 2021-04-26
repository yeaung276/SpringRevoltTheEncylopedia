import React from 'react';
import { Layout, PageHeader, Image, Row, Col, Form, Spin } from 'antd';
import Header from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import useGetLocation from '../Services/Locations/useGetLocation';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  };
function LocationDetail(props){
    const locationId = props.match.params.id;

    const [data,{loading}] = useGetLocation(locationId);


    return(
        <Layout>
        <Header/>
        <Layout.Content>
            <div className='container'>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={loading?<Spin/>:data.name}
                    extra={[
                       
                    ]}
                >
                <Row>
                    <Col span={14}>
                        <Form {...layout}>
                            <Form.Item label="Location">{loading?<Spin/>:data.address}</Form.Item>
                            <Form.Item label="Region">{loading?<Spin/>:data.region}</Form.Item>
                        </Form>
                    </Col>
                    <Col span={10}>
                        <Image 
                            width={300}
                            src={data.cover_img}
                        />
                    </Col>
                </Row>
                <div className='content-text'><p>{data.content}</p></div>
                </PageHeader>
            </div>
            <PageFooter/>
        </Layout.Content>
    </Layout>
    )
}

export default LocationDetail;