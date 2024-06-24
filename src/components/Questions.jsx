import React, { useCallback, useState,useContext } from 'react'
import ProgressBars from './ProgressBars'
import Answers from './Answers'
import quizData from '../quizData'
import { DataContext } from './DataContext'

export default function Questions({index, onUserAnswer, onSkip}) {
  const {data} =useContext(DataContext)
console.log(data)
  const [currentAnswer,setCurrentAnswer] = useState({
    selectedAnswer: "",
    isCorrectAnswer: null,
    progressclassStatus:'progress-timer',
    answerClassStatus: 'answer-btn'
  })

  let timer = 20000
  if(currentAnswer.selectedAnswer !== ""){
    timer = 1000
  }
  if(currentAnswer.isCorrectAnswer !== null){
    timer =3000
  }
  const handleCurrentAnswer = useCallback((answer) => {
    setCurrentAnswer(prvAns => {
      return { ...prvAns, selectedAnswer: answer , progressclassStatus: 'progress-timer selected', answerClassStatus: 'answer-btn selected-answer'  };
    });
  
    setTimeout(() => {
      setCurrentAnswer(prvAns => {
        return { ...prvAns, isCorrectAnswer: answer === data[index]?.correct_answer ,progressclassStatus: data[index]?.correct_answer === answer? "progress-timer correct" : "progress-timer wrong"};
      });
  
      setTimeout(() => {
        onUserAnswer(answer);
      }, 3000);
    }, 1000);
  }, [index, onUserAnswer]);


  return (
    <>
      <ProgressBars
      timer={timer}
      key={timer}
      onSkip={currentAnswer.selectedAnswer === ""? onSkip:()=>{}}
      classStatus={currentAnswer.progressclassStatus}
      currentAnswer={currentAnswer}
     
      />
       <div id='main-quiz'>
    
    <Answers
    key={index}
    index={index}
    handleAnswer={handleCurrentAnswer}
    answerStatus={currentAnswer}
    classStatus={currentAnswer.answerClassStatus}
   
   
    />

  </div>
    </>
   
  )
}
