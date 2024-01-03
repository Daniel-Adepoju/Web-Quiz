import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import Quiz from './quizComponent';
import quizPics from './quiz.svg'
import { useFetch} from './useFetch';
import { categoryOptions,difficultyOptions } from './options';
import Loader from './Loader';



function App () {
  
   const [category,setCategory] = useState('9')
   const [categoryId,setCategoryId] = useState(0)
   const [categoryLoad,setCategoryLoad] = useState(true)
   const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${'medium'}&type=multiple&encode=base64`
   const [startGame, setStartGame] = useState(false)
   const [value, setValue] = useState(0)
   const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)
   const [isCorrect, setIsCorrect] = useState()
   const [active, setActive] = useState(false)
   const [score, setScore] = useState(0)
   const [finished,setFinished] = useState(false)
   const [clicked,setClicked] = useState(false)
   const {
    questions,setQuestions,
    loading,setRefresh,
    setLoading,error} = useFetch(url)

    function answerQuestion(ans) {
       setTimeout(() => {
     increaseValue()
      setClicked(true)
       },400)
       if(ans.id == 3) {
      setScore(prev => prev + 1)
       }
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
   

    const quizDisplay = questions?.map((quiz, index) => {
     return(
      <>
  <div className="category">{atob(quiz.category)}</div>
     <div key={index} className='container'>
 <Quiz 
 id={index}
 quiz = {quiz}
  {...quiz} 
  answered={answerQuestion}
  correct={isCorrect}
  clicked={clicked}/>
 </div>
 </>)
    })
    const quizEndDisplay = questions?.map((quiz, index) => {
      return(
       <>
   <div className="endQuestion">{`${index+1}. ${atob(quiz.question)}`}</div>
   <div className="endAnswer">{atob(quiz.correct_answer)}</div>
   </>
      )
     })

    function refresh() {
      //  setLoading(true)
      setRefresh(prev => !prev)
      setFinished(false)
      setQuestions([])
      setScore(0)
    }

    function start() {
       setFinished(false)
       setScore(0)
       setStartGame(true)
    }
    useEffect(() => {
    setTimeout(() => {
   setCategoryLoad(false)
    },5000)
    },[])
     
   function selectCategory(id,index) {
      setCategory(id)
      setCategoryId(index)
      setRefresh(prev => !prev)
      setQuestions([])
      setStartGame(true)
   }

 const categoryMap = categoryOptions?.map((item,index) => {
 return  <div key={index} className={`item ${index === categoryId && 'active'}`}  id={item.id} onClick={(e) => selectCategory(e.target.id,index)}> {item.val}</div>
 })
    return ( 
  <>
  
  <div> {!startGame ?
  <div className='container'> 

  <div className='options'>
  <img src={quizPics}  />
  
   <span>
  <div className="title"> Select a Category </div>
 {!categoryLoad ? categoryMap : <Loader />}
  </span>
  </div>
  
  <button onClick={() => start()}className='start'>Start</button>
  </div>
  
 : <div className='cover'> {
    finished ? <div className='finished'>
        <span>
        Game Over    
      </span> 
      <span>
        You Got {score} out of {questions.length} questions correctly
      </span>
      <div className="corrections">
        <div className="title">Correct Answers</div>
        {quizEndDisplay}
      </div>
      <button  onClick={refresh} className="btn">
        Refresh
      </button>
        </div> :
   
   <div>
     {error && <h2>Error</h2>}
     {!loading && questions ? quizDisplay[value] : <Loader />}
     </div>
}
</div>
 } </div>
</>
    );

}

export default App ;