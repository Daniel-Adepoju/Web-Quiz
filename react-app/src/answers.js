import React, { useState, useEffect } from 'react';


function Answer(props) {
 const [targetNumber,setTargetNumber] = useState(null)
 const [wrong,setWrong] = useState(null)


 function answer(ans) {
    props.answered(ans)
    setTargetNumber(3)
    setWrong('wrong')
 }



    return (  
        <>
    <button
       id={props.id}
       onClick={(e) => answer(e.target)}
      className={targetNumber == props.id ? 'correct' : wrong}
       >
   {atob(props.answerDisplay)}
       </button>
        </>
     );
}

export default Answer;