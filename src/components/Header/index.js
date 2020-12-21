import React from "react";

// import PropTypes from "prop-types";

import { Nav, WrapperNav } from "./styles";

import logo_viacarreiraRoxo from "../../assets/images/logo-lilas.png";

const Header = () => {
  return (
    <Nav>
      <WrapperNav className="container">
        <a href="https://viacarreira.com/">
          <img src={logo_viacarreiraRoxo} alt="" />
        </a>
      </WrapperNav>
    </Nav>
  );
};

Header.propTypes = {};

export default Header;
