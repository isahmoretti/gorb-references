import React from "react";
import { useHistory } from "react-router-dom";

import {
  Conatiner,
  Content,
  ContentMobile,
  ContentDesktop,
  Row,
  Hexagon,
  Title,
  Back,
  Separator,
} from "../../../styles/Hexagon";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const ElectronicMediaDocuments = ({ back }) => {
  const history = useHistory();

  return (
    <>
      <Header />
      <Conatiner>
        <ContentDesktop>
          <Back onClick={() => history.push("/")} src={ArrowLeft} />
          <Row className="ml">
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-mensagens-instantaneas"
                )
              }
              className="wine"
            >
              Mensagens instantâneas
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-site"
                )
              }
              className="wine"
            >
              <p className="txt-white">Site</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="wine"
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-artigo-de-blog"
                )
              }
            >
              <p className="txt-white">Artigo de blog</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-software-e-jogo-eletronico"
                )
              }
              className="wine"
            >
              <p className="txt-white">Software e jogo eletrônico</p>
            </Hexagon>
            <Title> Documentos exclusivos de meio eletrônico </Title>
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-postagem-de-rede-social"
                )
              }
              className="wine"
            >
              <p className="txt-white">Postagem de rede social</p>
            </Hexagon>
          </Row>

          <Row className="mt">
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-apresentacao-de-slides"
                )
              }
              className="wine"
            >
              <p className="txt-white">
                Apresentação <br />
                de slides
              </p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-email"
                )
              }
              className="wine"
            >
              <p className="txt-white">E-mail</p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-ebook"
                )
              }
              className="wine"
            >
              E-book
            </Hexagon>
          </Row>
        </ContentDesktop>

        <ContentMobile>
          <Back onClick={() => history.push("/")} src={ArrowLeft} />
          <Row style={{ marginTop: 40 }}>
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-mensagens-instantaneas"
                )
              }
              className="wine"
            >
              <p className="txt-white">Mensagens instantâneas</p>
            </Hexagon>
          </Row>
          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-site"
                )
              }
              className="wine"
            >
              <p className="txt-white">Site</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="wine"
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-artigo-de-blog"
                )
              }
            >
              <p className="txt-white">Artigo de blog</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-software-e-jogo-eletronico"
                )
              }
              className="wine"
            >
              <p className="txt-white">Software e jogo eletrônico</p>
            </Hexagon>
            <Title> Documentos exclusivos de meio eletrônico </Title>
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-postagem-de-rede-social"
                )
              }
              className="wine"
            >
              <p className="txt-white">Postagem de rede social</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-apresentacao-de-slides"
                )
              }
              className="wine"
            >
              <p className="txt-white">
                Apresentação <br />
                de slides
              </p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-email"
                )
              }
              className="wine"
            >
              <p className="txt-white">E-mail</p>
            </Hexagon>
          </Row>
          <Row style={{ marginBottom: 40 }}>
            <Hexagon
              onClick={() =>
                history.push(
                  "/documentos-de-meio-eletronico/referencia-de-ebook"
                )
              }
              className="wine"
            >
              <p className="txt-white"> E-book</p>
            </Hexagon>
          </Row>
        </ContentMobile>
      </Conatiner>
      <Footer />
    </>
  );
};

ElectronicMediaDocuments.propTypes = {};

export default ElectronicMediaDocuments;
