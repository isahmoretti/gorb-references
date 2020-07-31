import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  height: 550px;

  padding: 30px 0;

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
    width: 100%;
  }

  > p {
    width: 100%;

    margin: 15px 0;

    font-size: 18px;
    text-align: initial;
    color: #000;
  }

  > img {
    height: 485px;
  }

  @media (max-width: 992px) {
    > h1,
    p {
      text-align: center;
    }

    > p {
      font-size: 15px;
    }

    > img {
      width: 100%;
      height: 300px;

      max-width: 400px;
    }
  }
`;
