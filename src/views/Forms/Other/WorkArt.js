import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";

// utils
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/outros/referencia-abnt-obra-de-arte.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  specification: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Obra de Arte: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Referência de obra de arte (pintura, escultura) no padrão ABNT NBR 6023:2018. Ferramenta gratuita.");
  const { author, title, year, specification } = values;

  return (
    <span>
      <>{formatAuthorName(author)} </>
      <b>{title}. </b>
      <>{year}. </>
      <>{specification}. </>
    </span>
  );
};

const WorkArt = ({ back }) => {
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
      citation: generateCitationWithoutAuthor(values.author, values.year),
      citationWithAuthor: generateCitationWithAuthor(
        values.author,
        values.year
      ),
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
            author: "",
            title: "",
            year: "",
            specification: "",
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
                    Obra de arte
                  </p>
                  <span></span>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="author"
                        type="text"
                        label="Autor"
                        placeholder="Ex: Candido Portinari"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.author}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="title"
                        type="text"
                        label="Título"
                        placeholder="Ex: Retirantes"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="year"
                        type="text"
                        label="Ano"
                        placeholder="Ex: 1944"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={10}>
                      <Input
                        name="specification"
                        type="text"
                        label="Especificação do suporte"
                        placeholder="Ex: 1 original de arte, óleo sobre tela190 x 180cm"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specification}
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
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência de obra de arte ABNT</h1>

        <p>
          A obra de arte, segundo a NBR 6023 da ABNT, é um documento
          iconográfico. A norma apresenta os elementos essenciais e exemplos no
          tópico 7.15.
        </p>

        <p>
          Quando não houver um título definido para a obra de arte, o autor do
          trabalho <b>não pode criar uma denominação</b> que identifique o
          conteúdo do documento, como ocorre com cartazes, fotografias, desenhos
          técnicos, transparências entre outros documentos.
        </p>

        <p>
          A recomendação da ABNT é incluir a expressão sem título, entre
          colchetes: <b>[Sem título]</b>.
        </p>

        <h2>Elementos</h2>

        <p>Os elementos essenciais são:</p>

        <ul style={{ marginLeft: 15 }}>
          <li> Autor: SOBRENOME e nome do criador da obra; </li>
          <li> Título: título da obra em destaque; </li>
          <li> Data: ano de criação da obra; </li>
          <li> Especificação do suporte: descrição física do documento. </li>
        </ul>

        <p>
          A parte final da referência inclui as especificações, ou seja, uma
          descrição sobre dimensões e tipo de pintura. Além disso, é
          interessante incluir dados sobre disponibilidade, mencionando se a
          obra integra uma coleção particular ou está disponível em um
          museu/galeria.
        </p>

        <h2>Estrutura</h2>

        <p>
          <mark>
            SOBRENOME, Nome do autor. <b>Título da obra.</b> Data. Especificação
            do suporte. Disponibilidade.
          </mark>
        </p>

        <h2>Mais exemplos</h2>

        <img loading="lazy" src={Img} alt="trabalho-arte" width="100%" />

        <p>
          <mark>
            MATTOS, M. D. <b>Paisagem-Quatro Barras.</b> 1987. 1 original de
            arte, óleo sobre tela, 40 x 50 cm. Coleção particular.
          </mark>
        </p>

        <p>
          <mark>
            FERRARI, León. <b>[Sem título]</b>. 1990. Pintura, pastel e tinta
            acrílica sobre madeira, 160 × 220 × 5 cm.
          </mark>
        </p>

        <h2>Citação de obra de arte</h2>

        <p>
          A ABNT adota o sistema autor-data para normalizar citações em
          trabalhos acadêmicos. Portanto, ao mencionar uma obra de arte no
          texto, é necessário citar o sobrenome do autor e o ano.
        </p>

        <p>
          No final do texto, o sobrenome do autor é colocado entre parênteses e
          com letras maiúsculas. Por outro lado, quando faz parte do texto, o
          sobrenome aparece sem parênteses e apenas com a letra inicial
          maiúscula.
        </p>

        <p>Exemplos:</p>

        <p>
          <mark>[...] (PORTINARI , 1944)</mark>
        </p>

        <p>
          <mark>Portinari (1944) [...]</mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default WorkArt;
