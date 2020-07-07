import React from "react";

import { Container, Card, Row, Content, Footer } from "./style";

import InputWrapper from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";

const Dashboard = () => {
  return (
    <Container>
      <Card>
        <Content>
          <Row>
            <InputWrapper label="Autor" type="text" />
            <InputWrapper label="Autor" type="number" />
            <InputWrapper label="Autor" type="text" />
          </Row>
          <Row>
            <InputWrapper label="Autor" type="text" />
            <InputWrapper label="Autor" type="text" />
            <InputWrapper label="Autor" type="text" />
          </Row>
          <Row>
            <InputWrapper label="Autor" type="text" />
            <InputWrapper label="Autor" type="text" />
          </Row>
        </Content>
        <Footer>
          <Row className="end">
            <Button variant="outlined" color="primary">
              {" "}
              Limpar campos{" "}
            </Button>
            <Button color="primary"> Gerar referencia </Button>
          </Row>
        </Footer>
      </Card>
    </Container>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
