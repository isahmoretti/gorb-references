import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";
import { Button as ButtonCore } from "@material-ui/core";

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
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

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
  ErrorText,
  AddIcon,
  RemoveIcon,
} from "./style";

import Img from "../../../assets/images/explicativos/audiolivro/referencia-abnt-audiolivro.jpg";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  ledor: Yup.string().required("Obrigatório"),
  publication: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  specification: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Audiolivro: Referência ABNT";
  const {
    title,
    caption,
    authors,
    ledor,
    location,
    publication,
    year,
    specification,
    online,
    url,
    accessedAt,
  } = values;

  const handleToUpperCase = (text = "") => {
    const [frist] = text.split(" ");

    return text.replace(frist, frist.toUpperCase());
  };

  return (
    <span>
      {formatAuthorName(authors)}
      {caption ? (
        <span>
          {" "}
          {authors.length !== 0 && authors[0] !== "" ? (
            <>
              <b>{title}: </b>
            </>
          ) : (
            <>{title}: </>
          )}
          {`${caption}. `}{" "}
        </span>
      ) : authors.length !== 0 && authors[0] !== "" ? (
        <>
          <b>{title}. </b>
        </>
      ) : (
        <>{title}. </>
      )}
      {`Na voz de ${ledor}. `}
      {location ? `${location}: ` : "[S.l.]: "}
      {`${publication}, `}
      {`${year}. `}
      {`1 audiolivro ${specification}. `}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const AudioBook = ({ back }) => {
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
            title: "",
            caption: "",
            authors: [""],
            ledor: "",
            location: "",
            publication: "",
            year: "",
            specification: "",
            online: "",
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
                    Audiolivro
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
                        name="title"
                        type="text"
                        label="Título"
                        placeholder="Ex: 1822"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="caption"
                        type="text"
                        label="Subtítulo"
                        placeholder="Ex: Subtítulo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
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
                                      type="text"
                                      label={`${index + 1}º Autor`}
                                      name={`authors.${index}`}
                                      placeholder={`Ex: Laurentino Gomes`}
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={author}
                                      errors={props.errors}
                                      touched={props.touched}
                                    />
                                    {index > 0 && (
                                      <ButtonCore
                                        type="button"
                                        onClick={() => arrayHelpers.remove("")}
                                      >
                                        <RemoveIcon src={Minus} />
                                      </ButtonCore>
                                    )}
                                    <ButtonCore
                                      type="button"
                                      onClick={() => arrayHelpers.push("")}
                                    >
                                      <AddIcon src={Plus} />
                                    </ButtonCore>
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
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="ledor"
                        type="text"
                        label="Ledor"
                        placeholder="Ex: Pedro Bial"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.ledor}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="location"
                        type="text"
                        label="Local"
                        placeholder="Ex: São Paulo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="publication"
                        type="text"
                        label="Publicadora"
                        placeholder="Ex: Plugme"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publication}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="year"
                        type="text"
                        label="Ano de publicação"
                        placeholder="Ex: 2011"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="specification"
                        type="text"
                        label="Especificação do suporte físico"
                        placeholder="Ex: CD-ROM"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specification}
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
                        placeholder="https://viacarreira.com/"
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
        <h1>Referência bibliográfica de audiolivro</h1>
        <p>
          A ABNT apresenta as recomendações de referência bibliográfica para
          audiolivro na seção 7.13.3 da NBR 6023:2018, que fala a respeito de
          documento sonoro no todo.
        </p>
        <p>
          A norma determina que, para referenciar um audiobook, é necessário
          informar autor da obra, título, ledor, empresa responsável pela
          gravação, entre outras informações consideradas essenciais.
        </p>
        <p>
          Quando há indicação de autor do audiolivro, a regra pede para iniciar
          a referência com o nome do autor do livro. Desse modo, o título da
          obra recebe destaque em negrito.
        </p>
        <p>
          Na ausência de autoria declarada, inicia-se com o título da obra por
          extenso, sendo a primeira palavra em letras maiúsculas. Não há
          negrito.
        </p>
        <p>
          <h2>Elementos essenciais na referência de audiolivro</h2>
        </p>
        <p>
          <ul style={{ marginLeft: 15 }}>
            <li>
              {" "}
              <b>Título:</b> Título do audiobook;{" "}
            </li>
            <li>
              {" "}
              <b>Subtítulo:</b> Subtítulo (se houver){" "}
            </li>
            <li>
              {" "}
              <b>Autoria:</b> Nome do autor da obra;{" "}
            </li>
            <li>
              {" "}
              <b>Ledor:</b> Nome do responsável pela narração;{" "}
            </li>
            <li>
              {" "}
              <b>Local:</b> Cidade de origem da gravadora;{" "}
            </li>
            <li>
              {" "}
              <b>Publicadora:</b> nome da gravadora;{" "}
            </li>
            <li>
              {" "}
              <b>Ano:</b> ano de lançamento;{" "}
            </li>
            <li>
              {" "}
              <b>Especificações do suporte:</b> se é online ou CD, por exemplo.{" "}
            </li>
          </ul>
        </p>
        <p>
          Quando o local de gravação é desconhecido, utiliza-se a expressão [S.
          l.], que significa sine loco. O GORB se encarrega de inserir isso
          automaticamente para você não se preocupe.
        </p>
        <p>
          <h2>Formato básico</h2>
        </p>
        <p>
          <mark>
            SOBRENOME, Nome. <b>Título</b>: Subtítulo. Na voz de Nome do ledor.
            Local: Publicadora, ano. 1 audiolivro (Especificação do suporte).
          </mark>
          <br />
          <br />
          ou
          <br />
          <br />
          <mark>
            TÍTULO da obra: Subtítulo. Na voz de Nome do ledor. Local:
            Publicadora, ano. 1 audiolivro (Especificação do Suporte).
          </mark>
        </p>

        <p>
          <h2>Exemplos aplicando o formato</h2>
        </p>
        <img src={Img} alt="audio-livro" width="100%" />
        <p>
          <mark>
            GOMES, Laurentino. <b>1822.</b> Na voz de Pedro Bial. [S. l.]:
            Plugme, 2011. 1 audiolivro (CD-ROM).
          </mark>
          <br />
          <br />
          <mark>
            BÍBLIA em áudio: novo testamento. Na voz de Cid Moreira. Brasília:
            Sociedade Bíblica do Brasil, 2010. 1 audiolivro (Disco blue-ray).
          </mark>
          <br />
          <br />
          <mark>
            BAUM, L. F. <b>The wonderful land of Oz.</b> Ledor: Roy Trumbull.
            [S. l.]: Project Gutenberg, 2005. 1 audiolivro (CD-ROM), extensão
            MP3 (4 MB).
          </mark>
        </p>

        <p>
          <h2>E quando o audiolivro está disponível na internet?</h2>
        </p>
        <p>
          Quando a consulta ao audiobook ocorre online, é necessário especificar
          a URL e a data de acesso. O primeiro elemento vem precedido da
          expressão "Disponível em". Já o segundo elemento é precedido de
          "Acesso em".
        </p>
        <p>Veja exemplos:</p>
        <p>
          <mark>
            LOBATO, Monteiro. <b>Narizinho Arrebitado.</b> Na voz de Paola
            Molinari, Clayton Heringer, Juscelino Filho. [S.l.]: Tocalivros
            Studios, 2020. 1 audiolivro (online). Disponível em:
            https://www.tocalivros.com/audiolivro/narizinho-arrebitado-monteiro-lobato-paola-molinari-clayton-heringer-j-tocalivros-studios.
            Acesso em: 30 out. 2020.
          </mark>
          <br />
          <br />
          <mark>
            ASSIS, Machado de. <b>Memórias Póstumas de Brás Cubas.</b> Na voz de
            Rafael Cortez. [S.l.]: Audible, 2019. 1 audiolivro (com 6h14 min).
            Disponível em: https://stories.audible.com/pdp/B00U2S7BSO. Acesso
            em: 30 out. 2020.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AudioBook;
