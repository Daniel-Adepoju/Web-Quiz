import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import Quiz from './quizComponent';
import quizPics from './quiz.svg'
import Alert from './alert';
import { useFetch} from './useFetch';


function App () {
   const [startGame, setStartGame] = useState(false)
    const [value, setValue] = useState(0)
    const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)
    const [isCorrect, setIsCorrect] = useState()
    const {questions} = useFetch()
    const [alert, setAlert] = useState({
       text: 'default',
       type: '',
    })
    const [active, setActive] = useState(false)
    const [score, setScore] = useState(0)
    const [finished,setFinished] = useState(false)

    function answerQuestion(checker) {
        setIsQuestionAnswered(true)
        if(checker.id === '3') {
     checker.classList.add('correct')
    setIsCorrect(true)
    setAlert((prev) => {
 return {...prev, text: 'Correct Answer', type:'success'}
    })
 setScore((prev) => {
    return prev + 1
           })
    }

    else {
     checker.classList.add('wrong')
     setIsCorrect(false)
     setAlert((prev) => {
     return {...prev, text: 'Wrong Answer', type:'danger'}
           })
    }
    setTimeout(() => {
  
       increaseValue()
    },500)
    setActive(true)
    }


   function newValue(number) {
   if (number > questions.length - 1) {
        setFinished(true)
       return number = 0
   }
return number
   }

   function increaseValue() {
        setValue((prev) => {
      const increment = prev + 1
      return newValue(increment)
         })
   }
   

    const quizDisplay = questions.map((quiz, index) => {
     return   <div key={index} className='container'>
 <Quiz 
 id={index}
 quiz = {quiz}
  {...quiz} 
  answered={answerQuestion}
  correct={isCorrect}/>
 <button 
 onClick={increaseValue}
 className="skip btn">
   Skip
 </button>
 </div> 
    })

    function refresh() {
        window.location.reload()
    }

    return ( 
  <> 
  <div> {!startGame ?
  <div className='container'> 
  <img src={quizPics} />
  <button onClick={() => setStartGame(true)}className='start'>Start</button>
  </div>
 : <div className='cover'> {
    finished ? <div className='finished'>
        <span>
        Game Over    
      </span> 
      <span>
        You Got {score} out of {questions.length} questions correctly
      </span>
      <button  onClick={refresh} className="btn">
        Refresh
      </button>
        </div> :
   <div>
    <div className="header">
 {active && <Alert 
setter={setActive} 
{...alert} 
correct={isCorrect} 
setCorrect={setIsCorrect}/>}
<div className="score">{score}/{questions.length}</div>
   </div>
     {quizDisplay[value]}
     </div>
}
</div>
 } </div>
</>
    );
}

export default App ;