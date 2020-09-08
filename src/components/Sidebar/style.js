import styled from "styled-components";

export const WrapperSidebar = styled.div`
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

  cursor: pointer;
`;
