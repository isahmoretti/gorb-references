import styled from "styled-components";

export const Container = styled.div`
  background-color: #eada18;

  height: 80px;
  width: 100%;
`;
export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 80px;

  > span {
    cursor: pointer;
  }

  > h1 {
    margin: 0;
  }
`;
