import styled from "styled-components";
import hexagonImage from "../../assets/images/VocationalTest/Desktop/Hexagono.png";

export const Background = styled.div`
  background: url(${({ image }) => image});
  background-size: 142px;
  background-repeat: space;
  background-color: ${({ color }) => color};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-bottom: 10px;
`;

export const Hexagon = styled.div`
  height: 600px;
  width: 678px;
  background: url(${hexagonImage});
  background-size: contain;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text {
    text-align: center;

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

  @media (max-width: 600px) {
    width: 350px;
    height: 310px;

    margin-top: 8px;

    justify-content: flex-start;

    .text {
      h1 {
        font-size: 14pt;
        font-weight: bold;
      }

      p {
        padding: 0;
        margin: 0;
        line-height: unset;
        font-size: 16px;
      }

      i {
        font-size: 10px;
      }
    }
  }
`;

export const Phrase = styled.div`
  display: flex;
  width: 100%;
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

  @media (max-width: 600px) {
    > div {
      width: 80px;
    }
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
  background-repeat: no-repeat;
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

export const WrapperContent = styled.div`
  width: 415px;

  @media (max-width: 600px) {
    width: 225px;
  }
`;

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
  width: 200px;
  height: 50px;
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

export const WrapperContentFooter = styled.div`
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
`;
export const Icon = styled.div``;
