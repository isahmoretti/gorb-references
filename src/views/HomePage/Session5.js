import React from "react";

// import PropTypes from "prop-types";

const Session5 = () => {
  return (
    <section className="session5">
      <div className="container p-3">
        <h1 className="wow fadeInUp" data-wow-delay="0.3s">
          {" "}
          Como deve ser a lista de referências ?{" "}
        </h1>
        <div className="middle d-flex">
          <div
            ata-wow-delay="1s"
            className="wow fadeInUp middle document d-flex align-items-center justify-content-center"
          >
            {" "}
            imagem{" "}
          </div>
          <div className="pl-3 pr-3 middle">
            <h2 className="wow fadeInUp" data-wow-delay="0.3s">
              {" "}
              Formatação{" "}
            </h2>
            <section className="wow fadeInUp" data-wow-delay="0.5s">
              <b>Espaçamento: </b>{" "}
              <span> Simples, com 1 espaço simples entre elas. </span>
            </section>
            <section className="wow fadeInUp" data-wow-delay="0.6s">
              <b>Tamanho de letra: </b> <span> 12 </span>
            </section>
            <section className="wow fadeInUp" data-wow-delay="0.7s">
              <b>Alinhamento: </b>{" "}
              <span> à esquerda para texto e contralizado para título. </span>
            </section>
            <section className="wow fadeInUp" data-wow-delay="0.8s">
              <b>Margens: </b>{" "}
              <span> Superior a Esquerda - 3cm; Inferior a Direita - 2cm </span>
            </section>
            <h2 className="wow fadeInUp" data-wow-delay="0.9s">
              {" "}
              Fontes de mesmo autor{" "}
            </h2>
            <p className="wow fadeInUp" data-wow-delay="1s">
              Quando um mesmo autor tem várias obras citadas, coloca-se o nome
              do autor na primeira referência. Nas outras, usa-se um traço com
              cerca de 1 cm de comprimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

Session5.propTypes = {};

export default Session5;
