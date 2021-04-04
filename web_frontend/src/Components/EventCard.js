import React from 'react';
import {Card} from 'antd';
import {SettingOutlined,EditOutlined,EllipsisOutlined} from '@ant-design/icons';


function EventCard(){
    return(
        <Card
            style={{ width: 300,margin: '1rem' }}
            cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Card.Meta
                title='Card title'
            />
        </Card>

    )
}

export default EventCard;