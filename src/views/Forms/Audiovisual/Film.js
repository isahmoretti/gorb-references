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
import { formatMonosyllable } from "../../../utils/monosyllable";
import { generateCitationWithAuthorSpread } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthorSpread } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

import Img from "../../../assets/images/explicativos/audiolivro/referencia-abnt-filme.jpg";
import RelatedLinks from "../../../components/RelatedLinks";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  director: Yup.string().required("Obrigatório"),
  productor: Yup.string().required("Obrigatório"),
  location: Yup.string().required("Obrigatório"),
  company: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Filme: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Gere referências de filmes e documentários no formato ABNT NBR 6023:2018. Gratuito e rápido.");
  const {
    title,
    director,
    productor,
    screenwriter,
    interpreters,
    location,
    company,
    year,
    colorful,
    sound,
    suport,
    whatSuport,
    specificationSuport,
    duration,
    captiond,
    whatCaptiond,
    serie,
    notes,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {`${formatMonosyllable(title)}. `}
      {`Direção: ${director}. `}
      {`Produção: ${productor}. `}
      {interpreters && `Intérpretes: ${interpreters}. `}
      {screenwriter && `Roteiro: ${screenwriter}. `}
      {location ? `${location}: ` : <i>[S. l.]: </i>}
      {`${company}, `}
      {`${year}. `}
      {specificationSuport && `${specificationSuport} `}
      {duration && `(${duration}), `}
      {suport && whatSuport && `${whatSuport}, `}
      {sound && `son. `}
      {colorful && `color. `}
      {captiond && whatCaptiond && `Legendado. ${whatCaptiond}. `}
      {serie && `${serie}. `}
      {notes && `${notes}. `}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const AdministrativeActs = ({
  back }) => {
  document.title = "Filme: Referência ABNT";
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
      citation: generateCitationWithoutAuthorSpread(values.title, values.year),
      citationWithAuthor: generateCitationWithAuthorSpread(
        values.title,
        values.year
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() => history.push("/documentos-audiovisuais")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            title: "",
            director: "",
            productor: "",
            screenwriter: "",
            interpreters: "",
            location: "",
            company: "",
            year: "",
            colorful: "",
            sound: "",
            suport: "",
            whatSuport: "",
            specificationSuport: "",
            duration: "",
            captiond: "",
            whatCaptiond: "",
            serie: "",
            notes: "",
            online: false,
            url: "",
            accessedAt: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form style={{ maxWidth: 830 }} onSubmit={props.handleSubmit}>
              <Actions>
                <Title>
                  <p
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Filme
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
                        name="title"
                        label="Título"
                        placeholder="Ex: Central do Brasil"
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
                        name="director"
                        label="Diretor"
                        placeholder="Ex: Walter Salles Júnior"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.director}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="productor"
                        label="Produtor"
                        placeholder="Ex: Martire de Clemont-Tonnerre e Arthur Cohn"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.productor}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="screenwriter"
                        label="Roterista"
                        placeholder="Ex: Marcos Bernstein, João Emanuel Carneiro e Walter Salles Junior"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.screenwriter}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="interpreters"
                        label="Intérpretes"
                        placeholder="Ex: Fernanda Montenegro, Marilia Pera, Sônia Lira, Othon Bastos, Matheus Nachtergaele et al"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.interpreters}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="location"
                        label="Local"
                        placeholder="Ex: Rio de Janeiro "
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="company"
                        label="Emprsa produtora ou distribuidora"
                        placeholder="Ex: Riofilme"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.company}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="year"
                        label="Ano de publicação"
                        placeholder="Ex: 1998"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Select
                        name="colorful"
                        label="Colorido ?"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.colorful}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Select
                        name="sound"
                        label="Som ?"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.sound}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Select
                        name="suport"
                        label="Suporte Físico?"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.suport}
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
                        name="whatSuport"
                        label="Qual tipo de suporte"
                        placeholder="Ex: VHS"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.whatSuport}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="specificationSuport"
                        label="Especificação física do suporte"
                        placeholder="Ex: 1 fta de vídeo"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specificationSuport}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="duration"
                        label="Duração do filme"
                        placeholder="Ex: :106min"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.duration}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Select
                        name="captiond"
                        label="Legendado? "
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.captiond}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="whatCaptiond"
                        label="Qual língua?"
                        placeholder="Ex: Port."
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.whatCaptiond}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="serie"
                        label="Série"
                        placeholder="Ex: nome da série, se houver"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.serie}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="notes"
                        label="Nota"
                        placeholder="Ex: Informações complementares"
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
        <h1 style={{ textAlign: "left" }}>
          Referência bibliográfica de filme (ABNT)
        </h1>
        <p>
          A NBR 6023 ensina como fazer referência bibliográfica de filme no item
          7.13, que fala sobre documento audiovisual. Nessa norma, a ABNT aponta
          quais são os elementos essenciais e os elementos complementares.
        </p>
        <p>
          Alunos podem citar trechos ou descrever cenas de filmes em seus
          trabalhos acadêmicos, desde que elaborem corretamente a referência.
        </p>
        <h2>Elementos essenciais para referenciar filme</h2>
        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Título:</b> nome do filme;{" "}
          </li>
          <li>
            {" "}
            <b>Diretor:</b> pessoa responsável pela direção;{" "}
          </li>
          <li>
            {" "}
            <b>Produtor:</b> pessoa responsável pela produção;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> local de gravação;{" "}
          </li>
          <li>
            {" "}
            <b>Produtora ou distribuidora:</b> empresa responsável por produzir
            ou distribuir o filme;{" "}
          </li>
          <li>
            {" "}
            <b>Data:</b> Ano de lançamento;{" "}
          </li>
          <li>
            {" "}
            <b>Descrição:</b> especificação do suporte;{" "}
          </li>
        </ul>
        <h2>Elementos complementares</h2>
        <p>
          Os elementos complementares são informações adicionais que ajudam a
          identificar melhor o documento audiovisual.
        </p>
        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b> Intérpretes: </b> nomes dos principais atores por extenso;{" "}
          </li>
          <li>
            {" "}
            <b> Roteiro: </b> nome do roteirista por extenso;{" "}
          </li>
        </ul>
        <p>
          Quando o filme pertence a um arquivo, é recomendado incluir na
          referência o nome do acervo. Assim, você evita problemas relacionados
          à qualidade da cópia ou erros de edição. O dado sobre o arquivo pode
          ser inserido como uma nota.
        </p>
        <h2>Formato básico</h2>
        <p>
          A referência sempre começa com o nome do filme por extenso, sendo a
          primeira palavra transcrita em letras maiúsculas. Especificações sobre
          cor (colorido ou p&b), legenda e saga melhoram a descrição do
          documento audiovisual. Veja o formato básico:
        </p>
        <p>
          <mark>
            NOME do Filme. Direção: Nome do diretor por extenso. Produção: Nome
            do produtor por extenso. Intérpretes: Nomes dos atores por extenso
            Roteiro: Nome do roteirista por extenso. Cidade: Empresa produtora,
            Ano. Especificação do suporte físico (duração do filme), Tipo de
            Suporte físico, son., color. Legendado. Idioma. Série. Notas
            especiais.
          </mark>
        </p>
        <img loading="lazy" src={Img} alt="Exemplo de referência de filme ABNT" width="100%" />
        <h2>Exemplos aplicando o formato</h2>
        <p>
          <b>Cinema</b>
        </p>
        <p>
          <mark>
            CENTRAL do Brasil. Direção: Walter Salles Júnior. Produção: Martire
            de ClermontTonnerre e Arthur Cohn. Intérpretes: Fernanda Montenegro,
            Marilia Pera, Vinicius de Oliveira, Sônia Lira, Othon Bastos,
            Matheus Nachtergaele <i>et al.</i> Roteiro: Marcos Bernstein, João
            Emanuel Carneiro e Walter Salles Júnior. [S. l.]: Le Studio Canal;
            Riofilme; MACT Productions, 1998. 5 rolos de filme (106 min), son.,
            color., 35 mm.
          </mark>
        </p>
        <p>
          <b> Cópia de um acervo </b>
        </p>
        <p>
          <mark>
            TERRA em transe. Direção: Gláuber Rocha. Rio de Janeiro: Mapa
            Produções Cinematográficas, 1967 [produção]. 1 filme (105 min), 35
            mm, p&b. Cópia da Cinemateca Brasileira.
          </mark>
        </p>
        <p>
          <b>DVD</b>
        </p>
        <p>
          <mark>
            CIDADE de Deus. Direção de Fernando Meirelles. Rio de Janeiro: Globo
            Filmes, 2002. 1 DVD (130 min.).
          </mark>
        </p>
        <p>
          <b>VHS</b>
        </p>
        <p>
          <mark>
            OS PERIGOS do uso de tóxicos. Produção de Jorge Ramos de Andrade.
            São Paulo: CERAVI, 1983. 1 fta de vídeo (30 min), VHS, son., color.
          </mark>
        </p>
        <p>
          <b>Amazon Prime (também serve para filme da Netflix)</b>
        </p>
        <p>
          <mark>
            QUERIDO Menino. Direção: Felix Van Groeningen. Produção: Dede
            Gardner; Jeremy Kleiner; Brad Pitt. Intérpretes: Steve Carell;
            Timothée Chalamet;Maura Tierney Amy Ryan <i>et al.</i>[S. l.]:
            Amazon Studios, 2018. Filme original da plataforma streaming de
            Amazon Prime Video.
          </mark>
        </p>
        <p>
          <b>Outras situações com vídeos</b>
        </p>
        <p>
          <b>Seriado de Televisão</b>
        </p>
        <p>
          Depois de inserir o título da série, é interessante especificar a
          temporada e o número do episódio referenciado. Informações como
          criador e produtor também são importantes. Veja um exemplo:
        </p>
        <p>
          <mark>
            LOST (Temporada 1, ep. 5). Criadores: Jeffrey Lieber; J. J. Abrams;
            Damon Lindelof. Produtores: Sarah Caplan <i>et al. </i> Hawaii:
            Produtora ABC Network, 2004. 1 DVD (45 min.), son., color.
          </mark>
        </p>
        <p>
          <b>Série da Netflix</b>
        </p>
        <p>
          No caso de uma série da Netflix, você pode adicionar a especificação
          do serviço de streaming na parte de informações adicionais. Veja um
          exemplo:
        </p>
        <p>
          <mark>
            HOUSE of cards (primeira temporada). Criação Beau Willimon.
            Produtores: David Fincher; Kevin Spacey; Eric Roth. S.l.: Media
            Rights Capital; Panic Pictures, 2013. 13 episódios, son., col. Série
            exibida pela Netflix. Acesso em: 24 jul. 2019.
          </mark>
        </p>
      </div>
      <RelatedLinks />

      <Footer />
    </>
  );
};

export default AdministrativeActs;
