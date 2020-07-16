import React, { useState } from "react";

import { Conatiner, Content, Row, Hexagon, Title } from "../../styles/Hexagon";

// pages
import Book from "../book";

const Dashboard = () => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Row>
            <Hexagon onClick={() => setState(1)} className="blue">
              <p className="txt-white">Livros</p>
            </Hexagon>

            <Hexagon className="green">
              <p className="txt-white">Documento jurídico</p>
            </Hexagon>
          </Row>

          <Row className="bt">
            <Hexagon className="yellow">
              <p className="txt-white">
                Trabalhos <br />
                acadêmicos e <br />
                publicações <br />
                periódicas
              </p>
            </Hexagon>
            <Title> Gerador de Referências Bibliográficas </Title>
            <Hexagon className="">
              <p className="txt-white">
                Documentos <br />
                exclusivos de meio <br />
                eletrônico
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon className="blue-dark">
              <p className="txt-white">Eventos</p>
            </Hexagon>

            <Hexagon className="violet">
              <p className="txt-white">
                Documentos <br />
                audiovisuais
              </p>
            </Hexagon>
          </Row>
        </Content>
      )}
      {state === 1 && <Book back={() => setState(0)} />}
    </Conatiner>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
