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

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";
import Img from "../../../assets/images/explicativos/outros/referencia-abnt-mapa.jpg";

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

const SignupSchema = Yup.object().shape({
  typeAuthor: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  location: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  description: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    typeAuthor,
    author,
    authors,
    subordination,
    title,
    caption,
    location,
    editor,
    year,
    description,
    scale,
    online,
    accessedAt,
    url,
  } = values;

  const getTitle = (title) => {
    if (!title) return;
    const titleSplit = title.split(" ");
    return `${titleSplit[0].toUpperCase()} ${titleSplit.slice(1).join(" ")}`;
  };
  return (
    <span>
      {typeAuthor === "withoutAuthorship" ? (
        <>
          {caption ? (
            <>
              <>{getTitle(title)}: </>
              {caption}.{" "}
            </>
          ) : (
            <>{getTitle(title)}. </>
          )}
        </>
      ) : typeAuthor === "entity" ? (
        <>
          {author && <>{author.toUpperCase()}. </>}
          {subordination && <>{subordination}. </>}
          {caption ? (
            <>
              <b>{title}: </b>
              {caption}.{" "}
            </>
          ) : (
            <b>{title}. </b>
          )}
        </>
      ) : typeAuthor === "physicalPerson" ? (
        <>
          {authors && <>{formatAuthorName(authors)}</>}

          {caption ? (
            <>
              <b>{title}: </b>
              {caption}.{" "}
            </>
          ) : (
            <b>{title}. </b>
          )}
        </>
      ) : (
        formatAuthorName(authors)
      )}
      {editor ? (
        <>
          {location}: {editor},{" "}
        </>
      ) : (
        <>{location}, </>
      )}
      {year && <>{year}. </>}
      {description && <>{description}. </>}
      {scale && <>{scale}. </>}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

// in case we need it
// eslint-disable-next-line no-unused-vars
const getTypeAuthor = (type) => {
  switch (type) {
    case "physicalPerson":
      return "Pessoa física";
    case "entity":
      return "Entidade";
    case "withoutAuthorship":
      return "Sem autoria";
    default:
      break;
  }
};

const Maps = ({ back }) => {
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
        <Back onClick={() => history.push("/outros")} src={ArrowLeft} />

        <Formik
          initialValues={{
            typeAuthor: "",
            author: "",
            authors: [""],
            subordination: "",
            title: "",
            caption: "",
            location: "",
            editor: "",
            year: "",
            description: "",
            scale: "",
            online: false,
            accessedAt: "",
            url: "",
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
                    Mapas
                  </p>
                  <span>
                    Inclui atlas, globo, fotografia aérea e outros documentos
                    cartográficos
                  </span>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Select
                        name="typeAuthor"
                        label="Tipo de autor"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.typeAuthor}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: "physicalPerson", name: "Pessoa física" },
                          { value: "entity", name: "Entidade" },
                          { value: "withoutAuthorship", name: "Sem autoria" },
                        ]}
                      />
                    </Grid>
                    {props.values.typeAuthor !== "physicalPerson" ? (
                      <Grid item xs={12} sm={12} md={5}>
                        <Input
                          disabled={
                            props.values.typeAuthor === "withoutAuthorship"
                          }
                          name="author"
                          type="text"
                          label="Nome do autor"
                          placeholder="Ex: Santa Catarina"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.author}
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={12} md={12}>
                        <FieldArray
                          name="authors"
                          render={(arrayHelpers) => (
                            <div>
                              {props.values.authors &&
                              props.values.authors.length > 0 ? (
                                props.values.authors.map(
                                  (chapterAuthor, index) => (
                                    <FieldArrayContainer key={index}>
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "100%",
                                        }}
                                      >
                                        <Input
                                          type="text"
                                          label={`Nome do autor ${index + 1}`}
                                          placeholder="Ex: Raquel Recuero"
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                          value={chapterAuthor}
                                          name={`authors.${index}`}
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
                                            onClick={() =>
                                              arrayHelpers.push("")
                                            }
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
                                            props.errors.authors &&
                                            props.errors.authors[index]}
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
                    )}
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="subordination"
                        type="text"
                        label="Subordinação"
                        placeholder="Ex: Departamento Estadual de Geografia e Cartografia"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.subordination}
                        errors={props.errors}
                        touched={props.touched}
                        disabled={props.values.typeAuthor !== "entity"}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="title"
                        type="text"
                        label="Título"
                        placeholder="Ex: Mapa geral do Estado de Santa Catarina"
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
                        type="text"
                        label="Subtítulo"
                        placeholder="Ex: nome do subtítulo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="location"
                        type="text"
                        label="Local"
                        placeholder="Ex: Florianópolis"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="editor"
                        type="text"
                        label="Editora"
                        placeholder="Ex: responsável pela publicação"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.editor}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="year"
                        type="text"
                        label="Data de publicação"
                        placeholder="Ex: 1958"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="description"
                        type="text"
                        label="Descrição física"
                        placeholder="Ex: 1 mapa, 78 x 57 cm"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.description}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="scale"
                        type="text"
                        label="Escala"
                        placeholder="Ex: Escala: 1:800:000"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.scale}
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
                        disabled={!props.values.online}
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
                        disabled={!props.values.online}
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
                  // citationWithAuthor={state.citationWithAuthor}
                  // citation={state.citation}
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
        <h1>Referência bibliográfica de mapa (ABNT)</h1>

        <p>
          A ABNT ensina como fazer referência bibliográfica de mapa na NBR 6023.
          As mesmas regras de normatização são adotadas em outros documentos
          cartográficos, como é o caso de atlas, globo terrestre, carta
          topográfica, imagem de satélite e fotografia aérea.
        </p>

        <p>
          O mapa é a representação gráfica da superfície da terra ou parte dela.
          Ele mostra de forma precisa a localização de bairros, cidades,
          montanhas, rios, mares, etc. Na hora de montar a referência, é muito
          importante observar o tipo de autor para não errar.
        </p>

        <h3>Elementos</h3>

        <p>Os elementos essenciais são:</p>

        <ul>
          <li> Autor: responsável pela autoria; </li>
          <li> Subordinação: se houver; </li>
          <li> Título: título do mapa; </li>
          <li> Subtítulo: se houver; </li>
          <li> Local: cidade de publicação; </li>
          <li> Editora: responsável pela publicação; </li>
          <li> Data: ano de publicação; </li>
          <li> Especificações do suporte: descrição física e escala. </li>
        </ul>

        <p>
          Quando o local ou o ano não aparece no documento, mas de alguma forma
          pode ser identificado, é necessário indicá-lo entre colchetes.
          Exemplo: [Curitiba].
        </p>

        <p>
          Elementos complementares, que não são obrigatórios, podem ser
          acrescentados na referência para melhorar a identificação do
          documento.
        </p>

        <h3>Estrutura</h3>

        <p>
          <mark>
            AUTOR. Subordinação (se houver). <b>Título</b>: subtítulo. Local:
            Editora, data. Descrição física. Escala.
          </mark>
        </p>

        <h3>Tipo de autor &gt;&gt; pessoa física</h3>

        <p>
          Quando o mapa é elaborado por pessoa física, a referência é iniciada
          com o SOBRENOME, Prenome de cada autor. O título do mapa recebe
          destaque.
        </p>

        <p>
          <mark>
            SOUZA, José Clóvis; COSTA, Sandra Pereira.{" "}
            <b>Mapa do bairro Santa Elizabeth II.</b> Avaré, 2018. 1 mapa 78 x
            57 cm.
          </mark>
        </p>

        <h3>Tipo de autor &gt;&gt; entidade coletiva</h3>

        <p>
          Os mapas geralmente são produzidos por entidades coletivas, como
          empresas, institutos e órgãos governamentais. Neste caso, o nome do
          autor é escrito por extenso, em ordem direta, em LETRAS MAIÚSCULAS. Há
          destaque no título do mapa.
        </p>

        <h3>Exemplo:</h3>

        <p>
          <mark>
            INSTITUTO GEOGRÁFICO E CARTOGRÁFICO (São Paulo).{" "}
            <b>Regiões de governo do Estado de São Paulo.</b> São Paulo: IGC,
            1994. 1 atlas. Escala 1:2.000.
          </mark>
        </p>
        <p>
          <mark>
            BRASIL. Ministério do Exército. <b>Aceguá e Arroio São Miguel.</b>
            Brasília: DSG, 1980. 1 mapa, color., 79 x 95 cm. Escala 1: 50.000.
          </mark>
        </p>

        <h3>Tipo de autor &gt;&gt; sem autoria</h3>

        <p>
          Quando não há uma autoria declarada no documento cartográfico, a
          referência começa pelo título do documento, sendo a primeira palavra
          escrita com LETRAS MAIÚSCULAS. Não há negrito.
        </p>

        <h3>Exemplo:</h3>

        <p>
          <mark>
            BRASIL e parte da América do Sul: mapa político, escolar,
            rodoviário, turístico e regional. São Paulo: Michalany, 1981. 1
            mapa, color., 79 × 95 cm. Escala 1:600.000.
          </mark>
        </p>

        <img src={Img} alt="mapas" width="100%" />

        <h3>Mapa consultado em meio eletrônico</h3>

        <p>
          Quando o mapa é consultado em meio eletrônico, deve-se fazer a
          descrição física. Além de documentos online, também existem documentos
          em CD-ROM, pendrive, disquete, HD externo, etc.
        </p>

        <p>
          Numa consulta pela internet, a referência precisa conter dados de
          disponibilidade e acesso.
        </p>

        <h3>Exemplo:</h3>

        <p>
          <mark>
            FLORIDA MUSEUM OF NATURAL HISTORY. 1931-2000{" "}
            <b>Brazil’s confrmed unprovoked shark attacks.</b> Gainesville:
            Florida Museum of Natural History, [2000?]. 1 mapa, color. Escala
            1:40.000.000. Disponível em: http://www.fmnh.uf.edu/ fsh/Sharks/
            statistics/Gattack/map/Brazil.jpg. Acesso em: 15 jan. 2002.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Maps;
