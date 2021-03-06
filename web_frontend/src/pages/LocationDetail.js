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
                    <Col lg={14} sm={24}>
                        <Form {...layout}>
                            <Form.Item label="Location">{loading?<Spin/>:data.address}</Form.Item>
                            <Form.Item label="Region">{loading?<Spin/>:data.region}</Form.Item>
                        </Form>
                    </Col>
                    <Col lg={10} sm={24}>
                        <Image 
                            width='100%'
                            src={data.cover_img}
                        />
                    </Col>
                </Row>
                </PageHeader>
                <div className='content-text'><p>{data.content}</p></div>
            </div>
            <PageFooter/>
        </Layout.Content>
    </Layout>
    )
}

export default LocationDetail;