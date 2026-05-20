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
import Img from "../../../assets/images/explicativos/outros/referencia-abnt-tridimensional.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  specification: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Documento Tridimensional: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Referência de documento tridimensional (escultura, maquete) conforme a ABNT NBR 6023:2018. Gratuito.");
  const {
    author,
    title,
    location,
    manufacturer,
    year,
    specification,
    note,
  } = values;

  return (
    <span>
      {author && <>{formatAuthorName(author)} </>}
      {title && <b>{title}. </b>}
      {manufacturer ? <>{`${location}: ${manufacturer}, `}</> : `${location}, `}
      {year && <>{year}. </>}
      {specification && <>{specification}. </>}
      {note && <>{note}. </>}
    </span>
  );
};

const ObjectThree = ({ back }) => {
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
            location: "",
            manufacturer: "",
            year: "",
            specification: "",
            note: "",
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
                    Tridimensional
                  </p>
                  <span>
                    Inclui fósseis, esqueletos, esculturas, animais empalhados,
                    maquetes, monumentos
                  </span>
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
                        placeholder="Ex: Marcel Duchamp"
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
                        placeholder="Ex: Roda de bicicleta"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="location"
                        type="text"
                        label="Local"
                        placeholder="Ex: Paris"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="manufacturer"
                        type="text"
                        label="Produtor ou fabricante"
                        placeholder="Ex: Nome do
                      fabricante, se houver"
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
                        placeholder="Ex: 1951"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="specification"
                        type="text"
                        label="Especificação do documento tridimensional"
                        placeholder="Ex: 1 escultura de com roda de bicicleta e banco de
                      madeira"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specification}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="note"
                        type="text"
                        label="Nota"
                        placeholder="Ex: Informações complementares sobre o objeto"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.note}
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
        <h1>Referência de documento tridimensional (ABNT)</h1>

        <p>
          Em determinadas áreas do conhecimento, é necessário consultar objetos
          tridimensionais para produzir um trabalho acadêmico. Nesse caso, o
          documento consultado deve ser inserido na lista de referências
          bibliográficas.
        </p>

        <h2>O que são documentos tridimensionais?</h2>

        <p>
          Na área de Artes, é muito comum consultar monumentos e esculturas. Em
          Ciências Biológicas, alguns pesquisadores verificam esqueletos,
          fósseis e até animais empalhados. Já as maquetes são frequentemente
          citadas em trabalhos de Arquitetura e Design.
        </p>

        <p>
          Fósseis, esqueletos, maquetes e outros objetos são considerados
          documentos tridimensionais na NBR 6023.
        </p>

        <h2>Elementos essenciais</h2>

        <ul style={{ marginLeft: 15 }}>
          <li> Autor: SOBRENOME e nome do criador; </li>
          <li>
            {" "}
            Título do objeto: quando o objeto não tem um nome, deve-se criar uma
            denominação e colocá-la entre colchetes;{" "}
          </li>
          <li> Cidade: local onde foi criado; </li>
          <li> Nome do produtor ou fabricante; </li>
          <li> Data: ano de criação; </li>
          <li> Especificação do documento tridimensional. </li>
        </ul>

        <p>
          A especificação é a descrição física do documento, como tipo e
          materiais usados na fabricação.
        </p>

        <p>
          Elementos complementares, quando inseridos na referência bibliográfica
          na forma de nota, melhoram a identificação do documento. Isso inclui a
          coleção que pertence o objeto ou o seu título original.
        </p>

        <h2>Estrutura</h2>

        <p>
          <mark>
            SOBRENOME, Prenome (criador, inventor, entre outros). <b>Título</b>.
            Local: produtor ou fabricante. Data. Especificação do documento
            tridimensional.
          </mark>
        </p>

        <img loading="lazy" src={Img} alt="tridimensional" width="100%" />

        <h2>Mais exemplos</h2>

        <p>
          <mark>
            TOLEDO, Amelia. <b>Campos de cor</b>. 2010. 1 escultura variável,
            tecidos coloridos. Original. Exposta na 29ª Bienal Internacional de
            Arte de São Paulo.
          </mark>
        </p>

        <p>
          <mark>
            DUCHAMP, Marcel. <b>Roda de bicicleta</b>. Paris, 1951. 1 escultura
            de com roda de bicicleta e banco de madeira.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ObjectThree;
