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
import GoogleAds from "../../../components/GoogleAds";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";
import Img from "../../../assets/images/change/Patente.jpg";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

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
  invertors: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  type: Yup.string().required("Obrigatório"),
  typeDescription: Yup.string().required("Obrigatório"),
  patentNumber: Yup.string().required("Obrigatório"),
  depositDate: Yup.string().required("Obrigatório"),
});

const getTypeName = (type) => {
  switch (type) {
    case "depositor":
      return "Depositante";
    case "holder":
      return "Titular";
    default:
      return "";
  }
};
const generateReference = (values) => {
  const {
    invertors,
    title,
    type,
    typeDescription,
    attorney, // procurador
    patentNumber,
    depositDate,
    patentGrantDate,
    specification,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {invertors && <>{formatAuthorName(invertors)} </>}
      {title && <b>{title}. </b>}
      {type && (
        <>
          {getTypeName(type)}: {typeDescription}.{" "}
        </>
      )}
      {attorney && <>Procurador: {attorney}. </>}
      {patentNumber && <>{patentNumber}. </>}
      {depositDate && <>Depósito: {formatDate(depositDate)}. </>}
      {patentGrantDate && <>Concessão: {formatDate(patentGrantDate)}. </>}
      {specification && <>{specification}. </>}
      {url && `Disponível em: ${url}. `}
      {accessedAt && `Acesso em: ${formatDate(accessedAt)}.`}
    </span>
  );
};

