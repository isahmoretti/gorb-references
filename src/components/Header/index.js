import React from "react";

// import PropTypes from "prop-types";

import { Nav, WrapperNav } from "./styles";
import Breadcrumb from "../Breadcrumb";

import logo_viacarreiraRoxo from "../../assets/images/gorb-logo-ok.png";

const Header = () => {
  return (
    <>
      <Nav>
        <WrapperNav className="container">
          <a href="https://gorb.viacarreira.com/">
            <img src={logo_viacarreiraRoxo} alt="" />
          </a>
        </WrapperNav>
      </Nav>
      <Breadcrumb />
    </>
  );
};

Header.propTypes = {};

export default Header;
