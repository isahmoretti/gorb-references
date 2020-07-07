import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Required"),
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
      Livros
      <Formik
        initialValues={{
          author: "matheus paice",
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
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.author}
              name="author"
            />
            {props.errors.author && (
              <span className="error">{props.errors.author}</span>
            )}
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Book;
