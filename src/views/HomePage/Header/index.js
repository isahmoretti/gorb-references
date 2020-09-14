import React from "react";

// import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import ViaCarreia from "../../../assets/images/Logo-roxo.png";

import { Container, Nav, NavMobile } from "./styles";

const Header = () => {
  const history = useHistory();

  return (
    <Container>
      <div className="container">
        <Nav>
          <img
            src={ViaCarreia}
            alt=""
            style={{ height: 50, cursor: "pointer" }}
            onClick={() => history.push("/")}
          />

          <span> Criar referência </span>
          <span> Criar fichamento </span>
          <span> Cadastre-se </span>
          <span> Login </span>
          <h1>GORB</h1>
        </Nav>

        <NavMobile>
          <img
            src={ViaCarreia}
            alt=""
            style={{ height: 50, cursor: "pointer" }}
            onClick={() => history.push("/")}
          />

          <h1>GORB</h1>
        </NavMobile>
      </div>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
