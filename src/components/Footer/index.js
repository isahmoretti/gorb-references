import React from "react";

// import PropTypes from "prop-types";

import logo_viacarreira from "../../assets/images/logo-branco-rodape.png";
import logo_viacarreiraRoxo from "../../assets/images/logo-lilas.png";

import {
  Footer,
  Logo,
  TitleReservation,
  MobileFooter,
  DesktopFooter,
  ContainerDesktopFooter,
  BoxDesktopFooter,
  LogoDesktopFooter,
  ContentDesktopFooter,
  LabelDesktopFooter,
} from "./styles";

const FooterComponent = () => {
  return (
    <div>
      <MobileFooter>
        <Footer>
          <Logo src={logo_viacarreira} />

          <TitleReservation>
            {" "}
            2013 - {new Date().getFullYear()} © Layub <br /> Todos os direitos
            reservados{" "}
          </TitleReservation>
        </Footer>
      </MobileFooter>

      <DesktopFooter>
        <ContainerDesktopFooter>
          <BoxDesktopFooter>
            <LogoDesktopFooter>
              <img src={logo_viacarreiraRoxo} alt="" />
            </LogoDesktopFooter>
            <ContentDesktopFooter>
              O Gorb é uma ferramenta online que gera referências bibliográficas
              alinhadas com a NBR 6023:2018 da ABNT.
            </ContentDesktopFooter>
          </BoxDesktopFooter>
        </ContainerDesktopFooter>

        <LabelDesktopFooter>
          2013 - {new Date().getFullYear()} © Layub - Todos os direitos
          reservados
        </LabelDesktopFooter>
      </DesktopFooter>
    </div>
  );
};

FooterComponent.propTypes = {};

export default FooterComponent;
