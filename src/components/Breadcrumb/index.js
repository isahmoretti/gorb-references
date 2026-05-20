import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { BreadcrumbWrapper, BreadcrumbList, BreadcrumbItem } from "./styles";

const SEGMENT_NAMES = {
  livros: "Livros",
  "referencia-de-livro-com-um-autor": "Livro com Um Autor",
  "referencia-de-livro-com-dois-ou-tres-autores": "Livro com Dois ou Três Autores",
  "referencia-de-livro-com-quatro-autores-ou-mais": "Livro com Quatro Autores ou Mais",
  "referencia-de-livro-com-responsavel-intelectual": "Livro com Responsável Intelectual",
  "referencia-de-livro-com-um-autor-entidade": "Livro com Autor Entidade",
  "referencia-de-capitulo-de-livro": "Capítulo de Livro",

  "trabalhos-academicos-e-publicacoes-periodicas": "Trabalhos Acadêmicos",
  "referencia-de-artigo-de-periodico": "Artigo de Periódico",
  "referencia-de-artigo-de-revista": "Artigo de Revista",
  "referencia-de-artigo-de-jornal": "Artigo de Jornal",
  "referencia-de-dissertacao": "Dissertação",
  "referencia-de-monografia-e-tcc": "Monografia e TCC",
  "referencia-de-tese": "Tese",

  "documentos-juridicos-e-civis": "Documentos Jurídicos e Civis",
  "referencia-de-atos-administrativos": "Atos Administrativos",
  "referencia-de-documentos-civis-e-de-cartorio": "Documentos Civis e de Cartório",
  "referencia-de-constituicao": "Constituição",
  "referencia-de-jurisprudencia": "Jurisprudência",
  "referencia-de-legislacao": "Legislação",
  "referencia-de-medida-provisoria": "Medida Provisória",

  "documentos-de-meio-eletronico": "Documentos de Meio Eletrônico",
  "referencia-de-artigo-de-blog": "Artigo de Blog",
  "referencia-de-ebook": "E-book",
  "referencia-de-email": "E-mail",
  "referencia-de-mensagens-instantaneas": "Mensagens Instantâneas",
  "referencia-de-site": "Site",
  "referencia-de-apresentacao-de-slides": "Apresentação de Slides",
  "referencia-de-postagem-de-rede-social": "Postagem de Rede Social",
  "referencia-de-software-e-jogo-eletronico": "Software e Jogo Eletrônico",

  "documentos-audiovisuais": "Documentos Audiovisuais",
  "referencia-de-audiolivro": "Audiolivro",
  "referencia-de-filme": "Filme",
  "referencia-de-musica": "Música",
  "referencia-de-fotografia": "Fotografia",
  "referencia-de-podcast": "Podcast",
  "referencia-de-video-de-internet": "Vídeo de Internet",

  "eventos-patentes-e-normas-tecnicas": "Eventos, Patentes e Normas",
  "referencia-de-trabalho-de-evento-em-revista": "Trabalho de Evento em Revista",
  "referencia-de-patente": "Patente",
  "referencia-de-norma-tecnica": "Norma Técnica",
  "referencia-de-evento-no-todo": "Evento no Todo",
  "referencia-evento-no-todo-em-publicacao-periodica": "Evento no Todo em Publicação Periódica",
  "referencia-trabalhos-em-anais": "Trabalhos em Anais",

  outros: "Outros",
  "referencia-de-bula-de-remedio": "Bula de Remédio",
  "referencia-de-verbete": "Verbete",
  "referencia-de-mapa": "Mapa",
  "referencia-de-tridimensional": "Objeto Tridimensional",
  "referencia-de-partitura": "Partitura",
  "referencia-de-obra-de-arte": "Obra de Arte",
};

const BASE_URL = "https://gorb.viacarreira.com";

const buildCrumbs = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  return [
    { name: "Início", path: "/" },
    ...segments.map((seg, i) => ({
      name: SEGMENT_NAMES[seg] || seg,
      path: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];
};

const Breadcrumb = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") return;

    const crumbs = buildCrumbs(pathname);
    const existingScript = document.getElementById("breadcrumb-jsonld");
    if (existingScript) existingScript.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: BASE_URL + crumb.path,
      })),
    };

    const script = document.createElement("script");
    script.id = "breadcrumb-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("breadcrumb-jsonld");
      if (s) s.remove();
    };
  }, [pathname]);

  if (pathname === "/") return null;

  const crumbs = buildCrumbs(pathname);

  return (
    <BreadcrumbWrapper aria-label="Navegação estrutural">
      <BreadcrumbList className="container">
        {crumbs.map((crumb, i) => (
          <BreadcrumbItem key={crumb.path}>
            {i < crumbs.length - 1 ? (
              <Link to={crumb.path}>{crumb.name}</Link>
            ) : (
              <span>{crumb.name}</span>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
