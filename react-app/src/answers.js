import React, { useState, useEffect } from 'react';


function Answer(props) {
const correctNum = '3'
    return ( 
        <>
    <div
       id={props.id}
       onClick={(e) => props.answered(e.target)}
       className={props.className}>
   {atob(props.answerDisplay)}
       </div>
        </>
     );
}

export default Answer;