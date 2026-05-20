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
import { formatAuthorName } from "../../../utils/formatAuthorName";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

import Img from "../../../assets/images/explicativos/audiolivro/referencia-abnt-fotografia.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";
import RelatedLinks from "../../../components/RelatedLinks";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  date: Yup.string().required("Obrigatório"),
  specification: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Fotografia: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Referência de fotografia no padrão ABNT NBR 6023:2018. Preencha os campos e copie a referência completa.");
  const {
    author,
    title,
    date,
    specification,
    elements,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {`${formatAuthorName(author)} `}
      <b>{`${title}. `}</b>
      {`${formatDate(date)}. `}
      {`${specification}. `}
      {elements && `${elements}. `}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const Photo = ({
  back }) => {
  document.title = "Fotografia: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Referência de fotografia no padrão ABNT NBR 6023:2018. Preencha os campos e copie a referência completa.");
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
        <Back
          onClick={() => history.push("/documentos-audiovisuais")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            author: "",
            title: "",
            date: "",
            specification: "",
            elements: "",
            online: "",
            url: "",
            accessedAt: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form style={{ maxWidth: 830 }} onSubmit={props.handleSubmit}>
              <Actions>
                <Title>
                  <p
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Fotografia
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
                        placeholder="Ex: Chris Frank"
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
                        placeholder="Ex: Big and Bigger"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="date"
                        type="date"
                        label="Data de publicação"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.date}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="specification"
                        type="text"
                        label="Especificação do suporte"
                        placeholder="Ex: 1 fotografia"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specification}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="elements"
                        type="text"
                        label="Elementos complementares"
                        placeholder="Ex: 1024 × 683 pixels"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.elements}
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
                        name="url"
                        label="Disponível em"
                        type="text"
                        placeholder="Ex: https://pixabay.com/en/lungs-heartanatomy-cross-section-2183442/"
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
        <h1 style={{ textAlign: "left" }}>
          Referência bibliográfica de fotografia ABNT
        </h1>
        <p>
          A fotografia é um documento iconográfico e sua referência
          bibliográfica nos trabalhos acadêmicos segue as normas da ABNT. As
          regras valem não só para fotos reveladas, mas também para imagens
          digitais.
        </p>

        <h2>Elementos essenciais</h2>

        <p>
          De acordo com a NBR 6023: 2018, os elementos essenciais para
          referenciar fotografia são:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            <b> Autor: </b> Nome do fotógrafo;
          </li>
          <li>
            {" "}
            <b> Título: </b> Quando não existir título, criar um e colocá-lo
            entre colchetes;{" "}
          </li>
          <li>
            {" "}
            <b> Ano: </b> data em que a imagem foi registrada;{" "}
          </li>
          <li>
            <b> Suporte: </b> descrição do suporte;{" "}
          </li>
        </ul>
        <p>
          Elementos complementares não são obrigatórios, mas servem para
          melhorar a identificação do documento consultado. Informações sobre
          dimensões (largura x altura pixels ou cm) e cor (colorido ou preto e
          branco) são exemplos.
        </p>
        <h2>E quando a fotografia for online?</h2>
        <p>
          Quando uma fotografia é consultada pela internet, é necessário
          especificar a URL, precedida da expressão "Disponível em". Em seguida,
          a data de acesso deve ser mencionada, precedida de "Acesso em".
        </p>
        <h2>Formato básico</h2>
        <p>
          <mark>
            SOBRENOME, Nome do fotógrafo. <b>Título da fotografia.</b> Data de
            publicação. Especificação do suporte. Elementos complementares.
            Disponível em: URL. Acesso em: dia, mês e ano.
          </mark>
        </p>
        <h2>Exemplos aplicando o formato</h2>
        <img loading="lazy" src={Img} alt="Exemplo de referência de fotografia ABNT" width="100%" />
        <p>
          <mark>
            MACMILLAN, Iain. <b>Os Beatles atravessando a Abbey Road.</b> 1969.
            1 fotografia . 31 cm X 31 cm.
          </mark>
        </p>

        <p>
          <mark>
            SASSE, Arthur. <b>Einstein mostrando a língua.</b> 1951. 1
            fotografia.
          </mark>
        </p>

        <p>
          <mark>
            FRANK, Chris. <b>Big and Bigger.</b> 2017. 1 fotografia. 1024 × 683
            pixels. Disponível em:
            https://www.flickr.com/photos/chrisnaton/34880385211/. Acesso em: 8
            ago. 2020.
          </mark>
        </p>

        <p>
          <mark>
            STRUCK, Mathieu. <b>Carnaval de Curitiba.</b> 22 mar. 2020. 1
            fotografia . Disponível em:
            https://www.instagram.com/p/B84-YG0lw4Q/. Acesso em: 30 out. 2020.
          </mark>
        </p>

        <p>
          <mark>
            STRUCK, Mathieu Bertrand. <b>Caranguejo aratu</b>: goniopsis
            cruentata. 3 abr. 2010. 1 fotografia. 1024 x 683 pixels. .
            Disponível em:
            https://www.flickr.com/photos/mathieustruck/4573207989/. Acesso em:
            30 out. 2020.
          </mark>
        </p>

        <p>
          As normas usadas para referenciar fotografia também servem para
          gravuras, cartazes, transparências, postais, ilustrações e desenhos
          técnicos. Você pode usar o mesmo formulário para gerar as referências
          destes documentos, basta especificar o suporte.
        </p>
      </div>
      <RelatedLinks />

      <Footer />
    </>
  );
};

export default Photo;
