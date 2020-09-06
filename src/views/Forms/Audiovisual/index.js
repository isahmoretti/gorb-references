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
import Photo from "./Photo";
import Podcast from "./Podcast";
import Music from "./Music";
import Film from "./Film";
import AudioBook from "./AudioBook";
import VideoInternet from "./VideoInternet";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

const Audiovisual = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Back onClick={back} src={ArrowLeft} />
          <Row>
            <Hexagon onClick={() => setState(4)} className="violet">
              <p className="txt-white">Filme</p>
            </Hexagon>
            <Separator />
            <Hexagon className="violet" onClick={() => setState(5)}>
              <p className="txt-white">Vídeo de internet</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(3)} className="violet">
              <p className="txt-white">Música</p>
            </Hexagon>
            <Title>
              {" "}
              Documentos <br />
              audiovisuais{" "}
            </Title>
            <Hexagon className="violet" onClick={() => setState(6)}>
              <p className="txt-white">Podcast</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon className="violet" onClick={() => setState(1)}>
              <p className="txt-white">Fotografia</p>
            </Hexagon>
            <Separator />
            <Hexagon className="violet" onClick={() => setState(2)}>
              <p className="txt-white">Audiolivro</p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <Photo back={() => setState(0)} />}
      {state === 2 && <AudioBook back={() => setState(0)} />}
      {state === 5 && <VideoInternet back={() => setState(0)} />}
      {state === 6 && <Podcast back={() => setState(0)} />}
      {state === 3 && <Music back={() => setState(0)} />}
      {state === 4 && <Film back={() => setState(0)} />}
    </Conatiner>
  );
};

Audiovisual.propTypes = {};

export default Audiovisual;
