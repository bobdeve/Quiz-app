import React, { useCallback, useState } from 'react'
import ProgressBars from './ProgressBars'
import Answers from './Answers'
import quizData from '../quizData'

export default function Questions({index, onUserAnswer, onSkip}) {

  const [currentAnswer,setCurrentAnswer] = useState({
    selectedAnswer: "",
    isCorrectAnswer: null,
    progressclassStatus:'progress-timer',
    answerClassStatus: 'answer-btn'
  })

  let timer = 10000
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
        return { ...prvAns, isCorrectAnswer: answer === quizData[index].correct_answer ,progressclassStatus: quizData[index].correct_answer === answer? "progress-timer correct" : "progress-timer wrong"};
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
