import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Select from "../../../components/InputWrapper/Select";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";
import Img from "../../../assets/images/change/Slides.jpg";

// styles
import {
  Container,
  Card,
  Row,
  Content,
  Back,
  Actions,
  Title,
  FieldArrayContainer,
  AddIcon,
  RemoveIcon,
  ErrorText,
} from "./style";
import RelatedLinks from "../../../components/RelatedLinks";

const SignupSchema = Yup.object().shape({
  authors: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  type: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Apresentação de Slides: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Monte referências de apresentações de slides conforme a ABNT NBR 6023:2018. Ferramenta gratuita e atualizada.");
  const {
    authors,
    title,
    caption,
    day,
    month,
    year,
    type,
    local,
    producer,
    numberOfSlides,
    colorType,
    dimension,
    note,
    url,
    accessedAt,
  } = values;

  const getColorFormatted = (colorType) => {
    switch (colorType) {
      case "colorfull":
        return `color`;
      case "blackAndWhite":
        return `P&B`;
      default:
        break;
    }

    return;
  };
  return (
    <span>
      {authors && <>{formatAuthorName(authors)}</>}

      {caption ? (
        <>
          <b> {title}: </b>
          {caption}.{" "}
        </>
      ) : (
        <b>{title}. </b>
      )}

      {local && <>{local}. </>}
      {producer && <>{producer}. </>}

      {day && month && year && `${day} ${month}. ${year}. `}
      {!day && month && year && `${month}. ${year}. `}
      {!day && !month && year && `${year}. `}

      {type && <>{type}. </>}
      {numberOfSlides && <>{numberOfSlides} slides. </>}
      {colorType && <>{getColorFormatted(colorType)}. </>}
      {dimension && <>{dimension}. </>}
      {note && <>{note}. </>}
      {accessedAt &&
        url &&
        ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const SlideShow = ({ back }) => {
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
        values.authors,
        String(values.year)
      ),
      citation: generateCitationWithoutAuthor(
        values.authors,
        String(values.year)
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() => history.push("/documentos-de-meio-eletronico")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            authors: [""],
            title: "",
            caption: "",
            day: "",
            month: "",
            year: "",
            type: "",
            local: "",
            producer: "",
            numberOfSlides: "",
            colorType: "",
            dimension: "",
            note: "",
            url: "",
            accessedAt: "",
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
                    SLIDES
                  </p>
                  Power Point, Open Office, Prezi etc
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="authors"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.authors &&
                            props.values.authors.length > 0 ? (
                              props.values.authors.map((author, index) => (
                                <FieldArrayContainer key={index}>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      marginBottom: 10,
                                    }}
                                  >
                                    <Input
                                      name={`authors.${index}`}
                                      label={`${index + 1}º Autor`}
                                      type="text"
                                      placeholder="Nome do autor"
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={author}
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
                                      props.values.authors.length - 1 && (
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
                                        props.errors.authors &&
                                        props.errors.authors[index]}
                                    </ErrorText>
                                  </div>
                                </FieldArrayContainer>
                              ))
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
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Título da apresentação"
                        placeholder="Ex: Ozonioterapia na Biomedicina"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        name="title"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Subtítulo"
                        placeholder="Ex: Subtítulo, se houver"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        name="caption"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="day"
                        type="number"
                        label="Dia da apresentação"
                        placeholder="Ex: 24"
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.day}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Select
                        name="month"
                        label="Mês da apresentação"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.month}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: "jan", name: "Janeiro" },
                          { value: "fev", name: "Fevereiro" },
                          { value: "mar", name: "Março" },
                          { value: "abr", name: "Abril" },
                          { value: "mai", name: "Maio" },
                          { value: "jun", name: "Junho" },
                          { value: "jul", name: "Julho" },
                          { value: "ago", name: "Agosto" },
                          { value: "set", name: "Setembro" },
                          { value: "out", name: "Outubro" },
                          { value: "nov", name: "Novembro" },
                          { value: "dez", name: "Dezembro" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="number"
                        label="Ano da apresentação"
                        placeholder="Ex: 2020"
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        name="year"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        label="Tipo de apresentação"
                        type="text"
                        placeholder="Ex: Apresentação de Power Point"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.type}
                        name="type"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Local"
                        placeholder="Ex: Sertãozinho, SP"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.local}
                        name="local"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Produtora"
                        placeholder="Ex: SBBME"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.producer}
                        name="producer"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="N° de Slides"
                        placeholder="Ex: 52"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.numberOfSlides}
                        name="numberOfSlides"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Select
                        label="Colorido ou Preto e Branco"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.colorType}
                        name="colorType"
                        options={[
                          { value: "colorfull", name: "Colorido" },
                          { value: "blackAndWhite", name: "Preto e branco" },
                        ]}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Notas"
                        placeholder="Ex: Informações complementares"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.note}
                        name="note"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        type="text"
                        label="Disponível em"
                        placeholder="Ex: https://pt.slideshare.net/biomedicinaestetica/ozonioterapia-na-biomedicina"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        name="url"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="date"
                        label="Acesso em"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accessedAt}
                        name="accessedAt"
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
        <h1>Referência bibliográfica de slide (ABNT)</h1>

        <p>
          A referência de slides, que segue as normas da ABNT, considera alguns
          elementos como obrigatórios. São eles: autor, título e tipo de
          apresentação.
        </p>

        <p>
          Os slides são apresentações criadas com imagens estáticas. Os
          programas mais utilizados para produzir esse tipo de conteúdo são
          PowerPoint, Open Office, Prezi.
        </p>

        <p>
          Os slides, elaborados para palestras, seminários e até mesmo
          {" "}
            apresentação de TCC
          , servem de fontes de pesquisa para o trabalho acadêmico. Quando isso
          acontece, é importante referenciar o material corretamente no fim do
          relatório.
        </p>

        <h2>Elementos para fazer referência de slides</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Nome do autor:</b> nome da pessoa responsável pela autoria;{" "}
          </li>
          <li>
            {" "}
            <b>Título da apresentação:</b> título da apresentação em negrito;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo da apresentação:</b> subtítulo, se houver{" "}
          </li>
          <li>
            {" "}
            <b>Data da apresentação:</b> dia, mês e ano{" "}
          </li>
          <li>
            {" "}
            <b>Tipo de apresentação:</b> ferramenta usada para apresentar ou
            publicar o material;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> Cidade da apresentação;{" "}
          </li>
          <li>
            {" "}
            <b>Produtora:</b> responsável por produzir o material (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>N° de Slides:</b> número de slides que compõem a apresentação;{" "}
          </li>
          <li>
            {" "}
            <b>Descrição do suporte:</b> colorido ou preto e branco e dimensões.{" "}
          </li>
          <li>
            {" "}
            <b>Notas:</b> Informações complementares;{" "}
          </li>
          <li>
            {" "}
            <b>Disponibilidade:</b> endereço eletrônico (URL);{" "}
          </li>
          <li>
            {" "}
            <b>Acesso em:</b> dia, mês e ano de acesso.{" "}
          </li>
        </ul>

        <h2>Formato básico</h2>

        <p>
          <mark>
            SOBRENOME, Nome do autor. <b>Título da Apresentação:</b> Subtítulo.
            Local: Produtora. Data de apresentação. Tipo de Apresentação. N° de
            Slides, color ou P&B, Dimensão. Disponível em: URL. Acesso em: dia,
            mês e ano.
          </mark>
        </p>

        <h2>Exemplos</h2>

        <img loading="lazy" src={Img} alt="Exemplo de referência de apresentação de slides ABNT" width="100%" />

        <p>
          <mark>
            PUGA, Ana Carolina. <b>Ozonioterapia na Biomedicina.</b>{" "}
            Sertãozinho, SP, 23 mar. 2018. Apresentação em Slideshare. 52
            slides, color. Disponível em:
            https://pt.slideshare.net/biomedicinaestetica/ozonioterapia-na-biomedicina.
            Acesso em: 08 ago. 2020.
          </mark>
        </p>

        <p>
          <mark>
            CHAHOUD, Juliana. <b>Desenvolvendo um aplicativo iOS com Swift.</b>{" "}
            São Carlos. 21 ago. 2014. Apresentação no Slide Share. 76 slides.
            color. Minicurso de iOS da 17ª Semana da Computação do ICMC USP São
            Carlos. Disponível em:
            https://pt2.slideshare.net/julianachahoud/semcomp-usp-so-carlos-desenvolvendo-um-aplicativo-ios-com.
            Acesso em: 29 out. 2020.
          </mark>
        </p>

        <h2>E se o autor do slide for uma entidade?</h2>

        <p>
          Quando o autor é uma entidade coletiva (empresa, órgão público ou
          associação), o nome é escrito por extenso no início da referência.
          Essa é a única diferença em relação ao formato com autor pessoa
          física.
        </p>
      </div>
      <RelatedLinks />

      <Footer />
    </>
  );
};

export default SlideShow;
