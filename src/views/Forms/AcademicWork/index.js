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

import Header from "../../../components/Header";

const BookGeneral = ({ back }) => {
  const history = useHistory();

  return (
    <>
      <Header />
      <Conatiner>
        <Content>
          <Back onClick={() => history.push("/")} src={ArrowLeft} />
          <Row>
            <Hexagon
              onClick={() => history.push("/trabalhos-academicos/teses")}
              className="yellow"
            >
              <p className="txt-white">Tese</p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() => history.push("/trabalhos-academicos/monografia")}
              className="yellow"
            >
              <p className="txt-white">Monografia e TCC</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() => history.push("/trabalhos-academicos/dissertacao")}
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
                history.push("/trabalhos-academicos/artigo-de-periodico")
              }
              className="yellow"
            >
              <p className="txt-white">Artigo em periódico</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push("/trabalhos-academicos/artigo-de-jornal")
              }
              className="yellow"
            >
              <p className="txt-white">Artigo de Jornal</p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() =>
                history.push("/trabalhos-academicos/artigo-de-revista")
              }
              className="yellow"
            >
              <p className="txt-white"> Artigo de revista</p>
            </Hexagon>
          </Row>
        </Content>
      </Conatiner>
    </>
  );
};

BookGeneral.propTypes = {};

export default BookGeneral;
