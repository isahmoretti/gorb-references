import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  height: 430px;

  padding: 30px 0;

  @media (max-width: 992px) {
    height: auto;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  > h1 {
    width: 100%;
    margin: 0;
  }

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const WrapperBox = styled.div`
  display: flex;
`;

export const Box = styled.div`
  width: 100%;
  height: 100%;

  margin-bottom: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  > ul {
    list-style: none;
    margin: 0;
  }

  > ul > li {
    margin: 15px 0;
  }

  > ul > li > span {
    color: #6666cc;
    font-weight: bold;
  }

  > img {
    height: 262px;
  }
`;
