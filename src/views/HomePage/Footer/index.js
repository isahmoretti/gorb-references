import React from "react";

// import PropTypes from "prop-types";

import Facebook from "../../../assets/images/facebook.svg";
import Linkedin from "../../../assets/images/linkedin.svg";
import Twitter from "../../../assets/images/twitter.svg";

import Logo_roxo from "../../../assets/images/Logo-roxo.png";
import Layub_logo from "../../../assets/images/layub_logo.png";

import { Container, Wrraper, Logo, Content, Box, Rodape } from "./styles";

const Footer = () => {
  return (
    <Container>
      <Wrraper className="container">
        <Logo>
          {" "}
          <img src={Logo_roxo} alt="" srcset="" />{" "}
        </Logo>
        <Content>
          <Box>
            O Via Carreira é um portal que facilita o planejamento da carreira,
            com conselhos e informações sobre a escolha da faculdade, trabalhos
            acadêmicos e busca por emprego. Também temos conteúdos sobre
            empreendedorismo e desenvolvimento pessoal.
          </Box>
          <Box>
            <ul>
              <li> Home </li>
              <li> Sobre </li>
              <li> Políticas de privacidade </li>
              <li> Fale conosco </li>
              <li> Anuncie </li>
            </ul>
          </Box>
          <Box>
            <ul>
              <li> Acadêmico </li>
              <li> Cursos </li>
              <li> Profissões </li>
              <li> Emprego </li>
              <li> Meu negócio </li>
            </ul>
          </Box>
        </Content>
        <Rodape>
          <img src={Layub_logo} alt="" srcset="" />
          <span>2013 - 2020 © Layub - Todos os direitos reservados</span>
        </Rodape>
      </Wrraper>
    </Container>
  );
};

Footer.propTypes = {};

export default Footer;
