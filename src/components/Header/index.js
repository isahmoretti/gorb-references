import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper } from "./styles";

import LogoViaCarreira from "../../assets/images/Logo-roxo.png";
import LogoGorb from "../../assets/images/logo-gorb.png";

const Header = () => {
  return (
    <Container>
      <Wrapper className="container">
        <img src={LogoViaCarreira} alt="" className="src" />
        <span> GORB </span>
      </Wrapper>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
