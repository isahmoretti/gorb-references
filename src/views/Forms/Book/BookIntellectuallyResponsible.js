import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

import { formatAuthorName } from "../../../utils/formatAuthorName";
import { formatDate } from "../../../utils/formatDate";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Select from "../../../components/InputWrapper/Select";
import Modal from "../../../components/Modal";
import Footer from "../../../components/Footer";

import Nav from "../../../components/Header";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import chamadasCitacao from "../../../assets/images/explicativos/livro/responsavel/chamadas_para_citacao_livro_com_responsavel_intelectual.jpg";
import elementosComplementares from "../../../assets/images/explicativos/livro/responsavel/elementos_complementares_livro_com_responsabilidade_intelectual.jpg";
import elementosEssenciais from "../../../assets/images/explicativos/livro/responsavel/elementos_essenciais_livro_com_responsabilidade_intelectual.jpg";

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
  namesResponsible: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  responbiltyTypes: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const getResposabilityTypes = (responsabiltyTypes) => {
  switch (responsabiltyTypes) {
    case "organizator":
      return "(org.).";
    case "editor":
      return "(ed.).";
    case "coordinator":
      return "(coord.).";
    default:
      return "";
  }
};

const getNamesResponsible = (namesResponsible, abbreviate) => {
  if (namesResponsible.length >= 4) {
    return formatAuthorName(namesResponsible, abbreviate);
  }

  const name = formatAuthorName(namesResponsible, abbreviate);

  return name.slice(0, name.length - 2);
};

