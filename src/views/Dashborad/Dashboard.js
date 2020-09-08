import React, { useEffect } from "react";

// import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// actions
import { actions } from "../../store/modules/entity/actions";

// selectors
import { getElements } from "../../store/modules/common/selectors";

import { WrapperEntity, Entity } from "./style";

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const entities = useSelector((state) => getElements(state.entities));

  useEffect(() => {
    dispatch(actions.load());
  }, [dispatch]);

  return (
    <WrapperEntity>
      {entities.length &&
        entities.map((entity) => (
          <Entity
            key={entity.id}
            onClick={() => history.push(`/entity/${entity.id}`)}
          >
            {entity.name}
          </Entity>
        ))}
    </WrapperEntity>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
