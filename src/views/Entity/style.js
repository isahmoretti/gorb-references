import styled from "styled-components";

export const Container = styled.div``;

export const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > button {
    min-width: 140px;
    background-color: #6666cc;
    color: #fff;

    padding: 20px 15px;

    border-radius: 30px;

    outline: none;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 15px 0;
`;

export const Button = styled.button`
  min-width: 70px;

  padding: 10px 5px;
  color: #fff;

  border-radius: 30px;

  margin-left: 7px;

  &.danger {
    background-color: #d9534f;
  }
  &.warning {
    background-color: #f0ad4e;
  }
`;
