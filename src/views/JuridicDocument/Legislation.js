import React, { useState } from "react";

import { Formik, Field, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

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
    jurisdiction: Yup.string().required("Obrigatório"),
    legislationNumber: Yup.string().required("Obrigatório"),
    legislationDate: Yup.string().required("Obrigatório"),
    publicationTitle: Yup.string().required("Obrigatório"),
    publicationLocal: Yup.string().required("Obrigatório"),
});

const territorialScopeOptions = [
    { value: "dontIsCase", name: "Não é o caso" },
    { value: "state", name: "Estado" },
    { value: "city", name: "Município" },
    { value: "Senate", name: "Congresso Senado" },
    { value: "parliament", name: "Congresso Camara dos Deputados" },
    { value: "legislativeAssembly", name: "Assembléia Legislativa" },
    { value: "cityCouncil", name: "Câmara de Vereadores" },
]


const generateReference = (values) => {
    const {
        jurisdiction,
        territorialScope,
        yearOfConstitutionalText,
        legislationType,
        legislationNumber,
        legislationDate,
        menu,
        publicationTitle,
        publicationCaption,
        editionNumber,
        publicationLocal,
        UF,
        publishingCompany,
        publicationDate,
        volume,
        publicationNumber,
        sessionNumber,
        initialPage,
        finalPage,
        online,
        url,
        accessedAt
    } = values;

    return (
        <span>
            {jurisdiction && <>{jurisdiction.toUpperCase()} </>}
            {territorialScope && <>({territorialScopeOptions.find(t => t.value === territorialScope).name }). </>}
            {yearOfConstitutionalText && <>Constituição ({yearOfConstitutionalText}). </>}
            {legislationType && <>{legislationType} </>}
            {legislationNumber && <>{legislationNumber}, </>}
            {legislationDate && <>de {formatDate(legislationDate, "d MMMM yyyy")}. </>}
            {menu && <>{menu}. </>}
            {publicationCaption ? (
                <>
                    <b>{publicationTitle}: </b>
                    {publicationCaption}.{" "}
                </>
            ) : (
                    <b>{publicationTitle}. </b>
                )
            }
            {editionNumber && <>{<>{editionNumber > 1 ? <>{editionNumber}.</> : <>{editionNumber}</>} ed.</>} </>}
            {publicationLocal && <>{publicationLocal}, </>}
            {UF && <>{UF}: </>}
            {publishingCompany && <>{publishingCompany}, </>}
            {publicationDate && <>{formatDate(publicationDate, "d MMMM yyyy")}. </>}
            {volume && <>v. {volume}, </>}
            {publicationNumber && <>n. {publicationNumber}, </>}
            {sessionNumber && <>Seção {sessionNumber}, </>}
            {(initialPage && finalPage) && <>p. {initialPage}-{finalPage}. </>}
            {(online && accessedAt && url) && <>{online &&
                accessedAt &&
                url &&
                ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
            </>}
        </span>
    );
};

const Legislation = ({ back }) => {
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
                    jurisdiction: "",
                    territorialScope: "",
                    yearOfConstitutionalText: "",
                    legislationType: "",
                    legislationNumber: "",
                    legislationDate: "",
                    menu: "",
                    publicationTitle: "",
                    publicationCaption: "",
                    editionNumber: "",
                    publicationLocal: "",
                    UF: "",
                    publishingCompany: "",
                    publicationDate: "",
                    volume: "",
                    publicationNumber: "",
                    sessionNumber: "",
                    initialPage: "",
                    finalPage: "",
                    online: false,
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
                                }}>Legislação</p>
                            </Title>
                        </Actions>
                        <Card>
                            <Content>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Jurisdição ou cabeçalho da entidade"
                                            placeholder="Ex: Brasil"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.jurisdiction}
                                            name="jurisdiction"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Select
                                            type="text"
                                            label="Abrangência Territorial"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.territorialScope}
                                            name="territorialScope"
                                            errors={props.errors}
                                            touched={props.touched}
                                            options={territorialScopeOptions}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Se texto Consitucional, informar ano "
                                            placeholder="Ex: 1998"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.yearOfConstitutionalText}
                                            name="yearOfConstitutionalText"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                                    <Grid item xs={12} sm={12} md={5}>
                                        <Input
                                            type="text"
                                            label="Tipo da Legislação (Lei, Decreto, etc)"
                                            placeholder="Ex: Emenda Constitucional"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.legislationType}
                                            name="legislationType"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="text"
                                            label="Número da Legislação"
                                            placeholder="Ex: 55"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.legislationNumber}
                                            name="legislationNumber"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="date"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.legislationDate}
                                            label="Data da legislação"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="legislationDate"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Input
                                            type="text"
                                            label="Ementa (s.f.c.)"
                                            placeholder="s.f.c. Transcrever a ementa do dispositivo legal."
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.menu}
                                            name="menu" // ementa
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid >
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Input
                                            type="text"
                                            label="Título da Publicação"
                                            placeholder="EX: Lex"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.publicationTitle}
                                            name="publicationTitle"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} >
                                        <Input
                                            type="text"
                                            label="Subtítulo da Publicação"
                                            placeholder="EX: Diário Oficial da União"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.publicationCaption}
                                            name="publicationCaption"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} >
                                        <Input
                                            type="text"
                                            label="Local da Publicação"
                                            placeholder="Ex: Brasília"
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
                                            type="text"
                                            label="Nº da edição"
                                            placeholder="Ex: 4"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.editionNumber}
                                            name="editionNumber"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="text"
                                            label="Unidade da Federação"
                                            placeholder="Ex: SP"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.UF}
                                            name="UF"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="text"
                                            label="Editora"
                                            placeholder="Ex: Saraiva"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.PublishingCompany}
                                            name="PublishingCompany"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="date"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.publicationDate}
                                            label="Data da publicação"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="publicationDate"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="text"
                                            label="Volume"
                                            placeholder="Ex: 4"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.volume}
                                            name="volume"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="text"
                                            placeholder="Ex: 7"
                                            label="Nº da Seção"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.sessionNumber}
                                            name="sessionNumber"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="text"
                                            label="Página inicial"
                                            placeholder="Ex: 56"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.initialPage}
                                            name="initialPage"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            type="text"
                                            label="Página final"
                                            placeholder="Ex: 78"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.finalPage}
                                            name="finalPage"
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Select
                                            name="online"
                                            label="Online"
                                            type="text"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.online}
                                            errors={props.errors}
                                            touched={props.touched}
                                            options={[
                                                { value: true, name: "Sim" },
                                                { value: false, name: "Não" },
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Input
                                            disabled={!props.values.online}
                                            name="url"
                                            label="Endereço(URL)"
                                            type="text"
                                            placeholder="https://viacarreira.com/"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.url}
                                            errors={props.errors}
                                            touched={props.touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <Input
                                            disabled={!props.values.online}
                                            name="accessedAt"
                                            type="date"
                                            label="Data de acesso"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.accessedAt}
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

export default Legislation;
