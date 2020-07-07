import React from "react";

// import PropTypes from "prop-types";

const Input = ({ label, ...rest }) => {
  return (
    <div>
      <label> {label} </label>
      <input {...rest} />
    </div>
  );
};

Input.propTypes = {};

export default Input;
