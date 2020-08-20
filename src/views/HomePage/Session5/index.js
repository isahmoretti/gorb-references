import React from "react";

// import PropTypes from "prop-types";

import { Container, Title, Wrapper, Box, BoxContent } from "./styles";

const Session5 = () => {
  return (
    <Container>
      <div className="container">
        <Title> Como deve ser a lista de referências? </Title>
        <Wrapper>
          <Box ata-wow-delay="1s" className=" ">
            {" "}
            imagem{" "}
          </Box>
          <Box>
            <h2> Formatação </h2>
            <BoxContent>
              <span>
                {" "}
                <b>Espaçamento: </b> Simples, com 1 espaço simples entre elas.{" "}
              </span>
            </BoxContent>
            <BoxContent>
              <span>
                <b>Tamanho de letra: </b> 12{" "}
              </span>
            </BoxContent>
            <BoxContent>
              <span>
                <b>Alinhamento: </b> à esquerda para texto e contralizado para
                título.{" "}
              </span>
            </BoxContent>
            <BoxContent>
              <span>
                <b>Margens: </b> Superior a Esquerda - 3cm; Inferior a Direita -
                2cm{" "}
              </span>
            </BoxContent>
            <h2> Fontes de mesmo autor </h2>
            <p>
              {" "}
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
