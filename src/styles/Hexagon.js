import styled from "styled-components";

export const Conatiner = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  min-height: 400px;

  @media only screen and (max-width: 1024px) {
    min-height: 556px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
  position: relative;

  width: 100%;
  max-width: 1100px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const ContentHome = styled.div`
  position: relative;

  width: 100%;
  max-width: 1100px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    display: none;
  }
`;

export const ContentText = styled.div`
  max-width: 830px;

  margin-bottom: 120px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: 100%;
  height: 165px;

  &.mt {
    margin-left: 205px;
  }

  &.ml {
    margin-left: -205px;
  }

  @media only screen and (max-width: 1024px) {
    height: 107px;

    &.mt {
      margin-left: 99px;
    }
  }
`;

export const Back = styled.img`
  width: 50px;
  height: 50px;

  position: absolute;
  cursor: pointer;

  top: 0;
  left: 0;

  transition: color 0.3s;
`;

export const Title = styled.h1`
  width: 209px;

  font-size: 20px;
  font-weight: bold;

  text-align: center;

  @media only screen and (max-width: 1024px) {
    width: 117px;
    font-size: 14px;
  }
`;

export const Separator = styled.div`
  width: 3px;
  height: 50px;

  @media only screen and (max-width: 1024px) {
    width: 14px;
  }
`;

export const Hexagon = styled.div`
  position: relative;

  width: 200px;
  height: 107px;
  background: red;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.4;
  letter-spacing: 0.02em;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);

  cursor: pointer;
  transition: filter 0.2s ease, transform 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);

  ::before {
    content: "";
    position: absolute;
    top: -57px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 58px solid red;
  }

  ::after {
    content: "";
    position: absolute;
    bottom: -57px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-top: 58px solid red;
  }

  @media only screen and (max-width: 1024px) {
    width: 95px;
    height: 59px;

    ::before {
      border-left: 49px solid transparent;
      border-right: 47px solid transparent;
      border-bottom: 36px solid red;
      top: -35px;
    }

    ::after {
      border-left: 46px solid transparent;
      border-right: 50px solid transparent;
      border-top: 36px solid red;
      bottom: -35px;
    }

    > p {
      font-size: 10px;
      line-height: 1.3;
      padding: 0 6px;
      overflow: hidden;
      max-height: 55px;
    }
  }

  :hover {
    filter: brightness(1.15);
    transform: translateY(-4px);
  }

  &.blue {
    background: #2563eb;
  }
  &.blue::before {
    border-bottom-color: #2563eb;
  }
  &.blue::after {
    border-top-color: #2563eb;
  }

  &.green {
    background: #16a34a;
  }
  &.green::before {
    border-bottom-color: #16a34a;
  }
  &.green::after {
    border-top-color: #16a34a;
  }

  &.yellow {
    background: #d97706;
  }
  &.yellow::before {
    border-bottom-color: #d97706;
  }
  &.yellow::after {
    border-top-color: #d97706;
  }

  &.blue-dark {
    background: #3730a3;

    @media (max-width: 1024px) {
      margin-left: unset;
    }
  }
  &.blue-dark::before {
    border-bottom-color: #3730a3;
  }
  &.blue-dark::after {
    border-top-color: #3730a3;
  }

  &.blue-dark-left {
    background: #3730a3;
    margin-left: 203px;

    @media (max-width: 1024px) {
      margin-left: unset;
    }
  }
  &.blue-dark-left::before {
    border-bottom-color: #3730a3;
  }
  &.blue-dark-left::after {
    border-top-color: #3730a3;
  }

  &.violet {
    background: #9333ea;
  }
  &.violet::before {
    border-bottom-color: #9333ea;
  }
  &.violet::after {
    border-top-color: #9333ea;
  }

  &.wine {
    background: #dc2626;
  }
  &.wine::before {
    border-bottom-color: #dc2626;
  }
  &.wine::after {
    border-top-color: #dc2626;
  }

  &.gray {
    background: #475569;
  }
  &.gray::before {
    border-bottom-color: #475569;
  }
  &.gray::after {
    border-top-color: #475569;
  }
`;

export const WrapperAdvertising = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: auto;

  margin: 50px 0;
`;

export const Advertising = styled.div`
  background-color: #6e6e6e;

  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

export const IconPlus = styled.img`
  width: 50px;
  height: 50px;
`;

export const ContentMobile = styled.div`
  display: none;

  position: relative;

  width: 100%;
  max-width: 1100px;
  height: 100%;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ContentDesktop = styled.div`
  position: relative;

  width: 100%;
  max-width: 1100px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const HeaderTitle = styled.div`
  width: 100%;

  margin-bottom: 20px;
  text-align: center;
`;

export const TitleMobile = styled.h1`
  width: 100%;
  font-size: 30px;
  font-weight: bold;

  text-align: center;
`;
