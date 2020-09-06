import styled from "styled-components";

export const Container = styled.div`
  display: grid;

  grid-template-columns: 300px auto;
  grid-template-rows: 80px auto;

  grid-template-areas:
    "NV NV"
    "SD CT";

  height: 100vh;
`;

export const Nav = styled.div`
  grid-area: NV;
`;
export const Sidebar = styled.div`
  grid-area: SD;

  background-color: #e6e6e6;

  display: flex;
  flex-direction: column;

  height: calc(100vh - 80px);

  overflow-y: auto;

  padding: 0 30px;

  > ul {
    list-style: none;
  }

  > ul > li {
    width: 100%;
    text-align: center;
    cursor: pointer;

    padding: 15px;

    transition: 0.2s;
  }

  > ul > li:hover {
    background-color: #fff;
  }
`;

export const Logo = styled.div`
  height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  grid-area: CT;

  height: calc(100vh - 80px);

  overflow-y: auto;

  padding: 30px;
`;

export const WrapperEditor = styled.div`
  height: 500px;
  width: 100%;

  border: 1px solid #000;

  padding: 15px;
`;
