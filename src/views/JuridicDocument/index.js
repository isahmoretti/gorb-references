import React, { useState } from "react";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
  Separator,
} from "../../styles/Hexagon";

// pages
import Legislation from "./Legislation";
import Jurisprudence from "./Jurisprudence";

const JuridicDocumentGeneral = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Back onClick={back} />
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
            <Hexagon className="green">
              <p className="txt-white">Medida provisória</p>
            </Hexagon>
            <Title> Livros </Title>
            <Hexagon className="green">
              <p className="txt-white">Atos administrativos</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon className="green">
              <p className="txt-white">Constituição</p>
            </Hexagon>
            <Separator />
            <Hexagon className="green">
              <p className="txt-white"> Parecer</p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <Legislation back={() => setState(0)} />}
      {/* {state === 2 && <BookWithTwoOrThreeAuthors back={() => setState(0)} />}
      {state === 3 && <BookWithFourOrMoreAuthors back={() => setState(0)} />}
      {state === 4 && <ChapterOfBook back={() => setState(0)} />}
      {state === 5 && (
        <BookIntellectuallyResponsible back={() => setState(0)} />
      )} */}
      {state === 6 && <Jurisprudence back={() => setState(0)} />}
    </Conatiner>
  );
};

JuridicDocumentGeneral.propTypes = {};

export default JuridicDocumentGeneral;
