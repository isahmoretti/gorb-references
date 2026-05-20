import React from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

const RELATED = {
  "/livros/referencia-de-livro-com-um-autor": [
    { path: "/livros/referencia-de-livro-com-dois-ou-tres-autores", label: "Livro com dois ou três autores" },
    { path: "/livros/referencia-de-livro-com-quatro-autores-ou-mais", label: "Livro com quatro autores ou mais" },
    { path: "/livros/referencia-de-capitulo-de-livro", label: "Capítulo de livro" },
  ],
  "/livros/referencia-de-livro-com-dois-ou-tres-autores": [
    { path: "/livros/referencia-de-livro-com-um-autor", label: "Livro com um autor" },
    { path: "/livros/referencia-de-livro-com-quatro-autores-ou-mais", label: "Livro com quatro autores ou mais" },
    { path: "/livros/referencia-de-livro-com-responsavel-intelectual", label: "Livro com responsável intelectual" },
  ],
  "/livros/referencia-de-livro-com-quatro-autores-ou-mais": [
    { path: "/livros/referencia-de-livro-com-um-autor", label: "Livro com um autor" },
    { path: "/livros/referencia-de-livro-com-dois-ou-tres-autores", label: "Livro com dois ou três autores" },
    { path: "/livros/referencia-de-livro-com-um-autor-entidade", label: "Livro com autor entidade" },
  ],
  "/livros/referencia-de-livro-com-responsavel-intelectual": [
    { path: "/livros/referencia-de-livro-com-um-autor", label: "Livro com um autor" },
    { path: "/livros/referencia-de-livro-com-um-autor-entidade", label: "Livro com autor entidade" },
    { path: "/livros/referencia-de-capitulo-de-livro", label: "Capítulo de livro" },
  ],
  "/livros/referencia-de-livro-com-um-autor-entidade": [
    { path: "/livros/referencia-de-livro-com-um-autor", label: "Livro com um autor" },
    { path: "/livros/referencia-de-livro-com-responsavel-intelectual", label: "Livro com responsável intelectual" },
    { path: "/livros/referencia-de-livro-com-quatro-autores-ou-mais", label: "Livro com quatro autores ou mais" },
  ],
  "/livros/referencia-de-capitulo-de-livro": [
    { path: "/livros/referencia-de-livro-com-um-autor", label: "Livro com um autor" },
    { path: "/livros/referencia-de-livro-com-dois-ou-tres-autores", label: "Livro com dois ou três autores" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico", label: "Artigo de periódico" },
  ],

  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico": [
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-revista", label: "Artigo de revista" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-jornal", label: "Artigo de jornal" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-dissertacao", label: "Dissertação" },
  ],
  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-revista": [
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico", label: "Artigo de periódico" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-jornal", label: "Artigo de jornal" },
    { path: "/documentos-de-meio-eletronico/referencia-de-artigo-de-blog", label: "Artigo de blog" },
  ],
  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-jornal": [
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico", label: "Artigo de periódico" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-revista", label: "Artigo de revista" },
    { path: "/documentos-de-meio-eletronico/referencia-de-artigo-de-blog", label: "Artigo de blog" },
  ],
  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-dissertacao": [
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-tese", label: "Tese" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-monografia-e-tcc", label: "Monografia e TCC" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico", label: "Artigo de periódico" },
  ],
  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-monografia-e-tcc": [
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-dissertacao", label: "Dissertação" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-tese", label: "Tese" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico", label: "Artigo de periódico" },
  ],
  "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-tese": [
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-dissertacao", label: "Dissertação" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-monografia-e-tcc", label: "Monografia e TCC" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico", label: "Artigo de periódico" },
  ],

  "/documentos-juridicos-e-civis/referencia-de-atos-administrativos": [
    { path: "/documentos-juridicos-e-civis/referencia-de-legislacao", label: "Legislação" },
    { path: "/documentos-juridicos-e-civis/referencia-de-medida-provisoria", label: "Medida provisória" },
    { path: "/documentos-juridicos-e-civis/referencia-de-constituicao", label: "Constituição" },
  ],
  "/documentos-juridicos-e-civis/referencia-de-documentos-civis-e-de-cartorio": [
    { path: "/documentos-juridicos-e-civis/referencia-de-atos-administrativos", label: "Atos administrativos" },
    { path: "/documentos-juridicos-e-civis/referencia-de-legislacao", label: "Legislação" },
  ],
  "/documentos-juridicos-e-civis/referencia-de-constituicao": [
    { path: "/documentos-juridicos-e-civis/referencia-de-legislacao", label: "Legislação" },
    { path: "/documentos-juridicos-e-civis/referencia-de-jurisprudencia", label: "Jurisprudência" },
    { path: "/documentos-juridicos-e-civis/referencia-de-medida-provisoria", label: "Medida provisória" },
  ],
  "/documentos-juridicos-e-civis/referencia-de-jurisprudencia": [
    { path: "/documentos-juridicos-e-civis/referencia-de-constituicao", label: "Constituição" },
    { path: "/documentos-juridicos-e-civis/referencia-de-legislacao", label: "Legislação" },
    { path: "/documentos-juridicos-e-civis/referencia-de-atos-administrativos", label: "Atos administrativos" },
  ],
  "/documentos-juridicos-e-civis/referencia-de-legislacao": [
    { path: "/documentos-juridicos-e-civis/referencia-de-constituicao", label: "Constituição" },
    { path: "/documentos-juridicos-e-civis/referencia-de-medida-provisoria", label: "Medida provisória" },
    { path: "/documentos-juridicos-e-civis/referencia-de-jurisprudencia", label: "Jurisprudência" },
  ],
  "/documentos-juridicos-e-civis/referencia-de-medida-provisoria": [
    { path: "/documentos-juridicos-e-civis/referencia-de-legislacao", label: "Legislação" },
    { path: "/documentos-juridicos-e-civis/referencia-de-atos-administrativos", label: "Atos administrativos" },
    { path: "/documentos-juridicos-e-civis/referencia-de-constituicao", label: "Constituição" },
  ],

  "/documentos-de-meio-eletronico/referencia-de-artigo-de-blog": [
    { path: "/documentos-de-meio-eletronico/referencia-de-site", label: "Site" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico", label: "Artigo de periódico" },
    { path: "/documentos-de-meio-eletronico/referencia-de-postagem-de-rede-social", label: "Postagem de rede social" },
  ],
  "/documentos-de-meio-eletronico/referencia-de-ebook": [
    { path: "/livros/referencia-de-livro-com-um-autor", label: "Livro com um autor" },
    { path: "/documentos-de-meio-eletronico/referencia-de-site", label: "Site" },
    { path: "/documentos-de-meio-eletronico/referencia-de-artigo-de-blog", label: "Artigo de blog" },
  ],
  "/documentos-de-meio-eletronico/referencia-de-email": [
    { path: "/documentos-de-meio-eletronico/referencia-de-mensagens-instantaneas", label: "Mensagens instantâneas" },
    { path: "/documentos-de-meio-eletronico/referencia-de-postagem-de-rede-social", label: "Postagem de rede social" },
  ],
  "/documentos-de-meio-eletronico/referencia-de-mensagens-instantaneas": [
    { path: "/documentos-de-meio-eletronico/referencia-de-email", label: "E-mail" },
    { path: "/documentos-de-meio-eletronico/referencia-de-postagem-de-rede-social", label: "Postagem de rede social" },
  ],
  "/documentos-de-meio-eletronico/referencia-de-site": [
    { path: "/documentos-de-meio-eletronico/referencia-de-artigo-de-blog", label: "Artigo de blog" },
    { path: "/documentos-de-meio-eletronico/referencia-de-ebook", label: "E-book" },
    { path: "/documentos-de-meio-eletronico/referencia-de-postagem-de-rede-social", label: "Postagem de rede social" },
  ],
  "/documentos-de-meio-eletronico/referencia-de-apresentacao-de-slides": [
    { path: "/documentos-de-meio-eletronico/referencia-de-site", label: "Site" },
    { path: "/documentos-de-meio-eletronico/referencia-de-ebook", label: "E-book" },
  ],
  "/documentos-de-meio-eletronico/referencia-de-postagem-de-rede-social": [
    { path: "/documentos-de-meio-eletronico/referencia-de-mensagens-instantaneas", label: "Mensagens instantâneas" },
    { path: "/documentos-de-meio-eletronico/referencia-de-site", label: "Site" },
    { path: "/documentos-de-meio-eletronico/referencia-de-artigo-de-blog", label: "Artigo de blog" },
  ],
  "/documentos-de-meio-eletronico/referencia-de-software-e-jogo-eletronico": [
    { path: "/documentos-de-meio-eletronico/referencia-de-site", label: "Site" },
    { path: "/documentos-de-meio-eletronico/referencia-de-ebook", label: "E-book" },
  ],

  "/documentos-audiovisuais/referencia-de-audiolivro": [
    { path: "/documentos-audiovisuais/referencia-de-podcast", label: "Podcast" },
    { path: "/documentos-audiovisuais/referencia-de-musica", label: "Música" },
    { path: "/documentos-de-meio-eletronico/referencia-de-ebook", label: "E-book" },
  ],
  "/documentos-audiovisuais/referencia-de-filme": [
    { path: "/documentos-audiovisuais/referencia-de-video-de-internet", label: "Vídeo de internet" },
    { path: "/documentos-audiovisuais/referencia-de-podcast", label: "Podcast" },
    { path: "/documentos-audiovisuais/referencia-de-fotografia", label: "Fotografia" },
  ],
  "/documentos-audiovisuais/referencia-de-musica": [
    { path: "/documentos-audiovisuais/referencia-de-audiolivro", label: "Audiolivro" },
    { path: "/documentos-audiovisuais/referencia-de-podcast", label: "Podcast" },
    { path: "/documentos-audiovisuais/referencia-de-video-de-internet", label: "Vídeo de internet" },
  ],
  "/documentos-audiovisuais/referencia-de-fotografia": [
    { path: "/documentos-audiovisuais/referencia-de-filme", label: "Filme" },
    { path: "/documentos-audiovisuais/referencia-de-video-de-internet", label: "Vídeo de internet" },
    { path: "/outros/referencia-de-obra-de-arte", label: "Obra de arte" },
  ],
  "/documentos-audiovisuais/referencia-de-podcast": [
    { path: "/documentos-audiovisuais/referencia-de-audiolivro", label: "Audiolivro" },
    { path: "/documentos-audiovisuais/referencia-de-video-de-internet", label: "Vídeo de internet" },
    { path: "/documentos-audiovisuais/referencia-de-musica", label: "Música" },
  ],
  "/documentos-audiovisuais/referencia-de-video-de-internet": [
    { path: "/documentos-audiovisuais/referencia-de-filme", label: "Filme" },
    { path: "/documentos-audiovisuais/referencia-de-podcast", label: "Podcast" },
    { path: "/documentos-de-meio-eletronico/referencia-de-site", label: "Site" },
  ],

  "/eventos-patentes-e-normas-tecnicas/referencia-de-trabalho-de-evento-em-revista": [
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-de-evento-no-todo", label: "Evento no todo" },
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-trabalhos-em-anais", label: "Trabalhos em anais" },
    { path: "/trabalhos-academicos-e-publicacoes-periodicas/referencia-de-artigo-de-periodico", label: "Artigo de periódico" },
  ],
  "/eventos-patentes-e-normas-tecnicas/referencia-de-patente": [
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-de-norma-tecnica", label: "Norma técnica" },
    { path: "/documentos-juridicos-e-civis/referencia-de-legislacao", label: "Legislação" },
  ],
  "/eventos-patentes-e-normas-tecnicas/referencia-de-norma-tecnica": [
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-de-patente", label: "Patente" },
    { path: "/documentos-juridicos-e-civis/referencia-de-legislacao", label: "Legislação" },
  ],
  "/eventos-patentes-e-normas-tecnicas/referencia-de-evento-no-todo": [
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-trabalhos-em-anais", label: "Trabalhos em anais" },
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-evento-no-todo-em-publicacao-periodica", label: "Evento em publicação periódica" },
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-de-trabalho-de-evento-em-revista", label: "Trabalho de evento em revista" },
  ],
  "/eventos-patentes-e-normas-tecnicas/referencia-evento-no-todo-em-publicacao-periodica": [
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-de-evento-no-todo", label: "Evento no todo" },
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-trabalhos-em-anais", label: "Trabalhos em anais" },
  ],
  "/eventos-patentes-e-normas-tecnicas/referencia-trabalhos-em-anais": [
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-de-evento-no-todo", label: "Evento no todo" },
    { path: "/eventos-patentes-e-normas-tecnicas/referencia-de-trabalho-de-evento-em-revista", label: "Trabalho de evento em revista" },
  ],

  "/outros/referencia-de-bula-de-remedio": [
    { path: "/outros/referencia-de-verbete", label: "Verbete" },
    { path: "/outros/referencia-de-mapa", label: "Mapa" },
  ],
  "/outros/referencia-de-verbete": [
    { path: "/outros/referencia-de-bula-de-remedio", label: "Bula de remédio" },
    { path: "/outros/referencia-de-mapa", label: "Mapa" },
    { path: "/outros/referencia-de-obra-de-arte", label: "Obra de arte" },
  ],
  "/outros/referencia-de-mapa": [
    { path: "/outros/referencia-de-obra-de-arte", label: "Obra de arte" },
    { path: "/outros/referencia-de-tridimensional", label: "Objeto tridimensional" },
    { path: "/outros/referencia-de-verbete", label: "Verbete" },
  ],
  "/outros/referencia-de-tridimensional": [
    { path: "/outros/referencia-de-mapa", label: "Mapa" },
    { path: "/outros/referencia-de-obra-de-arte", label: "Obra de arte" },
    { path: "/outros/referencia-de-partitura", label: "Partitura" },
  ],
  "/outros/referencia-de-partitura": [
    { path: "/outros/referencia-de-tridimensional", label: "Objeto tridimensional" },
    { path: "/outros/referencia-de-obra-de-arte", label: "Obra de arte" },
  ],
  "/outros/referencia-de-obra-de-arte": [
    { path: "/documentos-audiovisuais/referencia-de-fotografia", label: "Fotografia" },
    { path: "/outros/referencia-de-mapa", label: "Mapa" },
    { path: "/outros/referencia-de-partitura", label: "Partitura" },
  ],
};

const Arrow = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    style={{ marginLeft: 6, verticalAlign: "middle", flexShrink: 0 }}
  >
    <path
      d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Wrapper = styled.section`
  max-width: 830px;
  margin: 0 auto 48px;
  padding: 20px 24px;
  background: #f8f7ff;
  border-left: 3px solid #6666cc;
  border-radius: 0 8px 8px 0;

  @media (max-width: 600px) {
    padding: 16px;
    margin-bottom: 32px;
  }
`;

const Title = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: #888;
  margin: 0 0 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ChipLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 7px 14px;
  background: #fff;
  border: 1.5px solid #d0c8f0;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 500;
  color: #5555bb;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: #6666cc;
    color: #fff;
    border-color: #6666cc;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #6666cc;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`;

const RelatedLinks = () => {
  const { pathname } = useLocation();
  const links = RELATED[pathname];

  if (!links || links.length === 0) return null;

  return (
    <Wrapper aria-label="Veja também">
      <Title>Veja também</Title>
      <List>
        {links.map((link) => (
          <li key={link.path}>
            <ChipLink to={link.path}>
              {link.label}
              <Arrow />
            </ChipLink>
          </li>
        ))}
      </List>
    </Wrapper>
  );
};

export default RelatedLinks;
