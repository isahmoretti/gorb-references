import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo_viacarreira from "../../assets/images/gorb-logo-ok.png";
import logo_viacarreiraRoxo from "../../assets/images/gorb-logo-ok.png";

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

const FooterLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.18s ease;

  &:hover {
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid #6666cc;
    outline-offset: 2px;
    border-radius: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const MobileFooterLink = styled(FooterLink)`
  font-size: 12px;
`;

const FooterComponent = () => {
  return (
    <div>
      <MobileFooter>
        <Footer>
          <Logo src={logo_viacarreira} />
          <FooterNav aria-label="Links do rodapé">
            <MobileFooterLink to="/sobre">Sobre</MobileFooterLink>
          </FooterNav>
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
              <img src={logo_viacarreiraRoxo} alt="GORB logo" />
            </LogoDesktopFooter>
            <ContentDesktopFooter>
              O Gorb é uma ferramenta online que gera referências bibliográficas
              alinhadas com a NBR 6023:2018 da ABNT.
            </ContentDesktopFooter>
            <FooterNav aria-label="Links do rodapé">
              <FooterLink to="/sobre">Sobre</FooterLink>
            </FooterNav>
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
