import React, { useState } from "react";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
  Separator,
} from "../../../styles/Hexagon";

// pages
import Legislation from "./Legislation";
import Jurisprudence from "./Jurisprudence";
import Constitution from "./Constitution";
import AdministrativeActs from "./AdministrativeActs";
import ProvisionalMeasure from "./ProvisionalMeasure";
import CivilAndNotary from "./CivilAndNotary";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

const JuridicDocumentGeneral = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Back onClick={back} src={ArrowLeft} />
          <Row>
            <Hexagon onClick={() => setState(1)} className="green">
              <p className="txt-white">Legislação</p>
            </Hexagon>
            <Separator />
            <Hexagon className="green" onClick={() => setState(6)}>
              <p className="txt-white">Jurisprudência</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(2)} className="green">
              <p className="txt-white">Medida provisória</p>
            </Hexagon>
            <Title> Documentos jurídicos </Title>
            <Hexagon className="green" onClick={() => setState(4)}>
              <p className="txt-white">Atos administrativos</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon className="green" onClick={() => setState(3)}>
              <p className="txt-white">Constituição</p>
            </Hexagon>
            <Separator />
            <Hexagon className="green" onClick={() => setState(5)}>
              <p className="txt-white">Documentos civis e de cartórios</p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <Legislation back={() => setState(0)} />}
      {state === 2 && <ProvisionalMeasure back={() => setState(0)} />}
      {state === 5 && <CivilAndNotary back={() => setState(0)} />}
      {state === 6 && <Jurisprudence back={() => setState(0)} />}
      {state === 3 && <Constitution back={() => setState(0)} />}
      {state === 4 && <AdministrativeActs back={() => setState(0)} />}
    </Conatiner>
  );
};

JuridicDocumentGeneral.propTypes = {};

export default JuridicDocumentGeneral;
