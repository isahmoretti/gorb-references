import styled from "styled-components";

import { ArrowBack, Add, Remove } from "styled-icons/material";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 1100px;
  height: 650px;

  @media only screen and (max-width: 600px) {
    width: 100%;
    position: initial;
  }
`;

export const Back = styled(ArrowBack)`
  width: 50px;
  height: 50px;

  position: absolute;
  cursor: pointer;

  top: 0;
  left: 0;

  transition: color 0.3s;

  :hover {
    color: #6666cc;
  }

  /* @media only screen and (max-width: 600px) {
    top: -30px;
  } */
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  width: 1000px;
  height: 570px;

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
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
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

export const AddIcon = styled(Add)`
  width: 50px;
  height: 50px;

  color: #eada18;
`;

export const RemoveIcon = styled(Remove)`
  width: 50px;
  height: 50px;

  color: #6666cc;
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

  color: #6666cc;
`;

export const Title = styled.div`
  padding-left: 20px;

  > p {
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
    margin: 0;
    color: #6666cc;
  }

  > span {
    font-style: italic;
  }
`;
