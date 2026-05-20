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
import Img from "../../../assets/images/explicativos/evento/referencia-abnt-trabalhos-de-eventos-publicados-em-revistas.jpg";

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
  periodicTitle: Yup.string().required("Obrigatório"),
  place: Yup.string().required("Obrigatório"),
  // number: Yup.string().required("Obrigatório"),
  eventNumber: Yup.string().required("Obrigatório"),
  eventName: Yup.string().required("Obrigatório"),
  locationOfTheEvent: Yup.string().required("Obrigatório"),
  eventYear: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Trabalho de Evento em Revista: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Referência de trabalhos de eventos publicados em revistas conforme a ABNT NBR 6023:2018. Gratuito.");
  const {
    authors,
    abbreviate,
    workTitle,
    caption,
    periodicTitle,
    periodicCaption,
    place,
    volume,
    number,
    supplement,
    pageInit,
    pageFinish,
    date,
    eventNumber,
    eventName,
    locationOfTheEvent,
    eventYear,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {authors.length && formatAuthorName(authors, abbreviate)}
      {caption ? <>{`${workTitle}: ${caption}. `}</> : `${workTitle}. `}
      {periodicTitle && <b>{`${periodicTitle}`}</b>}
      {periodicCaption ? `: ${periodicCaption}, ` : ", "}
      {place && <>{place}, </>}
      {volume && `v. ${volume}, `}
      {number && <>n. {number}, </>}
      {pageInit && !pageFinish && `p. ${pageInit}, `}
      {pageInit && pageFinish && `p. ${pageInit}-${pageFinish}, `}
      {date && `${date} `}
      {supplement && <>​{supplement}. </>}
      {eventNumber && eventName && (
        <>
          Trabalho apresentado no {eventNumber}° {eventName},&nbsp;
        </>
      )}
      {locationOfTheEvent && <>{locationOfTheEvent}, </>}
      {eventYear && <>{eventYear}. </>}
      {online &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const EventsWorkPublishedInMagazines = ({ back }) => {
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
        values.eventYear
      ),
      citation: generateCitationWithoutAuthor(values.authors, values.eventYear),
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
            periodicTitle: "",
            periodicCaption: "",
            place: "",
            volume: "",
            number: "",
            supplement: "",
            pageInit: "",
            pageFinish: "",
            date: "",
            eventNumber: "",
            eventName: "",
            locationOfTheEvent: "",
            eventYear: "",
            online: false,
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
                    Trabalhos de eventos publicados em revistas
                  </p>
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
                        placeholder="Ex: Avaliação do professor realizada pelo aluno: impacto nas práticas docentes"
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
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="periodicTitle"
                        label="Titulo do periódico"
                        type="text"
                        placeholder="Ex: Revista Brasileira de Educação Médica"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.periodicTitle}
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
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="place"
                        label="Local de publicação"
                        type="text"
                        placeholder="Ex: Belo Horizonte"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.place}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="volume"
                        label="Volume"
                        type="text"
                        placeholder="Ex: 35"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.volume}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="number"
                        label="Número"
                        type="text"
                        placeholder="Ex: 4"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.number}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="pageInit"
                        label="Página inicial"
                        type="text"
                        placeholder="Ex: 141"
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
                        placeholder="Ex: 142"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pageFinish}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="date"
                        type="text"
                        label="Data"
                        placeholder="nov. 2006"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.date}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="supplement"
                        label="Suplemento"
                        type="text"
                        placeholder="Ex: supl. 1"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.supplement}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="eventNumber"
                        label="Número do evento"
                        type="text"
                        placeholder="Ex: 49"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.eventNumber}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="eventName"
                        label="Nome do evento"
                        type="text"
                        placeholder="Ex: Congresso Brasileiro de Educação Médica"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.eventName}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="locationOfTheEvent"
                        label="Local de realização do evento"
                        type="text"
                        placeholder="Ex: Belo Horizonte"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.locationOfTheEvent}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="eventYear"
                        label="Ano"
                        type="text"
                        placeholder="Ex: 2011"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.eventYear}
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
          Referência de trabalhos de eventos publicados em revistas (ABNT)
        </h1>
        <p>
          Um trabalho de evento pode contar com uma publicação formal em revista
          científica, ganhando assim mais credibilidade e relevância no meio
          acadêmico. O processo de aprovação é burocrático e criterioso, por
          isso esses documentos agregam valor à bibliografia.
        </p>
        <p>
          Na NBR 6023, a Associação Brasileira de Normas Técnicas (ABNT) fala
          sobre esse tipo de documento no tópico "Parte de evento em publicação
          periódica".
        </p>

        <h2>Elementos essenciais</h2>
        <p>
          A identificação de trabalhos de eventos publicados em revistas
          científicas requer elementos essenciais:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li> Autoria: SOBRENOME, Nome do autor; </li>
          <li> Título do trabalho: título do trabalho publicado; </li>
          <li> Subtítulo: (se houver) </li>
          <li>
            {" "}
            Título da publicação: nome da revista científica em destaque;{" "}
          </li>
          <li> Local de publicação: cidade da publicadora; </li>
          <li> Numeração: (se houver) </li>
          <li> Página inicial-final: indicação de páginas; </li>
          <li> Data de publicação: período em que ocorreu a publicação; </li>
          <li> Suplemento: indica apenas relação editorial e não física; </li>
        </ul>

        <p>
          Os dados do evento são inseridos no final da referência, no formato de
          nota. As informações essenciais são número, nome, ano de realização e
          local do evento.
        </p>

        <h2>Título da revista e edição</h2>

        <p>
          O título da revista científica pode ser abreviado, desde que respeite
          o padrão definido pelas bases de dados, como é o caso da{" "}
          Medline{" "}
          e LILACS.
        </p>

        <p>
          Caso apareça a edição no documento, é importante transcrevê-la para a
          referência, com número ordinal e a palavra edição abreviada, conforme
          o idioma do documento.
        </p>

        <p>
          Para periódicos científicos em inglês, por exemplo, as edições são
          expressas assim:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li> 1st ed. </li>
          <li> 2nd ed. </li>
          <li> 3rd ed. </li>
          <li> 15th ed. </li>
        </ul>

        <h2>Data de publicação</h2>

        <p>
          Os periódicos científicos podem ser publicados mensalmente,
          semestralmente e até anualmente.
        </p>

        <p>
          Na data da publicação, se houver intervalos de meses, deve-se indicar
          com uma barra oblíqua. Exemplo: set./dez 2020.
        </p>

        <h2>Disponibilidade e acesso</h2>

        <p>
          Em caso de documentos consultados online, é necessário incluir o
          endereço eletrônico e a data de acesso. Essas informações, inseridas
          na última parte da referência bibliográfica, devem ser precedidas de
          "Disponível em:" e "Acesso em:", respectivamente.
        </p>

        <img loading="lazy" src={Img} alt="Exemplo de referência de trabalho de evento publicado em revista ABNT" width="100%" />

        <p>
          Quando se diz "meio eletrônico", a internet não é a única opção. A
          consulta ao documento pode ser realizada por CD-ROM, disquete,
          pen-drive ou HD externo. Nesse caso, é necessário indicar uma
          descrição do meio físico no final da referência.
        </p>

        <h2>Mais exemplos</h2>

        <p>
          <mark>
            ALMEIDA, M. T. <i>et al.</i> Avaliação do professor realizada pelo
            aluno: impacto nas práticas docentes: impacto nas práticas docentes.{" "}
            <b>Rev. Bras. Educ. Méd.</b>, Rio de Janeiro, v. 35, n. 4, p.
            141-142, set./dez. 2011. ​supl. 1. Trabalho apresentado no 49°
            Congresso Brasileiro de Educação Médica, Belo Horizonte, 2011.
          </mark>
        </p>

        <p>
          <mark>
            AZENHA, F. S. P; FERRARI, D. V.. Acceptable noise level (ANL):
            results with different stimuli. <b>J Appl Oral Sci</b>, Bauru, v.
            24, p. 219, 2016. ​Special Issue. Trabalho apresentado no 23°
            Congresso Fonoaudiológico de Bauru “Profa. Dra. Adréa Cintra Lopes,
            Bauru, 2016.
          </mark>
        </p>
      </div>
      <RelatedLinks />

      <Footer />
    </>
  );
};

export default EventsWorkPublishedInMagazines;
