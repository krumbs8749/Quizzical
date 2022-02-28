import React from "react"
import Opening from "./components/Opening"
import Trivia from "./components/Trivia"
import "./App.css"

export default () => {
   // list for questions
    const [list, setList] = React.useState([]);
    // states to start the game
    const [play, setPlay] = React.useState(false)
    const [answers, setAnswers] = React.useState({
        answer: [], // user's answer
        checked: false, // bool for if user wants to check
        correct_answer: [] // correct answer
    })
    const [count, setCount] = React.useState(0)
    
    
    
    const takeQuiz = () => {
        setPlay(play => !play)
    }

    // Make the answer button changed color eveytime it's click
    const handleClick = (id, event) => {
        
        setAnswers(prevAnswers => {
            return {
                ...prevAnswers,
                answer: prevAnswers
                        .answer
                        // only change the value of corresponding question
                        .map((old, index) => id===index ? event.target.value : old)
            }
        })
        
    }
    
    const checkAnswer = () => {
      // Tell the app that users want to check
        setAnswers(prevAnswers => {
            return {
                ...prevAnswers,
                checked: true
            }
        })
        // answers.answer[i]: user's answer for each question
        // answers.correct_answer[i]: the correct answer for each question
        for(let i = 0; i < answers.answer.length; i++){
            if(answers.answer[i] === answers.correct_answer[i]){
                // saving the score in state
                setCount(prevCount => prevCount + 1)
            }
        }
        
        
    }
    
    const playAgain = () => {
        setAnswers(prevAnswer => {
            return {
                ...prevAnswer,
                answer: new Array(list.length).fill(""),
                checked: false,
            }
        })
    }
    // Fetching the list of question sets from the api using useEffect
    // and initializing it every time the functional component is rendered
    React.useEffect (() => {
        const getQuestions = async () => {
            const res = await fetch("https://opentdb.com/api.php?amount=10")
            const data = await res.json()
            setList(data.results.map(element => {
                const {question, correct_answer, incorrect_answers} = element;
                const randomIndex = Math.floor(Math.random() * incorrect_answers.length)
                incorrect_answers.splice(randomIndex, 0, correct_answer)
                return {
                    question: question,
                    choices: incorrect_answers,
                    correct_answer: element.correct_answer
                }
            }))
        }
        getQuestions()
        
    },[])
    
    // Initializing empty string to the answer (by user) array  
    // with the total number of the questions
    React.useEffect(() => {
        setAnswers(prev => {
            return {
                answer: new Array(list.length).fill(""),
                correct_answer: list.map(element => element.correct_answer)
                }   
            })
    },[list])
    
    
    return (
        <main>
            <span className="blob-lemon"></span>
            <span className="blob-baby"></span>
            {
                play ?
                <Trivia list={list} answers={answers} playAgain={playAgain} checkAnswer={checkAnswer} handleClick={handleClick} count={count}/>:
                <Opening takeQuiz={takeQuiz}/>
            }
            
        </main>
    )
}