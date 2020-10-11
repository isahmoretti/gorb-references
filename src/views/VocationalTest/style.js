import styled from "styled-components";
import imgHeaderDesktop from "../../assets/images/VocationalTest/Desktop/Answers/desktop_cabeçalho_perguntas.png";
import imgHeaderMobile from "../../assets/images/VocationalTest/Mobile/Perguntas e respostas/mobile_cabeçalho_perguntas.png";
import imgBackground from "../../assets/images/VocationalTest/Desktop/Answers/desktop-perguntas.png";
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
  background-image: url(${imgHeaderDesktop});
  background-size: 100% 100%;

  @media only screen and (max-width: 600px) {
    background-image: url(${imgHeaderMobile});
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
  background: url(${backgroundIcons});
  background-color: #dcdcdc;

  .container {
    padding-top: 20px;
    position: relative;
  }

  #image {
    position: absolute;
    width: 100%;
    min-height: 88px;
    height: 107px;
  }

  #text {
    /* position: absolute; */
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
  @media only screen and (max-width: 800px) {
    background-image: url(${imgBackground});

    #image {
      position: absolute;
      width: 100%;
      min-height: 88px;
      height: 162px;
    }
  }
`;

export const Alternatives = styled.div`
  margin: auto;
  display: flex;

  @media only screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

export const Hexagon = styled.img`
  position: relative;
  margin-top: 150px;
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
`;

export const Option = styled.div`
  margin: auto;
  display: block;
`;

export const Frame = styled.div`
  margin-top: 70px;
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
`;
