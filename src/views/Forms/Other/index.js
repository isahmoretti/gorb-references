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

const Events = ({ back }) => {
  document.title = "Outros Tipos de Referência: ABNT";
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
                history.push("/outros/referencia-de-tridimensional")
              }
              className="gray"
            >
              <p className="txt-white">Tridimensional</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="gray"
              onClick={() =>
                history.push("/outros/referencia-de-bula-de-remedio")
              }
            >
              <p className="txt-white">Bula de remédio</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() => history.push("/outros/referencia-de-mapa")}
              className="gray"
            >
              <p className="txt-white">Mapas </p>
            </Hexagon>
            <Title>
              Outros <br /> documentos
            </Title>
            <Hexagon
              className="gray"
              onClick={() => history.push("/outros/referencia-de-obra-de-arte")}
            >
              <p className="txt-white">Obra de arte</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              className="gray"
              onClick={() => history.push("/outros/referencia-de-partitura")}
            >
              <p className="txt-white">Partitura</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="gray"
              onClick={() => history.push("/outros/referencia-de-verbete")}
            >
              <p className="txt-white">Verbete</p>
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
