import React, { useState } from "react";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
  Separator,
} from "../../styles/Hexagon";

// pages
import Site from "./Site";
import SoftwareAndEletronicGame from "./SoftwareAndEletronicGame";
import SlideShow from "./SlideShow";
import Email from "./Email";
import SocialNetworkPost from "./SocialNetworkPost";
import BlogArticle from "./BlogArticle";

const ElectronicMediaDocuments = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Back onClick={back} />
          <Row className="ml">
            <Hexagon className="wine">Entidade X</Hexagon>
            <Separator />
            <Hexagon onClick={() => setState(1)} className="wine">
              <p className="txt-white">Site</p>
            </Hexagon>
            <Separator />
            <Hexagon className="wine" onClick={() => setState(6)}>
              <p className="txt-white">Artigo de blog</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(2)} className="wine">
              <p className="txt-white">Software e jogo eletrônico</p>
            </Hexagon>
            <Title> DOCUMENTO DE MEIO ELETRÔNICO </Title>
            <Hexagon onClick={() => setState(5)} className="wine">
              <p className="txt-white">Postagem de rede social</p>
            </Hexagon>
          </Row>

          <Row className="mt">
            <Hexagon onClick={() => setState(3)} className="wine">
              <p className="txt-white">
                Apresentação <br />
                de slides
              </p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => setState(4)} className="wine">
              <p className="txt-white">E-mail</p>
            </Hexagon>
            <Separator />
            <Hexagon className="wine">Entidade X</Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <Site back={() => setState(0)} />}
      {state === 2 && <SoftwareAndEletronicGame back={() => setState(0)} />}
      {state === 3 && <SlideShow back={() => setState(0)} />}
      {state === 4 && <Email back={() => setState(0)} />}
      {state === 5 && <SocialNetworkPost back={() => setState(0)} />}
      {state === 6 && <BlogArticle back={() => setState(0)} />}
    </Conatiner>
  );
};

ElectronicMediaDocuments.propTypes = {};

export default ElectronicMediaDocuments;
