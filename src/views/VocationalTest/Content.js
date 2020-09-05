import React from 'react';
import { OPTIONS } from './constants'

const Content = (props) => {
    const { data, nextAnswer, setAnswer } = props
    const { question, alternatives } = data

    const handleAnswer = (answer) => {
        setAnswer(OPTIONS[answer])
        nextAnswer()
    }

    return (
        <div>
            <h2>{question}</h2>
            <div>
                {alternatives?.map((alternative, index) => <div key={index} onClick={() => handleAnswer(index)}>{alternative}</div>)}
            </div>
        </div>
    );
}

export default Content;