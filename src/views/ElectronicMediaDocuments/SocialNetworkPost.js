import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid, TextField } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Select from "../../components/InputWrapper/Select";
import Button from "../../components/Buttons";
import Modal from "../../components/Modal";

// utils
import { formatDate } from "../../utils/formatDate"
import { formatMessage } from '../../utils/formatMessage'
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
    type: Yup.string().required("Obrigatório"),
    firstName: Yup.string().required("Obrigatório"),
    lastSurname: Yup.string().required("Obrigatório"),
    // message: Yup.string().required("Obrigatório"),
    publicationDate: Yup.string().required("Obrigatório"),
    accountAddress: Yup.string().required("Obrigatório"),
    url: Yup.string().required("Obrigatório"),
    accessedAt: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
    const {
        type,
        firstName,
        lastSurname,
        message,
        local,
        publicationDate,
        accountAddress,
        url,
        accessedAt,
    } = values;

    return (
        <span>
            {lastSurname && <>{lastSurname}, </>}
            {firstName && <>{firstName}. </>}
            {message && <b>{formatMessage(message)}. </b>}
            {local && <>{local}, </>}
            {publicationDate && <>{formatDate(publicationDate)}. </>}
            {type && <>{type}: </>}
            {accountAddress && <>{accountAddress}. </>}
            {accessedAt &&
                url &&
                ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
        </span>
    );
};

const SocialNetworkPost = ({ back }) => {
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
            citationWithAuthor: generateCitationWithAuthor(values.firstName, values.publicationDate),
            citation: generateCitationWithoutAuthor(values.firstName, values.publicationDate)
        }));

        setOpenModal(!openModal);
    };

    return (
        <Container>
            <Back onClick={back} />

            <Formik
                initialValues={{
                    type: '',
                    firstName: '',
                    lastSurname: '',
                    message: '',
                    local: '',
                    publicationDate: '',
                    accountAddress: '',
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
                                }}>Postagem em rede social</p>
                                Publicações em Facebook, Twitter, Instagram e outras redes sociais digitais.
                            </Title>
                        </Actions>
                        <Card>
                            <Content>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Select
                                            type="text"
                                            label="Tipo de meio"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.type}
                                            name="type"
                                            errors={props.errors}
                                            touched={props.touched}
                                            options={[
                                                { value: 'twitter', name: "Twitter" },
                                                { value: 'facebook', name: "Facebook" },
                                                { value: 'instagram', name: "Instagram" },
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                        <Input
                                            type="text"
                                            label="Primeira parte do nome do Autor ou Entidade"
                                            placeholder="Ex: Agência Nacional de Vigilância Sanitária"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.firstName}
                                            name="firstName"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={7}>
                                        <Input
                                            type="text"
                                            label="Último Sobrenome do Autor"
                                            placeholder="Ex: ANVISA"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.lastSurname}
                                            name="lastSurname"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={5}>
                                        <Input
                                            type="text"
                                            label="Local de publicação"
                                            placeholder="Ex: Brasília - se a pessoa não preencher, completar com [S.l]"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.local}
                                            name="local"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Input
                                            type="text"
                                            label="Mensagem"
                                            rowns={3}
                                            multiline
                                            placeholder="Ex: Apresentamos um avanço significativo após a implementação do nosso Plano
                                            Digital, aprovado em 2019. Os serviços digitais passaram de 36 para um total de 113."
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.message}
                                            name="message"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="date"
                                            label="Data de publicação"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.publicationDate}
                                            name="publicationDate"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                        <Input
                                            type="text"
                                            label="Endereço da conta"
                                            placeholder="Ex: @anvisa_oficial"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.accountAddress}
                                            name="accountAddress"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                        <Input
                                            type="text"
                                            label="Disponível em"
                                            placeholder="Ex: https://twitter.com/anvisa_oficial/status/1260575029127000068"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.url}
                                            name="url"
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

export default SocialNetworkPost;
