import React, { useState, useEffect,useCallback } from 'react';

export const useFetch = (url) => {
    const [questions,setQuestions] = useState([])
    const [loading,setLoading] = useState(true)
    const [refresh,setRefresh] = useState(true)
    const [error,setError] = useState(false)

    const controller = new AbortController()
   const getData = useCallback(async () => {
    try {
const response = url && await fetch(url)
const data = await response.json()
const newArray = data.results
setQuestions(newArray)
setLoading(false)
    } catch (err) {
        setLoading(false)
        setError(true)
        console.log('Err',err) 
    }
},[url])
 
useEffect(() => {
    getData()
    },[refresh,url]) 
 
    return {questions,setQuestions,
        refresh,setRefresh,
        loading,setLoading,
        error,setError}
}