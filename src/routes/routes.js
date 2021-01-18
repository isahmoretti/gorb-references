import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "../views/HomePage";

// pages
import Hexagon from "../views/Hexagon";

//Livro
import Book from "../views/Forms/Book";
import BookAuthorEntity from "../views/Forms/Book/BookAuthorEntity";
import BookIntellectuallyResponsible from "../views/Forms/Book/BookIntellectuallyResponsible";
import BookWithFourOrMoreAuthors from "../views/Forms/Book/BookWithFourOrMoreAuthors";
import BookWithOneAuthor from "../views/Forms/Book/BookWithOneAuthor";
import BookWithTwoOrThreeAuthors from "../views/Forms/Book/BookWithTwoOrThreeAuthors";
import ChapterOfBook from "../views/Forms/Book/ChapterOfBook";

//Trabalhos academicos
import AcademicWork from "../views/Forms/AcademicWork";
import WorkArticlePeriodic from "../views/Forms/AcademicWork/WorkArticlePeriodic";
import ArticleMagazine from "../views/Forms/AcademicWork/ArticleMagazine";
import ArticleNewspaper from "../views/Forms/AcademicWork/ArticleNewspaper";
import Dissertation from "../views/Forms/AcademicWork/Dissertation";
import Monography from "../views/Forms/AcademicWork/Monography";
import Thesis from "../views/Forms/AcademicWork/Thesis";

//Documentos Juridicos
import JuridicDocument from "../views/Forms/JuridicDocument";
import AdministrativeActs from "../views/Forms/JuridicDocument/AdministrativeActs";
import CivilAndNotary from "../views/Forms/JuridicDocument/CivilAndNotary";
import Constitution from "../views/Forms/JuridicDocument/Constitution";
import Jurisprudence from "../views/Forms/JuridicDocument/Jurisprudence";
import Legislation from "../views/Forms/JuridicDocument/Legislation";
import ProvisionalMeasure from "../views/Forms/JuridicDocument/ProvisionalMeasure";

//Documentos de medias eletronicas
import ElectronicMediaDocuments from "../views/Forms/ElectronicMediaDocuments";
import BlogArticle from "../views/Forms/ElectronicMediaDocuments/BlogArticle";
import Ebook from "../views/Forms/ElectronicMediaDocuments/Ebook";
import Email from "../views/Forms/ElectronicMediaDocuments/Email";
import InstantMessages from "../views/Forms/ElectronicMediaDocuments/InstantMessages";
import Site from "../views/Forms/ElectronicMediaDocuments/Site";
import SlideShow from "../views/Forms/ElectronicMediaDocuments/SlideShow";
import SocialNetworkPost from "../views/Forms/ElectronicMediaDocuments/SocialNetworkPost";
import SoftwareAndEletronicGame from "../views/Forms/ElectronicMediaDocuments/SoftwareAndEletronicGame";

//Documentos audiovisuais
import Audiovisual from "../views/Forms/Audiovisual";
import AudioBook from "../views/Forms/Audiovisual/AudioBook";
import Film from "../views/Forms/Audiovisual/Film";
import Music from "../views/Forms/Audiovisual/Music";
import Photo from "../views/Forms/Audiovisual/Photo";
import Podcast from "../views/Forms/Audiovisual/Podcast";
import VideoInternet from "../views/Forms/Audiovisual/VideoInternet";

//Events
import Events from "../views/Forms/Events";
import EventsWorkPublishedInMagazines from "../views/Forms/Events/EventsWorkPublishedInMagazines";
import Patents from "../views/Forms/Events/Patents";
import TechnicalStandards from "../views/Forms/Events/TechnicalStandards";
import WholeEvent from "../views/Forms/Events/WholeEvent";
import WholeEventInPeriodicPublication from "../views/Forms/Events/WholeEventInPeriodicPublication";
import WorksInAnnals from "../views/Forms/Events/WorksInAnnals";

//Outros
import Other from "../views/Forms/Other";
import BullMedicine from "../views/Forms/Other/BullMedicine";
import Entry from "../views/Forms/Other/Entry";
import Maps from "../views/Forms/Other/Maps";
import ObjectThree from "../views/Forms/Other/ObjectThree";
import Score from "../views/Forms/Other/Score";
import WorkArt from "../views/Forms/Other/WorkArt";

