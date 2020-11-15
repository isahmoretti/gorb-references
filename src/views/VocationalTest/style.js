import styled from "styled-components";
import backgroundIcons from "../../assets/images/VocationalTest/Desktop/Answers/desktop-perguntas.png";

export const MainBackground = styled.div`
  background: url(${backgroundIcons});
  background-size: auto;
  height: auto;

  @media only screen and (max-width: 600px) {
    background-size: contain;
    background-repeat: round;
  }
`;
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
    color: #3c3c3c;
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
  color: #3c3c3c;
  font-weight: bold;
  font-size: 16px;
  text-align: center;

  cursor: pointer;
  transition: opacity 0.2s;
    margin-bottom: 20px;
  :hover {
    opacity: 0.6;
  }
  @media (max-width: 600px) {
    height: 78px;
    width: 90px;
  margin-bottom: 0px;
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
    margin: 5px 0px;
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
  font-family: Roboto, sans-serif;

  :hover {
    opacity: 0.6;
  }
  @media (max-width: 600px) {
    height: 78px;
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
    margin-bottom: -42px;
  }
`;

export const ImageMobile = styled.img`
  position: absolute;
  width: 100%;
  display: none;

  @media (max-width: 600px) {
    display: block;
    margin-top: -37px;
    max-height: 370px;
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
  text-align: center;
  font-weight: bold;
  color: #333;
  z-index: 1;
  font-size: 24px;
  width: 720px;

  @media (max-width: 600px) {
    width: 280px;
    font-size: 21px;
    margin-top: -37px;
  }
`;
