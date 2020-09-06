import React from "react";

// import PropTypes from "prop-types";

import Header from "../HomePage/Header";

import Editor from "../../components/Editor";

import { Container, Nav, Sidebar, Content, Logo, WrapperEditor } from "./style";

const Dashboard = () => {
  return (
    <Container>
      <Nav>
        <Header />
      </Nav>
      <Sidebar>
        <Logo> Paice </Logo>
        <ul>
          <li>Minha conta</li>
          <li>
            Coleção de <br /> fichamentos
          </li>
          <li>
            Minha lista de <br /> referências
          </li>
          <li>
            Outros modelos <br /> de fichas
          </li>
          <li>
            Criar outro <br /> fichamento
          </li>
          <li>
            Gerador de referências <br /> bibliográficas
          </li>
        </ul>
      </Sidebar>
      <Content>
        <WrapperEditor>
          <Editor />
        </WrapperEditor>
      </Content>
    </Container>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
