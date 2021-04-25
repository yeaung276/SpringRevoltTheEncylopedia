import React from 'react';
import {Card} from 'antd';
import {AlignLeftOutlined} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';


function EventCard({event,history}){

    const goPage = ()=>{
        history.push('/content/'+event.id)
    }
    return(
        <Card
            style={{ maxWidth: 300,margin: '1rem' }}
            cover={
            <img
                alt="example"
                src={event.title_img===''?"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png":event.title_img}
            />
            }
            actions={[
            <AlignLeftOutlined onClickCapture={goPage}/>
            ]}
        >
            <Card.Meta
                title={event.title}
            />
        </Card>

    )
}

export default withRouter(EventCard);