import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, BoxContent, BoxTitle, BoxText } from "./styles";

const Session4 = () => {
  return (
    <Container>
      <Wrapper className="container">
        <BoxContent>
          <BoxTitle>Mais de 30 tipos de documentos</BoxTitle>

          <BoxText>
            Crie referêcias de livros, artigos de periódicos, teses, vídeos de
            internet, filmes, leis, entre outros documentos.
          </BoxText>
        </BoxContent>
        <BoxContent>
          <BoxTitle>Citações prontas</BoxTitle>

          <BoxText>
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
