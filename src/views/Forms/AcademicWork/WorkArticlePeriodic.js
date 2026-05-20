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

// citation
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import chamadaCitacao from "../../../assets/images/explicativos/academicos/chamadas-para-citacao-artigo-de-periodico.jpg";
import elementoComplementares from "../../../assets/images/explicativos/academicos/elementos_artigo_de_periodico.jpg";

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
  constructionNames: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  titlePeriodic: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  // publishingCompany: Yup.string().required("Obrigatório"),
  // yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Artigo de Periódico: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Gere referências de artigos de periódico no padrão ABNT NBR 6023:2018. Ferramenta gratuita para trabalhos acadêmicos.");
  const {
    typeAthor,
    constructionNames,
    abbreviate,
    title,
    caption,
    subdivisao,
    titlePeriodic,
    captionPeriodic,
    location,
    volume,
    pageInit,
    pageFinish,
    fascicle,
    day,
    month,
    year,
    online,
    accessedAtUrl,
    url,
    issn,
    doi,
    notes,
  } = values;

  const nomeEntidade = (authors = []) => {
    if (authors.length >= 4) return `${authors[0]} et al.`;

    return authors.map((item) => item.toUpperCase()).join("; ");
  };

  return (
    <span>
      {typeAthor === "fisic" ? (
        formatAuthorName(constructionNames, abbreviate)
      ) : subdivisao ? (
        <>
          {nomeEntidade(constructionNames)}. {subdivisao}.{" "}
        </>
      ) : (
        <>{nomeEntidade(constructionNames)}. </>
      )}
      {caption ? <>{`${title}: ${caption}. `}</> : <>{title}. </>}
      {titlePeriodic && <b>{`${titlePeriodic}`}</b>}
      {captionPeriodic ? `: ${captionPeriodic}, ` : ", "}
      {location ? `${location}, ` : "[s. l.], "}
      {volume && `v. ${volume}, `}
      {fascicle && `n. ${fascicle}, `}
      {pageInit && !pageFinish && `p. ${pageInit}, `}
      {pageInit && pageFinish && `p. ${pageInit}-${pageFinish}, `}
      {day && month && year && `${day} ${month}. ${year} `}
      {!day && month && year && `${month}. ${year} `}
      {!day && !month && year && `${year}. `}
      {issn && `${issn}. `}
      {notes && `${notes}. `}
      {doi && `DOI: https://doi.org/${doi}. `}
      {online &&
        accessedAtUrl &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAtUrl)}. `}
      {online &&
        accessedAtUrl &&
        !url &&
        doi &&
        `Acesso em: ${formatDate(accessedAtUrl)}. `}
    </span>
  );
};
const WorkArticlePeriodic = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  const citacaoEntidade = (nomeEntidade = [], ano) => {
    return `${nomeEntidade.join("; ")} (${ano})`;
  };
  const citacaoEntidade2 = (nomeEntidade = [], ano) => {
    return `(${nomeEntidade
      .map((item) => item.toUpperCase())
      .join("; ")}, ${ano})`;
  };

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor:
        values.typeAthor === "entity"
          ? citacaoEntidade(values.constructionNames, values.year)
          : generateCitationWithAuthor(values.constructionNames, values.year),
      citation:
        values.typeAthor === "entity"
          ? citacaoEntidade2(values.constructionNames, values.year)
          : generateCitationWithoutAuthor(
              values.constructionNames,
              values.year
            ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() =>
            history.push("/trabalhos-academicos-e-publicacoes-periodicas")
          }
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            constructionNames: [""],
            abbreviate: false,
            title: "",
            caption: "",
            subdivisao: "",
            titlePeriodic: "",
            captionPeriodic: "",
            location: "",
            volume: "",
            pageInit: "",
            pageFinish: "",
            fascicle: "",
            day: "",
            month: "",
            year: "",
            online: false,
            accessedAtUrl: "",
            url: "",
            issn: "",
            doi: "",
            notes: "",
            typeAthor: "fisic",
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
                    Artigo publicado em periódico
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Select
                        name="typeAthor"
                        label="Tipo de autor"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.typeAthor}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: "fisic", name: "Pessoa física" },
                          { value: "entity", name: "Entidade" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="title"
                        label="Título do artigo"
                        type="text"
                        placeholder="Nome do artigo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="caption"
                        label="Subtítulo do artigo"
                        type="text"
                        placeholder="Subtítulo do artigo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  {props.values.typeAthor === "entity" && (
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Input
                          name="subdivisao"
                          label="Subdivisão"
                          type="text"
                          placeholder="Subdivisão"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.subdivisao}
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                  )}

                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={props.values.typeAthor === "fisic" ? 10 : 12}
                    >
                      <FieldArray
                        name="constructionNames"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.constructionNames &&
                            props.values.constructionNames.length > 0 ? (
                              props.values.constructionNames.map(
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
                                        name={`constructionNames.${index}`}
                                        label={
                                          props.values.typeAthor === "fisic"
                                            ? "Autor da obra"
                                            : "Entidade da obra"
                                        }
                                        type="text"
                                        placeholder={
                                          props.values.typeAthor === "fisic"
                                            ? "Nome do autor"
                                            : "Nome da entidade"
                                        }
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={constructionName}
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
                                        props.values.constructionNames.length -
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
                                          props.errors.constructionNames &&
                                          props.errors.constructionNames[index]}
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
                    {props.values.typeAthor === "fisic" && (
                      <Grid item xs={12} sm={12} md={2}>
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
                    )}
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="titlePeriodic"
                        label="Titulo do periódico"
                        type="text"
                        placeholder="Nome do periódico"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.titlePeriodic}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="captionPeriodic"
                        label="Subtítulo do periódico"
                        type="text"
                        placeholder="Subtítulo do periódico"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.captionPeriodic}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="location"
                        label="Local de publicação"
                        type="text"
                        placeholder="Local de publicação"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publishingCompany}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="volume"
                        label="Nº de volume"
                        type="text"
                        placeholder="Ex: 304"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.volume}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="pageInit"
                        label="Página inicial"
                        type="text"
                        placeholder="Ex: 20"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pageInit}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="pageFinish"
                        label="Página Final"
                        type="text"
                        placeholder="Ex: 42"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pageFinish}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="fascicle"
                        label="Nº do Fascículo"
                        type="text"
                        placeholder="Ex: 4"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.fascicle}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="day"
                        type="number"
                        label="Dia"
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.day}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Select
                        name="month"
                        label="Mês"
                        type="text"
                        placeholder="Mês"
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
                          { value: "dev", name: "Dezembro" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="year"
                        type="number"
                        label="Ano"
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="issn"
                        label="ISSN"
                        type="text"
                        help
                        helpText="Identificador único para revistas e periódicos"
                        placeholder="Ex: 2175-7941"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.issn}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="doi"
                        label="DOI"
                        type="text"
                        help
                        helpText="Digital Object Identifier é
                      um padrão de números e
                      letras que identificam
                      publicações."
                        placeholder="https://doi.org/10.1590/1981-
                      5794-1911-5"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.doi}
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
                        name="notes"
                        label="Nota"
                        type="text"
                        placeholder="Ex: Informações complementares"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.notes}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
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
                        name="accessedAtUrl"
                        type="date"
                        label="Data de acesso"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={!props.values.online}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accessedAtUrl}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="url"
                        label="Endereço (URL)"
                        type="text"
                        placeholder="https://exemplo.com/"
                        disabled={!props.values.online}
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
        <h1>Referência bibliográfica de artigo de periódico (ABNT)</h1>

        <p>
          Os artigos de periódico são trabalhos elaborados por pesquisadores e
          publicados em revistas científicas. Eles passam pela análise de
          especialistas na área e precisam se enquadrar nas políticas do
          editorial.
        </p>

        <p>
          Os periódicos possuem um número de identificação, conhecido como
          código ISSN (International Standard Serial Number). E cada artigo
          publicado pode ter o seu próprio DOI (Digital Object Identifier). Com
          esses elementos, que podem aparecer na referência, fica muito mais
          fácil identificar um documento.
        </p>

        <p>
          Os artigos de periódicos são encontrados em bases de dados confiáveis,
          como é o caso do Scielo e o Portal de Periódicos Capes. Só a
          biblioteca virtual da Coordenação de Aperfeiçoamento de Pessoal de
          Nível Superior possui mais de 45 mil periódicos.
        </p>

        <p>
          É permitido escrever títulos de periódicos por extenso ou abreviados,
          com todas as iniciais em maiúsculas. No segundo caso, as abreviaturas
          adotadas devem seguir o padrão mantido pelas bases de dados. Exemplos
          de título de periódico abreviado:
        </p>

        <ul>
          <li> Psicol. Reflex. Crít. - Psicologia: Reflexão e Crítica </li>
          <li> Audiol Commun Res - Audiology: Communication research </li>
          <li> Rev Saude Publica - Revista de Saúde Pública </li>
          <li> Lasers Med Sci - Lasers in Medical Science </li>
        </ul>

        <h2>Como referenciar artigo de periódico no trabalho?</h2>

        <p>O formato básico para referência de artigo de periódico:</p>

        <p>
          <mark>
            AUTOR, A. A.; AUTOR, B. B.; AUTOR, C. C. Título do artigo.{" "}
            <b>Título da revista</b>, local, volume, número, página inicial e
            final do artigo, mês. ano.
          </mark>
        </p>

        <h2>Elementos essenciais</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autoria:</b> nome do autor ou dos autores;{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> Título do artigo{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo:</b> se houver, incluir precedido por dois-pontos;{" "}
          </li>
          <li>
            {" "}
            <b>Título do periódico:</b> título da revista em destaque;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo de periódico:</b> se houver subtítulo, acrescentar;{" "}
          </li>
          <li>
            {" "}
            <b>Local de publicação:</b> cidade de publicação;{" "}
          </li>
          <li>
            {" "}
            <b>Volume:</b> incluir indicação de volume, seguido pelo número «v.
            3»;{" "}
          </li>
          <li>
            {" "}
            <b>Número e/ou edição:</b> número do fascículo «n. 3»{" "}
          </li>
          <li>
            {" "}
            <b>Páginas inicial e final:</b> intervalo de páginas;{" "}
          </li>
          <li>
            {" "}
            <b>Data ou período de publicação:</b> geralmente mês e ano.{" "}
          </li>
        </ul>

        <h2>Elementos complementares</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>DOI:</b> Digital Object Identifier{" "}
          </li>
          <li>
            {" "}
            <b>ISSN:</b> International Standard Serial Number{" "}
          </li>
        </ul>

        <img loading="lazy"
          src={elementoComplementares}
          alt="Elementos complementares para referência bibliográfica ABNT"
          width="100%"
        />

        <h2>Situações especiais</h2>

        <p>
          Quando um artigo científico está em fase de publicação, usa-se o termo
          "No prelo" na referência. Esse termo deve ser inserido depois do ano e
          antes do DOI.
        </p>

        <h2>Referência de periódico</h2>

        <p>
          Quando uma publicação periódica é referenciada em sua totalidade (e
          não apenas uma parte), o formato da referência bibliográfica é:
        </p>

        <p>
          TÍTULO DO PERIÓDICO. Local de publicação: Editora, ano de início-ano
          de encerramento. Notas. ISSN.
        </p>

        <h2>Exemplos aplicando o formato:</h2>

        <p>
          <mark>
            REVISTA BRASILEIRA DE GEOGRAFIA. Rio de Janeiro: IBGE, 1939- . ISSN
            0034-723X.
          </mark>
        </p>

        <p>
          <mark>
            CADERNO BRASILEIRO DE ENSINO DE FÍSICA. Florianópolis: Universidade
            Federal de Santa Catarina, 2008- . ISSN: 2175-7941. DOI
            10.5007/2175-7941. Disponível em:
            https://periodicos.ufsc.br/index.php/fisica/index. Acesso em: 20
            maio 2014.
          </mark>
        </p>

        <h2>Chamadas para citação</h2>

        <p>
          Ao referenciar outros autores no trabalho, é necessário usar uma
          chamada de citação, que segue o sistema de autor-data.
        </p>

        <p>
          Quando a chamada aparece dentro da sentença, o sobrenome do autor é
          colocado em letras minúsculas, seguido pelo ano de publicação entre
          parênteses. Por outro lado, se a chamada for feita no final do
          parágrafo, o formato da indicação é (SOBRENOME, ano).
        </p>

        <p>
          Adicionar o número da página de onde a citação foi extraída é uma
          forma de facilitar a identificação. Nesse caso, a formatação da
          chamada fica assim:
        </p>

        <p>
          <mark>Souza (2017, p. 14) ou (SOUZA, 2017, p.14).</mark>
        </p>

        <h2>E quando a citação está em páginas diferentes?</h2>

        <p>
          Quando uma citação se encontra em páginas diferentes, a recomendação é
          apresentar os números separados por um hífen.
        </p>

        <p>
          <mark>Souza (2017, p. 14-15) ou (SOUZA 2017, p. 14-15)</mark>
        </p>

        <img loading="lazy" src={chamadaCitacao} alt="Chamada para citação no sistema autor-data ABNT" width="100%" />
      </div>
      <RelatedLinks />

      <Footer />
    </>
  );
};

export default WorkArticlePeriodic;
