import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;

export const ErrorText = styled.span`
  font-size: 12px;

  color: #6666cc;
`;

export const IconHelp = styled.img`
  width: 24px;
  height: 24px;
`;

export const ButtonHelp = styled.button`
  background: transparent;

  outline: none;
  border: none;
`;

export const ContainerHelp = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
`;
