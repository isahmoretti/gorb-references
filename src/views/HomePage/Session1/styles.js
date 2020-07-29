import styled from "styled-components";

export const Container = styled.div`
  background-color: #e6e6e6;
  height: 400px;

  padding: 30px;

  @media (max-width: 992px) {
    height: auto;
  }
`;

export const Wrapper = styled.div`
  display: flex;

  height: 100%;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
export const Box = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-direction: column;

  > h1 {
    color: #6666cc;
    text-transform: uppercase;
    font-size: 120px;

    margin: 0;
  }

  > p {
    color: #000;
    text-transform: uppercase;
    text-align: center;

    font-size: 30px;
    font-weight: bold;

    line-height: inherit;
  }

  > button {
    width: 100%;

    padding: 10px;

    background-color: #eada18;
    border-color: transparent;
    border-radius: 50px;
    outline: none;

    color: #6666cc;
    font-weight: 800;
    font-size: 25px;
    text-transform: uppercase;

    transition: background-color 0.3s, color 0.3s;
  }

  > button:hover {
    background-color: #6666cc;
    color: #fff;
  }

  @media (max-width: 992px) {
    > h1 {
      font-size: 80px;
    }
    > p {
      font-size: 20px;
    }
    > button {
      font-size: 15px;
    }
  }
`;
