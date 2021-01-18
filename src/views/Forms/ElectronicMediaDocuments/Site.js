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
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithoutAuthorSpread } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/eletronicos/elementos_site.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  siteName: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
  url: Yup.string().required("Obrigatório"),
  accessedAt: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    author,
    siteName,
    description,
    local,
    publishingCompany,
    yearOfPublication,
    complementaryInformations,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {author && <>{author.toUpperCase()}. </>}
      {siteName && <b>{siteName}. </b>}
      {description && <>{description}. </>}
      {local ? <>{local}: </> : <i>[S.l.]. </i>}
      {publishingCompany && <>{publishingCompany}, </>}
      {yearOfPublication && <>{yearOfPublication}. </>}
      {complementaryInformations && <>{complementaryInformations}. </>}
      {accessedAt && url && (
        <>{` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}</>
      )}
    </span>
  );
};

const Site = ({ back }) => {
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
      citation: generateCitationWithoutAuthorSpread(
        values.author,
        values.yearOfPublication
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
          onClick={() => history.push("/documentos-de-meio-eletronico")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            author: "",
            siteName: "",
            description: "",
            local: "",
            publishingCompany: "",
            yearOfPublication: "",
            complementaryInformations: "",
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
                    Site (Homepage)
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
                        label="Autor ou Organização"
                        placeholder="Ex: CAPES - Coordenação de Aperfeiçoamento de Pessoal de Nível Superior"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.author}
                        name="author"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Nome do site"
                        placeholder="Ex: Plataforma Sucupira"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.siteName}
                        name="siteName"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Descrição"
                        placeholder="Ex: Incluir descrição (se houver)"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.description}
                        name="description"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
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
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Publicadora"
                        placeholder="Ex: CAPES"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publishingCompany}
                        name="publishingCompany"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        type="text"
                        label="Ano"
                        placeholder="Ex: 2016"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfPublication}
                        name="yearOfPublication"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Informações complementáres"
                        placeholder="Ex: Elaborado por..."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.complementaryInformations}
                        name="complementaryInformations"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="date"
                        label="Acesso em"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accessedAt}
                        name="accessedAt"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        type="text"
                        label="Disponível em"
                        placeholder="Ex: https://sucupira.capes.gov.br/sucupira/"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        name="url"
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
        <h1>Referência bibliográfica de site (ABNT)</h1>

        <p>
          Quando uma homepage institucional ou qualquer outra página da internet
          é mencionada no trabalho acadêmico, você deve se preocupar com a
          referência bibliográfica de site.
        </p>

        <h3>Elementos essenciais</h3>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autor:</b> incluir o nome do autor, que pode ser pessoa física ou
            jurídica;{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> Nome do site em negrito;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo:</b> subtítulo do site (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>Descrição:</b> uma breve descrição sobre o site.{" "}
          </li>
          <li>
            {" "}
            <b>Local da publicação:</b> (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>Publicadora:</b> responsável pela publicação;{" "}
          </li>
          <li>
            {" "}
            <b>Ano:</b> ano de copyright, geralmente disponível no rodapé;{" "}
          </li>
          <li>
            {" "}
            <b>Disponibilidade:</b> endereço (URL), precedido por "Disponível
            em:"{" "}
          </li>
          <li>
            {" "}
            <b>Acesso:</b> data de acesso, precedido por “Acesso em:”{" "}
          </li>
        </ul>

        <p>
          Quando o local de publicação do site não é conhecido, usa-se o termo
          [S.l.] no lugar do nome da cidade. Se não houver ano de copyright, a
          recomendação é usar [s.d], que sinaliza a ausência de data.
        </p>

        <h3>Formato básico</h3>

        <p>
          <mark>
            AUTOR OU ORGANIZAÇÃO. <b>Nome do site:</b> Subtítulo. Local:
            Publicadora, ano. Disponível em: endereço completo. Acesso em: dia,
            mês e ano.
          </mark>
        </p>

        <h3>Exemplos aplicando o formato básico</h3>

        <p>
          <mark>
            CAPES - Coordenação de Aperfeiçoamento de Pessoal de Nível Superior.
            <b> Plataforma Sucupira.</b> Brasília, DF: CAPES, c2016. Disponível
            em: https://sucupira.capes.gov.br/sucupira/public/index. xhtml.
            Acesso em: 29 out. 2020.
          </mark>
        </p>

        <p>
          <mark>
            LAYUB. <b>Via Carreira.</b> Página Inicial. [S.l.]. LAYUB, c2020.
            Disponível em: https://viacarreira.com/. Acesso em: 29 out. 2020.
          </mark>
        </p>

        <img src={Img} alt="site" width="100%" />

        <h3>E no caso de base de dados?</h3>

        <p>
          Bases de dados são coleções eletrônicas de documentos, que facilitam o
          acesso a artigos científicos, teses e outros materiais. Elas podem ser
          multidisciplinares, como é o caso do{" "}
          <a
            href="https://viacarreira.com/scielo-artigos-cientificos-em-pdf-como-pesquisar/"
            target="blank"
          >
            Scielo
          </a>
          , ou específica de uma área, como o{" "}
          <a href="https://viacarreira.com/pubmed/" target="blank">
            Pubmed
          </a>
          , que reúne conteúdo exclusivo da literatura biomédica.
        </p>

        <p>
          O formato de referência de site também se aplica às{" "}
          <a
            href="https://viacarreira.com/bases-de-dados-confiaveis-para-usar-no-tcc/"
            target="blank"
          >
            bases de dados
          </a>
          . O termo "base de dados" deve ser inserido como uma informação
          complementar.
        </p>

        <h3>Exemplos</h3>

        <p>
          <mark>
            BIREME - Centro Latino-Americano e do Caribe de Informação em
            Ciências da Saúde. <b>LILACS.</b> São Paulo: BIREME, 2019. Base de
            dados. Disponível em: http://lilacs.bvsalud.org. Acesso em: 29 out.
            2020.
          </mark>
        </p>

        <p>
          <mark>
            COCHRANE. <b>Cochrane Library.</b> St Albans House: Wiley, c2019.
            Disponível em: https://www. cochranelibrary.com. Acesso em: 6 fev.
            2019. Base de dados.
          </mark>
        </p>

        <p>
          Antes da atualização de 2018, a NBR 6023 recomendava o uso dos
          símbolos &lt; &gt; para apresentar os links. Contudo, agora não é mais
          necessário.
        </p>
      </div>
      <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
        <GoogleAds slot="6358812024" width={728} height={250} />
      </div>
      <Footer />
    </>
  );
};

export default Site;
