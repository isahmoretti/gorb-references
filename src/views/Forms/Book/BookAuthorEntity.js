import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Select from "../../../components/InputWrapper/Select";
import Modal from "../../../components/Modal";
import Footer from "../../../components/Footer";

import Nav from "../../../components/Header";

// utils
import { formatDate } from "../../../utils/formatDate";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import {
  withAutorArray,
  finalParagraphArray,
} from "../../../utils/generateSimpleCitation";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import chamadasCitacao from "../../../assets/images/explicativos/livro/entidade/chamadas_para_citacao_livro_autor_entidade.jpg";
import elementosComplementares from "../../../assets/images/explicativos/livro/entidade/elementos_complementares_livro_com_autor_entidade.jpg";
import elementosEssenciais from "../../../assets/images/explicativos/livro/entidade/elementos_essenciais_livro_com_autor_entidade.jpg";

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
  Header,
} from "./style";

const SignupSchema = Yup.object().shape({
  entities: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Livro com Autor Entidade: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Gere referências de livros com autor entidade no formato ABNT NBR 6023:2018. Ferramenta gratuita e atualizada.");
  const {
    entities,
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
      <>
        {entities.length && entities.length < 4 ? (
          entities.join("; ").toUpperCase()
        ) : (
          <>
            {entities[0].toUpperCase()} <i>et al.</i>
          </>
        )}
        .{" "}
      </>
      {caption ? (
        <>
          <b>{title}: </b>
          {caption}.{" "}
        </>
      ) : (
        <b>{title}. </b>
      )}
      {complementaryElements && translator && translatorName.length && (
        <> Tradução: {translatorName.join("; ")}. </>
      )}
      {edition && <> {edition > 1 ? <>{edition}.</> : <>{edition}</>} ed. </>}
      <>
        {local}: {`${publishingCompany}, `}
      </>
      <>{volume && <> v. {volume},</>} </>
      {yearOfPublication}.
      {complementaryElements && pagination && <> {pagination} p.</>}
      {complementaryElements && series && <> ({series}).</>}
      {complementaryElements && originalTitle && (
        <> Título original: {originalTitle}.</>
      )}
      {complementaryElements && othersResponsabilities && (
        <> {othersResponsabilities}.</>
      )}
      {complementaryElements && grades && <> {grades}.</>}
      {complementaryElements && isbn && <> ISBN: {isbn}.</>}
      {complementaryElements &&
        online &&
        accessedAt &&
        url &&
        ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
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

  const finalParagraphArraySimple = (names = [], year = 0) => {
    const namesAuthors = names.map((name) => name).join(", ");

    const response = `(${namesAuthors.toUpperCase()}, ${year})`;

    return response;
  };

  const withAutorArraySimple = (names = [], year = 0) => {
    const namesAuthors = names.map((name) => name).join(", ");

    const response = `${namesAuthors} (${year})`;

    return response;
  };

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor: withAutorArraySimple(
        values.entities,
        values.yearOfPublication
      ),
      citation: finalParagraphArraySimple(
        values.entities,
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
            entities: [""],
            title: "",
            caption: "",
            edition: "",
            local: "",
            publishingCompany: "",
            yearOfPublication: "",
            complementaryElements: false,
            othersResponsabilities: "",
            pagination: "",
            series: "",
            grades: "",
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
                    Referência de livro com autor entidade{" "}
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="entities"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.entities &&
                            props.values.entities.length > 0 ? (
                              props.values.entities.map((entity, index) => (
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
                                      label={`${index + 1}º Entidade`}
                                      placeholder="Ex: OMS - Organização Mundial da Saúde"
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={entity}
                                      name={`entities.${index}`}
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
                                      props.values.entities.length - 1 && (
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
                                        props.errors.entities &&
                                        props.errors.entities[index]}
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
                    <Grid item xs={12} sm={12} md={12}>
                      <Input
                        type="text"
                        label="Título"
                        placeholder=" Ex: Mulheres e saúde"
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
                        placeholder="Ex: Evidências de hoje agenda de amanhã"
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
                        placeholder="Ex: Geneva"
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
                        label="Publicadora"
                        placeholder="Ex: OMS"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publishingCompany}
                        name="publishingCompany"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        type="text"
                        label="Edição"
                        placeholder="Ex: 2"
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
                        placeholder="Ex: 2009"
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
                        label="Volume"
                        placeholder="Ex: 2"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.volume}
                        name="volume"
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
                        placeholder="Ex: 92"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pagination}
                        name="pagination"
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
                        placeholder="Ex: Nome da série (se houver)"
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
                        placeholder="Ex: 9789241563857"
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
                        placeholder="Ex: Jean-Pierre Barakat"
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
                        placeholder="Ex: Women and health: today’s evidence tomorrow’s agenda"
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
                        name="online"
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
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        disabled={
                          !props.values.complementaryElements ||
                          !props.values.online
                        }
                        type="text"
                        label="Endereço (URL)"
                        placeholder="https://www.who.int/eportuguese/publications/Mulheres_Saude.pdf"
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
        <h1>Referência de livro com autor entidade (ABNT)</h1>

        <p>
          Algumas obras não possuem uma pessoa física como autor, mas sim uma
          organização (empresas, associações, seminários e órgãos do governo). A
          responsabilidade de entidade coletiva é apresentada pelo seu próprio
          nome por extenso e em ordem direta.
        </p>

        <h2>Como fazer referência de livro com autor entidade?</h2>

        <p>
          No caso de uma entidade com nome genérico, o apropriado é preceder o
          termo com o nome do órgão superior ou da jurisdição geográfica
          correspondente.
        </p>

        <p>O formato da referência:</p>

        <p>
          <mark>
            NOME DA ENTIDADE POR EXTENSO. <b>Título do livro:</b> Subtítulo.
            Edição. Local de publicação: Editora, ano.
          </mark>
        </p>

        <h2>Elementos essenciais</h2>

        <p>
          Elementos essenciais são aqueles que não podem faltar na referência da
          obra consultada. Veja:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Nome da entidade:</b> autoria institucional da obra por extenso e
            em ordem direta;{" "}
          </li>
          <li>
            {" "}
            <b>Título do livro:</b> título da obra consultada;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo:</b> Adicionar subtítulo depois de dois-pontos (se
            houver);{" "}
          </li>
          <li>
            {" "}
            <b>Edição:</b> se não for a primeira edição, informe na referência;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade da editora;{" "}
          </li>
          <li>
            {" "}
            <b>Editora:</b> empresa publicadora;{" "}
          </li>
          <li>
            {" "}
            <b>Ano:</b> ano de publicação.{" "}
          </li>
        </ul>

        <h2>
          Exemplo de referência de capítulo de livro (elementos essenciais)
        </h2>

        <img loading="lazy"
          src={elementosEssenciais}
          alt="elementos-essenciais"
          width="100%"
        />

        <p>
          Quando a obra é consultada pela internet, é essencial incluir a URL
          onde se encontra o documento e a data de acesso (dia, mês e ano) no
          final da referência.
        </p>

        <h2>Elementos complementares</h2>

        <p>
          Para melhorar a identificação de um documento, é possível incluir
          elementos complementares. São eles:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Nome do tradutor:</b> Nome do tradutor por extenso e em ordem
            direta;{" "}
          </li>
          <li>
            {" "}
            <b>Título original da obra:</b> Título original da obra traduzida;{" "}
          </li>
          <li>
            {" "}
            <b>Número do volume:</b> números arábicos precedido por “v.” e entre
            vírgulas.{" "}
          </li>
          <li>
            {" "}
            <b>Número de páginas:</b> números arábicos seguidos pela abreviação
            “p.”;{" "}
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

        <h2>
          Exemplo de referência de capítulo de livro (elementos complementares)
        </h2>

        <img loading="lazy"
          src={elementosComplementares}
          alt="elementos-complementares"
          width="100%"
        />

        <h2>Chamadas para citações</h2>

        <p>
          Para evitar acusações de plágio, cada citação no relatório precisa vir
          acompanhada de uma chamada com o sobrenome e ano de publicação. O
          sistema autor-data deve ser seguido em todo corpo do texto.
        </p>

        <p>
          Dentro do parágrafo, a chamada é feita com o nome da entidade por
          extenso e em ordem direta, seguido pelo ano de publicação entre
          parênteses. No caso de uma chamada no final do parágrafo, o nome da
          entidade é colocado em letras maiúsculas entre parênteses, seguido
          pelo ano.
        </p>

        <img loading="lazy" src={chamadasCitacao} alt="chamada-citacao" width="100%" />

        <p>
          Existe a possibilidade de inserir a página onde se encontra a citação
          na chamada, junto com o ano de publicação da obra. O formato fica
          assim:
        </p>

        <p>
          <mark>
            Organização Mundial da Saúde (2009, p. 39) trecho citado [...]
          </mark>
        </p>

        <p>
          <mark>
            [...] trecho citado (ORGANIZAÇÃO MUNDIAL DA SAÚDE, 2009, p. 39).
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Book;
