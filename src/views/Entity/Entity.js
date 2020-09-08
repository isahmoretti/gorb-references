import React, { useState, useEffect } from "react";

// import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

// actions
import { actions } from "../../store/modules/entity/actions";

// selectors
import { getElementById } from "../../store/modules/common/selectors";

// components
import Form from "./Form";

import { Container, WrapperTitle, Item, Button } from "./style";

const Entity = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!edit) dispatch(actions.show(id));
  }, [dispatch, id, edit]);

  // create selectors
  const entity = useSelector((state) =>
    getElementById(state.entities.byId, id)
  );

  const handleToggleForm = () => {
    setEdit(!edit);
  };

  if (!entity) return <p> Carregando.. </p>;

  return (
    <Container>
      <WrapperTitle>
        <h1> {entity.name} </h1>

        <button onClick={handleToggleForm}>
          {!edit ? "Adicionar Texto" : "Voltar"}
        </button>
      </WrapperTitle>
      {!edit ? (
        <ul>
          {entity.texts.map((text) => (
            <Item>
              <li key={text.id}> {ReactHtmlParser(text.content)} </li>
              <div>
                <Button className="warning"> editar </Button>
                <Button className="danger"> remover </Button>
              </div>
            </Item>
          ))}
        </ul>
      ) : (
        <Form id={id} handleToggleForm={handleToggleForm} />
      )}
    </Container>
  );
};

Entity.propTypes = {};

export default Entity;
