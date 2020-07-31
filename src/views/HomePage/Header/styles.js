import styled from "styled-components";

export const Container = styled.div`
  background-color: #eada18;

  height: 80px;
`;
export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Box = styled.div``;

export const BoxLogo = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }

  > h1 {
    margin: 0;
    color: #6666cc;
    font-size: 34px;
  }

  > span {
    text-transform: uppercase;
    font-size: 10px;
  }
`;
