import React, { useState } from "react";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
  Separator,
} from "../../../styles/Hexagon";

// pages
import ArticleNewspaper from "./ArticleNewspaper";
import WorkArticle from "./ WorkArticlePeriodic";
import ArticleMagazine from "./ArticleMagazine";
import Dissertation from "./Dissertation";
import Monography from "./Monography";
import Thesis from "./Thesis";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

const BookGeneral = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Back onClick={back} src={ArrowLeft} />
          <Row>
            <Hexagon onClick={() => setState(1)} className="yellow">
              <p className="txt-white">Tese</p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => setState(6)} className="yellow">
              <p className="txt-white">Monografia e TCC</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(2)} className="yellow">
              <p className="txt-white">Dissertação</p>
            </Hexagon>
            <Title>
              {" "}
              Trabalhos <br /> acadêmicos e <br /> publicações <br /> periódicas{" "}
            </Title>
            <Hexagon onClick={() => setState(5)} className="yellow">
              <p className="txt-white">Artigo em periódico</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(3)} className="yellow">
              <p className="txt-white">Artigo de Jornal</p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => setState(4)} className="yellow">
              <p className="txt-white"> Artigo de revista</p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <Thesis back={() => setState(0)} />}
      {state === 2 && <Dissertation back={() => setState(0)} />}
      {state === 3 && <ArticleNewspaper back={() => setState(0)} />}
      {state === 4 && <ArticleMagazine back={() => setState(0)} />}
      {state === 5 && <WorkArticle back={() => setState(0)} />}
      {state === 6 && <Monography back={() => setState(0)} />}
    </Conatiner>
  );
};

BookGeneral.propTypes = {};

export default BookGeneral;
