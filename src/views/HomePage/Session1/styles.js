import styled from "styled-components";

export const Container = styled.div`
  background-color: #e6e6e6;
  height: 600px;

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
    align-items: center;
  }
`;
export const Box = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  :nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > img {
    width: 100%;
    height: 450px;
  }

  > h1 {
    width: 100%;

    color: #6666cc;
    text-transform: uppercase;
    text-align: justify;

    margin: 0;
  }

  > p {
    color: #000;
    text-align: justify;
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

    cursor: pointer;

    transition: background-color 0.3s, color 0.3s;
  }

  > button:hover {
    background-color: #6666cc;
    color: #fff;
  }

  @media (max-width: 992px) {
    /* > h1 {
      font-size: 80px;
    }
    > p {
      font-size: 20px;
    }
    > button {
      font-size: 15px;
    } */

    width: 100%;
  }
`;
