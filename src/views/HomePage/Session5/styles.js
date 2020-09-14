import styled from "styled-components";

export const Container = styled.div`
  height: 500px;

  padding: 30px 0;

  @media (max-width: 992px) {
    height: auto;
  }
`;

export const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  > h1 {
    text-align: center;

    margin: 0 0 30px 0;
  }
`;

export const WrapperBoxMobile = styled.div`
  display: none;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
  }
`;

export const WrapperBox = styled.div`
  @media (max-width: 992px) {
    display: none;
  }
`;

export const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 50px;
  }

  > div > img {
    height: 200px;
  }

  > span {
    text-align: center;
  }
`;

export const BoxMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 15px 0;

  > img {
    height: 200px;
  }

  > span {
    text-align: center;
  }
`;
