import React, { useState, useEffect } from 'react';
const url = `https://opentdb.com/api.php?amount=10&type=multiple&encode=base64`

export const useFetch = () => {
    const [questions,setQuestions] = useState([])

   async function getData() {
const response = await fetch(url)
const data = await response.json()
const newArray = data.results
setQuestions(newArray)
}
useEffect(() => {
    getData()
    },[])
    return {questions}
}