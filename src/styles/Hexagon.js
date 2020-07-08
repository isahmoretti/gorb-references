import styled from "styled-components";

import { ArrowBack } from "styled-icons/material";

export const Conatiner = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  position: relative;

  width: 950px;
  height: 545px;

  @media only screen and (max-width: 600px) {
    height: 100vh;
  }
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: 100%;
  height: 182px;

  &.bt {
    justify-content: space-around;
  }

  @media only screen and (max-width: 600px) {
    :nth-child(1) {
      margin-top: 20px;
    }

    :nth-child(2) {
      flex-direction: column;
      height: auto;
    }
  }
`;

export const Back = styled(ArrowBack)`
  width: 50px;
  height: 50px;

  position: absolute;
  cursor: pointer;

  top: 0;
  left: 0;
`;

export const Title = styled.span`
  width: 270px;

  text-align: center;
`;

export const Hexagon = styled.div`
  position: relative;

  width: 200px;
  height: 120px;
  background: red;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-align: center;

  margin: 80px 45px;

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
    width: 140px;
    height: 78px;

    margin: 80px 20px;

    ::before {
      border-left: 70px solid transparent;
      border-right: 70px solid transparent;
      border-bottom: 57px solid red;
    }

    ::after {
      border-left: 70px solid transparent;
      border-right: 70px solid transparent;
      border-top: 58px solid red;
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
`;
