import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoogleAds from "../../../components/GoogleAds";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatMonosyllable } from "../../../utils/monosyllable";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img1 from "../../../assets/images/explicativos/juridicos/elementos_complementares_documentos_civis.jpg";
import Img2 from "../../../assets/images/change/Documentos civis e de cartório.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  jurisdiction: Yup.string().required("Obrigatório"),
  nameOfTheNotaryOrIssuingBody: Yup.string().required("Obrigatório"),
  documentType: Yup.string().required("Obrigatório"),
  registrationDate: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    jurisdiction,
    nameOfTheNotaryOrIssuingBody,
    documentType,
    registrationDate,
    complementaryElement,
  } = values;

  return (
    <span>
      {jurisdiction && <>{jurisdiction.toUpperCase()}. </>}
      {nameOfTheNotaryOrIssuingBody && <>{nameOfTheNotaryOrIssuingBody}. </>}
      {documentType && <b>{documentType}. </b>}
      {registrationDate && <>Registro em: {formatDate(registrationDate)}. </>}
      {complementaryElement && <>{complementaryElement}. </>}
    </span>
  );
};

const CivilAndNotary = ({ back }) => {
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
      //   values.jurisdiction,
      //   values.registrationDate
      // ),
      // citation: generateCitationWithoutAuthor(
      //   values.jurisdiction,
      //   values.registrationDate
      // ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
        <GoogleAds slot="9633279412" width={728} height={90} />
      </div>
      <Container>
        <Back
          onClick={() => history.push("/documentos-juridicos-e-civis")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            jurisdiction: "",
            nameOfTheNotaryOrIssuingBody: "",
            documentType: "",
            registrationDate: "",
            complementaryElement: "",
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
                    DOCUMENTOS CIVIS E DE CARTÓRIOS
                  </p>
                  <span>
                    Inclui certidão de nascimento, certidão de casamento,
                    certidão de óbito, carteira de trabalho, passaporte, título
                    de eleitor, CNH, certificação de serviço militar, entre
                    outros
                  </span>
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
                        type="text"
                        label="Jurisdição"
                        placeholder="Ex: São Paulo (SP)"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.jurisdiction}
                        name="jurisdiction"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Nome do cartório ou órgão expedidor"
                        placeholder="Ex: Cartório de Registro Civil 37º Subdistrito Aclimação"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.nameOfTheNotaryOrIssuingBody}
                        name="nameOfTheNotaryOrIssuingBody"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Tipo do documento"
                        placeholder="Ex: Certidão de nascimento de José Pereira"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.documentType}
                        name="documentType"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="date"
                        label="Data de registro"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.registrationDate}
                        name="registrationDate"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Input
                        type="text"
                        label="Elemento complementar"
                        onChange={props.handleChange}
                        placeholder="Ex: Certidão registrada às fs. 198 do livro n. 367"
                        onBlur={props.handleBlur}
                        value={props.values.complementaryElement}
                        name="complementaryElement"
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
      <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
        <GoogleAds slot="9633279412" width={728} height={90} />
      </div>
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>
          Referência bibliográfica de documentos civis e de cartório (ABNT)
        </h1>

        <p>
          Os documentos civis e de cartório são fontes de{" "}
          <a href="#">pesquisa documental.</a>
          Nesse delineamento, utiliza-se fontes primárias para coletar
          informações e dados que ainda não receberam um tratamento científico
          ou analítico.
        </p>

        <p>
          A lista de documentos de cartório e civis inclui certidão de
          nascimento, certidão de casamento, certidão de óbito, carteira de
          trabalho, passaporte, título de eleitor, CNH, certificação de serviço
          militar, entre outros.
        </p>

        <h3>Elementos essenciais</h3>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Jurisdição:</b> nome da cidade onde o documento foi emitido, em
            letras maiúsculas;{" "}
          </li>
          <li>
            {" "}
            <b>Nome do cartório ou órgão expedidor:</b> nome do cartório;{" "}
          </li>
          <li>
            {" "}
            <b>Tipo de documento:</b> com identificação destacada{" "}
          </li>
          <li>
            {" "}
            <b>Data de registro:</b> o dia, mês e ano devem ser precedidos pela
            expressão "Registro em:".{" "}
          </li>
        </ul>

        <p>O formato básico é:</p>

        <p>
          <mark>
            JURISDIÇÃO. Cartório ou Órgão expedidor. Tipo de documento com
            identificação em destaque. Data de registro (precedida pela
            expressão Registro em:).
          </mark>
        </p>

        <h3>Exemplos aplicando o formato</h3>

        <img src={Img2} alt="elementos-essenciais" width="100%" />

        <p>
          <mark>
            SÃO PAULO (SP). Cartório de Registro Civil das Pessoas Naturais do
            19º Subdistrito em Perdizes.{" "}
            <b>Certidão de nascimento [de] Bianca da Silva.</b>
            Registro em: 10 jul. 1925.
          </mark>
        </p>

        <p>
          <mark>
            JOÃO PESSOA (PB). 2 Cartório de Registro Civil de Nascimentos e
            Óbitos de João Pessoa.{" "}
            <b>Certidão de nascimento [de] Paula Maria Gonçalves.</b>
            Registro em: 26 mar. 1961.Certidão registrada às fls.134 do livro n.
            A78 de assentamento de nascimento n. 58593. Data de nascimento: 25
            mar. 1961.
          </mark>
        </p>

        <h3>Elementos complementares</h3>

        <p>
          Elementos complementares podem ser incluídos na referência como uma
          forma de identificar melhor o documento. São eles:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Número da folha:</b> adicionar a abreviação fs. e o número da
            folha;{" "}
          </li>
          <li>
            {" "}
            <b>Número do livro:</b> usar a expressão "do livro n.".{" "}
          </li>
          <li>
            {" "}
            <b>Data do evento:</b> nascimento, casamento ou óbito;{" "}
          </li>
        </ul>

        <h3>Exemplo com elementos complementares</h3>

        <p>
          <mark>
            SOROCABA (SP). Cartório de Registro Civil das Pessoas Naturais do 1º
            Subdistrito de Sorocaba.{" "}
            <b>Certidão de nascimento [de] Maria da Silva.</b>
            Registro em: 5 ago. 1980. Certidão registrada às fls. 170 do livro
            n. 246 de assentamento de nascimento n. 51602. Data de nascimento: 5
            ago. 1980.
          </mark>
        </p>

        <p>Na imagem abaixo, identificamos os elementos complementares:</p>

        <img src={Img1} alt="elementos-complementares" width="100%" />
      </div>
      <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
        <GoogleAds slot="6358812024" width={728} height={250} />
      </div>
      <Footer />
    </>
  );
};

export default CivilAndNotary;
