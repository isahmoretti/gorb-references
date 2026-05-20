import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  position: relative;
  width: 100%;
  margin-top: 50px;

  > form {
    width: 100%;
    max-width: 830px;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;

    > form {
      margin-top: 60px;
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

  :hover {
    color: #6666cc;
  }

  /* @media only screen and (max-width: 1024px) {
    top: -30px;
  } */
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  width: 100%;
  /* height: 500px; */

  padding: 20px;

  overflow-y: auto;

  @media only screen and (max-width: 1024px) {
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

  @media only screen and (max-width: 1024px) {
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

export const AddIcon = styled.img`
  width: 30px;
  height: 30px;

  color: #eada18;
`;

export const RemoveIcon = styled.img`
  width: 30px;
  height: 30px;

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
