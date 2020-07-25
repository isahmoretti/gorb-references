import React from "react";

// import PropTypes from "prop-types";

const Session2 = () => {
  return (
    <section className="session2">
      <div className="container d-flex content p-3">
        <div className="d-flex flex-column align-items-center justify-content-between middle">
          <h1 className="wow fadeInUp" data-wow-delay="0.6s">
            {" "}
            NBR 6023/2018{" "}
          </h1>
          <p className="wow fadeInUp" data-wow-delay="0.6s">
            O Gerador Online de Referências <br /> Bibliográfica (GORB) aplica a
            &nbsp;
            <b>
              NBR <br /> 6023/2018
            </b>
            , da Associação Brasileira <br /> de Normas Técnicas ABNT.
          </p>
          <p className="wow fadeInUp" data-wow-delay="0.6s">
            Cada referência é composta por <br /> elementos essenciais
            (indispensáveis <br />
            para a identificação do document) e <br /> elementos complementares
            (informações aicionais).
          </p>
          <p className="wow fadeInUp" data-wow-delay="0.6s">
            Tods as obras citadas no trabalho <br /> devevem estar na lista de
            refenrências.
          </p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center middle wow fadeInUp"
          data-wow-delay="0.6s"
        >
          imagem
        </div>
      </div>
    </section>
  );
};

Session2.propTypes = {};

export default Session2;
