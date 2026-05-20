import React, { lazy, Suspense } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// pages
const Hexagon = lazy(() => import("../views/Hexagon"));

// Livro
const Book = lazy(() => import("../views/Forms/Book"));
const BookAuthorEntity = lazy(() => import("../views/Forms/Book/BookAuthorEntity"));
const BookIntellectuallyResponsible = lazy(() => import("../views/Forms/Book/BookIntellectuallyResponsible"));
const BookWithFourOrMoreAuthors = lazy(() => import("../views/Forms/Book/BookWithFourOrMoreAuthors"));
const BookWithOneAuthor = lazy(() => import("../views/Forms/Book/BookWithOneAuthor"));
const BookWithTwoOrThreeAuthors = lazy(() => import("../views/Forms/Book/BookWithTwoOrThreeAuthors"));
const ChapterOfBook = lazy(() => import("../views/Forms/Book/ChapterOfBook"));

// Trabalhos acadêmicos
const AcademicWork = lazy(() => import("../views/Forms/AcademicWork"));
const WorkArticlePeriodic = lazy(() => import("../views/Forms/AcademicWork/WorkArticlePeriodic"));
const ArticleMagazine = lazy(() => import("../views/Forms/AcademicWork/ArticleMagazine"));
const ArticleNewspaper = lazy(() => import("../views/Forms/AcademicWork/ArticleNewspaper"));
const Dissertation = lazy(() => import("../views/Forms/AcademicWork/Dissertation"));
const Monography = lazy(() => import("../views/Forms/AcademicWork/Monography"));
const Thesis = lazy(() => import("../views/Forms/AcademicWork/Thesis"));

// Documentos Jurídicos
const JuridicDocument = lazy(() => import("../views/Forms/JuridicDocument"));
const AdministrativeActs = lazy(() => import("../views/Forms/JuridicDocument/AdministrativeActs"));
const CivilAndNotary = lazy(() => import("../views/Forms/JuridicDocument/CivilAndNotary"));
const Constitution = lazy(() => import("../views/Forms/JuridicDocument/Constitution"));
const Jurisprudence = lazy(() => import("../views/Forms/JuridicDocument/Jurisprudence"));
const Legislation = lazy(() => import("../views/Forms/JuridicDocument/Legislation"));
const ProvisionalMeasure = lazy(() => import("../views/Forms/JuridicDocument/ProvisionalMeasure"));

// Documentos de meios eletrônicos
const ElectronicMediaDocuments = lazy(() => import("../views/Forms/ElectronicMediaDocuments"));
const BlogArticle = lazy(() => import("../views/Forms/ElectronicMediaDocuments/BlogArticle"));
const Ebook = lazy(() => import("../views/Forms/ElectronicMediaDocuments/Ebook"));
const Email = lazy(() => import("../views/Forms/ElectronicMediaDocuments/Email"));
const InstantMessages = lazy(() => import("../views/Forms/ElectronicMediaDocuments/InstantMessages"));
const Site = lazy(() => import("../views/Forms/ElectronicMediaDocuments/Site"));
const SlideShow = lazy(() => import("../views/Forms/ElectronicMediaDocuments/SlideShow"));
const SocialNetworkPost = lazy(() => import("../views/Forms/ElectronicMediaDocuments/SocialNetworkPost"));
const SoftwareAndEletronicGame = lazy(() => import("../views/Forms/ElectronicMediaDocuments/SoftwareAndEletronicGame"));

// Documentos audiovisuais
const Audiovisual = lazy(() => import("../views/Forms/Audiovisual"));
const AudioBook = lazy(() => import("../views/Forms/Audiovisual/AudioBook"));
const Film = lazy(() => import("../views/Forms/Audiovisual/Film"));
const Music = lazy(() => import("../views/Forms/Audiovisual/Music"));
const Photo = lazy(() => import("../views/Forms/Audiovisual/Photo"));
const Podcast = lazy(() => import("../views/Forms/Audiovisual/Podcast"));
const VideoInternet = lazy(() => import("../views/Forms/Audiovisual/VideoInternet"));

// Eventos
const Events = lazy(() => import("../views/Forms/Events"));
const EventsWorkPublishedInMagazines = lazy(() => import("../views/Forms/Events/EventsWorkPublishedInMagazines"));
const Patents = lazy(() => import("../views/Forms/Events/Patents"));
const TechnicalStandards = lazy(() => import("../views/Forms/Events/TechnicalStandards"));
const WholeEvent = lazy(() => import("../views/Forms/Events/WholeEvent"));
const WholeEventInPeriodicPublication = lazy(() => import("../views/Forms/Events/WholeEventInPeriodicPublication"));
const WorksInAnnals = lazy(() => import("../views/Forms/Events/WorksInAnnals"));

// Outros
const Other = lazy(() => import("../views/Forms/Other"));
const BullMedicine = lazy(() => import("../views/Forms/Other/BullMedicine"));
const Entry = lazy(() => import("../views/Forms/Other/Entry"));
const Maps = lazy(() => import("../views/Forms/Other/Maps"));
const ObjectThree = lazy(() => import("../views/Forms/Other/ObjectThree"));
const Score = lazy(() => import("../views/Forms/Other/Score"));
const WorkArt = lazy(() => import("../views/Forms/Other/WorkArt"));

