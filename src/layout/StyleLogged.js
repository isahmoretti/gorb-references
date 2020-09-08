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

export const Content = styled.div`
  grid-area: CT;

  height: calc(100vh - 80px);

  overflow-y: auto;

  padding: 30px;
`;
