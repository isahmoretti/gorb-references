import React from "react";

// import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { WrapperSidebar, Logo } from "./style";

const Sidebar = () => {
  const history = useHistory();

  return (
    <WrapperSidebar>
      <Logo onClick={() => history.push("/dashboard")}> User Logged </Logo>
      <ul>
        <li>Minha conta</li>
        <li>
          Coleção de <br /> fichamentos
        </li>
        <li>
          Minha lista de <br /> referências
        </li>
        <li>
          Outros modelos <br /> de fichas
        </li>
        <li>
          Criar outro <br /> fichamento
        </li>
        <li>
          Gerador de referências <br /> bibliográficas
        </li>
      </ul>
    </WrapperSidebar>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
