import styled from "styled-components";

import { ArrowBack } from "styled-icons/material";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 950px;
  height: 545px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const Back = styled(ArrowBack)`
  width: 50px;
  height: 50px;

  position: absolute;
  cursor: pointer;

  top: 0;
  left: 0;

  @media only screen and (max-width: 600px) {
    top: -30px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 800px;
  height: 500px;

  padding: 20px;

  overflow-y: scroll;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(118, 118, 118);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgb(195, 195, 195));
  }
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
