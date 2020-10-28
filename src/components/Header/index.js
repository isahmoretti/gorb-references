import React from "react";

// import PropTypes from "prop-types";

import { Container, Wrapper } from "./styles";

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <span>logo</span>
        <span>nome</span>
      </Wrapper>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
