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

import ArrowLeft from "../../../assets/images/arrow-left.svg";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const Audiovisual = ({ back }) => {
  document.title = "Documentos Audiovisuais: Referência ABNT";
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
                history.push("/documentos-audiovisuais/referencia-de-filme")
              }
              className="violet"
            >
              <p className="txt-white">Filme</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="violet"
              onClick={() =>
                history.push(
                  "/documentos-audiovisuais/referencia-de-video-de-internet"
                )
              }
            >
              <p className="txt-white">Vídeo de internet</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push("/documentos-audiovisuais/referencia-de-musica")
              }
              className="violet"
            >
              <p className="txt-white">Música</p>
            </Hexagon>
            <Title>
              {" "}
              Documentos <br />
              audiovisuais{" "}
            </Title>
            <Hexagon
              className="violet"
              onClick={() =>
                history.push("/documentos-audiovisuais/referencia-de-podcast")
              }
            >
              <p className="txt-white">Podcast</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              className="violet"
              onClick={() =>
                history.push(
                  "/documentos-audiovisuais/referencia-de-fotografia"
                )
              }
            >
              <p className="txt-white">Fotografia</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="violet"
              onClick={() =>
                history.push(
                  "/documentos-audiovisuais/referencia-de-audiolivro"
                )
              }
            >
              <p className="txt-white">Audiolivro</p>
            </Hexagon>
          </Row>
        </Content>
      </Conatiner>
      <Footer />
    </>
  );
};

Audiovisual.propTypes = {};

export default Audiovisual;
