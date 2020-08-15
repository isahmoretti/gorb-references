import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
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
        local,
        publishingCompany,
        yearOfPublication,
        complementaryInformations,
        url,
        accessedAt,
    } = values;

    return (
        <span>
            {author && <>{author}. </>}
            {siteName && <b>{siteName}. </b>}
            {local ? <>{local}: </> : <>[S.l.]. </>}
            {publishingCompany && <>{publishingCompany}, </>}
            {yearOfPublication && <>{yearOfPublication}. </>}
            {complementaryInformations && <b>{complementaryInformations}, </b>}
            {accessedAt &&
                url && <>{` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}</>}
        </span>
    );
};

const Site = ({ back }) => {
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
            citationWithAuthor: generateCitationWithAuthor(values.author, values.yearOfPublication),
            citation: generateCitationWithoutAuthor(values.author, values.yearOfPublication)
        }));

        setOpenModal(!openModal);
    };

    return (
        <Container>
            <Back onClick={back} />

            <Formik
                initialValues={{
                    author: '',
                    siteName: '',
                    local: '',
                    publishingCompany: '',
                    yearOfPublication: '',
                    complementaryInformations: '',
                    url: '',
                    accessedAt: '',
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
                                }}>Site(Homepage)</p>
                            </Title>
                        </Actions>
                        <Card>
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
                                    <Grid item xs={12} sm={12} md={6}>
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
                                    <Grid item xs={12} sm={12} md={6}>
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
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="text"
                                            label="Ano"
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
                                    <Grid item xs={12} sm={12} md={4}>
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
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
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

export default Site;
