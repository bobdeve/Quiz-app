import React from 'react'

export const ChooseQuiz = ({selectCatagory}) => {
    const choiceArray =['Animals',"Art","Vehicles","Politics","History","Geography","Sports","Computers"
        ,"Science and nature","Video game","Film","Music","Books"]
    
  return (
    <div >
        <h1>Choose the Quiz category </h1>
        <ul className='choice-container'>

        {choiceArray.map((choice,index) =>{
            return <li onClick={() =>selectCatagory(choice)} key={index}>{choice}</li>
        })}
        </ul>
    </div>
  )
}
