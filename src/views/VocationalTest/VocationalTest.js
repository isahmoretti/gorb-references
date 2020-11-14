import React, { useState, useEffect } from "react";

import { TEST_CONTENT } from "./constants";
import imgHeaderMobile from "../../assets/images/topo_mobile_teste_600x100.png";
import imgHeaderDesktop from "../../assets/images/VocationalTest/Desktop/Answers/desktop_cabeçalho_perguntas.png";

import backgroundIcons from "../../assets/images/VocationalTest/Desktop/Answers/desktop-perguntas.png";

import Content from "./Content";
import Result from "./Result";
import { Progress, Header, Background, MainBackground } from "./style";

import {
  Footer,
  Logo,
  WrapperIcons,
  Icons,
  WrapperContentFooter,
  LogoFooter,
  TitleReservation,
  ButtonFooter,
  Title,
  Icon,
} from "./resultStyle";

import logo_viacarreira from "../../assets/images/logo-branco-rodape.png";
import layub_logo from "../../assets/images/layub_logo.png";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
import linkedin from "../../assets/images/linkedin.svg";
import { set } from "date-fns";

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
    <MainBackground>
      <div id="top"></div>
      <Header>
        <img
          src={window.innerWidth < 600 ? imgHeaderMobile : imgHeaderDesktop}
          alt=""
          style={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
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
      <Footer>
        <Logo src={logo_viacarreira} />
        <WrapperIcons>
          <a href="https://www.facebook.com/viacarreira/">
            <Icons src={facebook} />
          </a>
          <a href="https://twitter.com/viacarreira">
            <Icons src={twitter} />
          </a>
          <a href="https://www.linkedin.com/company/viacarreira/">
            <Icons src={linkedin} />
          </a>
        </WrapperIcons>
        <WrapperContentFooter className="container">
          <ButtonFooter>
            <a href="https://viacarreira.com/">
              {" "}
              <Title> Home </Title>
            </a>

            <Icon> > </Icon>
          </ButtonFooter>

          <ButtonFooter>
            <a href="https://viacarreira.com/sobre/">
              <Title>Sobre</Title>
            </a>
            <Icon> > </Icon>
          </ButtonFooter>

          <ButtonFooter>
            <a href="https://viacarreira.com/politica-de-privacidade/">
              <Title>Políticas de privacidade</Title>
            </a>
            <Icon> > </Icon>
          </ButtonFooter>

          <ButtonFooter>
            <a href="https://viacarreira.com/contato/">
              <Title>Fale conosco</Title>
            </a>
            <Icon> > </Icon>
          </ButtonFooter>
        </WrapperContentFooter>
        <LogoFooter src={layub_logo} />
        <TitleReservation>
          {" "}
          2013 - 2020 © Layub <br /> Todos os direitos reservados{" "}
        </TitleReservation>
      </Footer>
    </MainBackground>
  );
};

export default VocationalTest;
