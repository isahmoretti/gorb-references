import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Select from "../../../components/InputWrapper/Select";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoogleAds from "../../../components/GoogleAds";

// utils
import { formatDate } from "../../../utils/formatDate";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img1 from "../../../assets/images/explicativos/juridicos/elementos_complementares_legislacao.jpg";
import Img2 from "../../../assets/images/change/Lgislação_elementos_essenciais.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  jurisdiction: Yup.string().required("Obrigatório"),
  numbering: Yup.string().required("Obrigatório"),
  publicationDate: Yup.string().required("Obrigatório"),
  publicationTitle: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    jurisdiction,
    title,
    numbering,
    caption,
    menu,
    publicationDate,
    publicationTitle,
    captionPublication,
    sessionNumber,
    local,
    initialPage,
    finalPage,
    notes,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {jurisdiction && <>{jurisdiction.toUpperCase()}. </>}
      {title && <>{title} </>}
      {!numbering && <>, </>}
      {numbering && <>nº {numbering}, </>}
      {caption && <>{caption}. </>}
      {menu && <>{menu}. </>}

      {captionPublication ? (
        <>
          <b>{publicationTitle}: </b>
          {captionPublication}.{" "}
        </>
      ) : (
        <b>{publicationTitle}. </b>
      )}

      {sessionNumber && <>seção {sessionNumber}, </>}

      {local && <>{local}, </>}

      {notes && <>{notes}. </>}

      {initialPage && !finalPage && <>p. {initialPage}, </>}

      {initialPage && finalPage && (
        <>
          p. {initialPage}-{finalPage},{" "}
        </>
      )}
      {publicationDate && <>{formatDate(publicationDate)}. </>}
      {online && accessedAt && url && (
        <>
          {online &&
            accessedAt &&
            url &&
            ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
        </>
      )}
    </span>
  );
};

