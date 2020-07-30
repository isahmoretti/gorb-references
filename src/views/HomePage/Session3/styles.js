import styled from "styled-components";

export const Container = styled.div`
  background-color: #e6e6e6;

  height: auto;

  padding: 30px;
`;
export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;
export const Box = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  flex-direction: column;

  > li {
    list-style: none;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 15px 0;
  }

  > li > span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;

    background-color: #eada18;
    color: #000;

    border-radius: 50%;

    flex-shrink: 0;

    font-weight: bold;
  }

  > li > p {
    margin: 0 0 0 15px;
    font-size: 18px;
  }

  @media (max-width: 992px) {
    > h1 {
      font-size: 23px;
      text-align: center;
    }
  }
`;
