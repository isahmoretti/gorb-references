import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, Box } from "./styles";

import SearchImage from "../../../assets/images/pesquisa.png";

const Session6 = () => {
  return (
    <section>
      <Container className="container">
        <Wrapper>
          <Box className="wow fadeInUp" data-wow-delay="0.3s">
            <img src={SearchImage} alt="" />
            <span>Regras para uma documentação completa em pouco minutos</span>
          </Box>
          <Box className="wow fadeInUp" data-wow-delay="0.4s">
            <img src={SearchImage} alt="" />
            <span>Regras para uma documentação completa em pouco minutos</span>
          </Box>
          <Box className="wow fadeInUp" data-wow-delay="0.5s">
            <img src={SearchImage} alt="" />
            <span>Regras para uma documentação completa em pouco minutos</span>
          </Box>
          <Box className="wow fadeInUp" data-wow-delay="0.6s">
            <img src={SearchImage} alt="" />
            <span>Regras para uma documentação completa em pouco minutos</span>
          </Box>
          <Box className="wow fadeInUp" data-wow-delay="0.7s">
            <img src={SearchImage} alt="" />
            <span>Regras para uma documentação completa em pouco minutos</span>
          </Box>
          <Box className="wow fadeInUp" data-wow-delay="0.8s">
            <img src={SearchImage} alt="" />
            <span>Regras para uma documentação completa em pouco minutos</span>
          </Box>
        </Wrapper>
      </Container>
    </section>
  );
};

Session6.propTypes = {};

export default Session6;
