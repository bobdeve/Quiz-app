import React, { useState } from 'react'
import quizData from '../quizData'
import Questions from '../components/Questions'
import { useCallback } from 'react'
import { Summary } from './Summary'

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])
  const currentQuestionIndex= userAnswers.length
  const isQuizComplete = currentQuestionIndex === quizData.length

 const hanldeUserAnswers = useCallback((answer) =>{
  setUserAnswers(preValue =>{
    return [...preValue, answer]
  })
 })

 const handleSkipQuestion = useCallback(()=>{
      hanldeUserAnswers(null)

 },[hanldeUserAnswers])
   
 const handleResetQuiz =()=>{
  setUserAnswers([])
 }
  



  return (
    <div>
    
      {!isQuizComplete ?<Questions
       key={currentQuestionIndex}
       index={currentQuestionIndex}
       onSkip={handleSkipQuestion}
       onUserAnswer={hanldeUserAnswers}
      />: <Summary onReset={handleResetQuiz} userAnswers={userAnswers} />}
    </div>
  )
}
