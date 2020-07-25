import React from "react";

// import PropTypes from "prop-types";

import { navi } from "react-router-dom";

const Session1 = () => {
  return (
    <section className="session1">
      <div className="container content p-3">
        <div className="middle d-flex flex-column justify-content-between align-items-center">
          <h1 className="wow fadeInUp" data-wow-delay="0.4s">
            {" "}
            GORB{" "}
          </h1>
          <p className="wow fadeInUp" data-wow-delay="0.4s">
            {" "}
            Gerador Online de <br /> Referências Bibliográficas{" "}
          </p>
          <button className="wow fadeInUp" data-wow-delay="0.4s">
            {" "}
            Acesse o Gerador Grátis{" "}
          </button>
        </div>
        <div
          className="middle d-flex justify-content-center align-items-center wow fadeInUp"
          data-wow-delay="0.4s"
        >
          imagem
        </div>
      </div>
    </section>
  );
};

Session1.propTypes = {};

export default Session1;
