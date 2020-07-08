import styled from "styled-components";

import { ArrowBack } from "styled-icons/material";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 950px;
  height: 545px;
`;

export const Back = styled(ArrowBack)`
  width: 50px;
  height: 50px;

  position: absolute;
  cursor: pointer;

  top: 0;
  left: 0;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 800px;
  height: 500px;

  padding: 20px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.end {
    justify-content: flex-end;
  }
`;

export const Content = styled.div``;
export const Footer = styled.div``;
