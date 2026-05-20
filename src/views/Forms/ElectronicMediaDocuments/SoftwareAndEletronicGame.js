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

// utils
import {
  generateCitationWithoutAuthor,
  generateCitationWithoutAuthorSpread,
} from "../../../utils/generateCitationWithoutAuthor";
import { formatDate } from "../../../utils/formatDate";
import { formatMonosyllable } from "../../../utils/monosyllable";
import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/eletronicos/referencia-abnt-jogo-ou-software.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  // caption: Yup.string().required("Obrigatório"),
  editionOrVersion: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  producer: Yup.string().required("Obrigatório"),
  releaseYear: Yup.string().required("Obrigatório"),
  supportSpecification: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Software e Jogo Eletrônico: Referência ABNT";
  const {
    title,
    caption,
    editionOrVersion,
    local,
    producer,
    releaseYear,
    supportSpecification,
    accessedAtUrl,
    url,
  } = values;

  return (
    <span>
      {caption ? (
        <>
          {
            <>
              {formatMonosyllable(title)}: <>{caption}. </>
            </>
          }
        </>
      ) : (
        <>{formatMonosyllable(title)}. </>
      )}
      {editionOrVersion && <>{editionOrVersion}. </>}
      {local && <>{local}: </>}
      {producer && <>{producer}, </>}
      {releaseYear && <>{releaseYear}. </>}
      {supportSpecification && <>{supportSpecification}. </>}
      {accessedAtUrl &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAtUrl)}. `}
    </span>
  );
};

const SoftwareAndEletronicGame = ({ back }) => {
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
      // citationWithAuthor: generateCitationWithAuthor(
      //   values.title,
      //   values.releaseYear
      // ),
      citation: generateCitationWithoutAuthorSpread(
        values.title,
        values.releaseYear
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() => history.push("/documentos-de-meio-eletronico")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            title: "",
            caption: "",
            editionOrVersion: "",
            local: "",
            producer: "",
            releaseYear: "",
            supportSpecification: "",
            accessedAtUrl: "",
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
                    Software e jogo eletrônico
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Título do jogo/software"
                        placeholder="Ex: A Game of Thrones"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        name="title"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Subtítulo do jogo"
                        placeholder="Ex: The board game "
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
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Edição ou versão"
                        placeholder="Ex: 2nd ed."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.editionOrVersion}
                        name="editionOrVersion"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Local"
                        placeholder="Ex: Roseville"
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
                        label="Produtora"
                        placeholder="Ex: FFG"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.producer}
                        name="producer"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Ano de lançamento"
                        placeholder="Ex: 2017"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.releaseYear}
                        name="releaseYear"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Especificação do suporte"
                        placeholder="Ex: 1 jogo eletrônico"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.supportSpecification}
                        name="supportSpecification"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="accessedAtUrl"
                        type="date"
                        label="Data de acesso"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accessedAtUrl}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        name="url"
                        label="Endereço (URL)"
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
        <h1>Referência de software e jogo eletrônico (ABNT)</h1>

        <p>
          A Associação Brasileira de Normas Técnicas (ABNT) trata de referência
          de software e jogo eletrônico no item 7.20 da NBR 6023. A norma
          recomenda identificar os responsáveis pelo produto/serviço e descrever
          o suporte.
        </p>

        <p>
          Em pesquisas nas áreas de tecnologia e comunicação, é muito comum usar
          programas de computador e aplicativos. Além disso, existem projetos no
          qual um jogo eletrônico ou software específico é o próprio objeto de
          estudo.
        </p>

        <h2>Elementos essenciais</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Título:</b> Título do jogo ou software;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo:</b> subtítulo do jogo ou software (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>Versão ou edição:</b> se houver;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade onde foi desenvolvido;{" "}
          </li>
          <li>
            {" "}
            <b>Produtora:</b> responsável pela produção.{" "}
          </li>
          <li>
            {" "}
            <b>Data:</b> ano de lançamento;{" "}
          </li>
          <li>
            {" "}
            <b>Suporte:</b> descrição física do meio eletrônico.{" "}
          </li>
        </ul>

        <p>
          Para melhorar a identificação do documento, você pode incluir na
          referência elementos complementares.
        </p>

        <p>
          Ao escrever a referência, a primeira palavra do título do
          jogo/software deve ser colocada em letras maiúsculas. E se houver um
          artigo ou preposição acompanhando essa palavra, ele deve ser
          transcrito em letras maiúsculas também.
        </p>

        <h2>Formato básico</h2>

        <p>
          <mark>
            TÍTULO do jogo/software: subtítulo. Versão ou Edição. Local:
            Produtora, ano. Disponível em: URL. Acesso em: dia, mês e ano.
            especificação do suporte.
          </mark>
        </p>

        <h2>Exemplos aplicando o formato básico</h2>

        <img src={Img} alt="software-jogos" width="100%" />

        <p>
          <mark>
            GORB: Gerador Online de Referências Bibliográficas. versão 1.0
            Marília: LAYUB, 2020. 1 software de internet. Disponível em:
            http:/gorb.viacarreira.com. Acesso em: 29 out. 2020.
          </mark>
        </p>

        <p>
          <mark>
            GRAND Theft Auto: San Andreas. 5nd. Edimburgo: Rockstar North, 2004.
            1 jogo eletrônico.
          </mark>
        </p>

        <p>
          <mark>
            SPOTIFY. Versão 1.1.31.703. Estocolmo: Spotify AB, 2020. 1
            aplicativo de streaming.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SoftwareAndEletronicGame;
