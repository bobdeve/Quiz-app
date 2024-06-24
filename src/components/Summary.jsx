import React, { useContext } from 'react'
import quizData from '../quizData'
import { DataContext } from './DataContext'



export const Summary = ({userAnswers,onReset}) => {
  const {data} =useContext(DataContext)
  console.log(userAnswers)
  console.log(data)
    let countCorrectAnswer = userAnswers.reduce((acc, answer,index) =>{
          if(answer === data[index]?.correct_answer){
            return ++acc
          }
         return acc
    },0)
    const handleDisplayAnswers = () => {
      return (
        <>
          {userAnswers.map((answer, index) => {
            let answerClass = 'summary-text';
            
            if (answer === data[index]?.correct_answer) {
              answerClass += ' correct';
            }
            if (answer && answer !== data[index]?.correct_answer) {
              answerClass += ' wrong';
            }
            
            console.log(answerClass); // Check the class name being generated
            
            return (
              <div key={index}> {/* Ensure each element has a unique key */}
                <h2 className={answerClass}>
                  {answer !== null ? decodeHTMLEntities(answer) : 'You skipped this question'}
                </h2>
                <h3>{decodeHTMLEntities(data[index]?.correct_answer)}</h3>
              </div>
            );
          })}
        </>
      );
    };
    
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
  return (
    <div>
        <h1>You scored {countCorrectAnswer} out of {userAnswers.length}</h1>
        <div className="display-answer">
           {handleDisplayAnswers()}
        </div>
        <button className='answer-btn' onClick={onReset}>Reset</button>
    </div>
  )
}
