import React, { useState } from "react";

// import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

// actions
import { actions } from "../../../store/modules/entity/actions";

// components
import Editor from "../../../components/Editor";

import { WrapperEditor, Button } from "./style";

const Form = ({ id, handleToggleForm }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState();

  const handleChange = (value) => {
    setText(value);
  };

  const handleSubmit = () => {
    dispatch(
      actions.createText({
        content: text,
        formId: id,
      })
    );

    handleToggleForm();
  };

  return (
    <div>
      <WrapperEditor>
        <Editor handleChange={handleChange} />
      </WrapperEditor>

      <Button onClick={handleSubmit}> Salvar </Button>
    </div>
  );
};

Form.propTypes = {};

export default Form;
