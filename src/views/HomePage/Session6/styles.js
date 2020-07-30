import styled from "styled-components";

export const Container = styled.div`
  > h1 {
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-top: 100px;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-bottom: 60px;

  width: 350px;
  height: 200px;

  > img {
    width: 350px;
    height: 180px;
  }

  > span {
    font-size: 12px;
  }

  @media (max-width: 992px) {
    justify-content: center;
    align-items: center;

    width: 100%;

    > img {
      width: 300px;
    }
  }
`;
