import styled from "styled-components";

export const Container = styled.div`
  background-color: #6666cc;
  height: 450px;

  padding: 30px 0;

  @media (max-width: 992px) {
    height: auto;
  }
`;
export const Wrapper = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const Box = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #fff;

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

  > img {
    height: 388px;
  }

  @media (max-width: 992px) {
    width: 100%;
  }
`;
