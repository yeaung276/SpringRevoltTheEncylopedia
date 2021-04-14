import {useState, useEffect} from 'react';
import moment from 'moment';
import { BASE_URL } from '../../config';
import { fetchRequest } from '../../utils/networkRequests';

function useGetDates(){
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState({})

    const sort = data => {
        return data.sort((a,b)=>moment(a.datetime).isAfter(b.datetime)?1:-1).slice()
    }

    const refetch = () => {
        //initial state
        setLoading(true)
        setSuccess(false)
        return fetchRequest(BASE_URL+'/date')
        .then(data=>{
            //success state
            setLoading(false)
            setData(sort(data.data))
            setSuccess(true)
            setError({})
        })
        .catch(err=>{
            //error state
            setLoading(false)
            setSuccess(false)
            setData([])
            setError(err)
        })
    }
    // eslint-disable-next-line
    useEffect(()=>refetch(),[])
    return [data,{loading,success,error,refetch}]
}

export default useGetDates;