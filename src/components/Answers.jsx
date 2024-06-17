import React, { useEffect, useRef, useState } from "react";
import quizData from "../quizData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStopwatch} from "@fortawesome/free-solid-svg-icons";

export default function Answers({ index, handleAnswer, answerStatus }) {
  const answers = useRef();
  const [remainingTime, setRemainingTime] = useState(10)


  if (!answers.current) {
    if (quizData[index].type === "multiple") {
      answers.current = [
        quizData[index]?.correct_answer,
        ...quizData[index].incorrect_answers,
      ].sort(() => Math.random() - 0.5);
    } else {
      answers.current = [
        quizData[index]?.correct_answer,
        quizData[index].incorrect_answers,
      ].sort(() => Math.random() - 0.5);
    }
  }

  useEffect(() => {
    if (answerStatus.isCorrectAnswer !== null) {
      const message = answerStatus.isCorrectAnswer
        ? `Correct! you answered it ${remainingTime} seconds`
        : `Incorrect! The Correct answer is => ${quizData[index].correct_answer}`;
      const toastOptions = {
        position: "top-center",
        autoClose: 2800,
        className: "custom-toast",
      };
  
      if (answerStatus.isCorrectAnswer) {
        toast.success(message, toastOptions);
      } else {
        toast.error(message, toastOptions);
      }
    }
  
    if (answerStatus.selectedAnswer === "" && remainingTime === 3) {
      const message = "Question About to be Skipped";
      const toastOptions = {
        position: "top-left",
        autoClose: 3000,
        className: "custom-toast",
      };
  
      toast.error(message, toastOptions);
    }
  }, [answerStatus, remainingTime, index, quizData]);

  useEffect(() => {
    const interval = setInterval(() => {

        
      setRemainingTime(prvValue => {
        if(!answerStatus.selectedAnswer ){
              return  prvValue-1
              
        }
       else return prvValue
      
      })
      
    }, 1000);
  
    return () => {
       clearInterval(interval)
    }
  }, [index,answerStatus])
  

  const decodeHTMLEntities = (text) => {
    if (typeof text !== 'string') {
      return text; // Return as is if not a string
    }
  
    const entities = {
      '&quot;': '"',
      '&#039;': "'"
      // Add more HTML entities as needed
    };
  
    // Use regular expression to replace all matched entities
    return text.replace(/&quot;|&#039;/g, match => entities[match]);
  };
  
  let question = decodeHTMLEntities(quizData[index].question)
  let stopwatchClass = 'stopwatch-icon'
  if(remainingTime >= 4 && remainingTime <=7){
    stopwatchClass = 'stopwatch-icon yellow'
  }
  if(remainingTime >= 0 && remainingTime <=3) {
    stopwatchClass = 'stopwatch-icon red'
  }
  return (
    <div>
      <div className="stopwatch-container">
       <FontAwesomeIcon className={stopwatchClass} icon={faStopwatch} />
       <h1>{remainingTime}</h1>
       </div>
      <h1>
        {index + 1 + `, `}
        { question}
      </h1>
     
      <ul>
        {answers.current.map((answer, index1) => {
          let btnClass = "answer-btn";
          if (answerStatus.selectedAnswer === answer && answerStatus.isCorrectAnswer === null) {
            btnClass = "answer-btn selected-answer"
          }
          if (answerStatus.isCorrectAnswer !== null && answer === quizData[index].correct_answer) {
            btnClass = "answer-btn correct";
          }
          if (answerStatus.isCorrectAnswer ===false  && answer === answerStatus.selectedAnswer ){
            btnClass = "answer-btn wrong"
          }
         
          return (
            
            <li key={index1}>
              <button
                disabled={answerStatus.selectedAnswer}
                className={btnClass}
                onClick={() => handleAnswer(answer)}
              >
                
                
                {decodeHTMLEntities(answer)}
              </button>
            </li>
          );
        })}
      </ul>
      <ToastContainer position="top-center" />
    </div>
  );
}