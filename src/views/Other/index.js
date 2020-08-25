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
import ObjectThree from "./ObjectThree";
import Score from "./Score";
import WorkArt from "./WorkArt";
import Maps from "./Maps";
import BullMedicine from "./BullMedicine";
// import WholeEventInPeriodicPublication from './WholeEventInPeriodicPublication'

// assets
import ArrowLeft from "../../assets/images/arrow-left.svg";

const Events = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Back onClick={back} src={ArrowLeft} />
          <Row>
            <Hexagon onClick={() => setState(1)} className="gray">
              <p className="txt-white">
                Objeto tridimensional (fósseis, esqueletos, maquetes,
                monumentos)
              </p>
            </Hexagon>
            <Separator />
            <Hexagon className="gray" onClick={() => setState(5)}>
              <p className="txt-white">Bula de remédio</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(4)} className="gray">
              <p className="txt-white">Mapas </p>
            </Hexagon>
            <Title>
              Outros <br /> documentos
            </Title>
            <Hexagon className="gray" onClick={() => setState(3)}>
              <p className="txt-white">Obra de arte</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon className="gray" onClick={() => setState(2)}>
              <p className="txt-white">Partitura</p>
            </Hexagon>
            <Separator />
            <Hexagon className="gray" onClick={() => setState(4)}>
              <p className="txt-white">
                Verbete de <br /> Enciclopédia/ Dicionário
              </p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <ObjectThree back={() => setState(0)} />}
      {state === 2 && <Score back={() => setState(0)} />}
      {state === 3 && <WorkArt back={() => setState(0)} />}
      {state === 4 && <Maps back={() => setState(0)} />}
      {state === 5 && <BullMedicine back={() => setState(0)} />}
      {/*{state === 6 && <WholeEventInPeriodicPublication back={() => setState(0)} />} */}
    </Conatiner>
  );
};

Events.propTypes = {};

export default Events;
