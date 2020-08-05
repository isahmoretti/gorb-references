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
    jurisdiction: Yup.string().required("Obrigatório"),
    nameOfTheNotaryOrIssuingBody: Yup.string().required("Obrigatório"),
    documentType: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
    const {
        jurisdiction,
        nameOfTheNotaryOrIssuingBody,
        documentType,
        registrationDate,
        complementaryElement,
    } = values;

    return (
        <span>
            {jurisdiction && <>{jurisdiction}. </>}
            {nameOfTheNotaryOrIssuingBody && <>{nameOfTheNotaryOrIssuingBody}. </>}
            {documentType && <b>{documentType}. </b>}
            {registrationDate && <>Registro em:{formatDate(registrationDate)}. </>}
            {complementaryElement && <>{complementaryElement}. </>}
        </span>
    );
};

const CivilAndNotary = ({ back }) => {
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
            citationWithAuthor: generateCitationWithAuthor(values.jurisdiction, values.registrationDate),
            citation: generateCitationWithoutAuthor(values.jurisdiction, values.registrationDate)
        }));

        setOpenModal(!openModal);
    };

    return (
        <Container>
            <Back onClick={back} />

            <Formik
                initialValues={{
                    jurisdiction: '',
                    nameOfTheNotaryOrIssuingBody: '',
                    documentType: '',
                    registrationDate: '',
                    complementaryElement: '',
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
                                }}>
                                    DOCUMENTOS CIVIS E DE CARTÓRIOS
                                </p>
                                <span>
                                    Inclui certidão de nascimento, certidão de casamento, certidão de óbito, carteira de
                                    trabalho, passaporte, título de eleitor, CNH, certificação de serviço militar, entre outros
                                </span>
                            </Title>
                        </Actions>
                        <Card>
                            <Content>
                                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input
                                            type="text"
                                            label="Jurisdição"
                                            placeholder="Ex: São Paulo"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.jurisdiction}
                                            name="jurisdiction"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input
                                            type="text"
                                            label="Nome do cartório ou órgão expedidor"
                                            placeholder="Ex: Cartório de Registro Civil 37º Subdistrito Aclimação"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.nameOfTheNotaryOrIssuingBody}
                                            name="nameOfTheNotaryOrIssuingBody"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input
                                            type="text"
                                            label="Tipo do documento"
                                            placeholder="Ex: Certidão de nascimento de José Pereira"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.documentType}
                                            name="documentType"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input
                                            type="date"
                                            label="Data de registro"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.registrationDate}
                                            name="registrationDate"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Input
                                            type="text"
                                            label="Elemento complementar"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.complementaryElement}
                                            name="complementaryElement"
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

export default CivilAndNotary;
