import React from 'react';
import { Image, Descriptions } from 'antd';

const ImageGroup = ({images}) => {

    return(
        <Image.PreviewGroup>
            <Descriptions layout="vertical">
                {images&&images.map(x=>  
                    <Descriptions.Item key={x.id} label={x.label}>
                    <Image
                        width={300}
                        src={x.content}
                    /></Descriptions.Item>)}

            </Descriptions>
        </Image.PreviewGroup>
       
    )
}
export default ImageGroup;