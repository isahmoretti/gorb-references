import React from "react";

// import PropTypes from "prop-types";

import { Container, Title, Wrapper, Box, BoxContent } from "./styles";

const Session5 = () => {
  return (
    <Container>
      <div className="container">
        <Title className="wow fadeInUp" data-wow-delay="0.3s">
          {" "}
          Como deve ser a lista de referências?{" "}
        </Title>
        <Wrapper>
          <Box ata-wow-delay="1s" className="wow fadeInUp ">
            {" "}
            imagem{" "}
          </Box>
          <Box>
            <h2 className="wow fadeInUp" data-wow-delay="0.3s">
              {" "}
              Formatação{" "}
            </h2>
            <BoxContent className="wow fadeInUp" data-wow-delay="0.5s">
              <span>
                {" "}
                <b>Espaçamento: </b> Simples, com 1 espaço simples entre elas.{" "}
              </span>
            </BoxContent>
            <BoxContent className="wow fadeInUp" data-wow-delay="0.6s">
              <span>
                <b>Tamanho de letra: </b> 12{" "}
              </span>
            </BoxContent>
            <BoxContent className="wow fadeInUp" data-wow-delay="0.7s">
              <span>
                <b>Alinhamento: </b> à esquerda para texto e contralizado para
                título.{" "}
              </span>
            </BoxContent>
            <BoxContent className="wow fadeInUp" data-wow-delay="0.8s">
              <span>
                <b>Margens: </b> Superior a Esquerda - 3cm; Inferior a Direita -
                2cm{" "}
              </span>
            </BoxContent>
            <h2 className="wow fadeInUp" data-wow-delay="0.9s">
              {" "}
              Fontes de mesmo autor{" "}
            </h2>
            <p className="wow fadeInUp" data-wow-delay="1s">
              Quando um mesmo autor tem várias obras citadas, coloca-se o nome
              do autor na primeira referência. Nas outras, usa-se um traço com
              cerca de 1 cm de comprimento.
            </p>
          </Box>
        </Wrapper>
      </div>
    </Container>
  );
};

Session5.propTypes = {};

export default Session5;
