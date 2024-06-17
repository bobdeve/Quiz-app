import React, { useState,useEffect } from 'react'

export default function ProgressBars({timer, onSkip, classStatus,currentAnswer}) {
  const [remainingTime,setRemainingTime] = useState(timer)
 
  console.log(currentAnswer)
  console.log(true)
   useEffect(() => {
     const timeOut = setTimeout(() => {
      onSkip()
     }, timer);
   
     return () => {
       clearTimeout(timeOut)
       setRemainingTime(timer)
     }
   }, [timer,onSkip])
   
     useEffect(() => 
      {
      
       
       const interval = setInterval(() => {
          setRemainingTime(oldValue =>{
            if (remainingTime > 0){
            return oldValue - 100
            }
            else return oldValue
          })
       }, 100);
    
     
       return () => {
         clearInterval(interval)
       }
     }, [timer,remainingTime])

    
     

  return (
    <div>
      <progress className={classStatus} value={remainingTime} max={timer}/>
    </div>
  )
}
