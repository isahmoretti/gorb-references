import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import InputWrapper from "../../components/InputWrapper/Input";


const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const Book = () => {
  // Elementos essenciais: autor, título, subtítulo (se houver),
  // edição (se houver), local de publicação, editora e data de publicação.
  // Elementos complementares: outras responsabilidades, paginação, série, notas, ISBN.

  const handleSubmit = (values) => {

    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={{
          author: "",
          title: "",
          caption: "", // subtitulo - não é obrigatório
          edition: "", // não é obrigatório
          local: "", // ex: São Paulo
          publishingCompany: "", //
          yearOfPublication: "",
          online: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputWrapper
              type="text"
              label="Autor"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.author}
              name="author"
            />
            {props.errors.author && (
              <span className="error">{props.errors.author}</span>
            )}
            <InputWrapper
              type="text"
              label="Título"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.title}
              name="title"
            />
            {props.errors.title && (
              <span className="error">{props.errors.title}</span>
            )}
            <InputWrapper
              type="text"
              label="Capítulo"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.caption}
              name="caption"
            />
            <InputWrapper
              type="text"
              label="Edição"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.edition}
              name="edition"
            />
            <InputWrapper
              type="text"
              label="Local de publicação"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.local}
              name="local"
            />
            {props.errors.local && (
              <span className="error">{props.errors.local}</span>
            )}
            <InputWrapper
              type="text"
              label="Empresa de publicação"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.publishingCompany}
              name="publishingCompany"
            />
            {props.errors.publishingCompany && (
              <span className="error">{props.errors.publishingCompany}</span>
            )}
            <InputWrapper
              type="text"
              label="Ano de publicação"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.yearOfPublication}
              name="yearOfPublication"
            />
            {props.errors.yearOfPublication && (
              <span className="error">{props.errors.yearOfPublication}</span>
            )}
            <label htmlFor="online">Online</label>
            <select
              id="online"
              label="online"
              value={props.values.online}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name="online"
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Book;


