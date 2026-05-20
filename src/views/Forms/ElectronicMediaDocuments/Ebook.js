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
import Footer from "../../../components/Footer";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";
import Img from "../../../assets/images/explicativos/eletronicos/referencia-abnt-ebook.jpg";

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
  responsibleName: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "E-book: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Gere referências de e-books conforme a ABNT NBR 6023:2018. Ferramenta gratuita para trabalhos acadêmicos.");
  const {
    responsabilityType,
    responsibleName,
    title,
    caption,
    local,
    publishingCompany,
    yearOfPublication,
    pages,
    series,
    colorType,
    isbn,
    doi,
    url,
    accessedAt,
  } = values;

  const getResposabilityTypes = (responsabiltyTypes) => {
    switch (responsabiltyTypes) {
      case "organizator":
        return "(org.).";
      case "compiler":
        return "(comp.).";
      case "editor":
        return "(ed.).";
      default:
        return "";
    }
  };
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
  const getNamesResponsible = (namesResponsible) => {
    if (namesResponsible.length >= 4) {
      return formatAuthorName(namesResponsible);
    }

    const name = formatAuthorName(namesResponsible);

    return name.slice(0, name.length - 2);
  };

  return (
    <span>
      {/* precisei pegar sem o ponto */}
      <>{responsibleName.length && getNamesResponsible(responsibleName)}</>
      {responsabilityType ? (
        <> {getResposabilityTypes(responsabilityType)} </>
      ) : (
        <>. </>
      )}
      {caption ? (
        <>
          {
            <>
              <b>{title}</b>: <>{caption}. </>
            </>
          }
        </>
      ) : (
        <b>{title}. </b>
      )}

      {publishingCompany ? (
        <>
          {
            <>
              <>{local}</>: <>{publishingCompany}, </>
            </>
          }
        </>
      ) : (
        `${local}. `
      )}

      {yearOfPublication && <>{yearOfPublication}. </>}
      {pages && (
        <>
          <i>E-book</i> ({pages}p.){" "}
        </>
      )}
      {series && <>({series}). </>}
      {colorType && <>{getColorFormatted(colorType)}. </>}
      {isbn && <> ISBN: {isbn}. </>}
      {doi && `DOI: ${doi}. `}
      {accessedAt && url && (
        <>{` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}</>
      )}
    </span>
  );
};

const Ebook = ({ back }) => {
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
        values.responsibleName,
        values.yearOfPublication
      ),
      citation: generateCitationWithoutAuthor(
        values.responsibleName,
        values.yearOfPublication
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
            responsibleName: [""],
            responsabilityType: "",
            title: "",
            caption: "",
            local: "",
            publishingCompany: "",
            yearOfPublication: "",
            pages: "",
            series: "",
            colorType: "",
            isbn: "",
            doi: "",
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
                    E-book
                  </p>
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
                        name="responsibleName"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.responsibleName &&
                            props.values.responsibleName.length > 0 ? (
                              props.values.responsibleName.map(
                                (chapterAuthor, index) => (
                                  <FieldArrayContainer key={index}>
                                    <div
                                      style={{ display: "flex", width: "100%" }}
                                    >
                                      <Input
                                        type="text"
                                        label={`Nome do ${index + 1}º Autor`}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={chapterAuthor}
                                        name={`responsibleName.${index}`}
                                        errors={props.errors}
                                        touched={props.touched}
                                      />
                                      {index > 0 && (
                                        <ButtonCore
                                          type="button"
                                          disabled={index === 0}
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <RemoveIcon src={Minus} />
                                        </ButtonCore>
                                      )}
                                      {
                                        <ButtonCore
                                          type="button"
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          <AddIcon src={Plus} />
                                        </ButtonCore>
                                      }
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <ErrorText>
                                        {props.errors &&
                                          props.errors.responsibleName &&
                                          props.errors.responsibleName[index]}
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
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Select
                        type="text"
                        label="Tipo de responsabilidade"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responsabilityType}
                        name="responsabilityType"
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: "organizator", name: "Organizador" },
                          { value: "compiler", name: "Compilador" },
                          { value: "editor", name: "Editor" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Título"
                        placeholder="Ex: Noventa Anos de Rádio no Brasil"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        name="title"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Subtítulo"
                        placeholder="Ex: Nome a ser difinido"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        name="caption"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Local"
                        placeholder="Ex: Uberlândia, MG"
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
                        label="Editora"
                        placeholder="Ex: Edufu"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publishingCompany}
                        name="publishingCompany"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        type="text"
                        label="Ano de publicação"
                        placeholder="Ex: 2016"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfPublication}
                        name="yearOfPublication"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        type="text"
                        label="N° de páginas"
                        placeholder="Ex: 211"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pages}
                        name="pages"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Série e Coleção"
                        placeholder="Ex: Coleção História da Comunicação Brasileira"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.series}
                        name="series"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
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
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="ISBN"
                        placeholder="Ex: 978-85-7078-4447-6"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.isbn}
                        name="isbn"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="DOI"
                        placeholder="Ex: 10.7476/9788575413524"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.doi}
                        name="doi"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Disponível em"
                        placeholder="Ex: https://sucupira.capes.gov.br/sucupira/"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        name="url"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
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
        <h1>Referência bibliográfica de e-book (ABNT)</h1>

        <p>
          Livros digitais estão se tornando cada vez mais populares. Algumas
          obras, inclusive, são disponibilizadas apenas no formato eletrônico,
          geralmente em arquivo PDF.
        </p>

        <p>
          Vários e-books podem contribuir com a sua{" "}
          pesquisa bibliográfica
          , como é o caso dos documentos produzidos por universidades e
          institutos de pesquisa. O Instituto de Pesquisa Econômica Aplicada
          (IPEA), por exemplo, tem um acervo bem interessante de livros
          diferenciais que podem ser referenciado no seu trabalho acadêmico.
        </p>

        <h2>Elementos para incluir na referência</h2>

        <p>Veja abaixo os elementos essenciais da referência de ebook:</p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autor:</b> nome do autor ou dos autores;{" "}
          </li>
          <li>
            {" "}
            <b>Tipo de responsabilidade:</b> Organizador, Editor ou Compilador,
            escrito entre parênteses e abreviado;{" "}
          </li>
          <li>
            {" "}
            <b>Título do e-book:</b> Título da obra em negrito;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo do e-book:</b> subtítulo do e-book (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade de publicação{" "}
          </li>
          <li>
            {" "}
            <b>Publicadora:</b> editora responsável;{" "}
          </li>
          <li>
            {" "}
            <b>Ano:</b> ano de publicação{" "}
          </li>
          <li>
            {" "}
            <b>E-book:</b> termo em itálico para sinalizar o tipo de documento;{" "}
          </li>
          <li>
            {" "}
            <b>Disponibilidade:</b> endereço eletrônico (URL);{" "}
          </li>
          <li>
            {" "}
            <b>Acesso:</b> dia, mês e ano da consulta.{" "}
          </li>
        </ul>

        <h2>Elementos complementares</h2>

        <p>
          Os elementos complementares não são obrigatórios, mas ajudam a
          identificar melhor o documento.
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Paginação:</b> total de páginas;{" "}
          </li>
          <li>
            {" "}
            <b>Coleção ou série:</b> nome da coleção ou série (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>ISBN:</b> International Standard Book Number (se houver){" "}
          </li>
          <li>
            {" "}
            <b>DOI:</b> Digital Object Identifier{" "}
          </li>
        </ul>

        <h2>Formato básico</h2>

        <p>
          <mark>
            SOBRENOME, Nome. <b>Título</b>: Subtítulo. Local: Editora, ano.
            Ebook (número de p.) (Coleção). ISBN xxx-xx-xxx-xxxx-x. Disponível
            em: URL. Acesso em: dia, mês e ano.
          </mark>
        </p>

        <h2>Exemplos</h2>

        <img loading="lazy" src={Img} alt="Exemplo de referência de e-book ABNT" width="100%" />

        <p>
          <mark>
            DÂNGELO, Newton; SOUSA, Sandra Sueli Garcia (org.).{" "}
            <b>Noventa Anos de Rádio no Brasil.</b> Uberlândia, MG: Edufu, 2016.
            <i>E-book</i> (211 p.). ISBN 978-85-397-0073-8. Disponível em:
            http://ebooks.pucrs.br/edipucrs/projetosdefilosofia.pdf. Acesso em:
            8 ago. 2020.
          </mark>
        </p>

        <p>
          <mark>
            CRUZ, Alessandra; ALEIXO, Felipe (org.).{" "}
            <b>Roraima entre línguas</b>: Contatos linguísticos no universo da
            tríplice fronteira do extremo norte brasileiro. Boa Vista: Editora
            UFRR, 2020. <i>E-book</i> (227p.) (Coletânea Entre Sinais). ISBN:
            978-65-86062-10-6. Disponível em:
            https://ufrr.br/editora/index.php/ebook. Acesso em: 29 out. 2020.
          </mark>
        </p>

        <p>
          <mark>
            LIMA, João Brígido Bezerra <i>et al.</i> (org.).{" "}
            <b>Refúgio no Brasil</b>: caracterização dos perfis
            sociodemográficos dos refugiados (1998-2014). Brasília, DF: IPEA,
            2017. <i>E-book</i> (234p.) color. ISBN: 978-85-7811-308-7.
            Disponível em:
            https://www.ipea.gov.br/portal/images/stories/PDFs/livros/livros/170829_Refugio_no_Brasil.pdf.
            Acesso em: 29 out. 2020.
          </mark>
        </p>

        <h2>O que fazer em caso de e-book com autor entidade?</h2>

        <p>
          Quando o autor do livro digital é uma entidade coletiva (empresa,
          associação ou órgão do governo), a autoria deve ser transcrita por
          extenso no início da referência bibliográfica.
        </p>

        <h2>E quando o livro é consultado em leitor digital?</h2>

        <p>
          Livro digital consultado em leitor de ebook, como Kindle, Lev, Kobo,
          não precisa ter a URL e data de acesso especificadas na referência.
          Você só precisa incluir o termo E-book no final.
        </p>

        <h2>Exemplo:</h2>

        <p>
          <mark>
            GODINHO, Thais. <b>Vida organizada</b>: como definir prioridades e
            transformar seus sonhos em objetivos. São Paulo: Gente, 2014.
            E-book.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Ebook;
