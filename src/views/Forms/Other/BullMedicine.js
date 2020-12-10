import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Select from "../../../components/InputWrapper/Select";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";

// utils
import { formatDate } from "../../../utils/formatDate";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/outros/referencia-abnt-bula-de-remedio.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Obrigatório"),
  medicineForm: Yup.string().required("Obrigatório"),
  responsible: Yup.string().required("Obrigatório"),
  manufacturer: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    name,
    medicineForm,
    responsible,
    location,
    manufacturer,
    year,
    note,
    online,
    accessedAt,
    url,
  } = values;

  return (
    <span>
      {medicineForm ? (
        <>{`${name.toUpperCase()}: ${medicineForm}. `}</>
      ) : (
        `${name.toUpperCase()}. `
      )}
      {responsible && <>Responsável técnico {responsible}. </>}
      {manufacturer ? <>{`${location}: ${manufacturer}, `}</> : `${location}, `}
      {year && <>{year}. </>}
      {note && <>{note}. </>}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const BullMedicine = ({ back }) => {
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
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back onClick={() => history.push("/outros")} src={ArrowLeft} />

        <Formik
          initialValues={{
            name: "",
            medicineForm: "",
            responsible: "",
            location: "",
            manufacturer: "",
            year: "",
            note: "",
            online: false,
            accessedAt: "",
            url: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Actions>
                <Title>
                  <p
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    BULA DE REMÉDIO
                  </p>
                  <span></span>
                </Title>
              </Actions>
              <Card>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="name"
                        type="text"
                        label="Nome do medicamento"
                        placeholder="Ex: Pantoprazol sódico sesqui-hidratado"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="medicineForm"
                        type="text"
                        label="Forma do remédio:"
                        placeholder="Ex: comprimidos"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.medicineForm}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="responsible"
                        type="text"
                        label="Responsável técnico"
                        placeholder="Ex: Alberto Jorge Garcia Guimarães"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responsible}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="location"
                        type="text"
                        label="Local"
                        placeholder="Ex: São Paulo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="manufacturer"
                        type="text"
                        label="Fabricante/Laboratório"
                        placeholder="Ex: Biosintética Farmacêutica Ltda"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.manufacturer}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="year"
                        type="text"
                        label="Ano"
                        placeholder="Ex: 2018"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="note"
                        type="text"
                        label="Nota indicativa"
                        placeholder="Ex: 1 bula de remédio. 2 p."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.note}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Select
                        name="online"
                        label="Online"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.online}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        disabled={!props.values.online}
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
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        disabled={!props.values.online}
                        name="url"
                        label="Disponível em"
                        type="text"
                        placeholder="Ex: https://biosintetica.com.br/arquivos/"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
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
                  // citationWithAuthor={state.citationWithAuthor}
                  // citation={state.citation}
                />
              </Card>
            </form>
          )}
        </Formik>
      </Container>
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência de bula de remédio (ABNT)</h1>

        <p>
          Nas áreas de ciências biológicas e saúde, é comum alguns trabalhos
          acadêmicos abordarem assuntos como composição de medicamentos e formas
          de uso. Por esse motivo, a Associação Brasileira de Normas Técnicas
          (ABNT) ensina como fazer referência bibliográfica de bula de remédio.
        </p>

        <p>
          A NBR 6023: 2018 ensina como referenciar bulas no item "documentos
          impressos". Na última parte da referência, o pesquisador deve se
          preocupar com a descrição física do material consultado.
        </p>

        <h3>Elementos</h3>

        <ul>
          <li> Nome do medicamento </li>
          <li>
            {" "}
            Forma do medicamento (pode ser comprimido, spray, pomada, solução,
            etc).{" "}
          </li>
          <li> Responsável técnico: Nome em ordem direta do responsável; </li>
          <li> Local: cidade de fabricação; </li>
          <li> Fabricante: empresa responsável pela fabricação; </li>
          <li> Ano: data de fabricação; </li>
          <li> Especificação: descrição do documento consultado. </li>
        </ul>

        <p>
          Quando se trata de bula de remédio, não se usa negrito, itálico ou
          sublinhado. O motivo disso é que a entrada da referência é feita pelo
          título, já colocado em destaque.
        </p>

        <h3>Estrutura</h3>

        <p>
          <mark>
            NOME DO MEDICAMENTO: forma do remédio. Responsável técnico. Cidade:
            Fabricante, Ano. Nota indicativa.
          </mark>
        </p>

        <img src={Img} alt="bula-remedio" width="100%" />

        <h3>Mais exemplos</h3>

        <p>
          <mark>
            RESPRIN: comprimidos. Responsável técnico Delosmar R. Bastos. São
            José dos Campos: Johnson & Johnson, 1997. 1 bula de remédio (2 p.).
          </mark>
        </p>

        <p>
          <mark>
            PROPOLA: comprimidos. São Paulo: Roche, 2012. 1 bula de remédio (3
            p.).
          </mark>
        </p>

        <h3>Bula de medicamento online</h3>

        <p>
          Quando o documento é digital, é importante que a referência contenha o
          endereço eletrônico e a data de acesso. Essas informações são
          precedidas de "Disponível em" e "Acesso em", respectivamente.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default BullMedicine;
