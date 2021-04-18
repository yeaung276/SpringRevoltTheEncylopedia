import React from 'react';
import useDeleteContent from '../Services/Contents/useDeleteContent';
import { message, Popconfirm } from 'antd';


const Video = ({url,label,id,refresh}) => {
    const [data,{error,deleteContent}] = useDeleteContent()

    const confirm = ()=> {
        deleteContent(id)
        .then(()=>{
            message.config('Content deleted',5)
            refresh()
        })
        .catch(()=>message.error(error.message))
    }
    return(
        <React.Fragment>
            <Popconfirm title="Are you sure to delete this content?" onConfirm={()=>confirm()} okText="Yes" cancelText="No"><h1>{label}</h1></Popconfirm>
            <div className="video-responsive">
            <iframe
            width="853"
            height="480"
            src={url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            />
        </div>
        </React.Fragment>
        
    )
}

function VideoGroup({videos,refresh}){
    return(
        <React.Fragment>
            {videos && videos.map(x=><Video key={x.id} url={x.content} label={x.label} id={x.id} refresh={refresh}/>)}
        </React.Fragment>
    )
}
export default VideoGroup;
