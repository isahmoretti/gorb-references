import styled from "styled-components";

export const Container = styled.section`
  height: auto;
  background-color: #000;

  padding: 30px 0;
`;

export const Wrraper = styled.div`
  color: #fff;
`;
export const Logo = styled.div`
  > img {
    height: 100px;
  }
`;
export const Content = styled.div`
  display: flex;

  justify-content: space-between;

  margin: 30px 0;

  > div {
    width: 33%;
  }

  > div:first-child {
    text-align: justify;
  }

  > div:not(:first-child) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div > ul {
    list-style: none;
    text-transform: uppercase;
  }

  > div > ul > li {
    margin: 10px 0;
  }

  > div > ul > li:first-child {
    margin-top: 0;
  }

  > div > ul > li:last-child {
    margin-bottom: 0;
  }
`;
export const Box = styled.div``;
export const Rodape = styled.div`
  display: flex;
  align-items: center;

  > span {
    margin-left: 20px;
  }
`;
