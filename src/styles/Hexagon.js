import styled from "styled-components";

export const Conatiner = styled.div`
  width: 100%;
  height: calc(100vh - 80px);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
  position: relative;

  width: 1100px;
  height: 600px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const ContentText = styled.div``;

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

  @media only screen and (max-width: 600px) {
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

export const Title = styled.span`
  width: 209px;

  font-size: 20px;
  font-weight: bold;

  text-align: center;

  @media only screen and (max-width: 600px) {
    width: 117px;
    font-size: 14px;
  }
`;

export const Separator = styled.div`
  width: 3px;
  height: 50px;

  @media only screen and (max-width: 600px) {
    width: 9px;
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
  font-weight: bold;
  font-size: 16px;
  text-align: center;

  /* margin: 80px 45px; */

  cursor: pointer;
  transition: opacity 0.2s;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;

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

  @media only screen and (max-width: 600px) {
    width: 95px;
    height: 59px;

    /* margin: 80px 20px; */

    ::before {
      border-left: 49px solid transparent;
      border-right: 45px solid transparent;
      border-bottom: 36px solid red;

      top: -36px;
    }

    ::after {
      border-left: 46px solid transparent;
      border-right: 50px solid transparent;
      border-top: 36px solid red;
      bottom: -36px;
    }
  }

  :hover {
    opacity: 0.6;
  }

  &.blue {
    background: #1e90ff;
  }
  &.blue::before {
    border-bottom-color: #1e90ff;
  }
  &.blue::after {
    border-top-color: #1e90ff;
  }

  &.green {
    background: #228b22;
  }
  &.green::before {
    border-bottom-color: #228b22;
  }
  &.green::after {
    border-top-color: #228b22;
  }

  &.yellow {
    background: #daa520;
  }
  &.yellow::before {
    border-bottom-color: #daa520;
  }
  &.yellow::after {
    border-top-color: #daa520;
  }

  &.blue-dark {
    background: #191970;
  }
  &.blue-dark::before {
    border-bottom-color: #191970;
  }
  &.blue-dark::after {
    border-top-color: #191970;
  }

  &.violet {
    background: #c71585;
  }
  &.violet::before {
    border-bottom-color: #c71585;
  }
  &.violet::after {
    border-top-color: #c71585;
  }

  &.wine {
    background: #800000;
  }
  &.wine::before {
    border-bottom-color: #800000;
  }
  &.wine::after {
    border-top-color: #800000;
  }

  &.gray {
    background: #585858;
  }
  &.gray::before {
    border-bottom-color: #585858;
  }
  &.gray::after {
    border-top-color: #585858;
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
