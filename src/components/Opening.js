import React from "react"

export default (props) => {
    return (
        <div className="opening">
                <h1 className="title">Quizzical</h1>
                <h4 className="description">Test your knowledge</h4>
                <button className="start-quiz" onClick={props.takeQuiz}>Start Quiz</button>
        </div>
    )
}