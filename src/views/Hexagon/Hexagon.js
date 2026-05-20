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
import Footer from "../../components/Footer";

import Plus from "../../assets/images/plus-dark.svg";
import Pagina from "../../assets/images/home/pagina-de-referencias-bibliograficas.jpg";

const HexagonPage = () => {
  const history = useHistory();

  return (
    <>
      <Header />
      <Conatiner>
        <ContentHome>
          <Row>
            <Hexagon onClick={() => history.push("/livros")} className="blue">
              <p className="txt-white">Livros</p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() => history.push("/documentos-juridicos-e-civis")}
              className="green"
            >
              <p className="txt-white">
                Documentos <br /> jurídicos e civis
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push("/trabalhos-academicos-e-publicacoes-periodicas")
              }
              className="yellow"
            >
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
            <Hexagon
              onClick={() => history.push("/documentos-de-meio-eletronico")}
              className="wine"
            >
              <p className="txt-white">
                Documentos <br />
                exclusivos de meio <br />
                eletrônico
              </p>
            </Hexagon>
          </Row>
          {/* f2f2f8 */}
          <Row>
            <Hexagon
              onClick={() =>
                history.push("/eventos-patentes-e-normas-tecnicas")
              }
              className="blue-dark-left"
            >
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
            <Hexagon
              onClick={() => history.push("/documentos-audiovisuais")}
              className="violet"
            >
              <p className="txt-white">
                Documentos <br />
                audiovisuais
              </p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => history.push("/outros")} className="gray">
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
            <Hexagon onClick={() => history.push("/livros")} className="blue">
              <p className="txt-white">Livros</p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() => history.push("/documentos-juridicos-e-civis")}
              className="green"
            >
              <p className="txt-white">
                Documentos <br /> jurídicos e civis
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push("/trabalhos-academicos-e-publicacoes-periodicas")
              }
              className="yellow"
            >
              <p className="txt-white">
                Trabalhos <br />e publicações periódicas
              </p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => history.push("/outros")} className="gray">
              <IconPlus src={Plus} />
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() => history.push("/documentos-de-meio-eletronico")}
              className="wine"
            >
              <p className="txt-white">
                Documentos <br />
                exclusivos de meio <br />
                eletrônico
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push("/eventos-patentes-e-normas-tecnicas")
              }
              className="blue-dark"
            >
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
            <Hexagon
              onClick={() => history.push("/documentos-audiovisuais")}
              className="violet"
            >
              <p className="txt-white">
                Documentos <br />
                audiovisuais
              </p>
            </Hexagon>
            <Separator />
          </Row>
        </ContentMobile>
      </Conatiner>
      <ContentText className="container">
        <p>
          O Gerador Online de Referências Bibliográfica (GORB) foi criado pelo
          Via Carreira com o objetivo de facilitar o dia a dia dos estudantes.
          Ele aplica a NBR 6023:2018, da Associação Brasileira de Normas
          Técnicas (ABNT).
        </p>

        <p>
          Cada referência é composta por elementos essenciais (indispensáveis
          para a identificação do documento) e elementos complementares
          (informações adicionais). Todos os documentos citados no trabalho
          devem ser referenciados.
        </p>

        <h2>Passo a passo para usar o GORB:</h2>

        <p>
          <b>Passo 1.</b> Encontre na roseta hexagonal o tipo de documento que
          você deseja referenciar no trabalho.
        </p>

        <p>
          <b>Passo 2.</b> Preencha o formulário com os dados solicitados e
          clique em "gerar referência". Em alguns casos você também consegue
          gerar as chamadas para citações.
        </p>

        <p>
          <b>Passo 3.</b> O sistema vai colocar todos os elementos na ordem
          correta, como determina a ABNT. Clique no botão copiar e cole a
          referência na sua lista, no editor de texto.
        </p>

        <p>
          As referências bibliográficas devem ser apresentadas com a seguinte
          formatação:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            Margens: 3cm (Superior e Inferior) e 2 cm (Esquerda e Direita);{" "}
          </li>
          <li>
            {" "}
            O título <b>REFERÊNCIAS</b> deve estar no topo a folha,
            centralizado, com tamanho 12, letras maiúsculas e espaçamento de 1,5
            entre as linhas;{" "}
          </li>
          <li> Alinhamento de texto à esquerda; </li>
          <li> Espaçamento simples entre linhas; </li>
          <li>
            {" "}
            Separação entre si por uma linha em branco de espaço simples;{" "}
          </li>
          <li> Referências com fonte tamanho 12; </li>
          <li> Organização por ordem alfabética e não numerada; </li>
          <li> O título da seção não tem indicativo numérico; </li>
          <li>
            {" "}
            O recurso tipográfico utilizado para destacar um elemento (negrito
            ou itálico) deve ser uniforme em todas as referências;{" "}
          </li>
          <li>
            {" "}
            Quem opta por abreviar os nomes dos autores precisa seguir esse
            padrão em toda a lista de referências.{" "}
          </li>
        </ul>

        <img src={Pagina} alt="pagina-referencia" width="100%" />
      </ContentText>

      <Footer />
    </>
  );
};

HexagonPage.propTypes = {};

export default HexagonPage;
