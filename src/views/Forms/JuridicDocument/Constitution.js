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
import { formatDate } from "../../../utils/formatDate";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/change/Constituição.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  country: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
});

const Constitution = ({ back }) => {
  document.title = "Constituição: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Referência de constituição no padrão ABNT NBR 6023:2018. Preencha os campos e copie a referência pronta.");
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const history = useHistory();

  const generateReference = (values) => {
    const {
      country,
      year,
      title,
      caption,
      responsible,
      edition,
      yearPublication,
      numberPages,
      location,
      publishingCompany,
      notes,
      online,
      url,
      accessedAt,
    } = values;

    return (
      <span>
        {`${country.toUpperCase()}. `}
        {`[Constituição (${year})]. `}
        {caption ? (
          <>
            <b>{title}:</b> {`${caption}. `}
          </>
        ) : (
          <b> {`${title}. `} </b>
        )}
        {responsible && `Organização do texto: ${responsible}. `}
        {edition && `${edition}. ed. `}
        {location && `${location}: `}
        {publishingCompany && `${publishingCompany}, `}
        {yearPublication && `${yearPublication}. `}
        {numberPages && `${numberPages}. p. `}
        {notes && `${notes}. `}
        {online &&
          accessedAt &&
          url &&
          `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
      </span>
    );
  };

  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (values) => {
    const references = generateReference(values);

    setState((prev) => ({
      ...prev,
      values,
      references,
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() => history.push("/documentos-juridicos-e-civis")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            country: "",
            year: "",
            title: "",
            caption: "",
            responsible: "",
            edition: "",
            yearPublication: "",
            numberPages: "",
            location: "",
            publishingCompany: "",
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
                    Constituição
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="country"
                        label="País, Estado ou Município"
                        placeholder="Ex: Brasil"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.country}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="year"
                        label="Ano de promulgação"
                        placeholder="Ex: 1988"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="title"
                        label="Título"
                        placeholder="Ex: Constituição da República Federativa do Brasil"
                        type="text"
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
                        label="Subtítulo"
                        placeholder="Ex: promulgada em 5 de outubro de 1988"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="responsible"
                        label="Responsável pela organização do texto"
                        placeholder="Ex: Juarez de Oliveira"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responsible}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="edition"
                        label="Edição"
                        placeholder="Ex: 4"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.edition}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="yearPublication"
                        label="Ano de publicação"
                        placeholder="Ex: 1990"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearPublication}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="numberPages"
                        label="Número de páginas ou volumes"
                        placeholder="Ex: 168"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.numberPages}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="location"
                        label="Local de publicação"
                        placeholder="Ex: São Paulo"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="publishingCompany"
                        label="Editora"
                        placeholder="Ex: Saraiva"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publishingCompany}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="notes"
                        label="Notas"
                        placeholder="Ex: Série Legislação Brasileira"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.notes}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
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
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        disabled={!props.values.online}
                        name="url"
                        label="Endereço(URL)"
                        type="text"
                        placeholder="https://exemplo.com/"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
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
                {state.references && (
                  <Modal
                    isOpen={openModal}
                    handleClose={() => setOpenModal(!openModal)}
                    text={state.references}
                    // citationWithAuthor={state.citationWithAuthor}
                    // citation={state.citation}
                  />
                )}
              </Card>
            </form>
          )}
        </Formik>
      </Container>
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência Bibliográfica de Constituição (ABNT)</h1>

        <p>
          A Constituição Federal é um conjunto de leis responsável por organizar
          os três poderes e manter o país em funcionamento. Essa legislação
          máxima do país determina não só os limites da administração pública,
          mas também os direitos e deveres dos cidadãos.
        </p>

        <p>
          O Brasil já teve sete constituições, que foram instituídas em regimes
          fechados e democráticos. A atual constituição, instaurada no país em
          1988, tornou possível o processo de redemocratização depois de anos de
          regime militar.
        </p>

        <p>
          Cada estado tem o seu próprio conjunto de leis, que, por sua vez,
          segue os limites estabelecidos pela Constituição Federal. Com isso, as
          unidades federativas têm direito à auto-organização, autogoverno e
          autoadministração.
        </p>

        <h2>Como fazer referência bibliográfica de constituição?</h2>

        <p>
          No caso de constituições e suas emendas, a referência bibliográfica
          precisa apresentar o termo "Constituição", seguido pelo ano de
          promulgação entre parênteses.
        </p>

        <h2>Elementos essenciais</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Jurisdição:</b> nome do estado ou país, em letras maiúsculas;{" "}
          </li>
          <li>
            {" "}
            <b>Constituição:</b> essa palavra deve ser inserida após jurisdição
            para destacar o tipo de documento jurídico;{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> título da Constituição em negrito;{" "}
          </li>
          <li>
            {" "}
            <b>Ano de promulgação:</b> ano em que a Constituição foi
            oficialmente publicada, entre parênteses;{" "}
          </li>
        </ul>

        <p>
          Quando o documento jurídico é impresso, é importante fazer a descrição
          física da obra, incluindo local de publicação, editora, ano de
          publicação e número de páginas.
        </p>

        <p>
          No caso de uma constituição consultada pela internet, a recomendação é
          incluir o endereço eletrônico, precedido pela expressão "Disponível
          em". Já a data de acesso deve ser inserida depois da expressão "Acesso
          em:".
        </p>

        <h2>Exemplos</h2>

        <p>Observe um exemplo:</p>

        <p>
          <mark>
            BRASIL. Constituição (1988).{" "}
            <b>Constituição da República Federativa do Brasil de 1988.</b>{" "}
            Brasília, DF: Presidência da República, [2016].Disponível
            em:http://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm.
            Acesso em: 25 ago. 2020.
          </mark>
        </p>

        <p>Mais exemplos de referências bibliográficas de constituição</p>

        <img loading="lazy" src={Img} alt="Exemplo de referência de constituição ABNT" width="100%" />

        <p>
          <mark>
            RIO GRANDE DO SUL. [Constituição (1989)].{" "}
            <b>Constituição do Estado do Rio Grande do Sul.</b> 4. ed. atual.
            Porto Alegre: Assembleia Legislativa do Estado do Rio Grande do Sul,
            1995.
          </mark>
        </p>

        <p>
          <mark>
            PARAÍBA. [Constituição (1989)].{" "}
            <b>Constituição do Estado da Paraíba.</b>
            Organizado por Francisco Carneiro. João Pessoa: Assembleia
            Legislativa do Estado da Paraíba, [2015]. Disponível em:
            http://www.al.pb.leg.br/wp-content/uploads/2017/02/Constitui%C3%A7%C3%A3o-Esta
            dual-Atualizada-at%C3%A9-a-Emenda-40-de-2015.pdf. Acesso em: 29 out.
            2020.
          </mark>
        </p>

        <h2>Referência bibliográfica de emenda constitucional</h2>

        <p>
          Quando há uma modificação na constituição de um estado, cria-se um
          documento jurídico que recebe o nome de emenda constitucional. Nesse
          caso, também é importante mencionar a palavra "Constituição" na
          referência, seguida pelo ano de promulgação entre parênteses. Na
          ementa, deve-se incluir uma síntese sobre a mudança realizada. O
          destaque na referência é feito na publicação.
        </p>

        <h2>Exemplo:</h2>

        <p>
          <mark>
            BRASIL. [Constituição (1988)]. Emenda constitucional nº 9, de 9 de
            novembro de 1995. Dá nova redação ao art. 177 da Constituição
            Federal, alterando e inserindo parágrafos. <b>Lex:</b> legislação
            federal e marginalia, São Paulo, v. 59, p. 1966, out./dez. 1995.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Constitution;
