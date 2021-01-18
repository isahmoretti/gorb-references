import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";

// components
import Select from "../../../components/InputWrapper/Select";
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Fields from "../../../components/Fields";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import chamadasCitacao from "../../../assets/images/explicativos/livro/quatro-autores/chamadas_citacao_livros_quatro_autores_ou_mais.jpg";
import elementosComplementares from "../../../assets/images/explicativos/livro/quatro-autores/elementos_complementares_livro_quatro_autores_ou_mais.jpg";
import elementosEssenciais from "../../../assets/images/explicativos/livro/quatro-autores/elementos_essenciais_livro_quatro_autores_ou_mais.jpg";

// styles
import {
  Container,
  Card,
  Row,
  Content,
  Back,
  Actions,
  Title,
  Header,
} from "./style";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    author,
    title,
    abbreviate,
    caption,
    edition,
    local,
    publishingCompany,
    yearOfPublication,
    complementaryElements,
    othersResponsabilities,
    series,
    pagination,
    notes,
    isbn,
    volume,
    originalTitle,
    online,
    url,
    accessedAt,
    translator,
    translatorName,
  } = values;

  return (
    <span>
      <>
        {formatAuthorName([author], abbreviate)} <i>et al. </i>
      </>
      {caption ? (
        <>
          <b>{title}: </b> {`${caption}. `}
        </>
      ) : (
        <b>{title}. </b>
      )}
      {complementaryElements && translator && translatorName.length && (
        <> Tradução: {translatorName.join("; ")}. </>
      )}
      {edition && <> {edition > 1 ? <>{edition}.</> : <>{edition}</>} ed. </>}
      {local}: <>{publishingCompany},</>
      {volume && <> v. {volume},</>}
      <> {yearOfPublication}.</>
      {complementaryElements && pagination && <> {pagination} p.</>}
      {complementaryElements && series && <> ({series}).</>}
      {complementaryElements && originalTitle && (
        <> Título original: {originalTitle}.</>
      )}
      {complementaryElements && othersResponsabilities && (
        <> {othersResponsabilities}.</>
      )}
      {complementaryElements && notes && <> {notes}.</>}
      {complementaryElements && isbn && <> ISBN: {isbn}.</>}
      {complementaryElements &&
        online &&
        accessedAt &&
        url &&
        ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const Book = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  const handleCitation = (text, yaer) => {
    return {
      cit1: `${text} et al. (${yaer})`,
      cit2: `(${text.toUpperCase()} et al., ${yaer})`,
    };
  };

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor: generateCitationWithAuthor(
        values.author,
        values.yearOfPublication,
        true,
        true
      ),
      citation: generateCitationWithoutAuthor(
        values.author,
        values.yearOfPublication,
        true,
        true
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back onClick={() => history.push("/livro")} src={ArrowLeft} />

        <Formik
          initialValues={{
            author: "",
            abbreviate: false,
            title: "",
            caption: "",
            edition: "",
            local: "",
            publishingCompany: "",
            yearOfPublication: "",
            complementaryElements: false,
            othersResponsabilities: "",
            pagination: "",
            series: "",
            notes: "",
            isbn: "",
            originalTitle: "",
            volume: "",
            online: false,
            url: "",
            accessedAt: "",
            translator: false,
            translatorName: [""],
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
                    Referência de livro com quatro autores ou mais
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Fields
                    data={{
                      fields: [
                        // row [1]
                        {
                          type: "text",
                          name: "author",
                          label: "Autor principal",
                          placeholder: "Ex: Keith J. Karren",
                          grid: 9,
                        },
                        {
                          type: "text",
                          name: "abbreviate",
                          label: "Abreviar",
                          placeholder: "",
                          grid: 3,
                          options: [
                            { value: true, name: "Sim" },
                            { value: false, name: "Não" },
                          ],
                        },
                        // row [2]
                        {
                          type: "text",
                          name: "title",
                          label: "Título",
                          placeholder:
                            "​Ex: Primeiros Socorros para Estudantes",
                          grid: 6,
                        },
                        {
                          type: "text",
                          name: "caption",
                          label: "Subtítulo",
                          placeholder: "Ex: Subtítulo do livro (se houver)",
                          grid: 6,
                        },
                        // row [3]
                        {
                          type: "text",
                          name: "local",
                          label: "Local da publicação",
                          placeholder: "Ex: São Paulo",
                          grid: 4,
                        },
                        {
                          type: "text",
                          name: "publishingCompany",
                          label: "Empresa de publicação (editora)",
                          placeholder: "Ex: Editora Manole",
                          grid: 4,
                        },
                        {
                          type: "text",
                          name: "edition",
                          label: "Edição",
                          placeholder: "Ex: 10",
                          grid: 4,
                        },
                        // row [4]
                        {
                          type: "text",
                          name: "yearOfPublication",
                          label: "Ano de publicação",
                          placeholder: "Ex: 2013",
                          grid: 3,
                        },
                        {
                          type: "text",
                          name: "volume",
                          label: "Volume",
                          placeholder: "Ex: 10",
                          grid: 3,
                        },
                        {
                          type: "text",
                          name: "complementaryElements",
                          label: "Elementos complementares",
                          placeholder: "",
                          grid: 3,
                          options: [
                            { value: true, name: "Sim" },
                            { value: false, name: "Não" },
                          ],
                        },
                        {
                          type: "text",
                          name: "pagination",
                          label: "Páginas",
                          placeholder: "Ex: 592",
                          disabled: !props.values.complementaryElements,
                          grid: 3,
                        },
                        // row [5]
                        {
                          type: "text",
                          name: "othersResponsabilities",
                          label: "Outras responsabilidades",
                          placeholder: "",
                          disabled: !props.values.complementaryElements,
                          grid: 4,
                        },
                        {
                          type: "text",
                          name: "series",
                          label: "Séries e coleções",
                          placeholder: "Ex: Grandes Autores Nacionais",
                          disabled: !props.values.complementaryElements,
                          grid: 4,
                        },
                        {
                          type: "text",
                          name: "notes",
                          label: "Nota",
                          placeholder: "Ex: Informações complementares",
                          disabled: !props.values.complementaryElements,
                          grid: 4,
                        },
                        // row [6]
                        {
                          type: "text",
                          name: "isbn",
                          label: "ISBN",
                          placeholder: "",
                          disabled: !props.values.complementaryElements,
                          grid: 5,
                        },
                        {
                          type: "text",
                          name: "translator",
                          label: "Tradutor",
                          placeholder: "Ex: 978-8520434789",
                          disabled: !props.values.complementaryElements,
                          grid: 3,
                          options: [
                            { value: true, name: "Sim" },
                            { value: false, name: "Não" },
                          ],
                        },
                        // row [7]
                        {
                          type: "text",
                          name: "translatorName",
                          label: "Tradutor",
                          placeholder: "Ex: Matheus Paice",
                          disabled:
                            !props.values.complementaryElements ||
                            !props.values.translator,
                          isFieldArray: true,
                          grid: 12,
                        },
                        // row[8]
                        {
                          type: "text",
                          name: "originalTitle",
                          label: "Título original",
                          placeholder: "",
                          disabled: !props.values.complementaryElements,
                          grid: 12,
                        },
                        // online
                        {
                          type: "text",
                          name: "online",
                          label: "Online",
                          placeholder: "",
                          disabled: !props.values.complementaryElements,
                          grid: 2,
                          options: [
                            { value: true, name: "Sim" },
                            { value: false, name: "Não" },
                          ],
                        },
                        {
                          type: "date",
                          name: "accessedAt",
                          label: "",
                          placeholder: "",
                          disabled: !props.values.complementaryElements,
                          grid: 3,
                        },
                        {
                          type: "text",
                          name: "url",
                          label: "Endereço (URL)",
                          placeholder: "https://viacarreira.com.br",
                          disabled: !props.values.complementaryElements,
                          grid: 7,
                        },
                      ],
                      fieldsProps: { ...props },
                    }}
                  />

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
        <h1>REFERÊNCIA DE LIVRO COM QUATRO AUTORES OU MAIS (ABNT)</h1>

        <p>
          Os nomes de todos os autores podem ser indicados na referência, mas há
          uma facilidade: indicar apenas o sobrenome e nome do primeiro autor,
          seguido pela expressão latina et al. - que significa « e outros». Essa
          opção existe para fins de padronização e simplificação. Não se deve
          usar vírgula antes de et al.
        </p>

        <h3>Como fazer referência com quatro autores ou mais?</h3>

        <h3>Elementos essenciais</h3>

        <p>
          Os elementos essenciais para referência de livro com quatro autores ou
          mais são:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autoria:</b> SOBRENOME e nome do primeiro autor{" "}
          </li>
          <li>
            {" "}
            <b>et al.:</b> expressão latina que significa « e outros»{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> Título em negrito.{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo (se houver):</b> Subtítulo sem negrito.{" "}
          </li>
          <li>
            {" "}
            <b>Edição (se houver):</b> Algarismos arábicos seguidos pela
            abreviatura (13. ed.){" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade da editora{" "}
          </li>
          <li>
            {" "}
            <b>Editora:</b> nome da empresa publicadora{" "}
          </li>
          <li>
            {" "}
            <b>Data:</b> Ano de publicação do livro.{" "}
          </li>
        </ul>

        <p>
          Esquema para montar referência de livros com dois ou três autores:
        </p>

        <p>
          <mark>
            SOBRENOME, Primeiro Nome <i>et al.</i> <b>Título:</b> Subtítulo.
            Local: Editora, ano.
          </mark>
        </p>

        <img
          src={elementosEssenciais}
          alt="elementos-essenciais"
          width="100%"
        />

        <h3>Elementos complementares</h3>

        <p>
          Os elementos complementares são inseridos para facilitar, ainda mais,
          a identificação da fonte. Veja alguns itens:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Nome do tradutor (se houver):</b> Nome do tradutor, precedido por
            [Tradução:]{" "}
          </li>
          <li>
            {" "}
            <b>Título original da obra (se houver):</b> Título original da obra
            traduzida, precedido por [Título Original:]{" "}
          </li>
          <li>
            {" "}
            <b>Número de páginas:</b> quantidade de páginas em algarismos
            arábicos, seguido pela abreviatura [p.]{" "}
          </li>
          <li>
            {" "}
            <b>Número do volume:</b> números algarismos arábicos precedido por
            “v.” e entre vírgulas.{" "}
          </li>
          <li>
            {" "}
            <b>Série ou Coleção:</b> nome da série entre parênteses.{" "}
          </li>
          <li>
            {" "}
            <b>ISBN:</b> Número Padrão Internacional de Livro.{" "}
          </li>
        </ul>

        <img
          src={elementosComplementares}
          alt="elementos-complementares"
          width="100%"
        />

        <p>
          No caso de uma obra consultada on-line, é fundamental mencionar o link
          onde está o documento e a data de acesso.
        </p>

        <h3>Exemplo:</h3>

        <p>
          <mark>
            MARTINS, Eliseu <i>et al.</i>{" "}
            <b>Manual de contabilidade societária:</b> de acordo com as normas
            internacionais e do CPC. 3. ed. São Paulo: Atlas, 2018. 2441 p.
            ISBN: 9788597016154. Disponível em:
            https://minhabiblioteca.com.br/livros/9745677. Acesso em: 13 ago.
            2020.
          </mark>
        </p>

        <h3>Chamadas para citações</h3>

        <p>
          A ABNT diz que toda obra consultada e colocada no trabalho deve ser
          referenciada no corpo do texto e também na lista de referências. No
          caso da redação, os créditos são atribuídos através das chamadas para
          citações. O sistema adotado é o de autor-data.
        </p>

        <p>
          Quando estiver incluída na sentença, a chamada com o responsável
          intelectual é feita com letras minúsculas e somente o ano de
          publicação é colocado entre parênteses.
        </p>

        <p>
          Quando o nome do autor se encontra fora da sentença, a recomendação é
          formatar com letras maiúsculas e colocar entre parênteses, junto com o
          ano.
        </p>

        <p>
          E lembre-se: a chamada e a entrada na lista de referências devem ser
          iguais. Essa regra vale para todas as citações e referências
          bibliográficas do seu trabalho.
        </p>

        <h3>Exemplo:</h3>

        <p>
          <mark>Citação (chamada): Martins et al. (2003)</mark>
        </p>

        <p>
          <mark>Entrada na lista de referência: MARTINS, Eliseu et al.</mark>
        </p>

        <img src={chamadasCitacao} alt="chamada-citacao" width="100%" />

        <p>
          Incluir o número da página do livro de onde a citação foi extraída é
          opcional, mas muito recomendado. Ele deve ser inserido junto com com o
          ano, de forma abreviada.
        </p>

        <h3>Quatro autores ou mais:</h3>

        <p>
          <mark>Neves et al. (2015, p. 28) trecho citado [...]</mark>
        </p>

        <p>
          <mark>[...] trecho citado (NEVES et al., 2015, p. 28).</mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Book;
