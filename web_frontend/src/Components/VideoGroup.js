import React from 'react';


const Video = ({url,label}) => {

    return(
        <React.Fragment>
            <h1>{label}</h1>
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
