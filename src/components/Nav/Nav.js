import React from "react";

// import PropTypes from "prop-types";

import { WrapperNav } from "./style";

import Header from "../../views/HomePage/Header";

const Nav = () => {
  return (
    <WrapperNav>
      <Header />
    </WrapperNav>
  );
};

Nav.propTypes = {};

export default Nav;
