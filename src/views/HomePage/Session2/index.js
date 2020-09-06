import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper, WrapperBox, Box } from "./styles";

import Img from "../../../assets/images/Design sem nome (1).png";

const Session2 = () => {
  return (
    <Container>
      <Wrapper className="container">
        <h1> Como funciona o gerador de referências? </h1>

        <WrapperBox>
          <Box>
            <ul>
              <li>
                {" "}
                <span>1.</span> Escolha o tipo de documento que será
                referenciado;
              </li>
              <li>
                <span>2.</span> Preencha um formulário com os dados do documento
                consultado;
              </li>
              <li>
                <span>3.</span> Clique no botão "Gerar referência";
              </li>
              <li>
                <span>4.</span> Copie e cole na lista de referências do seu
                trabalho ou salve no seu perfil no GORB.
              </li>
              <li>
                <span>5.</span> Armazene suas referências com segurança e gere o
                arquivo em .doc ou .pdf pronto para imprimir.
              </li>
            </ul>
          </Box>
          <Box>
            <img src={Img} alt="" srcset="" />
          </Box>
        </WrapperBox>
      </Wrapper>
    </Container>
  );
};

Session2.propTypes = {};

export default Session2;
