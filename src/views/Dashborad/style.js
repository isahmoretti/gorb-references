import styled from "styled-components";

export const WrapperEditor = styled.div`
  height: 500px;
  width: 100%;

  border: 1px solid #000;

  padding: 15px;
`;

export const WrapperEntity = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;
`;
export const Entity = styled.div`
  width: 175px;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  margin: 10px;

  background-color: #6666cc;
  color: #fff;

  cursor: pointer;
  text-align: center;

  transition: 0.2s;

  box-shadow: 2px 2px 2px 1px #eada18;

  :hover {
    background-color: #eada18;
    color: #000;

    box-shadow: 2px 2px 2px 1px #6666cc;
  }
`;
