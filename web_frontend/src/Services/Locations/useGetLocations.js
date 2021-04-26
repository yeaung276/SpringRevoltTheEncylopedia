import { useState, useEffect } from 'react';
import {fetchRequest} from '../../utils/networkRequests';
import {BASE_URL} from '../../config';

const useGetLocations = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState({})
    const [data, setData] = useState([])
    
    const refetch = () => {
        //initial state 
        setSuccess(false)
        setLoading(true)
        fetchRequest(BASE_URL+'/locations')
        .then((data)=> {
            //success state
            setSuccess(true)
            setLoading(false)
            setData(data.data)
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
export default useGetLocations