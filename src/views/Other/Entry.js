import React, { useState } from "react";

import { Collapse } from "@material-ui/core";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
import Select from "../../components/InputWrapper/Select";
import Modal from "../../components/Modal";

// utils
import { formatDate } from "../../utils/formatDate";
import { formatAuthorName } from "../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../assets/images/arrow-left.svg";
import Plus from "../../assets/images/plus-dark.svg";
import Minus from "../../assets/images/minus.svg";

// styles
import {
    Container,
    Card,
    Row,
    Content,
    Back,
    AddIcon,
    RemoveIcon,
    FieldArrayContainer,
    ErrorText,
    Actions,
    Title,
} from "./style";

const SignupSchema = Yup.object().shape({
    entryResponsabilityType: Yup.string().required("Obrigatório"),
    entryTitle: Yup.string().required("Obrigatório"),
    title: Yup.string().required("Obrigatório"),
    local: Yup.string().required("Obrigatório"),
    publishingCompany: Yup.string().required("Obrigatório"),
    year: Yup.string().required("Obrigatório"),
});

const getResposabilityTypes = (responsabiltyTypes) => {
    if (responsabiltyTypes === "organizator") return "(Org.)";
    if (responsabiltyTypes === "author") return "(Aut.)";
    if (responsabiltyTypes === "coordinator") return "(Coord.)";

    return "";
};

const getTypeAuthor = (type) => {
    switch (type) {
        case "physicalPerson":
            return "Pessoa física"
        case "entity":
            return "Entidade"
        default:
            break;
    }
}

