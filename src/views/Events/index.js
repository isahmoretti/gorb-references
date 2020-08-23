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
import WholeEvent from "./WholeEvent";
import TechnicalStandards from './TechnicalStandards'
import Patents from './Patents'
import EventsWorkPublishedInMagazines from './EventsWorkPublishedInMagazines'
import WorksInAnnals from "./WorksInAnnals";
import WholeEventInPeriodicPublication from './WholeEventInPeriodicPublication'

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
            <Hexagon onClick={() => setState(1)} className="blue-dark">
              <p className="txt-white">Evento no todo</p>
            </Hexagon>
            <Separator />
            <Hexagon className="blue-dark" onClick={() => setState(6)}>
              <p className="txt-white">
                Evento no todo em publicação periódica
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(2)} className="blue-dark">
              <p className="txt-white">Normas técnicas</p>
            </Hexagon>
            <Title>
              {" "}
              Eventos,
              <br />
              patentes e
              <br />
              normas
              <br />
              técnicas
              <br />{" "}
            </Title>
            <Hexagon className="blue-dark" onClick={() => setState(5)}>
              <p className="txt-white">Trabalhos em anais</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon className="blue-dark" onClick={() => setState(3)}>
              <p className="txt-white">Patentes</p>
            </Hexagon>
            <Separator />
            <Hexagon className="blue-dark" onClick={() => setState(4)}>
              <p className="txt-white">
                Trabalhos de eventos publicados em <br />
                revistas
              </p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <WholeEvent back={() => setState(0)} />}
      {state === 2 && <TechnicalStandards back={() => setState(0)} />}
      {state === 3 && <Patents back={() => setState(0)} />}
      {state === 4 && <EventsWorkPublishedInMagazines back={() => setState(0)} />}
      {state === 5 && <WorksInAnnals back={() => setState(0)} />}
      {state === 6 && <WholeEventInPeriodicPublication back={() => setState(0)} />}
    
    </Conatiner>
  );
};

Events.propTypes = {};

export default Events;
