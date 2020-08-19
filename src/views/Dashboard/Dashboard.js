import React, { useState } from "react";

import {
  Conatiner,
  Content,
  ContentText,
  Row,
  Hexagon,
  Title,
  Separator,
  WrapperAdvertising,
  Advertising,
  IconPlus,
} from "../../styles/Hexagon";

import Nav from "../HomePage/Header";
import Footer from "../HomePage/Footer";

// pages
import Book from "../Book";
import AcademicWork from "../AcademicWork";
import JuridicDocument from "../JuridicDocument";
import ElectronicMediaDocuments from "../ElectronicMediaDocuments";
import Audiovisual from "../Audiovisual";
import Events from "../Events"
const Dashboard = () => {
  const [state, setState] = useState(0);

  return (
    <>
      <Nav />
      <Conatiner>
        {!state && (
          <Content>
            <Row>
              <Hexagon onClick={() => setState(1)} className="blue">
                <p className="txt-white">Livros</p>
              </Hexagon>
              <Separator />
              <Hexagon onClick={() => setState(6)} className="green">
                <p className="txt-white">Documentos jurídicos</p>
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
                Gerador <br /> Online de <br /> Referências <br />{" "}
                Bibliográficas{" "}
              </Title>
              <Hexagon onClick={() => setState(5)} className="wine">
                <p className="txt-white">
                  Documentos <br />
                  exclusivos de meio <br />
                  eletrônico
                </p>
              </Hexagon>
            </Row>

            <Row className="mt">
              <Hexagon onClick={() => setState(4)} className="blue-dark">
                <p className="txt-white">Eventos</p>
              </Hexagon>
              <Separator />
              <Hexagon onClick={() => setState(3)} className="violet">
                <p className="txt-white">
                  Documentos <br />
                  audiovisuais
                </p>
              </Hexagon>
              <Separator />
              <Hexagon className="gray">
                <IconPlus />
              </Hexagon>
            </Row>
          </Content>
        )}
        {state === 1 && <Book back={() => setState(0)} />}
        {state === 2 && <AcademicWork back={() => setState(0)} />}
        {state === 3 && <Audiovisual back={() => setState(0)} />}
        {state === 4 && <Events back={() => setState(0)} />}
        {state === 5 && <ElectronicMediaDocuments back={() => setState(0)} />}
        {state === 6 && <JuridicDocument back={() => setState(0)} />}
      </Conatiner>

      {state !== 0 && (
        <>
          <ContentText className="container">
            <WrapperAdvertising>
              <Advertising width={728} height={90}>
                {" "}
                ContentText{" "}
              </Advertising>
            </WrapperAdvertising>
            <section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </section>
            <WrapperAdvertising>
              <Advertising width={728} height={250}>
                {" "}
                ContentText{" "}
              </Advertising>
            </WrapperAdvertising>
            <section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </section>
          </ContentText>
          <Footer />
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