const generateReference = (values) => {
    const {
        entryAuthorType,
        entryResponsabilityType,
        partAuthors,
        entryTitle,
        chapterCaption,

        authorType,
        responsabilityType,
        authorOfTheWhole,
        title,
        caption,
        edition,
        local,
        publishingCompany,
        year,

        initialPage,
        finalPage,
        isolatedPage,
        series,
        notes,
        typeAndSupport,

        online,
        accessedAt,
    } = values;

    return (
        <span>
        </span>
    );
};
const Entry = ({ back }) => {
    const [state, setState] = useState({
        values: {},
        clearInitialValues: false,
    });

    const [collapse, setCollapase] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const handleSubmit = (values) => {
        setState((prev) => ({
            ...prev,
            values,
            references: generateReference(values),
            citationWithAuthor: generateCitationWithAuthor(
                values.partAuthors,
                values.year
            ),
            citation: generateCitationWithoutAuthor(
                values.partAuthors,
                values.year
            ),
        }));

        setOpenModal(!openModal);
    };

    const handleSetCollapse = () => {
        setCollapase(!collapse);
    };

    return (
        <Container>
            <Back onClick={back} src={ArrowLeft} />

            <Formik
                initialValues={{
                    entryAuthorType: "physicalPerson",
                    entryResponsabilityType: "organizator",
                    partAuthors: [""],
                    entryTitle: "Audibilidade",
                    chapterCaption: "",

                    authorType: "physicalPerson",
                    responsabilityType: 'organizator',
                    authorOfTheWhole: 'Ricardo Pizzotti',
                    title: "Enciclopédia básica da mídia eletrônica",
                    caption: "",
                    edition: "2",
                    local: 'São Paulo',
                    publishingCompany: "Editora Senac São Paulo",
                    year: "2003",

                    initialPage: "23",
                    finalPage: "25",
                    isolatedPage: "37",
                    series: "",
                    notes: "Informações complementares",
                    typeAndSupport: "cd-rom",

                    online: false,
                    accessedAt: "https://www.sp.senac.br/",
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
                                    Verbete de dicionário/enciclopédia
                    </p>
                            </Title>
                        </Actions>
                        <Card>
                            <Content>
                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Select
                                                type="text"
                                                label="Tipo do autor"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.entryAuthorType}
                                                name="entryAuthorType"
                                                errors={props.errors}
                                                touched={props.touched}
                                                options={[
                                                    { value: "physicalPerson", name: "Pessoa física" },
                                                    { value: "entity", name: "Entidade" },
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Select
                                                type="text"
                                                label="Tipo de responsabilidade"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.entryResponsabilityType}
                                                name="entryResponsabilityType"
                                                errors={props.errors}
                                                touched={props.touched}
                                                options={[
                                                    { value: "author", name: "Autor" },
                                                    { value: "compiler", name: "Compilador" },
                                                    { value: "editor", name: "editor" },
                                                    { value: "organizator", name: "Organizador" },
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <FieldArray
                                                name="partAuthors"
                                                render={(arrayHelpers) => (
                                                    <div>
                                                        {props.values.partAuthors &&
                                                            props.values.partAuthors.length > 0 ? (
                                                                props.values.partAuthors.map(
                                                                    (chapterAuthor, index) => (
                                                                        <FieldArrayContainer key={index}>
                                                                            <div
                                                                                style={{ display: "flex", width: "100%" }}
                                                                            >
                                                                                <Input
                                                                                    type="text"
                                                                                    label={`Autor da parte ${index + 1}`}
                                                                                    onChange={props.handleChange}
                                                                                    onBlur={props.handleBlur}
                                                                                    value={chapterAuthor}
                                                                                    name={`partAuthors.${index}`}
                                                                                    errors={props.errors}
                                                                                    touched={props.touched}
                                                                                />
                                                                                {index > 0 && (
                                                                                    <ButtonCore
                                                                                        type="button"
                                                                                        disabled={index === 0}
                                                                                        onClick={() =>
                                                                                            arrayHelpers.remove(index)
                                                                                        }
                                                                                    >
                                                                                        <RemoveIcon src={Minus} />
                                                                                    </ButtonCore>
                                                                                )}
                                                                                {
                                                                                    <ButtonCore
                                                                                        type="button"
                                                                                        onClick={() => arrayHelpers.push("")}
                                                                                    >
                                                                                        <AddIcon src={Plus} />
                                                                                    </ButtonCore>
                                                                                }
                                                                            </div>
                                                                            <div
                                                                                style={{
                                                                                    width: "100%",
                                                                                    marginBottom: "10px",
                                                                                }}
                                                                            >
                                                                                <ErrorText>
                                                                                    {props.errors &&
                                                                                        props.errors.partAuthors &&
                                                                                        props.errors.partAuthors[index]}
                                                                                </ErrorText>
                                                                            </div>
                                                                        </FieldArrayContainer>
                                                                    )
                                                                )
                                                            ) : (
                                                                <ButtonCore
                                                                    type="button"
                                                                    onClick={() => arrayHelpers.push("")}
                                                                >
                                                                    Add a author
                                                                </ButtonCore>
                                                            )}
                                                    </div>
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <Input
                                                type="text"
                                                label="Título do verbete"
                                                placeholder="Ex: Audibilidade"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.entryTitle}
                                                name="entryTitle"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <Input
                                                type="text"
                                                label="Subtítulo do verbete"
                                                placeholder="Se houver"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.entryCaption}
                                                name="entryCaption"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <div
                                    onClick={handleSetCollapse}
                                    style={{
                                        width: "100%",
                                        height: 50,
                                        backgroundColor: "#e6e6e6",
                                        borderRadius: 5,

                                        margin: "20px 0",
                                        cursor: "pointer",

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {collapse
                                        ? "Fechar informações"
                                        : "Abrir informações sobre dicionário/enciclopédia"}
                                </div>

                                <Collapse in={collapse}>
                                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                        <Grid item xs={12} sm={12} md={3}>
                                            <Select
                                                type="text"
                                                label="Tipo do autor"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.authorType}
                                                name="authorType"
                                                errors={props.errors}
                                                touched={props.touched}
                                                options={[
                                                    { value: "physicalPerson", name: "Pessoa física" },
                                                    { value: "entity", name: "Entidade" },
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3}>
                                            <Select
                                                type="text"
                                                label="Tipo de responsabilidade"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.responsabilityType}
                                                name="responsabilityType"
                                                errors={props.errors}
                                                touched={props.touched}
                                                options={[
                                                    { value: "author", name: "Autor" },
                                                    { value: "compiler", name: "Compilador" },
                                                    { value: "editor", name: "editor" },
                                                    { value: "organizator", name: "Organizador" },
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Input
                                                type="text"
                                                label="Nome do autor do todo"
                                                placeholder="Ex: Ricardo Pizzotti"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.authorOfTheWhole}
                                                name="authorOfTheWhole"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                        <Grid item xs={12} sm={12} md={5}>
                                            <Input
                                                type="text"
                                                label="Título da publicação no todo"
                                                placeholder="Ex: Enciclopédia básica da mídia eletrônica"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.title}
                                                name="title"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={5}>
                                            <Input
                                                type="text"
                                                label="Subtítulo da publicação no todo"
                                                placeholder="Ex: Incluir subtítulo, se houver"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.caption}
                                                name="caption"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={2}>
                                            <Input
                                                type="text"
                                                label="Nº da Edição"
                                                placeholder="Ex: 2"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.edition}
                                                name="edition"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Input
                                                type="text"
                                                label="Local de publicação"
                                                placeholder="Ex: São Paulo"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.local}
                                                name="local"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Input
                                                type="text"
                                                label="Editora"
                                                placeholder="Ex:Editora Senac São Paulo"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.publishingCompany}
                                                name="publishingCompany"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Input
                                                type="text"
                                                label="Ano"
                                                placeholder="Ex: 2003"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.year}
                                                name="year"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                        <Grid item xs={12} sm={12} md={2}>
                                            <Input
                                                type="text"
                                                label="Página Inicial"
                                                placeholder="Ex: 23"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.initialPage}
                                                name="initialPage"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={2}>
                                            <Input
                                                type="text"
                                                label="Página Final"
                                                placeholder="Ex: 25"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.finalPage}
                                                name="finalPage"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={2}>
                                            <Input
                                                type="text"
                                                label="Capítulo"
                                                placeholder="Ex: 24"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.isolatedPage}
                                                name="isolatedPage"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Input
                                                disabled={!props.values.complementaryElements}
                                                type="text"
                                                label="Série e coleção"
                                                placeholder="Ex: Nome da Série ou Coleção, se houver"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.series}
                                                name="series"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginBottom: 0 }}>
                                        <Grid item xs={12} sm={12} md={5}>
                                            <Input
                                                disabled={!props.values.complementaryElements}
                                                type="text"
                                                label="Notas"
                                                placeholder="Ex: Informações complementares"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.notes}
                                                name="notes"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={5}>
                                            <Select
                                                type="text"
                                                label="Tipo e suporte"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.typeAndSupport}
                                                name="typeAndSupport"
                                                errors={props.errors}
                                                touched={props.touched}
                                                options={[
                                                    { value: "cd-rom", name: "CD-ROM" },
                                                    { value: "online", name: "Online" },
                                                    { value: "printed", name: "Impresso" },
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={2}>
                                            <Select
                                                disabled={!props.values.complementaryElements}
                                                type="text"
                                                label="Online"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.online}
                                                name="online"
                                                errors={props.errors}
                                                touched={props.touched}
                                                options={[
                                                    { value: true, name: "Sim" },
                                                    { value: false, name: "Não" },
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                        <Grid item xs={12} sm={12} md={9}>
                                            <Input
                                                disabled={
                                                    !props.values.complementaryElements ||
                                                    !props.values.online
                                                }
                                                type="text"
                                                label="Endereço(URL)"
                                                placeholder="https://viacarreira.com/"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.url}
                                                name="url"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3}>
                                            <Input
                                                disabled={
                                                    !props.values.complementaryElements ||
                                                    !props.values.online
                                                }
                                                type="date"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.accessedAt}
                                                name="accessedAt"
                                                errors={props.errors}
                                                touched={props.touched}
                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>

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

export default Entry;
