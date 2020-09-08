import React from "react";

// import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { Container, Wrapper, Box } from "./styles";

import Hexagon from "../../../assets/images/Hexagon.png";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#6666cc",
    color: "#fff",
    padding: "20px 15px",
    marginLeft: 7,
  },
};

const Session1 = () => {
  const history = useHistory();

  return (
    <Container>
      <div style={styles.container}>
        <button
          style={styles.button}
          onClick={() => history.push("/dashboard")}
        >
          Ir para Admin
        </button>
        <button style={styles.button} onClick={() => history.push("/home")}>
          Ir para Teste
        </button>
      </div>
      <Wrapper className="container">
        <Box>
          <img src={Hexagon} alt="" />
        </Box>
        <Box>
          <h1>
            GORB - O seu gerador <br /> de referências
          </h1>
          <p>
            O Gerador Online de Referências Bibliográfica (GORB) foi criado pelo
            Via Carreira com o objetivo de facilitar o dia a dia dos graduandos.
            Ele aplica a NBR 6023:2018, Documentos exclusivos de meio eletrônico
            Trabalhos acadêmicos e publicações periódicas da Associação
            Brasileira de Normas Técnicas (ABNT). <br />
            <br /> Cada referência é composta por elementos essenciais
            (indispensáveis para a identificação do documento) e Eventos, normas
            técnicas e patentes Documentos audiovisuais Outros documentos
            elementos complementares (informações adicionais). <br />
            <br /> Organize e guarde suas referências bibliográficas em uma
            folha A4, formatada conforme as recomendações da NBR 6023.
          </p>
          <button onClick={() => history.push("/app")}>
            Acesse o Gerador Grátis
          </button>
        </Box>
      </Wrapper>
    </Container>
  );
};

Session1.propTypes = {};

export default Session1;
