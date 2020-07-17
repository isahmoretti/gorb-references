import React, { useState } from "react";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
} from "../../styles/Hexagon";

// pages
import WorkArticle from "./ WorkArticlePeriodic";

const BookGeneral = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Row>
            <Back onClick={back} />
            <Hexagon onClick={() => setState(1)} className="yellow">
              <p className="txt-white">Tese</p>
            </Hexagon>

            <Hexagon onClick={() => setState(6)} className="yellow">
              <p className="txt-white">Monografia</p>
            </Hexagon>
          </Row>

          <Row className="bt">
            <Hexagon onClick={() => setState(2)} className="yellow">
              <p className="txt-white">Dissertação</p>
            </Hexagon>
            <Title> Trabalhos acadêmicos e publicações periódicas </Title>
            <Hexagon onClick={() => setState(5)} className="yellow">
              <p className="txt-white">Artigo em periódico</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(3)} className="yellow">
              <p className="txt-white">Artigo de Jornal</p>
            </Hexagon>

            <Hexagon onClick={() => setState(4)} className="yellow">
              <p className="txt-white"> Artigo de revista</p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 5 && <WorkArticle back={() => setState(0)} />}
    </Conatiner>
  );
};

BookGeneral.propTypes = {};

export default BookGeneral;
