import styled from "styled-components";
import imgHeaderDesktop from "../../assets/images/VocationalTest/Desktop/Answers/desktop_cabeçalho_perguntas.png";
import imgHeaderMobile from "../../assets/images/topo_mobile_teste_600x100.png";
import imgBackground from "../../assets/images/VocationalTest/Desktop/Answers/desktop-perguntas.png";
import headerForMobile from "../../assets/images/header-paginas-de-questoes-telas-menores.png";
import backgroundIcons from "../../assets/images/VocationalTest/Desktop/Answers/desktop-perguntas.png";

export const Progress = styled.div`
  height: 23px;
  background-color: #eada18;
  width: ${({ width }) => width}%;
`;

export const Header = styled.div`
  padding: 10px;
  width: 100%;
  height: 188px;
  position: relative;

  background-color: #6666cc;

  display: flex;

  @media only screen and (max-width: 600px) {
    height: 100px;
  } ;
`;

export const Background = styled.div`
  background-color: #fff;
  width: 90%;
  height: 23px;
  font-weight: bold;
  position: absolute;
  left: 5%;
  bottom: 13px;
`;
export const Box = styled.div`
  /* background: url(${backgroundIcons});
  background-color: #dcdcdc; */

  .container {
  }

  #image {
    width: 100%;
    min-height: 88px;
    height: 107px;
  }

  #text {
    position: relative;
    left: 15%;
    width: 70%;
    top: 19px;
    text-align: center;
    min-height: 88px;
    height: auto;
    font-family: "Source Han Sans JP Mediu";
    font-size: 24px;
    font-weight: bold;
    color: #333;
    display: grid;
    align-content: center;
  }
`;

export const Alternatives = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Hexagon = styled.img`
  position: relative;
  /* margin-top: 150px; */
  width: 162px;
  height: 140px;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 16px;
  text-align: center;

  cursor: pointer;
  transition: opacity 0.2s;

  :hover {
    opacity: 0.6;
  }
  @media (max-width: 600px) {
    height: 90px;
    width: 90px;
  }
`;

export const Option = styled.div`
  margin: auto;
  display: block;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  margin: 15px 0;

  @media (max-width: 600px) {
    flex-direction: row;
    margin: 10px;
  }
`;

export const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 162px;
  height: 133px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  font-weight: bold;
  font-family: "Source Han Sans JP Mediu";

  :hover {
    opacity: 0.6;
  }
  @media (max-width: 600px) {
    height: 90px;
    width: 250px;
  }
`;

export const ContainerQuestion = styled.div`
  position: relative;

  width: 100%;
  height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    height: 150px;
  }
`;

export const ImageMobile = styled.img`
  position: absolute;
  width: 100%;
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

export const Image = styled.img`
  position: absolute;
  width: 100%;
  display: block;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const TitleQuestion = styled.div`
  width: 280px;
  text-align: center;
  z-index: 1;
  font-size: 19px;

  @media (min-width: 600px) {
    width: 720px;
    font-size: 24px;
  }
`;
