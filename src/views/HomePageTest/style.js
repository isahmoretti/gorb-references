import styled from "styled-components";

export const Container = styled.div``;
export const Nav = styled.nav`
  height: 40px;
  width: 100%;

  background-color: #000;

  color: #fff;
`;
export const WrapperNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 40px;
`;
export const HambugerIcon = styled.div``;
export const Logo = styled.div``;
export const SearchIcon = styled.div``;

export const WrapperHome = styled.div`
  background-color: #6666cc;
`;

export const ContentHome = styled.div`
  width: 100%;
  height: calc(100vh - 40px);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > h1 {
    margin: 0;
    color: #fff;

    margin-bottom: 40px;
  }
`;

export const Box = styled.div`
  width: 100%;
  max-width: 900px;
  height: 400px;

  border: 10px solid #fff;

  padding: 50px;
`;
export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  padding: 30px;

  background-color: #fff;
  color: #444;

  > h2 {
    font-size: 44px;
    font-weight: 700;
    text-align: center;

    margin: 0;
  }
`;

export const WrapperText = styled.div`
  > ul {
    list-style: none;
  }

  > ul > li > h4 > span {
    color: #6666cc;
    font-weight: 700;
  }
`;

export const BoxImage = styled.div`
  width: 100%;
  max-width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto;

  background-color: #e6e6e6;
`;

export const Button = styled.button`
  width: 100%;
  max-width: 515px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 25px;
  font-weight: 700;
  color: #444;
  outline: transparent;

  transition: 0.2s;

  background-color: #eada18;

  text-transform: uppercase;

  border-radius: 30px;

  :hover {
    background-color: #6666cc;
    color: #fff;
  }

  &.center {
    margin: 40px auto;
  }
`;
