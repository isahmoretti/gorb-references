import React from 'react';
import { OPTIONS } from './constants'
import { Box, Alternatives, Hexagon, Option, Frame } from "./style";
import imgBalloon from "../../assets/images/VocationalTest/Desktop/Answers/desktop_balao_amarelo.png";
import imagens from "./imagesImports";

const Content = (props) => {
    const { data, part, nextAnswer, setAnswer } = props
    const { question, images, alternatives } = data

    const handleAnswer = (answer) => {
        setAnswer(OPTIONS[answer])
        nextAnswer()
    }

    const getImages = (n) => {
        console.log("n ---> ", n)
        console.log("OPTIONS -->", OPTIONS)
        const option = OPTIONS[n]
        return require(`../../assets/images/VocationalTest/Desktop/Answers/Question${part}/DESKTOP_hexagonos_respostas-${part}-${option}.png`)
    }
    return (
        <Box>
            <div className="container">
                <div style={{
                       
                }}>
                    <img id="image" src={imgBalloon} alt="" />
                    <label id="text">{question}</label>
                </div>
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