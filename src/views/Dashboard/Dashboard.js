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
              <p>Livros</p>
            </Hexagon>

            <Hexagon className="green">
              <p>Documento jurídico</p>
            </Hexagon>
          </Row>

          <Row className="bt">
            <Hexagon className="yellow">
              <p>
                Trabalhos <br />
                acadêmicos e <br />
                publicações <br />
                periódicas
              </p>
            </Hexagon>
            <Title> Gerador de Referências Bibliográficas </Title>
            <Hexagon className="">
              <p>
                Documentos <br />
                exclusivos de meio <br />
                eletrônico
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon className="blue-dark">
              <p>Eventos</p>
            </Hexagon>

            <Hexagon className="violet">
              <p>
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
