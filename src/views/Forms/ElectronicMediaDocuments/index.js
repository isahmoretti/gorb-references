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
} from "../../../styles/Hexagon";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

const ElectronicMediaDocuments = ({ back }) => {
  const history = useHistory();

  return (
    <Conatiner>
      <Content>
        <Back onClick={() => history.push("/")} src={ArrowLeft} />
        <Row className="ml">
          <Hexagon
            onClick={() => history.push("/meio-eletronico/mensagens-instantaneas")}
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
            onClick={() => history.push("/meio-eletronico/programa-e-jogo-eletronico")}
            className="wine"
          >
            <p className="txt-white">Software e jogo eletrônico</p>
          </Hexagon>
          <Title> Documentos exclusivos de meio eletrônico </Title>
          <Hexagon
            onClick={() => history.push("/meio-eletronico/postagem-na-rede-social")}
            className="wine"
          >
            <p className="txt-white">Postagem de rede social</p>
          </Hexagon>
        </Row>

        <Row className="mt">
          <Hexagon
            onClick={() => history.push("/meio-eletronico/apresentacao-de-slide")}
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
      </Content>
    </Conatiner>
  );
};

ElectronicMediaDocuments.propTypes = {};

export default ElectronicMediaDocuments;
