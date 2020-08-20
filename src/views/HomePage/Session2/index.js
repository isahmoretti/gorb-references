import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, Box } from "./styles";

import Hexagon from "../../../assets/images/Hexagon.png";

const Session2 = () => {
  return (
    <Container>
      <Wrapper className="container">
        <Box>
          <h1> NBR 6023/2018 </h1>
          <p>
            O Gerador Online de Referências <br /> Bibliográfica (GORB) aplica a
            &nbsp;
            <b>
              NBR <br /> 6023/2018
            </b>
            , da Associação Brasileira <br /> de Normas Técnicas ABNT.
          </p>
          <p>
            Cada referência é composta por <br /> elementos essenciais
            (indispensáveis <br />
            para a identificação do document) e <br /> elementos complementares
            (informações aicionais).
          </p>
          <p>
            Todas as obras citadas no trabalho <br /> devevem estar na lista de
            refenrências.
          </p>
        </Box>
        <Box>
          <img src={Hexagon} alt="" />
        </Box>
      </Wrapper>
    </Container>
  );
};

Session2.propTypes = {};

export default Session2;
