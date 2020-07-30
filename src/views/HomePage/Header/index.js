import React from "react";

// import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import ViaCarreia from "../../../assets/images/Logo-roxo.png";

import { Container, Nav, Box, BoxLogo } from "./styles";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="container">
        <Nav>
          <Box>
            <img
              src={ViaCarreia}
              alt=""
              style={{ height: 50, marginTop: 12, cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>

          <BoxLogo>
            <h1>GORB</h1>
            <span>
              Gerador Online de <br /> Referências Bibliográficas{" "}
            </span>
          </BoxLogo>
        </Nav>
      </div>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
