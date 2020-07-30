import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, Box } from "./styles";

import Hexagon from "../../../assets/images/Hexagon.png";

const Session2 = () => {
  return (
    <Container>
      <Wrapper className="container">
        <Box>
          <h1 className="wow fadeInUp" data-wow-delay="0.6s">
            {" "}
            NBR 6023/2018{" "}
          </h1>
          <p className="wow fadeInUp" data-wow-delay="0.6s">
            O Gerador Online de Referências <br /> Bibliográfica (GORB) aplica a
            &nbsp;
            <b>
              NBR <br /> 6023/2018
            </b>
            , da Associação Brasileira <br /> de Normas Técnicas ABNT.
          </p>
          <p className="wow fadeInUp" data-wow-delay="0.6s">
            Cada referência é composta por <br /> elementos essenciais
            (indispensáveis <br />
            para a identificação do document) e <br /> elementos complementares
            (informações aicionais).
          </p>
          <p className="wow fadeInUp" data-wow-delay="0.6s">
            Todas as obras citadas no trabalho <br /> devevem estar na lista de
            refenrências.
          </p>
        </Box>
        <Box className="wow fadeInUp" data-wow-delay="0.6s">
          <img src={Hexagon} alt="" />
        </Box>
      </Wrapper>
    </Container>
  );
};

Session2.propTypes = {};

export default Session2;
