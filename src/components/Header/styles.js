import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80px;

  background-color: #eada18;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    height: 70px;
  }

  > span {
    font-weight: bold;
    font-size: 30px;

    color: #6666cc;
  }

  @media only screen and (max-width: 600px) {
    > span {
      display: none;
    }
  }
`;
