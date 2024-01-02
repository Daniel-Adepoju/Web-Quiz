
import React, { useState, useEffect } from 'react';
import {nanoid} from 'nanoid'
import Questions from './questions';
import Answer from './answers';
function Quiz (props) {
 
  const [quiz,setQuiz] = useState(props.incorrect_answers)
  const [sorted, setSorted] = useState([])
  useEffect(() => {
   setQuiz((prev) => {
     return [...prev, props.correct_answer]
   })
 },[])
 

  const answers = quiz.map((item, index) => {
  
    return <Answer
     key={nanoid() + 1}
     id={index}
     answerDisplay = {item}
     answered={props.answered}
     correct={props.correct}
     />
   })
  
   useEffect(() => {
     setSorted(answers.sort(() => 0.5 - Math.random()))
   },[quiz])
    return (
        <>
    <Questions>
      {props.question}
      </Questions>
    <div className="answers">
     {sorted}
     </div>
        </>
      );
}

export default Quiz ;