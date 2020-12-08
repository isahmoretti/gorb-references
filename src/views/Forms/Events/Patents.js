import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Select from "../../../components/InputWrapper/Select";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

// styles
import {
  Container,
  Card,
  Row,
  Content,
  Back,
  AddIcon,
  RemoveIcon,
  FieldArrayContainer,
  ErrorText,
  Actions,
  Title,
} from "./style";

const SignupSchema = Yup.object().shape({
  invertors: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  type: Yup.string().required("Obrigatório"),
  typeDescription: Yup.string().required("Obrigatório"),
  patentNumber: Yup.string().required("Obrigatório"),
  depositDate: Yup.string().required("Obrigatório"),
});

const getTypeName = (type) => {
  switch (type) {
    case "depositor":
      return "Depositante";
    case "holder":
      return "Titular";
    default:
      return "";
  }
};
const generateReference = (values) => {
  const {
    invertors,
    title,
    type,
    typeDescription,
    attorney, // procurador
    patentNumber,
    depositDate,
    patentGrantDate,
    specification,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {invertors && <>{formatAuthorName(invertors)} </>}
      {title && <b>{title}. </b>}
      {type && (
        <>
          {getTypeName(type)}: {typeDescription}.{" "}
        </>
      )}
      {attorney && <>Procurador: {attorney}. </>}
      {patentNumber && <>{patentNumber}. </>}
      {depositDate && <>Depósito: {formatDate(depositDate)}. </>}
      {patentGrantDate && <>Concessão: {formatDate(patentGrantDate)}. </>}
      {specification && <>{specification}. </>}
      {url && `Disponível em: ${url}. `}
      {accessedAt && `Acesso em: ${formatDate(accessedAt)}.`}
    </span>
  );
};

const Patents = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor: generateCitationWithAuthor(
        values.invertors,
        values.depositDate
      ),
      citation: generateCitationWithoutAuthor(
        values.invertors,
        values.depositDate
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back onClick={() => history.push("/evento")} src={ArrowLeft} />

        <Formik
          initialValues={{
            invertors: [""],
            title: "",
            type: "",
            typeDescription: "",
            attorney: "", // procurador
            patentNumber: "",
            depositDate: "",
            patentGrantDate: "",
            specification: "",
            url: "",
            accessedAt: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form style={{ maxWidth: 1000 }} onSubmit={props.handleSubmit}>
              <Actions>
                <Title>
                  <p
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    PATENTES
                  </p>
                </Title>
              </Actions>
              <Card>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="invertors"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.invertors &&
                            props.values.invertors.length > 0 ? (
                              props.values.invertors.map(
                                (constructionName, index) => (
                                  <FieldArrayContainer key={index}>
                                    <div
                                      style={{
                                        display: "flex",
                                        width: "100%",
                                        marginBottom: 10,
                                      }}
                                    >
                                      <Input
                                        name={`invertors.${index}`}
                                        label={`${index + 1}º Inventor`}
                                        type="text"
                                        placeholder="Nome do inventor"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={constructionName}
                                        errors={props.errors}
                                        touched={props.touched}
                                      />
                                      {index > 0 && (
                                        <ButtonCore
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <RemoveIcon src={Minus} />
                                        </ButtonCore>
                                      )}
                                      {index ===
                                        props.values.invertors.length - 1 && (
                                        <ButtonCore
                                          type="button"
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          <AddIcon src={Plus} />
                                        </ButtonCore>
                                      )}
                                    </div>
                                    <div style={{ width: "100%" }}>
                                      <ErrorText>
                                        {props.errors &&
                                          props.errors.invertors &&
                                          props.errors.invertors[index]}
                                      </ErrorText>
                                    </div>
                                  </FieldArrayContainer>
                                )
                              )
                            ) : (
                              <ButtonCore
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Add a author
                              </ButtonCore>
                            )}
                          </div>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Título da patente"
                        placeholder="Ex: Salto com mecanismo amortecedor"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        name="title"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Select
                        type="text"
                        label="Escolher entre dois itens"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.type}
                        name="type"
                        options={[
                          { value: "depositor", name: "Depositante" },
                          { value: "holder", name: "Titular" },
                        ]}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label={getTypeName(props.values.type)}
                        placeholder="Ex: Custódio de Almeida & Cia"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.typeDescription}
                        name="typeDescription"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Procurador"
                        placeholder="Ex: Nome do procurador, se houver"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.attorney}
                        name="attorney"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Número da patente"
                        placeholder="Ex: MU 8803472-0 Y1"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.patentNumber}
                        name="patentNumber"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="date"
                        label="Data de depósito"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.depositDate}
                        name="depositDate"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="date"
                        label="Data de concessão da patente"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.patentGrantDate}
                        name="patentGrantDate"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Especificações"
                        placeholder="Ex: Int. Ci. G02B 26/10 (2009.01), G02F 1/29 (2009.01)"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specification}
                        name="specification"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        name="url"
                        label="Disponível em"
                        type="text"
                        placeholder="https://viacarreira.com/"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="accessedAt"
                        type="date"
                        label="Acesso em"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accessedAt}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Row container className="end">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={props.resetForm}
                    >
                      Limpar campos
                    </Button>
                    <Button type="submit" color="primary">
                      Gerar referência e citação
                    </Button>
                  </Row>
                </Content>
                <Modal
                  isOpen={openModal}
                  handleClose={() => setOpenModal(!openModal)}
                  text={state.references}
                  citationWithAuthor={state.citationWithAuthor}
                  citation={state.citation}
                />
              </Card>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Patents;
