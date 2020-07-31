import styled from "styled-components";

export const Container = styled.div`
  height: 700px;

  padding: 30px 0;

  @media (max-width: 992px) {
    height: auto;
  }
`;

export const Title = styled.h1`
  text-align: center;

  @media (max-width: 992px) {
    font-size: 23px;
  }
`;

export const Wrapper = styled.div`
  display: flex;

  margin-top: 100px;

  @media (max-width: 992px) {
    flex-direction: column;

    margin-top: 20px;
  }
`;
export const Box = styled.div`
  width: 100%;

  :nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > h2,
  p {
    color: #000;
  }
`;

export const BoxContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin: 15px 0;
`;
