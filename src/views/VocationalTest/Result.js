import React from "react";
import { RESULT_CONTENT } from "./constants";
import IMAGES from "./imagesImports";

import { Background, Hexagon, Phrase, Courses, Course } from "./resultStyle";
const Result = (props) => {
  const { answers, thirteenAnswer } = props;

  //Regra: Em caso de empate, resposta da questão 13 como decisiva.
  const calculateResult = () => {
    const bigger = Math.max(...Object.values(answers));
    const repeat = Object.values(answers).some((i) => i === bigger);
    return repeat ? thirteenAnswer : bigger;
  };

  const result = calculateResult();
  const {
    name,
    description,
    phrase,
    author,
    color,
    courses,
  } = RESULT_CONTENT[result];
  const images = IMAGES[result];
  const { fundo, aspas, iconeDoFundo } = images;

  return (
    <Background image={iconeDoFundo} color={color}>
      <Hexagon>
        <div className="text">
          <h1>{name}</h1>
          <p>{description}</p>
          <Phrase image={aspas}>
            <div />
            <i>{phrase}</i>
          </Phrase>
          <span>{author}</span>
        </div>
      </Hexagon>
      <Courses>
        <h1>CURSOS INDICADOS</h1>
        {courses.map(({ name, imageName }, index) => (
          <Course key={index} image={images[imageName]}>
            <div>{name}</div>
          </Course>
        ))}
      </Courses>
    </Background>
  );
};

export default Result;
