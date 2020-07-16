import styled from "styled-components";

import { ArrowBack, Add, Remove } from "styled-icons/material";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 1100px;
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

  position: relative;

  width: 1000px;
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
    background-color: rgb(195, 195, 195);
  }
`;

export const Actions = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
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

export const AddIcon = styled(Add)`
  width: 50px;
  height: 50px;

  color: green;
`;

export const RemoveIcon = styled(Remove)`
  width: 50px;
  height: 50px;

  color: red;
`;

export const FieldArrayContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ErrorText = styled.span`
  font-size: 12px;

  color: red;
`;
