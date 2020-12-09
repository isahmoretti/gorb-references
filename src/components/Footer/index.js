import React from "react";

// import PropTypes from "prop-types";

import logo_viacarreira from "../../assets/images/logo-branco-rodape.png";
import logo_viacarreiraRoxo from "../../assets/images/logo-lilas.png";

import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
import linkedin from "../../assets/images/linkedin.svg";

import {
  Footer,
  Logo,
  WrapperIcons,
  Icons,
  WrapperContent,
  LogoFooter,
  TitleReservation,
  ButtonFooter,
  Title,
  Icon,
  MobileFooter,
  DesktopFooter,
  ContainerDesktopFooter,
  BoxDesktopFooter,
  LogoDesktopFooter,
  ContentDesktopFooter,
  IconsDesktopFooter,
  LabelDesktopFooter,
} from "./styles";

const FooterComponent = () => {
  return (
    <div>
      <MobileFooter>
        <Footer>
          <Logo src={logo_viacarreira} />
          <WrapperIcons>
            <a href="https://www.facebook.com/viacarreira/">
              <Icons src={facebook} />
            </a>
            <a href="https://twitter.com/viacarreira">
              <Icons src={twitter} />
            </a>
            <a href="https://www.linkedin.com/company/viacarreira/">
              <Icons src={linkedin} />
            </a>
          </WrapperIcons>
          <WrapperContent className="container">
            <ButtonFooter>
              <a href="https://viacarreira.com/">
                <Title>Home</Title>
              </a>
              <Icon> > </Icon>
            </ButtonFooter>

            <ButtonFooter>
              <a href="https://viacarreira.com/sobre/">
                <Title>Sobre</Title>
              </a>
              <Icon> > </Icon>
            </ButtonFooter>

            <ButtonFooter>
              <a href="https://viacarreira.com/politica-de-privacidade/">
                <Title>Políticas de privacidade</Title>
              </a>
              <Icon> > </Icon>
            </ButtonFooter>

            <ButtonFooter>
              <a href="https://viacarreira.com/contato/">
                <Title>Fale conosco</Title>
              </a>
              <Icon> > </Icon>
            </ButtonFooter>
          </WrapperContent>

          <TitleReservation>
            {" "}
            2013 - 2020 © Layub <br /> Todos os direitos reservados{" "}
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
              O Via Carreira é um portal que facilita o planejamento da
              carreira, com conselhos e informações sobre formação, trabalhos
              acadêmicos e busca por emprego. Também temos conteúdos sobre
              empreendedorismo e desenvolvimento pessoal.
            </ContentDesktopFooter>
            <IconsDesktopFooter>
              <a href="https://www.facebook.com/viacarreira/">
                <Icons src={facebook} />
              </a>
              <a href="https://twitter.com/viacarreira">
                <Icons src={twitter} />
              </a>
              <a href="https://www.linkedin.com/company/viacarreira/">
                <Icons src={linkedin} />
              </a>
            </IconsDesktopFooter>
          </BoxDesktopFooter>
          <BoxDesktopFooter>
            <ContentDesktopFooter>
              <ul>
                <li>
                  {" "}
                  <a href="https://viacarreira.com/">
                    <Title>Home</Title>
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="https://viacarreira.com/sobre/">
                    <Title>Sobre</Title>
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="https://viacarreira.com/politica-de-privacidade/">
                    <Title>Políticas de privacidade</Title>
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="https://viacarreira.com/contato/">
                    <Title>Fale conosco</Title>
                  </a>{" "}
                </li>
              </ul>
            </ContentDesktopFooter>
          </BoxDesktopFooter>
          <BoxDesktopFooter>
            <ContentDesktopFooter>
              <ul>
                <li> ACADÊMICO </li>
                <li> CURSOS </li>
                <li> PROFISSÕES </li>
                <li> EMPREGO </li>
                <li> MEU NEGÓCIO </li>
              </ul>
            </ContentDesktopFooter>
          </BoxDesktopFooter>
        </ContainerDesktopFooter>

        <LabelDesktopFooter>
          2013 - 2020 © Layub - Todos os direitos reservados
        </LabelDesktopFooter>
      </DesktopFooter>
    </div>
  );
};

FooterComponent.propTypes = {};

export default FooterComponent;
