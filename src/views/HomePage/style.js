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

  > a > img {
    width: 220px;
    height: 45px;
    /* margin-top: -78px; */
  }
`;
export const HambugerIcon = styled.div``;
export const HeaderLogo = styled.div``;
export const SearchIcon = styled.div``;

export const WrapperHome = styled.div`
  background: url(${fundo});
  background-color: #6666cc;
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
    > h1 {
      font-size: 24px;
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
    padding: 25px;
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

  background-color: #fff;
  color: #444;

  > h2 {
    font-size: 44px;
    font-weight: 700;
    text-align: center;

    margin: 0;
  }

  @media (max-width: 600px) {
    > h2 {
      font-size: 33px;
    }
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
  color: #444;
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
  }
`;

export const Footer = styled.div`
  background-color: #000;
  color: #fff;

  padding: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 174px;
  height: 35px;
`;

export const WrapperIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 15px 0;
`;

export const Icons = styled.img`
  margin-left: 30px;

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
