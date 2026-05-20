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

import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import chamadaCitacao from "../../../assets/images/explicativos/academicos/chamadas-para-citacao-tese.jpg";
import elementosComplementares from "../../../assets/images/explicativos/academicos/elementos_complementares_tese.jpg";
import elementosEssenciais from "../../../assets/images/explicativos/academicos/elementos_essenciais_tese (1).jpg";

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
  authors: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  location: Yup.string().required("Obrigatório"),
  institute: Yup.string().required("Obrigatório"),
  course: Yup.string().required("Obrigatório"),
  yearOfDelivery: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Tese: Referência ABNT";
  const {
    authors,
    abbreviate,
    title,
    caption,
    location,
    volume,
    pages,
    accessedAt,
    yearOfPublication,
    online,
    yearOfDelivery,
    url,
    institute,
    course,
    department,
    advisor,
  } = values;

  return (
    <span>
      {" "}
      {authors.length && formatAuthorName(authors, abbreviate)}
      {caption ? (
        <>
          <b>{title}: </b>
          {caption}.{" "}
        </>
      ) : (
        <b>{title}. </b>
      )}
      {advisor && `Orientador: ${advisor}. `}
      {yearOfDelivery && <> {yearOfDelivery}. </>}
      {volume && <> v. {volume},</>}
      {pages && <> {pages} f.</>}
      <> Tese (Doutorado) -</> {course && <>Curso de {course}, </>}
      {department && <>{department}, </>}
      {institute && <>{institute}, </>}
      {location ? <> {location}, </> : <>[s. l.], </>}
      {yearOfPublication && <> {yearOfPublication}. </>}
      {online && accessedAt && url && (
        <>
          {" "}
          Disponível em: {url}. Acesso em: {formatDate(accessedAt)}.{" "}
        </>
      )}
    </span>
  );
};
const Thesis = ({ back }) => {
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
        <Back
          onClick={() =>
            history.push("/trabalhos-academicos-e-publicacoes-periodicas")
          }
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            authors: [""],
            abbreviate: false,
            title: "",
            caption: "",
            location: "",
            volume: "",
            pages: "",
            accessedAt: "",
            yearOfPublication: "",
            online: false,
            yearOfDelivery: "",
            url: "",
            institute: "",
            course: "",
            advisor: "",
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
                    Referência de Tese
                  </p>
                  <span>
                    Trabalho acadêmico-científico apresentado para a conclusão
                    do Doutorado
                  </span>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={10}>
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
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="title"
                        label="Título da tese"
                        type="text"
                        placeholder="Nome da tese"
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
                        label="Subtítulo da tese"
                        type="text"
                        placeholder="Subtítulo da tese"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="advisor"
                        label="Orientador"
                        type="text"
                        placeholder="Nome do orientador"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.advisor}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
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
                        name="pages"
                        label="Folhas"
                        type="text"
                        placeholder="Ex: 20"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.page}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="institute"
                        label="Instituíção"
                        type="text"
                        placeholder="Ex: Universidade Federal..."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.institute}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="course"
                        label="Curso"
                        type="text"
                        placeholder="Ex: Arquitetura"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.course}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="department"
                        label="Departamento"
                        type="text"
                        placeholder="Ex: Centro urbano"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.department}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="yearOfDelivery"
                        label="Ano de entrega"
                        type="text"
                        placeholder="Ex: 2005"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfDelivery}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="yearOfPublication"
                        label="Ano de publicação"
                        type="text"
                        placeholder="Ex: 2005"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfPublication}
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
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="url"
                        label="Endereço (URL)"
                        type="text"
                        placeholder="https://viacarreira.com/"
                        disabled={!props.values.online}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="accessedAt"
                        type="date"
                        label="Data de acesso"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={!props.values.online}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accessedAt}
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
        <h1>Referência bibliográfica de tese (ABNT)</h1>

        <p>
          O doutorado é uma pós-graduação stricto sensu, que requer a defesa de
          uma tese para obter a titulação de doutor. Os cursos formam
          pesquisadores e professores universidades, por isso os trabalhos
          abordam temas de forma mais profunda e complexa.
        </p>

        <p>
          O autor de uma tese de doutorado já passou por uma graduação e um
          mestrado, portanto, domina a escrita científica e produz pesquisas com
          propriedade.
        </p>

        <p>
          A tese se diferencia da dissertação porque tem uma contribuição mais
          expressiva no que diz respeito ao problema de pesquisa. É necessário
          que o estudo desenvolvido contribua com algum avanço científico.
        </p>

        <p>
          Os acadêmicos encontram teses para consulta nas bibliotecas e também
          nos repositórios digitais das universidades.
        </p>

        <p>
          A organização da referência bibliográfica de uma tese deve seguir o
          seguinte formato:
        </p>

        <p>
          <span>
            SOBRENOME, Nome. <b>Título do trabalho.</b> Ano de defesa. número de
            folhas. Tipo de documento (Grau e Curso) - Instituição de ensino,
            Local de publicação, ano de publicação.
          </span>
        </p>

        <h2>Elementos essenciais</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autoria:</b> Sobrenome e nome do doutorando;{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> Título do trabalho acadêmico em destaque;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo:</b> escrever o subtítulo (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>Ano de depósito:</b> data de entrega do trabalho;{" "}
          </li>
          <li>
            {" "}
            <b>Tipo de trabalho entregue:</b> Tese;{" "}
          </li>
          <li>
            {" "}
            <b>Grau de formação:</b> Doutorado;{" "}
          </li>
          <li>
            {" "}
            <b>Curso:</b> Nome do curso de pós-graduação;{" "}
          </li>
          <li>
            {" "}
            <b>Instituição:</b> nome da universidade responsável pelo curso;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> Cidade de publicação;{" "}
          </li>
          <li>
            {" "}
            <b>Ano de defesa:</b> ano em que o trabalho foi defendido.{" "}
          </li>
        </ul>

        <img
          src={elementosEssenciais}
          alt="elementos-essenciais"
          width="100%"
        />

        <h2>Elementos complementares</h2>

        <p>
          Para melhorar a identificação do documento, são usados os elementos
          complementares.
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Departamento:</b> é a esfera administrativa do curso;{" "}
          </li>
          <li>
            {" "}
            <b>Orientador:</b> nome do professor responsável pela orientação;{" "}
          </li>
          <li>
            {" "}
            <b>Número de folhas:</b> quantidade de folhas, indicada com números
            arábicos e a abreviação «f. 89»{" "}
          </li>
        </ul>

        <img
          src={elementosComplementares}
          alt="elementos-completos"
          width="100%"
        />

        <h2>Chamadas para citação</h2>

        <p>
          Dentro da sentença, o sobrenome do autor tem apenas a inicial em
          maiúscula, seguida pelo ano de publicação da obra entre parênteses. No
          final do parágrafo, a citação é feita com o sobrenome em letras
          maiúsculas e entre parênteses, junto com o ano.
        </p>

        <img src={chamadaCitacao} alt="chamada-citacao" width="100%" />
      </div>
      <Footer />
    </>
  );
};

export default Thesis;
