import styled from "styled-components";

import fundo from "../../assets/images/fundo-referencia.png";

export const Container = styled.div``;
export const Nav = styled.nav`
  height: 60px;
  width: 100%;

  background-color: #171715;

  color: #fff;
`;
export const WrapperNav = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  > a > img {
    width: 170px;
    height: 30px;
  }
`;
export const HambugerIcon = styled.div``;
export const HeaderLogo = styled.div``;
export const SearchIcon = styled.div``;

export const WrapperHome = styled.div`
  background: url(${fundo});
  background-color: #6666cc;

  @media (max-width: 600px) {
    background: url("#");
    background-color: #6666cc;
  }
`;

export const Fundo1 = styled.img`
  display: none;
  @media (max-width: 600px) {
    display: block;
    src: ${({ src }) => src};
    width: 100%;
  }
`;
export const Fundo2 = styled.img`
  display: none;
  @media (max-width: 600px) {
    display: block;
    src: ${({ src }) => src};
    width: 100%;
  }
`;
export const ContentHome = styled.div`
  width: 100%;
  height: calc(100vh - 80px);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  > h1 {
    margin: 0;
    color: #fff;
    font-family: Oswald;
    font-size: 40px;

    margin-bottom: 40px;

    padding: 25px;

    background-color: rgba(102, 102, 204, 0.9);
  }

  @media (max-width: 600px) {
    height: auto;
    margin: 140px 0px 0 0;
    > h1 {
      position: absolute;
      top: 130px;
      font-size: 25px !important ;
      margin-bottom: 0px;
    }
  }
`;

export const Box = styled.div`
  width: 100%;
  max-width: 900px;
  height: 400px;

  border: 10px solid #fff;

  padding: 50px;
  background-color: #6666cc;

  @media (max-width: 600px) {
    position: relative;
    top: -25px;
    border: 5px solid #fff;
    padding: 18px;
    height: auto;
  }
`;
export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  padding: 30px;

  background-color: #fff2e9;
  color: #3c3c3c;

  > h2 {
    font-size: 44px;
    font-weight: 700;
    text-align: center;

    margin: 0;
  }

  @media (max-width: 600px) {
    > h2 {
      font-size: 20px;
      margin-bottom: 5px;
    }
    height: auto;
  }
`;

export const WrapperText = styled.div`
  max-width: 800px;

  > ul {
    list-style: none;
  }

  > ul > li > h4 > span {
    color: #6666cc;
    font-weight: 700;
  }

  > ul > li > h4 {
    font-family: Oswald;
  }

  > h1 {
    font-family: Oswald;
  }

  > a > img {
    width: 30px;
    height: 30px;
    float: right;
  }

  hr {
    width: inherit;
    display: inline-block;
  }
  @media (max-width: 600px) {
    font-size: 20px;
    > h1 {
      margin-bottom: 0;
    }
    > img {
      margin: 0px 4% 0px 96%;
    }
  }
`;

export const BoxImage = styled.div`
  width: 100%;
  max-width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto;

  background-color: #e6e6e6;

  > img {
    width: 100%;
    max-width: 900px;
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 515px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 33px 0;

  font-size: 25px;
  font-weight: 700;
  color: #3c3c3c;
  outline: transparent;

  transition: 0.2s;

  background-color: #eada18;

  text-transform: uppercase;

  border-radius: 30px;

  :hover {
    background-color: #6666cc;
    color: #fff;
  }

  &.center {
    margin: 40px auto;
  }

  @media (max-width: 600px) {
    font-size: 20px;
    &.last {
      width: 310px;
    }
    &.first {
      padding: 20px;
      margin-top: 10px;
    }
  }
`;

export const Footer = styled.div`
  background-color: #171715;
  color: #fff;

  padding: 14px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  height: 36px;
  width: auto;
`;

export const WrapperIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 15px 0;
`;

export const Icons = styled.img`
  margin-right: 20px;

  width: 20px;
  height: 20px;
`;

export const WrapperContent = styled.div`
  width: 100%;
`;

export const LogoFooter = styled.img``;

export const TitleReservation = styled.p`
  text-align: center;
`;

export const ButtonFooter = styled.div`
  width: 100%;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`;
export const Title = styled.div`
  text-transform: uppercase;

  text-decoration: none;
  color: #fff;
`;
export const Icon = styled.div``;

export const MobileFooter = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: unset;
  }
`;

export const DesktopFooter = styled.div`
  display: unset;
  padding: 50px 0%;
  background-color: #171715;
  color: #fff;

  @media (max-width: 600px) {
    display: none;
  }

  display: flex;
  flex-direction: column;
`;
export const ContainerDesktopFooter = styled.div`
  display: flex;

  padding: 10px 30px;
`;
export const BoxDesktopFooter = styled.div`
  display: flex;
  flex-direction: column;

  width: 33%;
`;
export const LogoDesktopFooter = styled.div`
  margin-bottom: 15px;

  > img {
    height: 36px;
    width: auto;
  }
`;
export const ContentDesktopFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  > ul > li {
    list-style: none;
    text-transform: uppercase;
    line-height: 2.5;
  }
`;
export const IconsDesktopFooter = styled.div`
  margin: 15px 0;
`;

export const LabelDesktopFooter = styled.div`
  text-align: center;
`;