const Loading = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
    <p style={{ color: "#6666cc", fontSize: "16px" }}>Carregando...</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Hexagon} />

          {/* LIVROS */}
          <Route exact path="/livros" component={Book} />
          <Route exact path="/livros/referencia-de-livro-com-um-autor" component={BookWithOneAuthor} />
          <Route exact path="/livros/referencia-de-livro-com-dois-ou-tres-autores" component={BookWithTwoOrThreeAuthors} />
          <Route exact path="/livros/referencia-de-livro-com-quatro-autores-ou-mais" component={BookWithFourOrMoreAuthors} />
          <Route exact path="/livros/referencia-de-livro-com-responsavel-intelectual" component={BookIntellectuallyResponsible} />
          <Route exact path="/livros/referencia-de-livro-com-um-autor-entidade" component={BookAuthorEntity} />
          <Route exact path="/livros/referencia-de-capitulo-de-livro" component={ChapterOfBook} />

          {/* TRABALHOS ACADÊMICOS E PUBLICAÇÕES PERIÓDICAS */}
          <Route exact path="/trabalhos-academicos-e-publicacoes-periodicas" component={AcademicWork} />
          <Route exact path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico" component={WorkArticlePeriodic} />
          <Route exact path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-revista" component={ArticleMagazine} />
          <Route exact path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-jornal" component={ArticleNewspaper} />
          <Route exact path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-dissertacao" component={Dissertation} />
          <Route exact path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-monografia-e-tcc" component={Monography} />
          <Route exact path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-tese" component={Thesis} />

          {/* DOCUMENTOS DE MEIO ELETRÔNICO */}
          <Route exact path="/documentos-de-meio-eletronico" component={ElectronicMediaDocuments} />
          <Route exact path="/documentos-de-meio-eletronico/referencia-de-artigo-de-blog" component={BlogArticle} />
          <Route exact path="/documentos-de-meio-eletronico/referencia-de-ebook" component={Ebook} />
          <Route exact path="/documentos-de-meio-eletronico/referencia-de-email" component={Email} />
          <Route exact path="/documentos-de-meio-eletronico/referencia-de-mensagens-instantaneas" component={InstantMessages} />
          <Route exact path="/documentos-de-meio-eletronico/referencia-de-site" component={Site} />
          <Route exact path="/documentos-de-meio-eletronico/referencia-de-apresentacao-de-slides" component={SlideShow} />
          <Route exact path="/documentos-de-meio-eletronico/referencia-de-postagem-de-rede-social" component={SocialNetworkPost} />
          <Route exact path="/documentos-de-meio-eletronico/referencia-de-software-e-jogo-eletronico" component={SoftwareAndEletronicGame} />

          {/* EVENTOS, PATENTES E NORMAS TÉCNICAS */}
          <Route exact path="/eventos-patentes-e-normas-tecnicas" component={Events} />
          <Route exact path="/eventos-patentes-e-normas-tecnicas/referencia-de-trabalho-de-evento-em-revista" component={EventsWorkPublishedInMagazines} />
          <Route exact path="/eventos-patentes-e-normas-tecnicas/referencia-de-patente" component={Patents} />
          <Route exact path="/eventos-patentes-e-normas-tecnicas/referencia-de-norma-tecnica" component={TechnicalStandards} />
          <Route exact path="/eventos-patentes-e-normas-tecnicas/referencia-de-evento-no-todo" component={WholeEvent} />
          <Route exact path="/eventos-patentes-e-normas-tecnicas/referencia-evento-no-todo-em-publicacao-periodica" component={WholeEventInPeriodicPublication} />
          <Route exact path="/eventos-patentes-e-normas-tecnicas/referencia-trabalhos-em-anais" component={WorksInAnnals} />

          {/* DOCUMENTOS AUDIOVISUAIS */}
          <Route exact path="/documentos-audiovisuais" component={Audiovisual} />
          <Route exact path="/documentos-audiovisuais/referencia-de-audiolivro" component={AudioBook} />
          <Route exact path="/documentos-audiovisuais/referencia-de-filme" component={Film} />
          <Route exact path="/documentos-audiovisuais/referencia-de-musica" component={Music} />
          <Route exact path="/documentos-audiovisuais/referencia-de-fotografia" component={Photo} />
          <Route exact path="/documentos-audiovisuais/referencia-de-podcast" component={Podcast} />
          <Route exact path="/documentos-audiovisuais/referencia-de-video-de-internet" component={VideoInternet} />

          {/* OUTROS */}
          <Route exact path="/outros" component={Other} />
          <Route exact path="/outros/referencia-de-bula-de-remedio" component={BullMedicine} />
          <Route exact path="/outros/referencia-de-verbete" component={Entry} />
          <Route exact path="/outros/referencia-de-mapa" component={Maps} />
          <Route exact path="/outros/referencia-de-tridimensional" component={ObjectThree} />
          <Route exact path="/outros/referencia-de-partitura" component={Score} />
          <Route exact path="/outros/referencia-de-obra-de-arte" component={WorkArt} />

          {/* DOCUMENTOS JURÍDICOS E CIVIS */}
          <Route exact path="/documentos-juridicos-e-civis" component={JuridicDocument} />
          <Route exact path="/documentos-juridicos-e-civis/referencia-de-atos-administrativos" component={AdministrativeActs} />
          <Route exact path="/documentos-juridicos-e-civis/referencia-de-documentos-civis-e-de-cartorio" component={CivilAndNotary} />
          <Route exact path="/documentos-juridicos-e-civis/referencia-de-constituicao" component={Constitution} />
          <Route exact path="/documentos-juridicos-e-civis/referencia-de-jurisprudencia" component={Jurisprudence} />
          <Route exact path="/documentos-juridicos-e-civis/referencia-de-legislacao" component={Legislation} />
          <Route exact path="/documentos-juridicos-e-civis/referencia-de-medida-provisoria" component={ProvisionalMeasure} />

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
