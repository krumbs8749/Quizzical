import React from "react"

import styled from 'styled-components';

    const ButtonToggle = styled.button`
        background: white;
        ${({ active }) => // turn the selected button to light purple before checking
            active &&
            `
            background: #D6DBF5;
            `
        }
        ${({ checked  }) => // fades the answer options after checking
            checked  &&
            `
                opacity: 0.6;

            `
        }
        ${({correct}) => // turn the correct answers (based on the fetched data) green
            correct && 
            `
                opacity: 1.0;
                background: #94D7A2;
   
            `
        
        }
        ${({answered, correct}) => // if answerd but wrong, turn the button red
            answered && !correct &&
            `
                background: #F8BCBC;

            `
        }
    `
export default (props) => {
    
    const correctChoice = (index, element) => {
        return element === props.answers.correct_answer[index] ? true : false
    }
    
    const answered = (index, element) => {
        return element === props.answers.answer[index] ? true : false;
    }
    
    
    const questions = props.list.map((element, index) => {
        const {question, choices} = element;
         return(
            <div key={index} className="quiz">
                <span className="quiz-question">{question}</span>
                <div  className="quiz-allChoices">
                    {
                        choices.map((element) => 
                        <ButtonToggle 
                            className="quiz-choice"
                            key={element} 
                            value={element}
                            checked={props.answers.checked} // become true after 'check' button is clicked
                            correct={props.answers.checked && correctChoice(index, element) } // set whether the option is the true correct answer
                            answered={props.answers.checked && answered(index, element)} //true if the answer option is clicked
                            active={element === props.answers.answer[index]} // true if the button option is selected
                            onClick={event => props.handleClick(index, event)}
                        >
                        {element}
                        </ButtonToggle>)
                    }
                </div>
                
            </div>
        )
    })
    return (
        <div className="trivia">
            {questions}
            {
                // only render after checking
                props.answers.checked ?
                <div className="result">
                    <h3>You scored {props.count}/{props.list.length} correct answers</h3>
                    <button className="check play" onClick={props.playAgain}>Play Again</button>
                </div>
                :
                // render before checking
                <button className="check answer" onClick={props.checkAnswer}>Check Answer</button>
            }
        </div>
    )
}