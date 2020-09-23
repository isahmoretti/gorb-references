import React from "react";
import { RESULT_CONTENT } from "./constants";

import { Background, Hexagon, Phrase } from './resultStyle'
const Result = (props) => {
  const { answers, thirteenAnswer } = props;


  //Regra: Em caso de empate, resposta da questão 13 como decisiva.
  const calculateResult = () => {
    const bigger = Math.max(...Object.values(answers));
    const repeat = Object.values(answers).some((i) => i === bigger);
    return repeat ? thirteenAnswer : bigger;
  };
  const { name, description, phrase, author, courses } = RESULT_CONTENT[
    calculateResult()
  ];

  return (
    <Background type={name}>
      <Hexagon>
        <div className="text">
          <h1>{name}</h1>
          <p>{description}</p>
          <Phrase type={name}>
            <div />
            <i>{phrase}</i>
          </Phrase>
          <span>{author}</span>
        </div>
      </Hexagon>
      {/* {courses.join(" - ")} */}

    </Background>
  );
};

export default Result;
