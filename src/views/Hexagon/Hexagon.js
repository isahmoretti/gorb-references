import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
  Conatiner,
  ContentHome,
  ContentMobile,
  Row,
  Hexagon,
  Title,
  Separator,
  WrapperAdvertising,
  Advertising,
  ContentText,
  IconPlus,
  HeaderTitle,
  TitleMobile,
} from "../../styles/Hexagon";

// components
import Header from "../../components/Header";

import Plus from "../../assets/images/plus-dark.svg";

const HexagonPage = () => {
  const history = useHistory();

  return (
    <>
      <Header />
      <Conatiner>
        <ContentHome>
          <Row>
            <Hexagon onClick={() => history.push("/book")} className="blue">
              <p className="txt-white">Livros</p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => history.push("/")} className="green">
              <p className="txt-white">
                Documentos <br /> jurídicos e civis
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => history.push("/")} className="yellow">
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
            <Hexagon onClick={() => history.push("/")} className="wine">
              <p className="txt-white">
                Documentos <br />
                exclusivos de meio <br />
                eletrônico
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => history.push("/")} className="blue-dark">
              <p className="txt-white">
                {" "}
                Eventos,
                <br />
                patentes e
                <br />
                normas
                <br />
                técnicas
                <br />{" "}
              </p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => history.push("/")} className="violet">
              <p className="txt-white">
                Documentos <br />
                audiovisuais
              </p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => history.push("/")} className="gray">
              <IconPlus src={Plus} />
            </Hexagon>
          </Row>
        </ContentHome>
        <ContentMobile>
          <HeaderTitle>
            <TitleMobile>
              Gerador Online de Referências Bibliográficas
            </TitleMobile>
          </HeaderTitle>
          <Row>
            <Hexagon onClick={() => history.push("/book")} className="blue">
              <p className="txt-white">Livros</p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => history.push("/")} className="green">
              <p className="txt-white">
                Documentos <br /> jurídicos e civis
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => history.push("/")} className="yellow">
              <p className="txt-white">
                Trabalhos <br />
                acadêmicos e publicações periódicas
              </p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => history.push("/")} className="gray">
              <IconPlus src={Plus} />
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => history.push("/")} className="wine">
              <p className="txt-white">
                Documentos <br />
                exclusivos de meio <br />
                eletrônico
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => history.push("/")} className="blue-dark">
              <p className="txt-white">
                {" "}
                Eventos,
                <br />
                patentes e
                <br />
                normas técnicas
                <br />{" "}
              </p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => history.push("/")} className="violet">
              <p className="txt-white">
                Documentos <br />
                audiovisuais
              </p>
            </Hexagon>
            <Separator />
          </Row>
        </ContentMobile>
      </Conatiner>
    </>
  );
};

HexagonPage.propTypes = {};

export default HexagonPage;
