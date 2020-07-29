import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, Box } from "./styles";

const Session1 = () => {
  return (
    <Container>
      <Wrapper className="container">
        <Box>
          <h1 className="wow fadeInUp" data-wow-delay="0.4s">
            {" "}
            GORB{" "}
          </h1>
          <p className="wow fadeInUp" data-wow-delay="0.4s">
            {" "}
            Gerador Online de <br /> Referências Bibliográficas{" "}
          </p>
          <button className="wow fadeInUp" data-wow-delay="0.4s">
            {" "}
            Acesse o Gerador Grátis{" "}
          </button>
        </Box>
        <Box className="wow fadeInUp" data-wow-delay="0.4s">
          imagem
        </Box>
      </Wrapper>
    </Container>
  );
};

Session1.propTypes = {};

export default Session1;
