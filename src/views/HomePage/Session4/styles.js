import styled from "styled-components";

export const Container = styled.div`
  background-color: #6666cc;
  height: 300px;

  @media (max-width: 992px) {
    height: auto;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  padding: 30px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
export const BoxContent = styled.div`
  width: 100%;
`;
export const BoxTitle = styled.h1`
  height: 60px;

  text-transform: initial;
  font-size: 35px;
  font-weight: 700;

  color: #fff;

  margin-bottom: 60px;

  @media (max-width: 992px) {
    height: auto;
    margin: 0 0 30px 0;

    font-size: 20px;
  }
`;
export const BoxText = styled.p`
  color: #fff;

  font-size: 18px;
`;
