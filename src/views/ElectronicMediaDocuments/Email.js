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
    sender: Yup.string().required("Obrigatório"),
    subject: Yup.string().required("Obrigatório"),
    recipient: Yup.string().required("Obrigatório"),
    publicationLocal: Yup.string().required("Obrigatório"),
    sendDate: Yup.string().required("Obrigatório"),
    supportSpecification: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
    const {
        sender,
        subject,
        recipient,
        publicationLocal,
        sendDate,
        supportSpecification,
    } = values;

    return (
        <span>
            {sender && <>{sender}. </>}
            {subject && <b>{subject}. </b>}
            {/* {local && <>{local}: </>}
            {publishingCompany && <>{publishingCompany}, </>}
            {yearOfPublication && <>{yearOfPublication}. </>}
            {complementaryInformations && <b>{complementaryInformations}, </b>}
            {accessedAt &&
                url &&
                ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `} */}
        </span>
    );
};

const Email = ({ back }) => {
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
            citationWithAuthor: generateCitationWithAuthor(values.author, values.publicationDate),
            citation: generateCitationWithoutAuthor(values.author, values.publicationDate)
        }));

        setOpenModal(!openModal);
    };

    return (
        <Container>
            <Back onClick={back} />

            <Formik
                initialValues={{
                    sender: '',
                    subject: '',
                    recipient: '',
                    publicationLocal: '',
                    sendDate: '',
                    supportSpecification: '',
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
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input
                                            type="text"
                                            label="Remetente"
                                            placeholder="Ex: SIBi – Sistema Integrado de Bibliotecas."
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.sender}
                                            name="sender"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input
                                            type="text"
                                            label="Assunto"
                                            placeholder="Ex: Portal de Revistas da USP tem novo design"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.subject}
                                            name="subject"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input
                                            type="text"
                                            label="Destinatário"
                                            placeholder="Ex: Rede de bibliotecas do SIBi"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.recipent}
                                            name="recipent"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input
                                            type="text"
                                            label="Local de publicação"
                                            placeholder="Ex: São Paulo"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.publicationLocal}
                                            name="publicationLocal"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            label="Data de envio"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.sendDate}
                                            name="sendDate"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={5}>
                                        <Input
                                            type="text"
                                            label="Especificações do suporte"
                                            placeholder="Ex: 1 mensagem eletrônica"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.supportSpecification}
                                            name="supportSpecification"
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

export default Email;
