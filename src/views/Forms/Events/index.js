import React from "react";
import { useHistory } from "react-router-dom";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
  Separator,
} from "../../../styles/Hexagon";

// assets
import ArrowLeft from "../../../assets/images/arrow-left.svg";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoogleAds from "../../../components/GoogleAds";

const Events = ({ back }) => {
  const history = useHistory();

  return (
    <>
      <Header />
      <Conatiner>
        <Content>
          <Back onClick={() => history.push("/")} src={ArrowLeft} />
          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/eventos-patentes-e-normas-tecnicas/referencia-de-evento-no-todo"
                )
              }
              className="blue-dark"
            >
              <p className="txt-white">Evento no todo</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="blue-dark"
              onClick={() =>
                history.push(
                  "/eventos-patentes-e-normas-tecnicas/referencia-evento-no-todo-em-publicacao-periodica"
                )
              }
            >
              <p className="txt-white">
                Evento no todo em publicação periódica
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/eventos-patentes-e-normas-tecnicas/referencia-de-norma-tecnica"
                )
              }
              className="blue-dark"
            >
              <p className="txt-white">Normas técnicas</p>
            </Hexagon>
            <Title>
              {" "}
              Eventos,
              <br />
              patentes e
              <br />
              normas
              <br />
              técnicas
              <br />{" "}
            </Title>
            <Hexagon
              className="blue-dark"
              onClick={() =>
                history.push(
                  "/eventos-patentes-e-normas-tecnicas/referencia-trabalhos-em-anais"
                )
              }
            >
              <p className="txt-white">Trabalhos em anais</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              className="blue-dark"
              onClick={() =>
                history.push(
                  "/eventos-patentes-e-normas-tecnicas/referencia-de-patente"
                )
              }
            >
              <p className="txt-white">Patentes</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="blue-dark"
              onClick={() =>
                history.push(
                  "/eventos-patentes-e-normas-tecnicas/referencia-de-trabalho-de-evento-em-revista"
                )
              }
            >
              <p className="txt-white">
                Trabalhos de eventos publicados em <br />
                revistas
              </p>
            </Hexagon>
          </Row>
        </Content>
      </Conatiner>
      <Footer />
    </>
  );
};

Events.propTypes = {};

export default Events;
