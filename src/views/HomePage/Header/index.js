import React from "react";

// import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import ViaCarreia from "../../../assets/images/Logo-roxo.png";

import { Container, Nav } from "./styles";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Nav className="container">
        <img
          src={ViaCarreia}
          alt=""
          style={{ height: 50, marginTop: 12, cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Nav>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
