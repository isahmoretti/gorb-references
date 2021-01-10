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
                history.push("/meio-eletronico/mensagens-instantaneas")
              }
              className="wine"
            >
              Mensagens instantâneas
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() => history.push("/meio-eletronico/site")}
              className="wine"
            >
              <p className="txt-white">Site</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="wine"
              onClick={() => history.push("/meio-eletronico/artigo-de-blog")}
            >
              <p className="txt-white">Artigo de blog</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push("/meio-eletronico/programa-e-jogo-eletronico")
              }
              className="wine"
            >
              <p className="txt-white">Software e jogo eletrônico</p>
            </Hexagon>
            <Title> Documentos exclusivos de meio eletrônico </Title>
            <Hexagon
              onClick={() =>
                history.push("/meio-eletronico/postagem-na-rede-social")
              }
              className="wine"
            >
              <p className="txt-white">Postagem de rede social</p>
            </Hexagon>
          </Row>

          <Row className="mt">
            <Hexagon
              onClick={() =>
                history.push("/meio-eletronico/apresentacao-de-slide")
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
              onClick={() => history.push("/meio-eletronico/email")}
              className="wine"
            >
              <p className="txt-white">E-mail</p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() => history.push("/meio-eletronico/ebook")}
              className="wine"
            >
              E-book
            </Hexagon>
          </Row>
        </ContentDesktop>

        <ContentMobile>
          <Back onClick={() => history.push("/")} src={ArrowLeft} />
          <Row>
            <Hexagon
              onClick={() =>
                history.push("/meio-eletronico/mensagens-instantaneas")
              }
              className="wine"
            >
              <p className="txt-white">Mensagens instantâneas</p>
            </Hexagon>
          </Row>
          <Row>
            <Hexagon
              onClick={() => history.push("/meio-eletronico/site")}
              className="wine"
            >
              <p className="txt-white">Site</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="wine"
              onClick={() => history.push("/meio-eletronico/artigo-de-blog")}
            >
              <p className="txt-white">Artigo de blog</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push("/meio-eletronico/programa-e-jogo-eletronico")
              }
              className="wine"
            >
              <p className="txt-white">Software e jogo eletrônico</p>
            </Hexagon>
            <Title> Documentos exclusivos de meio eletrônico </Title>
            <Hexagon
              onClick={() =>
                history.push("/meio-eletronico/postagem-na-rede-social")
              }
              className="wine"
            >
              <p className="txt-white">Postagem de rede social</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push("/meio-eletronico/apresentacao-de-slide")
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
              onClick={() => history.push("/meio-eletronico/email")}
              className="wine"
            >
              <p className="txt-white">E-mail</p>
            </Hexagon>
          </Row>
          <Row>
            <Hexagon
              onClick={() => history.push("/meio-eletronico/ebook")}
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
