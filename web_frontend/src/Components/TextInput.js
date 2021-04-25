import React from 'react';

function TextInput({text}){
    const content = text?text[0]:{};
    
    return(
        <div className='content-text'>
            <p>
                {content.content}
            </p>
        </div>
       
        
    )
}

export default TextInput;
