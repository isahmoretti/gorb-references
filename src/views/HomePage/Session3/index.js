import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, Box } from "./styles";

const Session3 = () => {
  return (
    <Container>
      <Wrapper className="container p-3">
        <Box>
          <h1 className="wow fadeInUp" data-wow-delay="0.3s">
            {" "}
            Como funciona o GORB?{" "}
          </h1>
          <li className="wow fadeInUp" data-wow-delay="0.3s">
            <span>1</span>{" "}
            <p>Escolha o tipo de documento que será referenciado; </p>
          </li>
          <li className="wow fadeInUp" data-wow-delay="0.3s">
            <span>2</span>{" "}
            <p>Preencha um formulário com os dados do documento consultado; </p>
          </li>
          <li className="wow fadeInUp" data-wow-delay="0.3s">
            <span>3</span> <p>Clique no botão "Gerar referência";</p>
          </li>
          <li className="wow fadeInUp" data-wow-delay="0.3s">
            <span>4</span>{" "}
            <p>Copie e cole na lista de referências do seu trabalho;</p>
          </li>
        </Box>
      </Wrapper>
    </Container>
  );
};

Session3.propTypes = {};

export default Session3;
