import React from 'react';
import { OPTIONS } from './constants'
import { Box, Alternatives, Hexagon, Option, Frame } from "./style";
import imgBalloon from "../../assets/images/VocationalTest/Desktop/Answers/desktop_balao_amarelo.png";

const Content = (props) => {
    const { data, part, nextAnswer, setAnswer } = props
    const { question, images, alternatives } = data

    const handleAnswer = (answer) => {
        setAnswer(OPTIONS[answer])
        nextAnswer()
    }

    const getImages = (n) => {
        return require(`../../assets/images/VocationalTest/Desktop/Answers/Question${part}/DESKTOP_hexagonos_respostas-${part}-${OPTIONS[n]}.png`)
    }
    return (
        <Box>
            <div className="container">
                <img id="image" src={imgBalloon} alt="" />
                <label id="text">{question}</label>
            </div>
            <Alternatives>
                {alternatives?.map((alternative, index) => <Option key={index}>
                    <Hexagon key={index} src={getImages(index)} onClick={() => handleAnswer(index)} />
                    <Frame onClick={() => handleAnswer(index)}>
                        {alternative}
                    </Frame>
                </Option>)}
            </Alternatives>
        </Box>
    );
}

export default Content;