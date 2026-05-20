import React from "react";
import { useHistory } from "react-router-dom";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
  Separator,
  ContentText,
} from "../../../styles/Hexagon";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const BookGeneral = ({ back }) => {
  document.title = "Trabalhos Acadêmicos: Referência ABNT";
  const history = useHistory();

  return (
    <>
      <Header />
      <Conatiner>
        <Content>
          <Back onClick={() => history.push("/")} src={ArrowLeft} />
          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-tese"
                )
              }
              className="yellow"
            >
              <p className="txt-white">Tese</p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() =>
                history.push(
                  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-monografia-e-tcc"
                )
              }
              className="yellow"
            >
              <p className="txt-white">Monografia e TCC</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-dissertacao"
                )
              }
              className="yellow"
            >
              <p className="txt-white">Dissertação</p>
            </Hexagon>
            <Title>
              {" "}
              Trabalhos <br /> acadêmicos e <br /> publicações <br /> periódicas{" "}
            </Title>
            <Hexagon
              onClick={() =>
                history.push(
                  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico"
                )
              }
              className="yellow"
            >
              <p className="txt-white">Artigo em periódico</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-jornal"
                )
              }
              className="yellow"
            >
              <p className="txt-white">Artigo de Jornal</p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() =>
                history.push(
                  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-revista"
                )
              }
              className="yellow"
            >
              <p className="txt-white"> Artigo de revista</p>
            </Hexagon>
          </Row>
        </Content>
      </Conatiner>
      <ContentText className="container">
        Além de livros, outros materiais podem ser usados como fontes para a
        pesquisa, como é o caso dos trabalhos acadêmicos (TCC, monografias,
        artigos científicos, dissertações, teses) e publicações periódicas
        (artigo de revista e jornal).
      </ContentText>

      <Footer />
    </>
  );
};

BookGeneral.propTypes = {};

export default BookGeneral;
