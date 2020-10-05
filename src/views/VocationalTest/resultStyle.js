import styled from "styled-components";
import hexagonImage from "../../assets/images/VocationalTest/Desktop/Hexagono.png";

export const Background = styled.div`
  background: url(${({ image }) => image});
  background-size: 142px;
  background-repeat: space;
  background-color: ${({ color }) => color};
  padding-top: 40px;
  height: 938px;
`;

export const Hexagon = styled.div`
  padding-top: 90px;
  height: 600px;
  width: 678px;
  background: url(${hexagonImage});
  background-size: contain;
  background-repeat: no-repeat;
  margin: auto;
  top: 150px;
  .text {
    display: block;
    text-align: center;
    margin: auto;
    width: inherit;
    padding-left: 120px;
    padding-right: 120px;
    top: 100px;
    > h1 {
      font-family: "Pathway Gothic";
      font-size: 37pt;
      color: #3c3c3c;
      margin: 0;
    }
    p {
      padding: 30px;
      font-family: "Source Han Sans JP Medium";
      color: #3c3c3c;
      font-weight: 38pt;
      line-height: 30pt;
    }
    i {
      height: min-content;
    }
  }
`;

export const Phrase = styled.div`
  display: flex;
  width: 430px;
  font-family: "Pathway Gothic";
  color: #3c3c3c;
  font-size: 16px;

  > div {
    width: 170px;
    height: auto;
    background: url(${({ image }) => image});
    background-size: contain;
    background-repeat: no-repeat;
  }
  > span {
    font-family: "Montserrat Classic";
    font-weight: 14pt;
  }
`;

export const Courses = styled.div`
  width: 80vw;
  margin: auto;
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fff;
  > h1 {
    width: 100%;
    text-align: center;
  }
`;
export const Course = styled.div`
  width: 134px;
  height: 148px;
  background-color: blue;
  position: relative;
  margin: 50px;
  background: url(${({ image }) => image});
  background-size: contain;
  background-repeat: repeat;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
  > div {
    position: absolute;
    bottom: -49px;
    text-align: center;
    font-weight: bolder;
    width: 100%;
  }
`;
