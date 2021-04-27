import React from 'react';
import { Layout, PageHeader, Image, Row, Col, Form, Spin } from 'antd';
import Header from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import useGetPerson from '../Services/Persons/useGetPerson';
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  };
function PersonDetail(props){
    const personId = props.match.params.id;

    const [data,{loading}] = useGetPerson(personId);


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
                            <Form.Item label="Description">{loading?<Spin/>:data.desc}</Form.Item>
                            <Form.Item label="Organization">{loading?<Spin/>:data.org}</Form.Item>
                            <Form.Item label='Age'>{loading?<Spin/>:data.age}</Form.Item>
                        </Form>
                    </Col>
                    <Col lg={10} sm={24}>
                        <Image 
                            width='100%'
                            src={data.photo}
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

export default PersonDetail;