const generateReference = (values) => {
  const {
    namesResponsible,
    abbreviate,
    responbiltyTypes,
    title,
    caption,
    edition,
    local,
    publishingCompany,
    yearOfPublication,
    complementaryElements,
    othersResponsabilities,
    series,
    pagination,
    grades,
    isbn,
    volume,
    originalTitle,
    online,
    url,
    accessedAt,
    translator,
    translatorName,
  } = values;
  return (
    <span>
      {" "}
      {/* precisei pegar sem o ponto */}
      <>
        {namesResponsible.length &&
          getNamesResponsible(namesResponsible, abbreviate)}{" "}
      </>
      {getResposabilityTypes(responbiltyTypes)}&nbsp;
      {caption ? (
        <>
          <b>{title}: </b>
          {caption}.{" "}
        </>
      ) : (
        <b>{title}. </b>
      )}
      {complementaryElements && translator && translatorName.length && (
        <> Tradução: {translatorName.join("; ")}.</>
      )}
      {edition && <> {edition > 1 ? <>{edition}.</> : <>{edition}</>} ed. </>}
      {local}: {publishingCompany}, {yearOfPublication}.
      {complementaryElements && pagination && <> {pagination} p.</>}
      {complementaryElements && series && <> ({series}).</>}
      {complementaryElements && originalTitle && (
        <> Título original: {originalTitle}.</>
      )}
      {complementaryElements && volume && <> v.{volume}. </>}
      {complementaryElements && othersResponsabilities && (
        <> {othersResponsabilities}.</>
      )}
      {complementaryElements && grades && <> {grades}.</>}
      {complementaryElements && isbn && <> ISBN: {isbn}.</>}
      {complementaryElements &&
        online &&
        accessedAt &&
        url &&
        ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}.`}
    </span>
  );
};
const Book = ({ back }) => {
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
        values.namesResponsible,
        values.yearOfPublication
      ),
      citation: generateCitationWithoutAuthor(
        values.namesResponsible,
        values.yearOfPublication
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back onClick={() => history.push("/livros")} src={ArrowLeft} />

        <Formik
          initialValues={{
            namesResponsible: [""],
            abbreviate: false,
            responbiltyTypes: "",
            title: "",
            caption: "",
            edition: "",
            local: "",
            publishingCompany: "",
            yearOfPublication: "",
            complementaryElements: false,
            pagination: "",
            series: "",
            isbn: "",
            originalTitle: "",
            volume: "",
            online: false,
            url: "",
            accessedAt: "",
            translator: false,
            translatorName: [""],
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
                    Referência de livro com responsável intelectual ao invés de
                    autor{" "}
                  </p>
                  <span>Editor, coordenador ou organizador.</span>
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
                        name="namesResponsible"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.namesResponsible &&
                            props.values.namesResponsible.length > 0 ? (
                              props.values.namesResponsible.map(
                                (namesResponsible, index) => (
                                  <FieldArrayContainer key={index}>
                                    <div
                                      style={{
                                        display: "flex",
                                        width: "100%",
                                        marginBottom: 10,
                                      }}
                                    >
                                      <Input
                                        type="text"
                                        label={`Nome do ${
                                          index + 1
                                        }º responsável`}
                                        placeholder={`nome do ${
                                          index + 1
                                        }º responsável`}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={namesResponsible}
                                        name={`namesResponsible.${index}`}
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
                                      {index ===
                                        props.values.namesResponsible.length -
                                          1 && (
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
                                          props.errors.namesResponsible &&
                                          props.errors.namesResponsible[index]}
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
                    <Grid item xs={12} sm={12} md={3}>
                      <Select
                        name="abbreviate"
                        label="abreviar autor?"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.abbreviate}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Select
                        type="text"
                        label="Tipos de responsabilidade"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responbiltyTypes}
                        name="responbiltyTypes"
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: "organizator", name: "Organizador" },
                          { value: "editor", name: "Editor(es)" },
                          { value: "coordinator", name: "Coordenador(es)" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Título"
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
                        label="Local de publicação"
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
                        label="Empresa de publicação(editora)"
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
                        label="Edição"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.edition}
                        name="edition"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Ano de publicação"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfPublication}
                        name="yearOfPublication"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Select
                        type="text"
                        label="Elementos complementares"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.complementaryElements}
                        name="complementaryElements"
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Páginas"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pagination}
                        name="pagination"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Volume"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.volume}
                        name="volume"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={4}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Série"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.series}
                        name="series"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="ISBN"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.isbn}
                        name="isbn"
                        errors={props.errors}
                        touched={props.touched}
                        help
                        helpText="Número de livro padrão internacional"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={4}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Select
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Tradutor"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.translator}
                        name="translator"
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="translatorName"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.translatorName &&
                            props.values.translatorName.length > 0 ? (
                              props.values.translatorName.map(
                                (author, index) => (
                                  <FieldArrayContainer key={index}>
                                    <div
                                      style={{
                                        display: "flex",
                                        width: "100%",
                                        marginBottom: 10,
                                      }}
                                    >
                                      <Input
                                        disabled={
                                          !props.values.complementaryElements ||
                                          !props.values.translator
                                        }
                                        type="text"
                                        label={`Tradutor ${index + 1}`}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={author}
                                        name={`translatorName.${index}`}
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
                                      {index ===
                                        props.values.translatorName.length -
                                          1 && (
                                        <ButtonCore
                                          type="button"
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          <AddIcon src={Plus} />
                                        </ButtonCore>
                                      )}
                                    </div>
                                  </FieldArrayContainer>
                                )
                              )
                            ) : (
                              <ButtonCore
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Adicione um tradutor
                              </ButtonCore>
                            )}
                          </div>
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Título original"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.originalTitle}
                        name="originalTitle"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Select
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Online"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.online}
                        name="online"
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        disabled={
                          !props.values.complementaryElements ||
                          !props.values.online
                        }
                        type="text"
                        label="Endereço(URL)"
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
                        disabled={
                          !props.values.complementaryElements ||
                          !props.values.online
                        }
                        type="date"
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
        <h1>
          Referência de livro com responsável intelectual ao invés de autor
        </h1>

        <p>
          O responsável intelectual não precisa ser necessariamente um autor,
          ele pode ter uma outra responsabilidade com relação à obra. As funções
          de organizador, compilador, coordenador e editor, que são
          especificadas logo na capa do livro, devem constar na referência, de
          forma abreviada.
        </p>

        <h3>Como fazer referência de livro com responsável intelectual?</h3>

        <p>
          A referência de livro com responsável intelectual ao invés de autor é
          a tem a mesma formatação da referência de livro com autor(es). A
          principal diferença está no acréscimo da abreviação que indica o tipo
          de responsabilidade (Org., Comp., Coord.). Ela deve ser inserida entre
          parênteses, após o sobrenome e o nome. O formato:
        </p>

        <p>
          <mark>
            SOBRENOME, Nome do organizador (org.). <b>Título:</b> Subtítulo.
            Edição. Local de publicação: Editora, ano.
          </mark>
        </p>

        <h3>Elementos essenciais</h3>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Responsável:</b> SOBRENOME e nome{" "}
          </li>
          <li>
            {" "}
            <b>Tipo de responsabilidade:</b> abreviação do tipo de
            responsabilidade entre parênteses{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> Título em negrito{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo (se houver):</b> Subtítulo sem negrito.{" "}
          </li>
          <li>
            {" "}
            <b>Edição (se houver):</b> Algarismos arábicos seguidos pela
            abreviatura (13. ed.){" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade da editora{" "}
          </li>
          <li>
            {" "}
            <b>Editora:</b> nome da empresa publicadora{" "}
          </li>
          <li>
            {" "}
            <b>Data:</b> Ano de publicação do livro.{" "}
          </li>
        </ul>

        <h3>
          Exemplo de referência de livro com responsável intelectual (elementos
          essenciais)
        </h3>

        <img
          src={elementosEssenciais}
          alt="elementos-essenciais"
          width="100%"
        />

        <p>
          Quando um livro com responsável intelectual é consultado pela
          internet, os dados de disponibilidade e acesso devem constar no final
          da referência.
        </p>

        <h3>Elementos complementares</h3>

        <p>
          Elementos complementares tornam a referência bibliográfica mais
          completa e facilitam a identificação do documento. São eles:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Nome do tradutor:</b> Nome do tradutor por extenso, precedido por
            - Tradução:{" "}
          </li>
          <li>
            {" "}
            <b>Título original da obra:</b> Título original da obra traduzida,
            precedido por - Título Original:{" "}
          </li>
          <li>
            {" "}
            <b>Número do volume:</b> números algarismos arábicos precedido por
            “v.” e entre vírgulas.{" "}
          </li>
          <li>
            {" "}
            <b>Série ou Coleção:</b> nome da série entre parênteses.{" "}
          </li>
          <li>
            {" "}
            <b>ISBN:</b> Número Padrão Internacional de Livro.{" "}
          </li>
        </ul>

        <h3>
          Exemplo de referência de livro com responsável intelectual (elementos
          complementares)
        </h3>

        <img
          src={elementosComplementares}
          alt="elementos-complementares"
          width="100%"
        />

        <h3>Chamadas para citações</h3>

        <p>
          Ao trazer para o texto do relatório uma determinada informação, é
          necessário apresentar a origem da citação pelo sistema autor-data. A
          chamada pode ser escrita de duas maneiras: dentro da sentença e fora
          dela. Veja exemplos:
        </p>

        <img src={chamadasCitacao} alt="chamadas-citacoes" width="100%" />

        <p>
          A inclusão do número da página onde se encontra o trecho citado é
          opcional, mas recomendada. No caso, a chamada pode ser feita de duas
          formas:
        </p>

        <p>
          <mark>
            Landau, Cunha e Haguenauer (2014, p. 44) trecho citado [...]
          </mark>
        </p>

        <p>
          <mark>
            [...] trecho citado (LANDAU; CUNHA; HAGUENAUER, 2014, p. 40).
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Book;
