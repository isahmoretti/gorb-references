import React from "react";

import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

import { Container, Content } from "./StyleLogged";

const DashboardLayout = ({ children }) => {
  return (
    <Container>
      <Nav />
      <Sidebar />
      <Content> {children} </Content>
    </Container>
  );
};

export default DashboardLayout;
