import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

// components
import Select from "../../../components/InputWrapper/Select";
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";

import Fields from "../../../components/Fields";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

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
        true
      ),
      citation: generateCitationWithoutAuthor(
        values.author,
        values.yearOfPublication,
        true
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

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
                        placeholder: "​Ex: Primeiros Socorros para Estudantes",
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
  );
};

export default Book;
