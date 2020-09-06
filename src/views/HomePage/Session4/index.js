import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, Box } from "./styles";

import Img from "../../../assets/images/Design sem nome-1.png";

const Session4 = () => {
  return (
    <Container>
      <Wrapper className="container">
        <Box>
          {" "}
          <img src={Img} alt="" srcset="" />{" "}
        </Box>
        <Box>
          <h1> E mais: você pode guardar suas anotações em fichas </h1>
          <p>
            {" "}
            Depois de ler uma fonte de pesquisa e registrar a referência, você
            pode organizar suas anotações e ideias em fichas. No GORB, há
            modelos pré-formatados que facilitam o registro de informações.{" "}
            <br /> <br />O fichamento pode ser bibliográfico (catalogação
            bibliográfica), de citação (transcrição), resumo (de conteúdo) ou de
            opinião (com comentários ou análise).{" "}
          </p>
          <button> Criar fichamentos </button>
        </Box>
      </Wrapper>
    </Container>
  );
};

Session4.propTypes = {};

export default Session4;
