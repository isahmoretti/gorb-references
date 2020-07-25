import React from "react";

// import PropTypes from "prop-types";

const Session3 = () => {
  return (
    <section className="session3 ">
      <div className="container p-3">
        <h1 className="wow fadeInUp" data-wow-delay="0.3s">
          {" "}
          Como funciona o GORB?{" "}
        </h1>
        <li className="wow fadeInUp" data-wow-delay="0.3s">
          <span>1</span>{" "}
          <p>Escolha o tipo de documento que será referenciado; </p>
        </li>
        <li className="wow fadeInUp" data-wow-delay="0.3s">
          <span>1</span>{" "}
          <p>Preencha um formulário com os dados do documento consultado; </p>
        </li>
        <li className="wow fadeInUp" data-wow-delay="0.3s">
          <span>1</span> <p>Clique no botão "Gerar referência";</p>
        </li>
        <li className="wow fadeInUp" data-wow-delay="0.3s">
          <span>1</span>{" "}
          <p>Copie e cole na lista de referências do seu trabalho;</p>
        </li>
      </div>
    </section>
  );
};

Session3.propTypes = {};

export default Session3;
