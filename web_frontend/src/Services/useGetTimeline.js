import {useState, useEffect} from 'react';
import { BASE_URL } from '../config';
import { fetchRequest } from '../utils/networkRequests';

function useGetTimeline(id){
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const [error, setError] = useState({})

    const refetch = () => {
        //initial state
        setLoading(true)
        setSuccess(false)
        return fetchRequest(BASE_URL+'/timelines/'+id)
        .then(data=>{
            //success state
            setLoading(false)
            setData(data.data)
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

export default useGetTimeline;