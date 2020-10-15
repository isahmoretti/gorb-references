import React, { useState, useEffect } from "react";
import Grow from "@material-ui/core/Grow";
import Zoom from "@material-ui/core/Zoom";
import Collapse from "@material-ui/core/Collapse";
import Slide from "@material-ui/core/Slide";
import { OPTIONS } from "./constants";
import { Box, Alternatives, Hexagon, Option, Frame } from "./style";
import imgBalloon from "../../assets/images/VocationalTest/Desktop/Answers/desktop_balao_amarelo.png";

const Content = (props) => {
  const { data, part, nextAnswer, setAnswer } = props;
  const { question, images, alternatives } = data;

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    console.log("entrei");
    setTimeout(() => setChecked((prev) => !prev), 500);
    return () => {
      console.log("Sai");
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
      <div className="container">
        <div>
          <img id="image" src={imgBalloon} alt="" />
          <label id="text">{question}</label>
        </div>
      </div>
      <Alternatives style={{}}>
        {alternatives?.map((alternative, index) => (
          //Opção 1
          //   <Zoom
          //     key={index}
          //     in={checked}
          //     style={{ transformOrigin: "100 0 50 0" }}
          //     {...(checked ? { timeout: 600 * (index + 1) } : {})}
          //   >

          //   Opção2
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(checked ? { timeout: 600 * (index + 1) } : {})}
          >
            <Option key={index}>
              <Hexagon
                key={index}
                src={getImages(index)}
                onClick={() => handleAnswer(index)}
              />
              <Frame onClick={() => handleAnswer(index)}>{alternative}</Frame>
            </Option>
            {/* </Zoom> */}
          </Grow>
        ))}
      </Alternatives>
    </Box>
  );
};

export default Content;
