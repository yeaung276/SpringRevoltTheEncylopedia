import React from 'react';
import { Image, Descriptions } from 'antd';
import tall from '../images/he.jpeg';
import he from '../images/tall.jpg';

const ImageGroup = () => {
    return(
        <Image.PreviewGroup>
            <Descriptions layout="vertical">
            <Descriptions.Item label="Figure 1"><Image
                width={300}
                src={tall}
            /></Descriptions.Item>
            <Descriptions.Item label="Figure 2"><Image
                width={300}
                src={he}
            /></Descriptions.Item>
            
            <Descriptions.Item label="Figure 1"><Image
                width={300}
                src={tall}
            /></Descriptions.Item>
            <Descriptions.Item label="Figure 2"><Image
                width={300}
                src={he}
            /></Descriptions.Item>
            </Descriptions>
        </Image.PreviewGroup>
       
    )
}
export default ImageGroup;