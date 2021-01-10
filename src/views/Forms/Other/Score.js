import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Select from "../../../components/InputWrapper/Select";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";

// utils
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { formatDate } from "../../../utils/formatDate";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/outros/referencia-abnt-partitura.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  compositor: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  instrument: Yup.string().required("Obrigatório"),
  editor: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  description: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    compositor,
    title,
    caption,
    instrument,
    location,
    editor,
    year,
    description,
    online,
    accessedAt,
    url,
  } = values;

  return (
    <span>
      {compositor && <>{formatAuthorName(compositor)}</>}
      {caption ? (
        <>
          <b>{title}: </b>
          {caption}.{" "}
        </>
      ) : (
        <b>{title}. </b>
      )}
      {instrument && <>{instrument}. </>}
      {location ? (
        <>
          <>{location}: </>
          {editor}.{" "}
        </>
      ) : (
        <>{editor}. </>
      )}
      {year && <>{year}. </>}
      {description && <>{description}. </>}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const Score = ({ back }) => {
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
        values.compositor,
        values.year
      ),
      citation: generateCitationWithoutAuthor(values.compositor, values.year),
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
            compositor: "",
            title: "",
            caption: "",
            instrument: "",
            location: "",
            editor: "",
            year: "",
            description: "",
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
                    PARTITURA
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
                        name="compositor"
                        type="text"
                        label="Compositor"
                        placeholder="Ex: Chiquinha Gonzaga"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.compositor}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="title"
                        type="text"
                        label="Título"
                        placeholder="Ex: GAÚCHO"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="caption"
                        type="text"
                        label="Subtítulo"
                        placeholder="Ex: O Corta Jaca da revista de costumes e fatos nacionais e estrangeiros CÁ E LÁ"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="instrument"
                        type="text"
                        label="Instrumento ao qual se destina"
                        placeholder="Ex: Piano"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.instrument}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="location"
                        type="text"
                        label="Local"
                        placeholder="Ex: Rio de Janeiro"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="editor"
                        type="text"
                        label="Editor"
                        placeholder="Ex: Acervo digital Chiquinha Gonzaga"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.editor}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="year"
                        type="text"
                        label="Ano"
                        placeholder="Ex: 1997"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={10}>
                      <Input
                        name="description"
                        type="text"
                        label="Descrição"
                        placeholder="Ex: 1 partitura"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.description}
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
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
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
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        disabled={!props.values.online}
                        name="url"
                        label="Disponível em"
                        type="text"
                        placeholder="http://www.chiquinhagonzaga.com/acervo/?musica=gaucho&post_id=1463"
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
        <h1>Referência bibliográfica de partitura (ABNT)</h1>

        <p>
          A referência de partitura é abordada pela NBR 6023 na parte de
          documentos audiovisuais. O item 7.14 explica quais são os elementos
          essenciais e também considera os complementares.
        </p>

        <p>
          A partitura é uma representação escrita da música, que apresenta as
          características físicas do som. Isso inclui duração, intensidade,
          timbre e altura. A Associação Brasileira de Normas Técnicas (ABNT)
          explica como formatar partituras impressas e disponíveis em meio
          eletrônico.
        </p>

        <h3>Elementos</h3>

        <p>
          Os elementos que integram a referência bibliográfica de partitura são:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li> Compositor: nome do autor da partitura; </li>
          <li> Título: título da música; </li>
          <li> Subtítulo: se houver; </li>
          <li> Instrumento: instrumento musical a que se destina; </li>
          <li> Local: cidade onde foi publicado o documento; </li>
          <li> Editor: responsável pela publicação; </li>
          <li> Data: ano de publicação </li>
          <li> Descrição física: especificações do suporte. </li>
        </ul>

        <p>
          O nome do instrumento musical deve ser incluído na referência desde
          que não faça parte do título.
        </p>

        <h3>Estrutura</h3>

        <p>Os elementos são organizados da seguinte forma:</p>

        <p>
          <mark>
            SOBRENOME, prenome compositor. <b>Título</b>: subtítulo.
            Instrumento. Local: Editor, data. Descrição física.
          </mark>
        </p>

        <img src={Img} alt="partitura" width="100%" />

        <h3>Mais exemplos</h3>

        <p>
          <mark>
            XENAKIS, Iannis. <b>Aïs</b>. Pour baryton amplifé, percussion solo
            et grand orchestre. Paris: Salabert, 1980. 1 partitura.
          </mark>
        </p>

        <p>
          <mark>
            BRAHMS, Johannes. <b>Sonate für Klavier und Violoncello</b>: e-mol
            opus 38. München: G. Henle, 1977. 1 partitura.
          </mark>
        </p>

        <h3>Partitura em meio eletrônico</h3>

        <p>
          Em caso de partitura online, é obrigatório mencionar o endereço
          eletrônico do documento e a data de acesso. Esses dois dados são
          precedidos, respectivamente, de "Disponível em:" e "Acesso em:".
        </p>

        <p>Veja o exemplo abaixo:</p>

        <p>
          <mark>
            GONZAGA, Chiquinha. <b>Gaúcho</b>: o corta-jaca de cá e lá. Piano.
            1997. 1 partitura. Acervo digital Chiquinha Gonzaga. Disponível
            em:http://www.chiquinhagonzaga.com/acervo/partituras/gaucho_ca-e-la_piano.pdf.
            Acesso em: 28 nov. 2020.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Score;
