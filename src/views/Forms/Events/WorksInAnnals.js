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
import { formatMessage } from "../../../utils/formatMessage";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";
import Img from "../../../assets/images/explicativos/evento/referencia-abnt-trabalhos-em-anais.jpg";

// styles
import {
import RelatedLinks from "../../../components/RelatedLinks";
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
  workTitle: Yup.string().required("Obrigatório"),
  eventName: Yup.string().required("Obrigatório"),
  placeOfEvent: Yup.string().required("Obrigatório"),
  documentTitle: Yup.string().required("Obrigatório"),
  placeOfPublication: Yup.string().required("Obrigatório"),
  responsibility: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Trabalhos em Anais: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Referência de trabalhos em anais de eventos conforme a ABNT NBR 6023:2018. Ferramenta gratuita.");
  const {
    authors,
    abbreviate,
    workTitle,
    caption,
    eventName,
    eventNumber,
    eventYaer,
    eventNumbering,
    placeOfEvent,
    documentTitle,
    placeOfPublication,
    responsibility,
    yearOfPublication,
    specification,
    volume,
    pageInit,
    pageFinish,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {authors && <>{formatAuthorName(authors, abbreviate)}</>}
      {caption ? <>{`${workTitle}: ${caption}. `}</> : `${workTitle}. `}

      {eventName && (
        <>
          <i>In:</i> {eventName.toUpperCase()},{" "}
        </>
      )}
      {eventNumber && <>{eventNumber}., </>}
      {eventYaer && <>{eventYaer}, </>}
      {eventNumbering && <>{eventNumbering}., </>}
      {placeOfEvent && <>{placeOfEvent}. </>}

      {documentTitle && (
        <>
          <b>{documentTitle}</b> [...].{" "}
        </>
      )}
      {placeOfPublication && <>{placeOfPublication}: </>}
      {responsibility && <>{responsibility}, </>}
      {yearOfPublication && <>{yearOfPublication}. </>}

      {volume && `v. ${volume}, `}
      {pageInit && !pageFinish && `p. ${pageInit}, `}
      {pageInit && pageFinish && `p. ${pageInit}-${pageFinish}, `}

      {specification && <>{specification}. </>}

      {online && <>{online}</>}
      {online &&
        url &&
        accessedAt &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const WorksInAnnals = ({ back }) => {
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
          onClick={() => history.push("/eventos-patentes-e-normas-tecnicas")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            authors: [""],
            abbreviate: false,
            workTitle: "",
            caption: "",
            eventName: "",
            eventNumbering: "",
            eventYaer: "",
            placeOfEvent: "",
            documentTitle: "",
            placeOfPublication: "",
            responsibility: "",
            yearOfPublication: "",
            specification: "",
            volume: "",
            pageInit: "",
            pageFinish: "",
            online: false,
            url: "",
            accessedAt: "",

            eventNumber: "",
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
                    Trabalhos em anais
                  </p>
                  <div>Inclui anais, resumos e proceedings</div>
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
                              props.values.authors.map(
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
                                        name={`authors.${index}`}
                                        label={`${index + 1}º Autor`}
                                        type="text"
                                        placeholder="Nome do autor"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={constructionName}
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
                        name="workTitle"
                        label="Título do trabalho"
                        type="text"
                        placeholder="Ex: Avaliação do efeito da fototerapia com laser no crescimento de fibroblastos gengivais de pacientes com Síndrome
                      de Down"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.workTitle}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="caption"
                        label="Subtítulo"
                        type="text"
                        placeholder="Ex: Subtítulo (se houver)"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="eventName"
                        label="Nome do evento"
                        type="text"
                        placeholder="Ex: Congresso Brasileiro de Periodontologia"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.eventName}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="eventNumber"
                        label="Numeração do evento"
                        type="text"
                        placeholder="Ex: 112"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.eventNumber}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="eventYaer"
                        label="Ano de realização"
                        type="text"
                        placeholder="Ex: 2017"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.eventYaer}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="placeOfEvent"
                        label="Local do evento"
                        type="text"
                        placeholder="Ex: São Paulo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.placeOfEvent}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="documentTitle"
                        label="Título do Documento"
                        type="text"
                        placeholder="Ex: Anais"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.documentTitle}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="placeOfPublication"
                        label="Local da publicação"
                        type="text"
                        placeholder="Ex: Belo Horizonte"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.placeOfPublication}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="responsibility"
                        label="Responsabilidade da publicação"
                        type="text"
                        placeholder="Ex: Sociedade Brasileira de Periodontologia"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responsibility}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="yearOfPublication"
                        label="Ano de publicação"
                        type="text"
                        placeholder="Ex: 2017"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfPublication}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="specification"
                        label="Especificação do trabalho"
                        type="text"
                        placeholder="Trabalho 149/1085-0"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specification}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="volume"
                        label="Volume"
                        type="text"
                        placeholder="Ex: 2"
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
                        label="Página Inicial"
                        type="text"
                        placeholder="Ex: 45"
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
                        placeholder="Ex: 65"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pageFinish}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
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
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
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
                    <Grid item xs={12} sm={12} md={8}>
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
                  citation={state.citation}
                  citationWithAuthor={state.citationWithAuthor}
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
        <h1>Referência de trabalhos em anais (ABNT)</h1>
        <p>
          Anais, publicados em eventos, servem de fonte de pesquisa nos
          trabalhos acadêmicos. O autor só precisa se atentar à NBR 6023:2018
          para não errar na formatação da referência bibliográfica.
        </p>

        <h2>O que são os trabalhos em anais?</h2>

        <p>
          Anais são coleções de trabalhos acadêmicos publicados no contexto de
          um{" "}
          evento científico.{" "}
          Eles são frequentes em congressos, mas também podem fazer parte de
          conferências, encontros, workshops e{" "}
          simpósios.
        </p>

        <p>
          Os anais se diferem dos livros tradicionais porque cada livro é
          escrito por um pesquisador diferente, sem o compromisso de existir uma
          continuidade entre os trabalhos publicações.
        </p>

        <p>
          Os eventos disponibilizam os anais antes do início ou após a
          conclusão. Esses documentos podem ser impressos ou consultados de
          forma eletrônica.
        </p>

        <p>
          Nem todos os trabalhos publicados em eventos entram para os anais.
          Para que isso aconteça, a produção acadêmica precisa ser avaliada e
          aprovada por pesquisadores de renome da área. Portanto, consultar
          trabalhos em anais é uma fonte segura para a{" "}
          fundamentação teórica.
        </p>

        <h2>O que diz a ABNT sobre referência de trabalhos em anais?</h2>

        <ul style={{ marginLeft: 15 }}>
          <li> Autoria do trabalho: SOBRENOME e prenome do autor </li>
          <li> Título do trabalho: Título do trabalho publicado </li>
          <li>
            {" "}
            Expressão <i>In</i>: sinaliza "dentro de"{" "}
          </li>
          <li> Nome do evento: em ordem direta e LETRAS MAIÚSCULAS; </li>
          <li> Numeração do evento: em algarismos arábicos; </li>
          <li> Ano de realização: data em que ocorreu o evento. </li>
          <li> Cidade de realização: local onde o evento foi realizado; </li>
          <li> Título da publicação: Título do documento em destaque; </li>
          <li> Local da publicadora: local onde fica a publicadora; </li>
          <li>
            {" "}
            Responsabilidade da publicação: entidade que publicou o trabalho;{" "}
          </li>
          <li>
            {" "}
            Especificação do trabalho: código identificador do trabalho, volume,
            página inicial e final, entre outras descrições.{" "}
          </li>
        </ul>

        <p>
          Após colocar o título do documento em destaque, o autor precisa
          incluir reticências entre colchetes para suprir o título do evento que
          já foi mencionado na referência.
        </p>

        <h2>E no caso de anais consultados online?</h2>

        <p>
          A maioria dos trabalhos em anais é consultada de forma online. Se esse
          for o seu caso, é importante incluir o endereço eletrônico onde o
          documento está disponível, precedido da expressão "Disponível em". Em
          seguida vem a data de acesso, com o mês abreviado e precedida de
          "Acesso em".
        </p>

        <h2>Exemplos</h2>

        <img loading="lazy" src={Img} alt="Exemplo de referência de trabalho em anais de evento ABNT" width="100%" />

        <p>
          <mark>
            OYADOMARI, A. T. <i>et al.</i> Efeitos da terapia por laser de baixa
            potência no processo de reparo de defeitos ósseos preenchidos pelo
            osso bovino Bio-Oss® associados ao novo selante heterólogo de
            fibrina. <i>In</i>: SIMPÓSIO INTERNACIONAL DE INICIAÇÃO CIENTÍFICA
            DA UNIVERSIDADE DE SÃO PAULO, 25., 2017, Bauru. <b>Resumos</b>{" "}
            [...]. São Paulo: Universidade de São Paulo, 2017.
          </mark>
        </p>
      </div>
      <RelatedLinks />

      <Footer />
    </>
  );
};

export default WorksInAnnals;
