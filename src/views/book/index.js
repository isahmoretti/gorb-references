import React from 'react';
import { useFormik, Form } from "formik";
function Book() {
    // Elementos essenciais: autor, título, subtítulo (se houver),
    // edição (se houver), local de publicação, editora e data de publicação.
    // Elementos complementares: outras responsabilidades, paginação, série, notas, ISBN.
    const formik = useFormik({
        initialValues: {
            author: '',
            title: '',
            caption: '',  // subtitulo - não é obrigatório
            edition: '', // não é obrigatório
            local: '',  // ex: São Paulo
            publishingCompany: '', //
            yearOfPublication: '',
            online: false,
        }
    })
    return (
        <div>
            Livros
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="author">Author</label>
                <input
                    id="author"
                    name="author"
                    type="author"
                    onChange={formik.handleChange}
                    value={formik.values.author}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Book;
