import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const SelectWrapper = ({ options = [], ...rest }) => {
  const { id, label } = rest;

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
    </FormControl>
  );
};

SelectWrapper.propTypes = {};

export default SelectWrapper;
