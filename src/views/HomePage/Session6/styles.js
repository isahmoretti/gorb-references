import styled from "styled-components";

export const Container = styled.div`
  background-color: #6666cc;
  height: 250px;

  padding: 30px 0;
`;

export const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h1 {
    margin: 0 0 30px 0;
    text-align: center;
    color: #fff;
  }

  > button {
    color: #000;
    background-color: #ff0;
    padding: 20px 15px;
    border-radius: 30px;

    transition: 0.2s;
  }

  > button:hover {
    background-color: #fff;
    color: #6666cc;
    font-weight: bold;
  }
`;
