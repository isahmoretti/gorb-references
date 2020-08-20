import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, Box } from "./styles";

import SearchImage from "../../../assets/images/pesquisa.png";

const Session6 = () => {
  return (
    <Container className="container">
      <h1> Outros conteúdos que ajudam no seu trabalho </h1>
      <Wrapper>
        <Box>
          <img src={SearchImage} alt="" />
          <span>Regras para uma documentação completa em pouco minutos</span>
        </Box>
        <Box>
          <img src={SearchImage} alt="" />
          <span>Regras para uma documentação completa em pouco minutos</span>
        </Box>
        <Box>
          <img src={SearchImage} alt="" />
          <span>Regras para uma documentação completa em pouco minutos</span>
        </Box>
        <Box>
          <img src={SearchImage} alt="" />
          <span>Regras para uma documentação completa em pouco minutos</span>
        </Box>
        <Box>
          <img src={SearchImage} alt="" />
          <span>Regras para uma documentação completa em pouco minutos</span>
        </Box>
        <Box>
          <img src={SearchImage} alt="" />
          <span>Regras para uma documentação completa em pouco minutos</span>
        </Box>
      </Wrapper>
    </Container>
  );
};

Session6.propTypes = {};

export default Session6;
