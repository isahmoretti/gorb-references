import React from "react";
import { RESULT_CONTENT } from "./constants";

import { Background, Hexagon, Phrase, Courses, Course } from './resultStyle'
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
      <Courses>
        <h1>
          CURSOS INDICADOS
        </h1>
        {console.log(courses)}
        {courses.map((course, index) => <Course key={index} imgPath={course.imgPath}>
          <div>
            {course.name}
          </div>
        </Course>)}
      </Courses>

    </Background>
  );
};

export default Result;
