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
import GoogleAds from "../../../components/GoogleAds";

const JuridicDocumentGeneral = ({ back }) => {
  const history = useHistory();

  return (
    <>
      <Header />
      <Conatiner>
        <Content>
          <Back onClick={() => history.push("/")} src={ArrowLeft} />
          <Row>
            <Hexagon
              onClick={() => history.push("/documentos-juridicos/legislacao")}
              className="green"
            >
              <p className="txt-white">Legislação</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="green"
              onClick={() =>
                history.push("/documentos-juridicos/jurisprudencia")
              }
            >
              <p className="txt-white">Jurisprudência</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push("/documentos-juridicos/medida-provisoria")
              }
              className="green"
            >
              <p className="txt-white">Medida provisória</p>
            </Hexagon>
            <Title> Documentos jurídicos e civis </Title>
            <Hexagon
              className="green"
              onClick={() =>
                history.push("/documentos-juridicos/atos-administrativos")
              }
            >
              <p className="txt-white">Atos administrativos</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              className="green"
              onClick={() => history.push("/documentos-juridicos/constituicao")}
            >
              <p className="txt-white">Constituição</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="green"
              onClick={() =>
                history.push("/documentos-juridicos/documentos-civil")
              }
            >
              <p className="txt-white">Documentos civis e de cartórios</p>
            </Hexagon>
          </Row>
        </Content>
      </Conatiner>
      <Footer />
    </>
  );
};

JuridicDocumentGeneral.propTypes = {};

export default JuridicDocumentGeneral;
