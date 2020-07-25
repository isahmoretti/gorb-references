import React from "react";

// import PropTypes from "prop-types";

import ViaCarreia from "../../assets/images/via-carreira2.png";

const Header = () => {
  return (
    <div className="nav">
      <nav className="container">
        <img src={ViaCarreia} alt="" />
      </nav>
    </div>
  );
};

Header.propTypes = {};

export default Header;
