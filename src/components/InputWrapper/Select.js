import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import { ErrorText } from "./style";

const SelectWrapper = ({ options = [], ...rest }) => {
  const { id, label, errors, touched, name } = rest;

  return (
    <FormControl variant="outlined" style={{ width: "100%" }}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select {...rest}>
        {options.map((item, key) => (
          <MenuItem key={key} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {errors && touched && errors[name] && touched[name] && (
        <ErrorText>{errors[name]}</ErrorText>
      )}
    </FormControl>
  );
};

SelectWrapper.propTypes = {};

export default SelectWrapper;
