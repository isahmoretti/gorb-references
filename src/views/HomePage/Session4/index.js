import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, BoxContent, BoxTitle, BoxText } from "./styles";

const Session4 = () => {
  return (
    <Container>
      <Wrapper className="container">
        <BoxContent>
          <BoxTitle className="wow fadeInUp" data-wow-delay="0.3s">
            Mais de 30 tipos de documentos
          </BoxTitle>

          <BoxText className="wow fadeInUp" data-wow-delay="0.3s">
            Crie referêcias de livros, artigos de periódicos, teses, vídeos de
            internet, filmes, leis, entre outros documentos.
          </BoxText>
        </BoxContent>
        <BoxContent>
          <BoxTitle className="wow fadeInUp" data-wow-delay="0.3s">
            Citações prontas
          </BoxTitle>

          <BoxText className="wow fadeInUp" data-wow-delay="0.3s">
            A ferramenta também gera citações para usar no texto ou no final do
            parágrafo.
          </BoxText>
        </BoxContent>
      </Wrapper>
    </Container>
  );
};

Session4.propTypes = {};

export default Session4;
