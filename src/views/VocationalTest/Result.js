import React from "react";

import { RESULT_CONTENT } from "./constants";

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
    <div>
      <h1>{name}</h1>
      <h3>{description}</h3>
      <br />
      <hr />
      <br />
      <i>{phrase}</i>
      <p>{author}</p>
      <br />
      <hr />
      <br />
      {courses.join(" - ")}
    </div>
  );
};

export default Result;
