import React from "react";

// import PropTypes from "prop-types";

import { Grid, Button } from "@material-ui/core";
import { FieldArray } from "formik";

import Input from "../InputWrapper/Input";
import Select from "../InputWrapper/Select";

import minusIcon from "../../assets/images/minus.svg";
import plusIcon from "../../assets/images/plus.svg";

/**
 * !!! ATENÇÃO LEIA !!!
 * campos obrigatórios: [type, name, label, placeholder, grid]
 *
 * campos do tipo: fieldArray [necessário passar isFieldArray - (true)]
 *
 * campos do tipo: select [necessário passar options - ([{value, name}])]
 */

const Fields = ({ data }) => {
  const { fields = [], fieldsProps = {} } = data;

  return (
    <Grid container spacing={2} style={{ marginBottom: 5 }}>
      {fields.map((props, i) => {
        if (props.isFieldArray)
          return (
            <Grid key={i} item xs={12} sm={12} md={props.grid}>
              <FieldArray
                name={props.name}
                render={(arrayHelpers) => (
                  <div>
                    {fieldsProps.values[props.name].map((value, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          width: "100%",
                          marginBottom: 10,
                        }}
                      >
                        <Input
                          {...props}
                          name={`${props.name}.${index}`}
                          value={value}
                          onChange={fieldsProps.handleChange}
                          onBlur={fieldsProps.handleBlur}
                          errors={fieldsProps.errors}
                          touched={fieldsProps.touched}
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            disabled={index === 0}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <img src={minusIcon} alt="remove" />
                          </Button>
                        )}
                        {index ===
                          fieldsProps.values[props.name].length - 1 && (
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.push("")}
                          >
                            <img src={plusIcon} alt="add" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              />
            </Grid>
          );

        if (props.options)
          // select
          return (
            <Grid key={i} item xs={12} sm={12} md={props.grid}>
              <Select
                value={fieldsProps.values[props.name]}
                onChange={fieldsProps.handleChange}
                onBlur={fieldsProps.handleBlur}
                errors={fieldsProps.errors}
                touched={fieldsProps.touched}
                {...props}
              />
            </Grid>
          );

        return (
          <Grid key={i} item xs={12} sm={12} md={props.grid}>
            <Input
              value={fieldsProps.values[props.name]}
              onChange={fieldsProps.handleChange}
              onBlur={fieldsProps.handleBlur}
              errors={fieldsProps.errors}
              touched={fieldsProps.touched}
              {...props}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

Fields.propTypes = {};

export default Fields;
