import React, { useState, useEffect } from 'react';

function Alert (props) {

    useEffect(() => {
        setTimeout(() => {
        props.setter(false)
        }, 2000)
    },[props.correct])
    return ( 
        <div className={`${props.type} alert`}>
            {props.text}
        </div>
     );
}

export default Alert ;