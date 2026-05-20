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

const JuridicDocumentGeneral = ({ back }) => {
  document.title = "Documentos Jurídicos e Civis: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Gere referências de documentos jurídicos e civis no padrão ABNT NBR 6023:2018. Legislação, jurisprudência e mais.");
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
                  "/documentos-juridicos-e-civis/referencia-de-legislacao"
                )
              }
              className="green"
            >
              <p className="txt-white">Legislação</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="green"
              onClick={() =>
                history.push(
                  "/documentos-juridicos-e-civis/referencia-de-jurisprudencia"
                )
              }
            >
              <p className="txt-white">Jurisprudência</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-juridicos-e-civis/referencia-de-medida-provisoria"
                )
              }
              className="green"
            >
              <p className="txt-white">Medida provisória</p>
            </Hexagon>
            <Title> Documentos jurídicos e civis </Title>
            <Hexagon
              className="green"
              onClick={() =>
                history.push(
                  "/documentos-juridicos-e-civis/referencia-de-atos-administrativos"
                )
              }
            >
              <p className="txt-white">Atos administrativos</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              className="green"
              onClick={() =>
                history.push(
                  "/documentos-juridicos-e-civis/referencia-de-constituicao"
                )
              }
            >
              <p className="txt-white">Constituição</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="green"
              onClick={() =>
                history.push(
                  "/documentos-juridicos-e-civis/referencia-de-documentos-civis-e-de-cartorio"
                )
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