const Patents = ({ back }) => {
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
        values.invertors,
        values.depositDate
      ),
      citation: generateCitationWithoutAuthor(
        values.invertors,
        values.depositDate
      ),
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
          onClick={() => history.push("/eventos-patentes-e-normas-tecnicas")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            invertors: [""],
            title: "",
            type: "",
            typeDescription: "",
            attorney: "", // procurador
            patentNumber: "",
            depositDate: "",
            patentGrantDate: "",
            specification: "",
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
                    PATENTES
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="invertors"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.invertors &&
                            props.values.invertors.length > 0 ? (
                              props.values.invertors.map(
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
                                        name={`invertors.${index}`}
                                        label={`${index + 1}º Inventor`}
                                        type="text"
                                        placeholder="Nome do inventor"
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
                                        props.values.invertors.length - 1 && (
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
                                          props.errors.invertors &&
                                          props.errors.invertors[index]}
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
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Título da patente"
                        placeholder="Ex: Salto com mecanismo amortecedor"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        name="title"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Select
                        type="text"
                        label="Escolher entre dois itens"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.type}
                        name="type"
                        options={[
                          { value: "depositor", name: "Depositante" },
                          { value: "holder", name: "Titular" },
                        ]}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label={getTypeName(props.values.type)}
                        placeholder="Ex: Custódio de Almeida & Cia"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.typeDescription}
                        name="typeDescription"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Procurador"
                        placeholder="Ex: Nome do procurador, se houver"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.attorney}
                        name="attorney"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Número da patente"
                        placeholder="Ex: MU 8803472-0 Y1"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.patentNumber}
                        name="patentNumber"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="date"
                        label="Data de depósito"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.depositDate}
                        name="depositDate"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="date"
                        label="Data de concessão da patente"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.patentGrantDate}
                        name="patentGrantDate"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Especificações"
                        placeholder="Ex: Int. Ci. G02B 26/10 (2009.01), G02F 1/29 (2009.01)"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specification}
                        name="specification"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={9}>
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
        <GoogleAds slot="9633279412" width={728} height={90} />
      </div>
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência bibliográfica de patente (ABNT)</h1>

        <p>
          A NBR 6023, elaborada pela Associação Brasileira de Normas Técnicas
          (ABNT), explica como deve ser a referência bibliográfica de patente no
          item 7.9. São apresentadas as recomendações para documentos físicos e
          no formato eletrônico.
        </p>

        <p>
          Depois de criar um determinado produto, o inventor deve{" "}
          <a
            href="https://viacarreira.com/descubra-como-patentear-um-produto-em-7-passos/"
            target="blank"
          >
            adquirir a patente
          </a>{" "}
          para proteger os seus direitos de propriedade intelectual. Se a ideia
          patenteada foi citada em algum momento no trabalho acadêmico, a
          patente precisa ser incluída na lista de referências bibliográficas.
        </p>

        <p>
          No Brasil, a patente é um documento expedido pelo{" "}
          <a href="https://www.gov.br/inpi/pt-br" target="blank">
            INPI
          </a>{" "}
          (autarquia federal vinculada ao Ministério do Desenvolvimento,
          Indústria e Comércio Exterior). O tempo médio de registro varia de 7 a
          10 anos.
        </p>

        <h3>Elementos essenciais</h3>

        <ul style={{ marginLeft: 15 }}>
          <li> Autor: nome do inventor; </li>
          <li> Título: nome da invenção; </li>
          <li> Nome do depositante, titular; </li>
          <li> Procurador (se houver); </li>
          <li> Data de depósito: quando o pedido de patente foi efetuado; </li>
          <li>
            {" "}
            Data de concessão: quando a patente foi concedida (se houver);{" "}
          </li>
        </ul>

        <p>
          Elementos complementares podem ser acrescentados à referência
          bibliográfica de patente, com o objetivo de melhorar a identificação
          do documento. Isso inclui, por exemplo, o número de registro.
        </p>

        <p>
          A data de concessão nem sempre está disponível, pois alguns pedidos de
          patente constam como ainda não concedido ou indeferido.
        </p>

        <p>Estrutura da referência de patente:</p>

        <p>
          <mark>
            SOBRENOME, Prenome (inventor). <b>Título</b>. Depositante, titular
            e/ou procurador (se houver). Nº da patente. Datas de depósito e
            concessão da patente (se houver). Elementos complementares para
            melhor identificar o documento.
          </mark>
        </p>

        <img src={Img} alt="patente" width="100%" />

        <h3>Mais exemplos</h3>

        <p>
          <mark>
            BERTAZZOLI, Rodnei et al.{" "}
            <b>
              Eletrodos de difusão gasosa modificados com catalisadores redox,
              processo e reator eletroquímico de síntese de peróxido de
              hidrogênio utilizando os mesmos.
            </b>{" "}
            Depositante: Universidade Estadual de Campinas. Procurador: Maria
            Cristina Valim Lourenço Gomes. BR n. PI0600460-1A. Depósito: 27 jan.
            2006. Concessão: 25 mar. 2008.
          </mark>
        </p>

        <p>
          <mark>
            VICENTE, Marcos Fernandes.{" "}
            <b>Reservatório para sabão em pó com suporte para escova.</b>{" "}
            Depositante: Marcos Fernandes Vicente. MU8802281- 1U2. Depósito: 09
            set. 2008. Concessão: 21 maio 2019.
          </mark>
        </p>

        <p>
          <mark>
            JONES, G.{" "}
            <b>
              Hearing device comprising a signal generator for masking tinnitus.
            </b>{" "}
            Depositante: Oticon A/S. Procurador: Stweart Birch. US 20160366527
            A1. Depósito: 8 jun. 2016.
          </mark>
        </p>

        <p>
          <mark>
            LEHNEN, Romeu. <b>Salto com mecanismo amortecedor.</b> Depositante:
            Custódio de Almeida & Cia. MU 8803472-0 Y1. Depósito: 09 set. 2008.
            Concessão: 21 maio 2019.
          </mark>
        </p>

        <h3>Patente em meio eletrônico</h3>

        <p>
          Quando o documento de patente é consultado online, ou através de outro
          meio eletrônico, é necessário incluir informações de disponibilidade e
          acesso.
        </p>

        <p>Exemplo:</p>

        <p>
          <mark>
            GALEMBECK, Fernando; SOUZA, Maria de Fátima Brito.{" "}
            <b>
              Process to obtain an Intercalated or exfoliated polyester with
              clay hybrid nanocomposite material.
            </b>{" "}
            Depositante: Universidade Estadual de Campinas; Rhodia Ster S/A.
            WO2005/030850 A1, Depósito: 1 Oct. 2003, Concessão: 7 Apr. 2005.
            Disponível em:
            http://www.iprvillage.Info/portal/servlet/DIIDirect?CC=WO&PN=2005030850&DT=A1&SrcAut
            h=Wila&Token=UtWHB3Mmc98t05i1AVPmaGE5dYhs00Nlt38dpA3EfnOosue2.GSz63ySsIiukTB
            8VQWW32lISV87n4_naNBY8lhYY30Rw1UeDo_8Yo8UVD0. Acesso em: 27 ago.
            2010.
          </mark>
        </p>
      </div>
      <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
        <GoogleAds slot="6358812024" width={728} height={250} />
      </div>
      <Footer />
    </>
  );
};

export default Patents;
