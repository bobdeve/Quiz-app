import React, { useState ,useContext } from 'react'
import quizData from '../quizData'
import Questions from '../components/Questions'
import { useCallback } from 'react'
import { Summary } from './Summary'
import { DataContext } from './DataContext'



export default function Quiz({onReset}) {
  const {data,loading} =useContext(DataContext)
  const [userAnswers, setUserAnswers] = useState([])
  const currentQuestionIndex= userAnswers.length
  const isQuizComplete = currentQuestionIndex === data?.length
  console.log(isQuizComplete)

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
    {!isQuizComplete ? (
      <Questions
        key={currentQuestionIndex}
        index={currentQuestionIndex}
        onSkip={handleSkipQuestion}
        onUserAnswer={hanldeUserAnswers}
      />
    ) : (!loading && (
      <Summary
        onReset={onReset}
        userAnswers={userAnswers}
      />
    ))}
  </div>
);

}
