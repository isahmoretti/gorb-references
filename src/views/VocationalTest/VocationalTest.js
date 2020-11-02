import React, { useState } from "react";

import { TEST_CONTENT } from "./constants";
import imgHeader from "../../assets/images/VocationalTest/Desktop/Answers/desktop_cabeçalho_perguntas.png";
import backgroundIcons from "../../assets/images/VocationalTest/Desktop/Answers/desktop-perguntas.png";

// components
import Content from "./Content";
import Result from "./Result";
import { Progress, Header, Background } from "./style";

const VocationalTest = () => {
  const [state, setState] = useState({
    testIsOver: false,
    total: 14,
    part: 13,
    thirteenAnswer: "",
    answers: {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
    },
  });
  const { testIsOver, total, part, thirteenAnswer, answers } = state;
  const data = TEST_CONTENT[part - 1];
  const fragment = (100 / 14) * part;

  const nextAnswer = () => {
    if (part < 14) {
      return setState((prevState) => ({
        ...prevState,
        part: part + 1,
      }));
    }
    return setState((prevState) => ({
      ...prevState,
      testIsOver: true,
    }));
  };

  const setAnswer = (answer) => {
    setState((prevState) => ({
      ...prevState,
      answers: {
        ...prevState.answers,
        [answer]: prevState.answers[answer] + 1,
      },
      ...(part === 13 && { thirteenAnswer: answer }),
    }));
  };

  if (testIsOver)
    return <Result answers={answers} thirteenAnswer={thirteenAnswer} />;

  return (
    <div
      style={{
        background: `url(${backgroundIcons})`,
        height: "100%",
      }}
    >
      <div id="top"></div>
      <Header src={imgHeader}>
        <Background>
          <Progress width={fragment}>
            {part}/{total}
          </Progress>
        </Background>
      </Header>
      <Content
        data={data}
        part={part}
        nextAnswer={nextAnswer}
        setAnswer={setAnswer}
      />
    </div>
  );
};

export default VocationalTest;