const Legislation = ({ back }) => {
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
        values.jurisdiction,
        values.publicationDate
      ),
      citation: generateCitationWithoutAuthor(
        values.jurisdiction,
        values.publicationDate
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
        <GoogleAds slot="5867857434" width={728} height={90} />
      </div>
      <Container>
        <Back
          onClick={() => history.push("/documentos-juridicos")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            jurisdiction: "",
            title: "",
            numbering: "",
            caption: "",
            menu: "",
            publicationDate: "",
            publicationTitle: "",
            captionPublication: "",
            sessionNumber: "",
            local: "",
            initialPage: "",
            finalPage: "",
            notes: "",
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
                    Legislação
                  </p>
                  <span>Inclui leis e decretos</span>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Jurisdição ou Cabeçalho da Entidade"
                        placeholder="Ex: Brasil"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.jurisdiction}
                        name="jurisdiction"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Título"
                        placeholder="Ex: Lei"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        name="title"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Numeração"
                        placeholder="Ex: 10.406"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.numbering}
                        name="numbering"
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
                        placeholder="Ex: de 10 de janeiro de 2002"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        name="caption"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Ementa"
                        placeholder="Ex: Institui o Código Civil"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.menu}
                        name="menu" // ementa
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="date"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publicationDate}
                        label="Data de publicação"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="publicationDate"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Título da Publicação"
                        placeholder="Ex: Diário Oficial da União"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publicationTitle}
                        name="publicationTitle"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Subtítulo da Publicação"
                        placeholder="EX: se houver"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.captionPublication}
                        name="captionPublication"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        placeholder="Ex: 7"
                        label="Nº da Seção"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.sessionNumber}
                        name="sessionNumber"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Local"
                        placeholder="Ex: Brasília"
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
                        label="Página inicial"
                        placeholder="Ex: 1"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.initialPage}
                        name="initialPage"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Página final"
                        placeholder="Ex: 74"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.finalPage}
                        name="finalPage"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Notas"
                        placeholder="Ex: ano 139, n. 8"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.notes}
                        name="notes"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
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
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        disabled={!props.values.online}
                        name="url"
                        label="Endereço(URL)"
                        type="text"
                        placeholder="https://viacarreira.com/"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        disabled={!props.values.online}
                        name="accessedAt"
                        type="date"
                        label="Data de acesso"
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
      <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
        <GoogleAds slot="5867857434" width={728} height={90} />
      </div>
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência bibliográfica de legislação (ABNT)</h1>

        <p>
          O termo legislação inclui Decreto, Lei, Decreto-lei, Emenda, Lei
          Complementar, Lei Ordinária, entre outros documentos jurídicos.
        </p>

        <p>
          A ementa e/ou epígrafe é um item obrigatório na referência de
          legislação. Se ela for muito longa, a ABNT aceita que uma parte do
          texto seja suprimida, desde que ocorra uma indicação com reticências
          entre colchetes [...].
        </p>

        <h3>Elementos essenciais</h3>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Jurisdição ou Cabeçalho da Entidade:</b> em letras maiúsculas{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> pode ser lei, decreto ou emenda constitucional;{" "}
          </li>
          <li>
            {" "}
            <b>Numeração:</b> numeração que identifica a lei{" "}
          </li>
          <li>
            {" "}
            <b>Data da legislação:</b> o dia, mês e ano da criação da lei{" "}
          </li>
          <li>
            {" "}
            <b>Ementa/Epígrafe:</b> uma breve apresentação do conteúdo da
            legislação{" "}
          </li>
          <li>
            {" "}
            <b>Data de Publicação:</b> dia, mês e ano em que a lei foi
            publicada;{" "}
          </li>
          <li>
            {" "}
            <b>Título da publicação:</b> onde a legislação foi publicada;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo da publicação:</b> se houver, preencher;{" "}
          </li>
          <li>
            {" "}
            <b>Nº da Seção:</b> parte da publicação onde está a lei;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade da publicação.{" "}
          </li>
        </ul>

        <img src={Img2} alt="elementos-essenciais" width="100%" />

        <h3>Elementos complementares</h3>

        <ul style={{ marginLeft: 15 }}>
          <li> Notas (informações complementares) </li>
          <li> Retificações </li>
          <li> Alterações </li>
          <li> Revogações </li>
          <li> Projetos de origem </li>
          <li> Autoria do projeto </li>
          <li> Vigência </li>
          <li> Atualização </li>
          <li> Página Inicial </li>
          <li> Página Final </li>
        </ul>

        <img src={Img1} alt="elementos-complementares" width="100%" />

        <p>O formato básico:</p>

        <p>
          JURISDIÇÃO OU CABEÇALHO. Lei ou Decreto nº XX-XXX, de dia de mês de
          ano. Ementa. <b>Título da publicação</b>, Local de publicação, dia mês
          ano.
        </p>

        <h3>Exemplos aplicando o formato</h3>

        <p>
          <mark>
            MINAS GERAIS. Lei n.869, de 5 de julho de 1952. Dispõe sobre o
            estatuto dos funcionários públicos civis do Estado de Minas Gerais.
            <b> Minas Gerais</b>, Belo Horizonte, 6 jul. 1952.
          </mark>
        </p>

        <p>
          <mark>
            BRASIL. Decreto n. 1.799, de 30 de janeiro de 1996. Regulamenta a
            Lei n. 5.433, de 8 de maio de 1968, que regula a Microfilmagem de
            documentos oficiais, e dá outras providências. <b>Diário Oficial</b>
            , Brasília, DF, 31 jan. 1996.
          </mark>
        </p>

        <p>
          <mark>
            SÃO PAULO. Deliberação CEE nº 7, de 1º de dezembro de 1999. Fixa
            normas para a oferta de Cursos Sequenciais por Campo de Saber.
            <b>Diário oficial do estado de São Paulo</b>, São Paulo, 2 dez.
            1999. p. 21.
          </mark>
        </p>

        <h3>Legislação consultada em meio eletrônico</h3>

        <p>
          Quando a legislação for consultada pela internet, é fundamental
          indicar o endereço eletrônico e a data de acesso.
        </p>

        <h3>Exemplo:</h3>

        <p>
          <mark>
            BRASIL. Lei nº 7.766, de 11 de maio de 1989. Dispõe sobre o ouro,
            ativo financeiro, e sobre seu tratamento tributário. Disponível em:
            http://www.planalto.gov.br/ccivil_03/LEIS/L7766.htm. Acesso em: 22
            ago. 2020.
          </mark>
        </p>

        <p>
          Se o meio eletrônico de consulta não for online, mas sim em CD-ROM,
          DVD ou disquete, é importante mencionar essa informação na referência.
        </p>

        <h3>Exemplo:</h3>

        <p>
          <mark>
            BRASIL. Decreto-lei n° 200, de 25 de fevereiro de 1967. Dispõe sobre
            a organização da Administração Federal, estabelece diretrizes para a
            Reforma Administrativa, e dá outras providências. <i>In</i>: VADE
            mecum. Porto Alegre: Verbo jurídico, 2007. 1 CD-ROM, p. 1-90.
          </mark>
        </p>

        <h3>Chamadas para citação</h3>

        <p>
          A chamada para citação inicia-se com a palavra de entrada na
          referência bibliográfica e o ano de publicação, seguindo o padrão
          autor-data.
        </p>

        <h3>Exemplo:</h3>

        <p>
          <mark>(BRASIL, 2002, p. 40)</mark>
        </p>
      </div>
      <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
        <GoogleAds slot="6358812024" width={728} height={250} />
      </div>
      <Footer />
    </>
  );
};

export default Legislation;
