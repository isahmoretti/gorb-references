import React from "react";

// import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import { Container, Wrapper, Box } from "./styles";

const Session1 = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper className="container">
        <Box>
          <h1> GORB </h1>
          <p>
            {" "}
            Gerador Online de <br /> Referências Bibliográficas{" "}
          </p>
          <button onClick={() => navigate("/app")}>
            {" "}
            Acesse o Gerador Grátis{" "}
          </button>
        </Box>
        <Box>imagem</Box>
      </Wrapper>
    </Container>
  );
};

Session1.propTypes = {};

export default Session1;
