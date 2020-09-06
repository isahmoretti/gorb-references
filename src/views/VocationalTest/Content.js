import React from 'react';
import { OPTIONS } from './constants'
import { Box, Question, Alternatives, Hexagon, Option, Frame } from "./style";

const Content = (props) => {
    const { data, nextAnswer, setAnswer } = props
    const { question, alternatives } = data

    const handleAnswer = (answer) => {
        setAnswer(OPTIONS[answer])
        nextAnswer()
    }

    return (
        <Box>
            <Question>
                <h1>{question}</h1>
            </Question>

            <Alternatives>
                {alternatives?.map((alternative, index) => <Option
                    style={{

                    }}>
                    <Hexagon key={index} onClick={() => handleAnswer(index)}>
                        imagem
                    </Hexagon>
                    <Frame onClick={() => handleAnswer(index)}>
                        {alternative}
                    </Frame>
                </Option>)}
            </Alternatives>
        </Box>
    );
}

export default Content;