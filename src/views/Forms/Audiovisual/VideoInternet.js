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

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatMonosyllable } from "../../../utils/monosyllable";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/audiolivro/referencia-abnt-video-de-internet.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  time: Yup.string().required("Obrigatório"),
  responsible: Yup.string().required("Obrigatório"),
  url: Yup.string().required("Obrigatório"),
  accessedAt: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Vídeo de Internet: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Referência de vídeo de internet (YouTube, Vimeo) no padrão ABNT NBR 6023:2018. Gratuito e fácil.");
  const {
    title,
    subtitle,
    year,
    time,
    responsible,
    url,
    accessedAt,
    local,
    publisher,
  } = values;

  return (
    <span>
      {subtitle ? (
        <>
          {formatMonosyllable(title)}: {subtitle}.&nbsp;
        </>
      ) : (
        <>{formatMonosyllable(title)}. </>
      )}
      {local && `${local}, `}
      {publisher && `${publisher}, `}
      {!local && !publisher && <>[S. l.:s. n.], </>}
      {`${year}. `}
      {`1 vídeo (${time}). `}
      {`Publicado pelo ${responsible}. `}
      {accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const VideoInternet = ({ back }) => {
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
            subtitle: "",
            year: "",
            time: "",
            responsible: "",
            url: "",
            accessedAt: "",

            local: "",
            publisher: "",
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
                    Vídeo de Internet
                  </p>
                  <span>
                    Conteúdos de Youtube, Vimeo, DailyMotion, entre outras
                    plataformas de vídeo
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
                        label="Título do vídeo"
                        placeholder="Ex: Eva Vertes olha para o futuro da medicina"
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
                        label="Subtítulo"
                        placeholder="Ex: Subtítulo (se houver)"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.subtitle}
                        name="subtitle"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Ano"
                        placeholder="Ex: 2015"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        name="year"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="time"
                        type="text"
                        label="Tempo de duração"
                        placeholder="Ex: 10 min"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.time}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="responsible"
                        type="text"
                        label="Responsabilidade"
                        placeholder="Ex: Canal TED Brasil"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responsible}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="local"
                        type="text"
                        label="Local"
                        placeholder="Ex: Brasília"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.local}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="publisher"
                        type="text"
                        label="Publicadora"
                        placeholder="Ex: Publicadora"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publisher}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        name="url"
                        label="Disponível em"
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=wpLhm0UKTB"
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
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência de vídeo de internet ABNT</h1>

        <p>
          As referências bibliográficas de vídeos de internet devem obedecer os
          padrões estabelecidos para filmes. Contudo, é necessário acrescentar
          especificações sobre o suporte, como é o caso do endereço eletrônico e
          a data de acesso.
        </p>
        <p>
          No Youtube e outras plataformas online de vídeo, é possível encontrar
          vários conteúdos audiovisuais, como palestras, entrevistas com
          especialistas, documentários, propagandas e curtas.
        </p>

        <h2>Elementos essenciais na referência de vídeo online</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Título do vídeo:</b> Título do vídeo referenciado;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo:</b> subtítulo (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>Ano:</b> ano de publicação;{" "}
          </li>
          <li>
            {" "}
            <b>Tempo de duração:</b> descrito em minutos ou horas;{" "}
          </li>
          <li>
            {" "}
            <b>Responsabilidade:</b> Nome do canal;{" "}
          </li>
          <li>
            {" "}
            <b>Publicadora:</b> responsável pela publicação;{" "}
          </li>
          <li>
            {" "}
            <b>Disponibilidade:</b> URL, precedida de "Disponível em";{" "}
          </li>
          <li>
            {" "}
            <b>Acesso:</b> dia, mês e ano de acesso, precedido de "Acesso em";{" "}
          </li>
        </ul>

        <h2>Elementos complementares</h2>

        <p>
          Os elementos complementares de uma referência são aqueles que não
          possuem caráter obrigatório, mas melhoram a descrição do documento.
        </p>

        <p>
          No vídeo de internet, se houver informações sobre produção,
          reportagem, imagem e edição, você pode adicionar, seguindo o padrão de
          referência de filme.
        </p>

        <h2>Regras de formatação</h2>

        <p>
          A referência de vídeo de internet começa com o título do conteúdo,
          sendo que a primeira palavra deve ser transcrita com letras
          maiúsculas. Em caso de artigo ou preposição acompanhando, também é
          necessário colocar em letras maiúsculas.
        </p>

        <p>
          Quando não se sabe o local de publicação, usa-se a expressão [s. l.],
          que significa sine loco.
        </p>

        <p>
          No caso de publicadora não identificada, o correto é usar a expressão
          [s. n.], que significa sine nomine.
        </p>

        <p>
          Em uma referência de vídeo com local e publicadora desconhecidos,
          usa-se a expressão [S. l.: s. n.] - sempre entre colchetes, abreviadas
          e separadas por dois pontos.
        </p>

        <h2>Formato básico</h2>

        <p>Veja no esquema abaixo a ordem dos elementos e pontuação:</p>

        <p>
          <mark>
            TÍTULO do vídeo: Subtítulo. Local: Publicadora, Ano. 1 vídeo (tempo
            de duração). Publicado pelo Responsabilidade. Disponível em: URL.
            Acesso em: dia, mês e ano.
          </mark>
        </p>

        <h2>Exemplos</h2>

        <img loading="lazy" src={Img} alt="Exemplo de referência de vídeo de internet ABNT" width="100%" />

        <p>
          <mark>
            DE BEM com a saúde - AVC: Qual a importância do rápido atendimento?
            Bauru: USP, 2018. 1 vídeo (1 min). Publicado pela TV USP Bauru.
            Disponível em: https://www.youtube.com/watch?v=gkT-eMYlrKw. Acesso
            em: 29 out. 2020.
          </mark>
        </p>

        <p>
          <mark>
            THE KEY to a better malaria vaccine. [New York]: TED, 2018. 1 vídeo
            (7 min). Disponível em: https://www.youtube.com/watch?v=b2Jv8vC-m3g.
            Acesso em: 29 out. 2020.
          </mark>
        </p>

        <p>
          <mark>
            UM MANIFESTO 2.0 do bibliotecário. Mash up por Laura Cohen.
            Tradução: Maria José Vicentini Jorente. [S. l.: s. n.], 2007. 1
            vídeo (4 min). Disponível em:
            http://www.youtube.com/watch?vYj1p0A8DMrE. Acesso em: 12 maio 2010.
          </mark>
        </p>

        <p>
          <mark>
            O QUE É PLÁGIO acadêmico e quais são suas consequências. Produção:
            Gabriel José. Reportagem: Gabriel José, Ludmilla Cabral. [S.l.]: TV
            UFMG, 2018. Publicado pelo canal TV UFMG em 11 abr. 2018. Disponível
            em: https://www.youtube.com/watch?v=jj9elw6MSw0. Acesso em: 29 out.
            2020.
          </mark>
        </p>

        <p>
          <mark>
            TELECURSO 2000 Normalizacao 03 Normalização no Brasil. Direção:
            Adrina Mesquita, José Messina Netto, André Martirani. Produção:
            Cristiane Marie, José Alves da Silva, Caito Nucci, Juliana
            Santonieri, Emerson Luis, Marcelo Fonseca. [S.l.]: Fundação Roberto
            Marinho, [2000?]. Publicado pelo canal de Bruno Albert em 26 dez.
            2011. Disponível em:
            https://www.youtube.com/watch?v=qF4fPwmosjI&list=PL7D9C30CD55F4FFF8&index=3.
            Acesso em: 29 out. 2020.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default VideoInternet;
