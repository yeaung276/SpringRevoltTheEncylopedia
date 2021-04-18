import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Mentions, Form, message } from 'antd';
import { Option } from 'antd/lib/mentions';
import {SyncOutlined} from '@ant-design/icons';
import useEditContent from '../Services/Contents/useEditContent';

function TextInput({text,refresh}){
    const content = text?text[0]:{}
    const [data,{loading,error,editContent}] = useEditContent(content.id||undefined);
    const [form] = Form.useForm();
    const [savetime, setSavetime] = useState(moment());
    const [timedalta, setTimedalta] = useState();

    const updateTime = () => {
        const now = moment()
        setTimedalta(now.diff(savetime,'seconds'))
        setSavetime(now)
    }
    const saveContent = ()=>{
        const data = {
            label: '',
            content: form.getFieldValue('content')
        }
        editContent(data)
        .then(()=>updateTime())
        .catch(()=>message.error(error.message))
    }
    useEffect(()=>{
        const interval = setInterval(()=>saveContent(),60000)
        return ()=>clearInterval(interval)
    },[])

    
    return(
        <React.Fragment>
            <p className='save-text' onClick={saveContent}><SyncOutlined spin={loading}/><span style={{paddingLeft: '.5rem'}}>{`save ${timedalta} seconds ago`}</span></p>
            <Form form={form}>
                <Form.Item name='content'>
                    <Mentions autoSize style={{padding: '.2rem 1rem .2rem 1rem'}} placeholder="You can use @ to mention event here">
                        <Option value="afc163">afc163</Option>
                        <Option value="zombieJ">zombieJ</Option>
                        <Option value="yesmeck">yesmeck</Option>
                    </Mentions>
                </Form.Item>
            </Form>
        </React.Fragment>
       
        
    )
}

export default TextInput;
