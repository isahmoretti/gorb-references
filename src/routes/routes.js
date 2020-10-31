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
        {/* <Route exact path="/" component={Hexagon} />
        
        <Route exact path="/livro" component={Book} />
        <Route exact path="/livro/um-autor" component={BookWithOneAuthor} />
        <Route exact path="/livro/dois-ou-tres-autores" component={BookWithTwoOrThreeAuthors} />
        <Route exact path="/livro/quatro-autores-ou-mais" component={BookWithFourOrMoreAuthors} />
        <Route exact path="/livro/responsavel-intelectual" component={BookIntellectuallyResponsible} />
        <Route exact path="/livro/autor-entidade" component={BookAuthorEntity} />
        <Route exact path="/livro/capitulo-de-livro" component={ChapterOfBook} />

        
        <Route exact path="/trabalhos-academicos" component={AcademicWork} />
        <Route exact path="/trabalhos-academicos/artigo-de-periodico" component={WorkArticlePeriodic} />
        <Route exact path="/trabalhos-academicos/artigo-de-revista" component={ArticleMagazine} />
        <Route exact path="/trabalhos-academicos/artigo-de-jornal" component={ArticleNewspaper} />
        <Route exact path="/trabalhos-academicos/dissertacao" component={Dissertation} />
        <Route exact path="/trabalhos-academicos/monografia" component={Monography} />
        <Route exact path="/trabalhos-academicos/teses" component={Thesis} />

        
        <Route exact path="/meio-eletronico" component={ElectronicMediaDocuments} />
        <Route exact path="/meio-eletronico/artigo-de-blog" component={BlogArticle} />
        <Route exact path="/meio-eletronico/ebook" component={Ebook} />
        <Route exact path="/meio-eletronico/email" component={Email} />
        <Route exact path="/meio-eletronico/mensagens-instantaneas" component={InstantMessages} />
        <Route exact path="/meio-eletronico/site" component={Site} />
        <Route exact path="/meio-eletronico/apresentacao-de-slide" component={SlideShow} />
        <Route exact path="/meio-eletronico/postagem-na-rede-social" component={SocialNetworkPost} />
        <Route exact path="/meio-eletronico/programa-e-jogo-eletronico" component={SoftwareAndEletronicGame} />

        <Route exact path="/evento" component={Events} />
        <Route exact path="/evento/revistas" component={EventsWorkPublishedInMagazines} />
        <Route exact path="/evento/patentes" component={Patents} />
        <Route exact path="/evento/normas-tecnicas" component={TechnicalStandards} />
        <Route exact path="/evento/todo" component={WholeEvent} />
        <Route exact path="/evento/todo-em-periodica" component={WholeEventInPeriodicPublication} />
        <Route exact path="/evento/trabalhos-em-anais" component={WorksInAnnals} />

        <Route exact path="/audiovisual" component={Audiovisual} />
        <Route exact path="/audiovisual/audio-livro" component={AudioBook} />
        <Route exact path="/audiovisual/filme" component={Film} />
        <Route exact path="/audiovisual/musica" component={Music} />
        <Route exact path="/audiovisual/foto" component={Photo} />
        <Route exact path="/audiovisual/podcast" component={Podcast} />
        <Route exact path="/audiovisual/video-internet" component={VideoInternet} />
        
        <Route exact path="/outros" component={Other} />
        <Route exact path="/outros/bula-de-remedio" component={BullMedicine} />
        <Route exact path="/outros/verbete" component={Entry} />
        <Route exact path="/outros/mapas" component={Maps} />
        <Route exact path="/outros/objetos-tridimensional" component={ObjectThree} />
        <Route exact path="/outros/partitura" component={Score} />
        <Route exact path="/outros/obra-de-arte" component={WorkArt} />
        
        <Route exact path="/documentos-juridicos" component={JuridicDocument} />
        <Route exact path="/documentos-juridicos/atos-administrativos" component={AdministrativeActs} />
        <Route exact path="/documentos-juridicos/documentos-civil" component={CivilAndNotary} />
        <Route exact path="/documentos-juridicos/constituicao" component={Constitution} />
        <Route exact path="/documentos-juridicos/jurisprudencia" component={Jurisprudence} />
        <Route exact path="/documentos-juridicos/legislacao" component={Legislation} />
        <Route exact path="/documentos-juridicos/medida-provisoria" component={ProvisionalMeasure} /> */}

        {/* <Route path="*">
          <Redirect to="/" />
        </Route> */}

        {/* teste vocacional */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/test" component={VocationalTest} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
