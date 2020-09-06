import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperForm = styled.div`
  width: 100%;
  max-width: 700px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid #6666cc;

  padding: 50px;

  > form {
    width: 100%;
  }
`;

export const WrapperInput = styled.div`
  margin: 30px 0;
`;
