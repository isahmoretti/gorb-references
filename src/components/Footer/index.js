import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../../assets/images/gorb-logo-ok.png";

const Wrapper = styled.footer`
  background: #171715;
  border-top: 3px solid #6666cc;
  padding: 48px 32px 0;

  @media (max-width: 600px) {
    padding: 36px 20px 0;
  }
`;

const Grid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
`;

const Brand = styled.div``;

const Logo = styled.img`
  height: 32px;
  width: auto;
  display: block;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    margin: 0 auto 14px;
  }
`;

const Description = styled.p`
  font-size: 13px;
  color: #9ca3af;
  line-height: 1.7;
  margin: 0;
  max-width: 280px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Column = styled.div``;

const ColTitle = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  margin: 0 0 14px;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
`;

const NavLink = styled(Link)`
  font-size: 13px;
  color: #9ca3af;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.18s ease;
  min-height: 44px;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: #c4b8ff;
  }

  &:focus-visible {
    outline: 2px solid #6666cc;
    outline-offset: 3px;
    border-radius: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (max-width: 768px) {
    min-height: unset;
  }
`;

const EmailLink = styled.a`
  font-size: 13px;
  color: #9ca3af;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.18s ease;
  word-break: break-all;

  &:hover {
    color: #c4b8ff;
  }

  &:focus-visible {
    outline: 2px solid #6666cc;
    outline-offset: 3px;
    border-radius: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #2d2d2b;
  margin: 0;
`;

const Copyright = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 0;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`;

const FooterComponent = () => (
  <Wrapper>
    <Grid>
      <Brand>
        <Logo src={logo} alt="GORB logo" />
        <Description>
          Gerador Online de Referências Bibliográficas no padrão ABNT NBR
          6023:2018. Gratuito e sem cadastro.
        </Description>
      </Brand>

      <Column>
        <ColTitle>Navegação</ColTitle>
        <NavList aria-label="Links de navegação">
          <li><NavLink to="/">Início</NavLink></li>
          <li><NavLink to="/sobre">Sobre</NavLink></li>
          <li><NavLink to="/politica-de-privacidade">Política de Privacidade</NavLink></li>
        </NavList>
      </Column>

      <Column>
        <ColTitle>Contato</ColTitle>
        <EmailLink href="mailto:contato@viacarreira.com">
          contato@viacarreira.com
        </EmailLink>
      </Column>
    </Grid>

    <Divider />

    <Copyright>
      2013 – {new Date().getFullYear()} © Layub · Todos os direitos reservados
    </Copyright>
  </Wrapper>
);

FooterComponent.propTypes = {};

export default FooterComponent;
