import React from "react";
import { RESULT_CONTENT } from "./constants";
import IMAGES from "./imagesImports";

import {
  Background,
  Hexagon,
  Phrase,
  Courses,
  Course,
  WrapperContent,
  Nav,
  WrapperNav,
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
  AuthorName,
  Share,
  WrapperCourse,
} from "./resultStyle";

// assets
import logo_viacarreiraRoxo from "../../assets/images/logo-lilas.png";
import logo_viacarreira from "../../assets/images/logo-branco-rodape.png";
import layub_logo from "../../assets/images/layub_logo.png";

import share from "../../assets/images/compartilhar.svg";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
import linkedin from "../../assets/images/linkedin.svg";

const Result = (props) => {
  const { answers, thirteenAnswer } = props;

  //Regra: Em caso de empate, resposta da questão 13 como decisiva.
  const calculateResult = () => {
    const bigger = Math.max(...Object.values(answers));
    const repeat = Object.values(answers).some((i) => i === bigger);
    return repeat ? thirteenAnswer : bigger;
  };

  const result = calculateResult();
  const { name, description, phrase, author, color, courses } = RESULT_CONTENT[
    result
  ];
  const images = IMAGES[result];
  const { fundo, aspas, iconeDoFundo } = images;

  return (
    <>
      <Nav>
        <WrapperNav className="container">
          <a href="https://viacarreira.com/">
            <img src={logo_viacarreiraRoxo} alt="" />
          </a>
        </WrapperNav>
      </Nav>
      <Background image={iconeDoFundo} color={color}>
        <Hexagon>
          <WrapperContent className="text">
            <h1>{name}</h1>
            <p>{description}</p>
            <Phrase image={aspas}>
              <div />
              <i>{phrase}</i>
            </Phrase>
            <AuthorName>{author}</AuthorName>
          </WrapperContent>
        </Hexagon>
        <Share>
          <h1>CURSOS INDICADOS</h1>
        </Share>
        <Courses>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          >
            <img src={share} width="50" height="50" />
          </a>
          <hr />
          <WrapperCourse>
            {courses.map(({ name, imageName, link }, index) => (
              <Course key={index} onClick={() => window.open(link)}>
                <img src={images[imageName]} />
                <div>{name}</div>
              </Course>
            ))}
          </WrapperCourse>
        </Courses>
      </Background>

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
    </>
  );
};

export default Result;
