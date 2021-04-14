import { useState, useEffect } from 'react';
import moment from 'moment';
import {fetchRequest} from '../utils/networkRequests';
import {BASE_URL} from '../config';

const useGetTimelines = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState({})
    const [data, setData] = useState([])

    const sort = data => {
        return data.sort((a,b)=>moment(a.datetime).isAfter(b.datetime)?1:-1).slice()
    }
    
    const refetch = () => {
        //initial state 
        setSuccess(false)
        setLoading(true)
        fetchRequest(BASE_URL+'/timelines')
        .then((data)=> {
            //success state
            setSuccess(true)
            setLoading(false)
            setData(sort(data.data))
            setError({})
        })
        .catch((err)=>{
            //error state
            setSuccess(false)
            setLoading(false)
            setData([])
            setError(err)
        })
    }
    // eslint-disable-next-line
    useEffect(()=> refetch(),[])
    return [data, {loading,success,error,refetch}]
}
export default useGetTimelines