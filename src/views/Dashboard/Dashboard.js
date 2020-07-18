import React, { useState } from "react";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Separator,
} from "../../styles/Hexagon";

// pages
import Book from "../book";
import AcademicWork from "../ AcademicWork";

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
            <Separator />
            <Hexagon className="green">
              <p className="txt-white">Documento jurídico</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(2)} className="yellow">
              <p className="txt-white">
                Trabalhos <br />
                acadêmicos e <br />
                publicações <br />
                periódicas
              </p>
            </Hexagon>
            <Title>
              {" "}
              Gerador <br /> Online de <br /> Referências <br /> Bibliográficas{" "}
            </Title>
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
            <Separator />
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
      {state === 2 && <AcademicWork back={() => setState(0)} />}
    </Conatiner>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
