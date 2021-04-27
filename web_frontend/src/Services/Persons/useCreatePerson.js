import { useState } from "react";
import { fetchRequest } from "../../utils/networkRequests";
import { BASE_URL } from "../../config";

function useCreatePerson(){
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState({})
    const [data, setData] = useState({})    

    const createPerson = data => {
        //initial state
        setLoading(true)
        setSuccess(false)
        return fetchRequest(BASE_URL+'/persons/create-person',data,'post',{})
        .then(data=>{
            //success state
            setLoading(false)
            setSuccess(true)
            setData(data.data)
            setError({})
        })
        .catch(err=>{
            //error state
            setLoading(false)
            setSuccess(false)
            setData({})
            setError(err.message)
        })
    }
    return [data,{loading,success,error,createPerson}]
}

export default useCreatePerson;