// pages teste vocacional
import VocationalTest from "../views/VocationalTest";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Hexagon} />

        {/* LIVROS */}

        <Route exact path="/livros" component={Book} />
        <Route
          exact
          path="/livros/referencia-de-livro-com-um-autor"
          component={BookWithOneAuthor}
        />
        <Route
          exact
          path="/livros/referencia-de-livro-com-dois-ou-tres-autores"
          component={BookWithTwoOrThreeAuthors}
        />
        <Route
          exact
          path="/livros/referencia-de-livro-com-quatro-autores-ou-mais"
          component={BookWithFourOrMoreAuthors}
        />
        <Route
          exact
          path="/livros/referencia-de-livro-com-responsavel-intelectual"
          component={BookIntellectuallyResponsible}
        />
        <Route
          exact
          path="/livros/referencia-de-livro-com-um-autor-entidade"
          component={BookAuthorEntity}
        />
        <Route
          exact
          path="/livros/referencia-de-capitulo-de-livro"
          component={ChapterOfBook}
        />

        {/* TRABALHOS ACADÊMICOS E PUBLICAÇÕES PERIÓDICAS */}

        <Route
          exact
          path="/trabalhos-academicos-e-publicacoes-periodicas"
          component={AcademicWork}
        />
        <Route
          exact
          path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico"
          component={WorkArticlePeriodic}
        />
        <Route
          exact
          path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-revista"
          component={ArticleMagazine}
        />
        <Route
          exact
          path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-jornal"
          component={ArticleNewspaper}
        />
        <Route
          exact
          path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-dissertacao"
          component={Dissertation}
        />
        <Route
          exact
          path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-monografia-e-tcc"
          component={Monography}
        />
        <Route
          exact
          path="/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-tese"
          component={Thesis}
        />

        {/* DOCUMENTOS DE MEIO ELETRÔNICO */}

        <Route
          exact
          path="/documentos-de-meio-eletronico"
          component={ElectronicMediaDocuments}
        />
        <Route
          exact
          path="/documentos-de-meio-eletronico/referencia-de-artigo-de-blog"
          component={BlogArticle}
        />
        <Route
          exact
          path="/documentos-de-meio-eletronico/referencia-de-ebook"
          component={Ebook}
        />
        <Route
          exact
          path="/documentos-de-meio-eletronico/referencia-de-email"
          component={Email}
        />
        <Route
          exact
          path="/documentos-de-meio-eletronico/referencia-de-mensagens-instantaneas"
          component={InstantMessages}
        />
        <Route
          exact
          path="/documentos-de-meio-eletronico/referencia-de-site"
          component={Site}
        />
        <Route
          exact
          path="/documentos-de-meio-eletronico/referencia-de-apresentacao-de-slides"
          component={SlideShow}
        />
        <Route
          exact
          path="/documentos-de-meio-eletronico/referencia-de-postagem-de-rede-social"
          component={SocialNetworkPost}
        />
        <Route
          exact
          path="/documentos-de-meio-eletronico/referencia-de-software-e-jogo-eletronico"
          component={SoftwareAndEletronicGame}
        />

        {/* EVENTOS, PATENTES E NORMAS TÉCNICAS */}

        <Route
          exact
          path="/eventos-patentes-e-normas-tecnicas"
          component={Events}
        />
        <Route
          exact
          path="/eventos-patentes-e-normas-tecnicas/referencia-de-revista"
          component={EventsWorkPublishedInMagazines}
        />
        <Route
          exact
          path="/eventos-patentes-e-normas-tecnicas/referencia-de-patente"
          component={Patents}
        />
        <Route
          exact
          path="/eventos-patentes-e-normas-tecnicas/referencia-de-norma-tecnica"
          component={TechnicalStandards}
        />
        <Route
          exact
          path="/eventos-patentes-e-normas-tecnicas/referencia-de-evento-no-todo"
          component={WholeEvent}
        />
        <Route
          exact
          path="/eventos-patentes-e-normas-tecnicas/referencia-evento-no-todo-em-publicacao-periodica"
          component={WholeEventInPeriodicPublication}
        />
        <Route
          exact
          path="/eventos-patentes-e-normas-tecnicas/referencia-trabalhos-em-anais"
          component={WorksInAnnals}
        />

        {/* DOCUMENTOS AUDIOVISUAIS */}

        <Route exact path="/documentos-audiovisuais" component={Audiovisual} />
        <Route
          exact
          path="/documentos-audiovisuais/referencia-de-audiolivro"
          component={AudioBook}
        />
        <Route
          exact
          path="/documentos-audiovisuais/referencia-de-filme"
          component={Film}
        />
        <Route
          exact
          path="/documentos-audiovisuais/referencia-de-musica"
          component={Music}
        />
        <Route
          exact
          path="/documentos-audiovisuais/referencia-de-fotografia"
          component={Photo}
        />
        <Route
          exact
          path="/documentos-audiovisuais/referencia-de-podcast"
          component={Podcast}
        />
        <Route
          exact
          path="/documentos-audiovisuais/referencia-de-video-de-internet"
          component={VideoInternet}
        />

        {/* OUTROS */}

        <Route exact path="/outros" component={Other} />
        <Route
          exact
          path="/outros/referencia-de-bula-de-remedio"
          component={BullMedicine}
        />
        <Route exact path="/outros/referencia-de-verbete" component={Entry} />
        <Route exact path="/outros/referencia-de-mapa" component={Maps} />
        <Route
          exact
          path="/outros/referencia-de-tridimensional"
          component={ObjectThree}
        />
        <Route exact path="/outros/referencia-de-partitura" component={Score} />
        <Route
          exact
          path="/outros/referencia-de-obra-de-arte"
          component={WorkArt}
        />

        {/* DOCUMENTOS JURÍDICOS E CIVIS */}

        <Route
          exact
          path="/documentos-juridicos-e-civis"
          component={JuridicDocument}
        />
        <Route
          exact
          path="/documentos-juridicos-e-civis/referencia-de-atos-administrativos"
          component={AdministrativeActs}
        />
        <Route
          exact
          path="/documentos-juridicos-e-civis/referencia-de-documentos-civis-e-de-cartorio"
          component={CivilAndNotary}
        />
        <Route
          exact
          path="/documentos-juridicos-e-civis/referencia-de-constituicao"
          component={Constitution}
        />
        <Route
          exact
          path="/documentos-juridicos-e-civis/referencia-de-jurisprudencia"
          component={Jurisprudence}
        />
        <Route
          exact
          path="/documentos-juridicos-e-civis/referencia-de-legislacao"
          component={Legislation}
        />
        <Route
          exact
          path="/documentos-juridicos-e-civis/referencia-de-medida-provisoria"
          component={ProvisionalMeasure}
        />

        <Route path="*">
          <Redirect to="/" />
        </Route>

        {/* teste vocacional */}
        {/* <Route exact path="/" component={HomePage} />
        <Route exact path="/test" component={VocationalTest} /> */}
      </Switch>
    </Router>
  );
};

export default AppRoutes;
