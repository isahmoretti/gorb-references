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
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";

import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import ChamadaCitacao from "../../../assets/images/explicativos/livro/dois-autores/chamada_para_citacao_livro_dois_ou_tres_autores.jpg";
import complementares2 from "../../../assets/images/explicativos/livro/dois-autores/elementos_complementares_livros_2_autores.jpg";
import complementares3 from "../../../assets/images/explicativos/livro/dois-autores/elementos_complementares_livro_3_autores.jpg";
import essenciais2 from "../../../assets/images/explicativos/livro/dois-autores/elementos_essenciais_livros_2_autores.jpg";
import essenciais3 from "../../../assets/images/explicativos/livro/dois-autores/elementos_essenciais_livros_3_autores.jpg";

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
import RelatedLinks from "../../../components/RelatedLinks";

const SignupSchema = Yup.object().shape({
  authors: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Livro com Dois ou Três Autores: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Crie referências de livros com dois ou três autores conforme a ABNT NBR 6023:2018. Ferramenta gratuita e atualizada.");
  const {
    authors,
    abbreviate,
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
      <>{formatAuthorName(authors, abbreviate)} </>
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
      {local}: {publishingCompany},{volume && <> v.{volume},</>}
      <> {yearOfPublication}</>.
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
      {complementaryElements && online && url && <> Disponível em: {url}.</>}
      {complementaryElements && online && accessedAt && (
        <> Acesso em: {formatDate(accessedAt)}.</>
      )}
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
        values.authors,
        values.yearOfPublication
      ),
      citation: generateCitationWithoutAuthor(
        values.authors,
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
            authors: ["", "", ""],
            abbreviate: false,
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
                    Referência de livro com dois ou três autores{" "}
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
                        name="authors"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.authors &&
                            props.values.authors.length > 0 ? (
                              props.values.authors.map((author, index) => (
                                <FieldArrayContainer key={index}>
                                  <div
                                    style={{ display: "flex", width: "100%" }}
                                  >
                                    <Input
                                      name={`authors.${index}`}
                                      type="text"
                                      label={`${index + 1}º Autor`}
                                      placeholder={`Ex: Philip Kotler`}
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={author}
                                      errors={props.errors}
                                      touched={props.touched}
                                    />
                                    {index === 2 && (
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
                                      props.values.authors.length - 1 &&
                                      index === 1 && (
                                        <ButtonCore
                                          type="button"
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          <AddIcon src={Plus} />
                                        </ButtonCore>
                                      )}
                                  </div>
                                  <div
                                    style={{
                                      width: "100%",
                                      marginBottom: "10px",
                                    }}
                                  >
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
                      <Input
                        type="text"
                        label="Título"
                        placeholder="Ex: Marketing 4.0"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        name="title"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Subtítulo"
                        placeholder="Ex: Do tradicional ao digital"
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
                        type="text"
                        label="Local de publicação"
                        placeholder="Ex: Rio de Janeiro"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.local}
                        name="local"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Editora"
                        placeholder="Ex: Sextante"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publishingCompany}
                        name="publishingCompany"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
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
                        placeholder="Ex: 2017"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfPublication}
                        name="yearOfPublication"
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
                      md={3}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Input
                        type="text"
                        label="Volume"
                        placeholder="Ex: 10"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.volume}
                        name="volume"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
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
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={2}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Páginas"
                        placeholder="Ex: 201"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pagination}
                        name="pagination"
                        errors={props.errors}
                        touched={props.touched}
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
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Séries e coleções"
                        placeholder="Ex: Grandes autores nacionais"
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
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="ISBN"
                        placeholder="EX: 8543105338"
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
                      md={3}
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
                                      <ButtonCore
                                        type="button"
                                        disabled={index === 0}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <RemoveIcon src={Minus} />
                                      </ButtonCore>
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
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Título original"
                        placeholder="Ex: Marketing 4.0: Moving from Traditional to Digital"
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
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        disabled={
                          !props.values.complementaryElements ||
                          !props.values.online
                        }
                        type="text"
                        label="Endereço(URL)"
                        placeholder="https://exemplo.com/"
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
                        disabled={
                          !props.values.complementaryElements ||
                          !props.values.online
                        }
                        type="date"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accessedAt}
                        label="Acesso em"
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
        <h1>Referência de livro com dois ou três autores (ABNT)</h1>

        <p>
          Quando uma obra tem dois ou três autores, todos devem ser citados na
          referência.
        </p>

        <p>
          O último sobrenome é apresentado em maiúsculas, seguido pelo prenome e
          outros sobrenomes, de forma abreviada ou não. Os autores são separados
          por ponto-vírgula [;].
        </p>

        <h2>Como referenciar livro com dois ou três autores?</h2>

        <h2>Elementos essenciais</h2>

        <p>
          Na referência de livro com dois ou três autores, os elementos
          essenciais são:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autoria:</b> SOBRENOME e nome de cada responsável pela obra.{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> Título em negrito.{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo (se houver):</b> Subtítulo sem negrito.{" "}
          </li>
          <li>
            {" "}
            <b>Edição (se houver):</b> Algarismos arábicos seguidos pela
            abreviatura (17. ed.){" "}
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

        <p>
          Esquema para montar referência de livros com dois ou três autores:
        </p>

        <p>
          <mark>
            SOBRENOME, Primeiro Nome; SOBRENOME, Primeiro Nome; SOBRENOME,
            Primeiro Nome do autor. <b>Título:</b> Subtítulo. Local: Editora,
            ano.
          </mark>
        </p>

        <h2>Exemplo de referência com dois autores (elementos essenciais)</h2>

        <img loading="lazy" src={essenciais2} alt="Elementos essenciais para referência bibliográfica ABNT" width="100%" />

        <h2>Exemplo de referência com três autores (elementos essenciais)</h2>

        <img loading="lazy" src={essenciais3} alt="Elementos essenciais para referência bibliográfica ABNT" width="100%" />

        <h2>Elementos complementares</h2>

        <p>
          Os elementos complementares podem ser inseridos com o objetivo de
          melhorar a identificação do documento. São eles:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Nome do tradutor:</b> Nome do tradutor por extenso, precedido por
            [Tradução:]{" "}
          </li>
          <li>
            {" "}
            <b>Título original da obra:</b> Título original da obra traduzida,
            precedido por [Título Original:]{" "}
          </li>
          <li>
            {" "}
            <b>Número de páginas:</b> quantidade de páginas do documento em
            algarismos arábicos, seguido pela abreviatura [p.]{" "}
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

        <h2>
          Exemplo de referência com dois autores (elementos complementares)
        </h2>

        <img loading="lazy"
          src={complementares2}
          alt="Elementos complementares para referência bibliográfica ABNT"
          width="100%"
        />

        <h2>
          Exemplo de referência com três autores (elementos complementares)
        </h2>

        <img loading="lazy"
          src={complementares3}
          alt="Elementos complementares para referência bibliográfica ABNT"
          width="100%"
        />

        <p>
          No caso da consulta à versão digital da obra, é necessário acrescentar
          as informações de endereço eletrônico e data de acesso no final da
          referência.
        </p>

        <p>Exemplo:</p>

        <p>
          <mark>
            BERGER, Peter L.; LUCKMANN, Thomas.{" "}
            <b>A construção social da realidade:</b> tratado de sociologia do
            conhecimento. 24. ed. Petrópolis: Vozes, 2004. Disponível em:
            https://cristianorodriguesdotcom.files.wordpress.com/2013/06/bergerluckman.pdf.
            Acesso em: 13 ago. 2020.
          </mark>
        </p>

        <h2>Chamadas para citações</h2>

        <p>
          Segundo a ABNT, quando a obra tem até três autores, todos os
          responsáveis precisam ser referenciados na citação, adotando o sistema
          autor-data.
        </p>

        <p>
          Quando o autor é referenciado dentro do texto, o sobrenome é inserido
          com letras minúsculas, seguido pelo ano de publicação da obra entre
          parênteses. Também existe a opção de referenciar o responsável fora da
          sentença, colocando o sobrenome em letras maiúsculas e o ano entre
          parênteses.
        </p>

        <img loading="lazy" src={ChamadaCitacao} alt="Chamada para citação no sistema autor-data ABNT" width="100%" />

        <p>
          É aconselhável incluir o número da página do livro onde se encontra o
          trecho citado. Ela deve ser inserida na chamada da citação junto com o
          ano, de forma abreviada.
        </p>

        <h2>Dois autores:</h2>

        <p>
          <mark>Berger e Luckmann (2007, p. 66) trecho citado [...]</mark>
        </p>

        <p>
          <mark>[...] trecho citado (BERGER; LUCKMANN, 2007, p. 18).</mark>
        </p>

        <h2>Três autores:</h2>

        <p>
          <mark>
            Kotler, Kartajaya e Setiawan (2010, p.15) trecho citado [...]
          </mark>
        </p>

        <p>
          <mark>
            [...] trecho citado (KOTLER; KARTAJAYA; SETIAWAN, 2010, p. 168).
          </mark>
        </p>
      </div>
      <RelatedLinks />

      <Footer />
    </>
  );
};

export default Book;
