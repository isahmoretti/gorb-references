import React, { useState, useEffect } from "react";

// @material-ui/core
import Grow from "@material-ui/core/Grow";

// constants
import { OPTIONS } from "./constants";

// style
import {
  Box,
  Alternatives,
  Hexagon,
  Option,
  Frame,
  ContainerQuestion,
  Image,
  ImageMobile,
  TitleQuestion,
} from "./style";

// assets
import imgBalloon from "../../assets/images/balao.png";
import imgBalloon2 from "../../assets/images/VocationalTest/Desktop/Answers/desktop_balao_amarelo.png";

import backgroundIcons from "../../assets/images/VocationalTest/Desktop/Answers/desktop-perguntas.png";

const Content = (props) => {
  const { data, part, nextAnswer, setAnswer } = props;
  const { question, images, alternatives } = data;

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setTimeout(() => setChecked((prev) => !prev), 500);
    return () => {
      return setChecked((prev) => !prev);
    };
  }, [alternatives]);

  const handleAnswer = (answer) => {
    setAnswer(OPTIONS[answer]);
    nextAnswer();
  };

  const getImages = (n) => {
    const option = OPTIONS[n];
    const imgs = require(`../../assets/images/VocationalTest/Desktop/Answers/Question${part}/DESKTOP_hexagonos_respostas-${part}-${option}.png`);
    return imgs.default;
  };
  return (
    <Box>
      <ContainerQuestion>
        <ImageMobile src={imgBalloon} />
        <Image src={imgBalloon2} />
        <TitleQuestion>{question}</TitleQuestion>
      </ContainerQuestion>
      <Alternatives
        style={{
          background: `url(${backgroundIcons})`,
          height: "100%",
        }}
      >
        {alternatives?.map((alternative, index) => (
          <a key={index} href="#top" style={{ textDecoration: "none" }}>
            <Grow
              in={checked}
              style={{
                transformOrigin: "0 0 0",
              }}
              {...(checked ? { timeout: 600 * (index + 1) } : {})}
            >
              <Option>
                <Hexagon
                  key={index}
                  src={getImages(index)}
                  onClick={() => handleAnswer(index)}
                />
                <Frame onClick={() => handleAnswer(index)}>{alternative}</Frame>
              </Option>
            </Grow>
          </a>
        ))}
      </Alternatives>
    </Box>
  );
};

export default Content;
