import React, { useState } from "react";

import { Formik, Field, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore, TextareaAutosize } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
import Select from "../../components/InputWrapper/Select";
import Modal from "../../components/Modal";

// utils
import { formatDate } from "../../utils/formatDate"
import { generateCitationWithAuthor } from "../../utils/generateCitationWithAuthor"
import { generateCitationWithoutAuthor } from "../../utils/generateCitationWithoutAuthor"


// styles
import {
    Container,
    Card,
    Row,
    Content,
    Back,
    Actions,
    Title,
} from "./style";

const SignupSchema = Yup.object().shape({
    // jurisdiction: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
    const {
        author,
        type,
        number,
        documentSigningDate,
        menu, // ementa
        note,
        publication,
        publicationLocal,
        publicationDate,
        section,
        page,
        url,
        accessedAt,
    } = values;

    return (
        <span>

        </span>
    );
};

const ProvisionalMeasure = ({ back }) => {
    const [state, setState] = useState({
        values: {},
        clearInitialValues: false,
    });

    const [openModal, setOpenModal] = useState(false);

    const handleSubmit = (values) => {
        setState((prev) => ({
            ...prev,
            values,
            references: generateReference(values),
            citationWithAuthor: generateCitationWithAuthor(values.jurisdiction, values.legislationDate),
            citation: generateCitationWithoutAuthor(values.jurisdiction, values.legislationDate)
        }));

        setOpenModal(!openModal);
    };

    return (
        <Container>
            <Back onClick={back} />

            <Formik
                initialValues={{
                    author: "",
                    type: "Medida Provisória",
                    number: "",
                    documentSigningDate: "",
                    menu: "", // ementa
                    note: "",
                    publication: "",
                    publicationLocal: "",
                    publicationDate: "",
                    section: "",
                    page: "",
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
                                <p style={{
                                    fontSize: '20px'
                                }}>Medida Provisória</p>
                            </Title>
                        </Actions>
                        <Card>
                            <Content>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Autor"
                                            placeholder="Ex: Brasil"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.author}
                                            name="author"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Tipo"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.type}
                                            name="type"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Número"
                                            placeholder="Ex: 648"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.number}
                                            name="number"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Input
                                            type="text"
                                            label="Ementa"
                                            rows='3'
                                            multiline
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.menu}
                                            name="menu"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="date"
                                            label="Data de assinatura do documento"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.documentSigningDate}
                                            name="documentSigningDate"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Nota"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.note}
                                            name="note"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Publicação"
                                            placeholder="Ex: Diário Oficial da União"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.publication}
                                            name="publication"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Local da publicação"
                                            placeholder="Ex: Brasília, DF"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.publicationLocal}
                                            name="publicationLocal"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Data de publicação"
                                            placeholder="Ex: 4 jun. 2014"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.publicationDate}
                                            name="publicationDate"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Seção"
                                            placeholder="Ex: Seção 1"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.section}
                                            name="section"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Página"
                                            placeholder="Ex: 1"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.page}
                                            name="page"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Disponível em"
                                            placeholder="Ex: www.viacarreira.com)"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.page}
                                            name="page"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
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
                                </Grid>
                                <Row container className="end">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={props.resetForm}
                                    >Limpar campos</Button>
                                    <Button type="submit" color="primary">Gerar referência e citação</Button>
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
        </Container >
    );
};

export default ProvisionalMeasure;
