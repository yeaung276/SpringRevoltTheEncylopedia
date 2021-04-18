import {useState, useEffect} from 'react';
import { BASE_URL } from '../../config';
import { fetchRequest } from '../../utils/networkRequests';

function useGetEventDetail(id){
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const [error, setError] = useState({})

    const rearrangeData = data => {
        const photos = data.contents.filter(x=>x.content_type===1)
        const videos = data.contents.filter(x=>x.content_type===2)
        const text = data.contents.filter(x=>x.content_type===0)
        setData({data,photos,videos,text})
    }

    const refetch = () => {
        //initial state
        setLoading(true)
        setSuccess(false)
        return fetchRequest(BASE_URL+'/events/'+id)
        .then(data=>{
            //success state
            setLoading(false)
            rearrangeData(data.data)
            setSuccess(true)
            setError({})
        })
        .catch(err=>{
            //error state
            setLoading(false)
            setSuccess(false)
            setData({})
            setError(err)
        })
    }
    // eslint-disable-next-line
    useEffect(()=>refetch(),[])
    return [data,{loading,success,error,refetch}]
}

export default useGetEventDetail;