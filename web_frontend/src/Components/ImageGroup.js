import React from 'react';
import { Image, Descriptions, Popconfirm, message } from 'antd';
import useDeleteContent from '../Services/Contents/useDeleteContent';

const ImageGroup = ({images,refresh}) => {
    const [data,{error,deleteContent}] = useDeleteContent()
    const confirm = (id)=>{
        deleteContent(id)
        .then(()=>{
            message.success('content deleted',5)
            refresh()
        })
        .catch(()=>message.error(error.message))
    }
    return(
        <Image.PreviewGroup>
            <Descriptions layout="vertical">
                {images&&images.map(x=>  
                    <Descriptions.Item key={x.id} label={<Popconfirm title="Are you sure to delete this content?" onConfirm={()=>confirm(x.id)} okText="Yes" cancelText="No">{x.label}</Popconfirm>}>
                    <Image
                        width={300}
                        src={x.content}
                    /></Descriptions.Item>)}

            </Descriptions>
        </Image.PreviewGroup>
       
    )
}
export default ImageGroup;