import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

// components
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// service
import api from "../../../service/api";

// styles
import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
  Separator,
  WrapperAdvertising,
  Advertising,
  ContentText,
} from "../../../styles/Hexagon";
import { TitleFromHexagon } from "./style";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

import anoPublicacao from "../../../assets/images/home/Ano de publicação.jpg";
import anoPublicacao1 from "../../../assets/images/home/ano-de-publicacao-1.jpg";
import edicoes from "../../../assets/images/home/edicoes.jpg";
import editora from "../../../assets/images/home/editora-e-local.jpg";
import referencias from "../../../assets/images/home/referencias-de-livros-autores-1.jpg";

const BookGeneral = ({ back }) => {
  document.title = "Livros: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Gere referências de livros no padrão ABNT NBR 6023:2018. Escolha o tipo de autoria e obtenha a referência pronta.");
  const history = useHistory();

  const [data, setData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/39044");

      setData({
        title: response.data.title.rendered,
        content: response.data.content.rendered,
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      <Conatiner>
        <Content>
          <Back onClick={() => history.push("/")} src={ArrowLeft} />
          <Row>
            <Hexagon
              onClick={() =>
                history.push("/livros/referencia-de-livro-com-um-autor")
              }
              className="blue"
            >
              <TitleFromHexagon
                text="Livros com um único autor"
                mobileText="Com um único autor"
              />
            </Hexagon>
            <Separator />
            <Hexagon
              className="blue"
              onClick={() =>
                history.push(
                  "/livros/referencia-de-livro-com-um-autor-entidade"
                )
              }
            >
              <TitleFromHexagon
                text="Livro com autor entidade"
                mobileText="Com autor entidade"
              />
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/livros/referencia-de-livro-com-dois-ou-tres-autores"
                )
              }
              className="blue"
            >
              <TitleFromHexagon
                text="Livros com dois ou três autores"
                mobileText="Com dois ou três autores"
              />
            </Hexagon>
            <Title> Livros </Title>
            <Hexagon
              onClick={() =>
                history.push(
                  "/livros/referencia-de-livro-com-responsavel-intelectual"
                )
              }
              className="blue"
            >
              <TitleFromHexagon
                text="Livro com responsável intelectual ao invés de autor"
                mobileText="Com responsável intelectual"
              />
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() =>
                history.push(
                  "/livros/referencia-de-livro-com-quatro-autores-ou-mais"
                )
              }
              className="blue"
            >
              <TitleFromHexagon
                text="Livro com quatro autores ou mais"
                mobileText="Com quatro autores ou mais"
              />
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() =>
                history.push("/livros/referencia-de-capitulo-de-livro")
              }
              className="blue"
            >
              <p className="txt-white"> Capítulo de livro</p>
            </Hexagon>
          </Row>
        </Content>
      </Conatiner>

      <ContentText className="container">
        <h1>Principais elementos da referência de livro</h1>

        <p>
          A ABNT (Associação Brasileira de Normas Técnicas) determina que toda
          referência de livro deve ser composta por autor, título, subtítulo (se
          houver), edição (se houver), local de publicação, editora e ano de
          publicação.
        </p>

        <p>
          Elementos complementares também podem ser inseridos, como é o caso de
          paginação, série, notas e ISBN.
        </p>

        <p>
          Veja, abaixo, os principais elementos de referência de livro de acordo
          com a NBR 6023:
        </p>

        <h2>Os Autores</h2>

        <p>
          Os autores são sempre indicados pelo sobrenome, seguido pelo nome ou
          iniciais. Até três autores, todos devem ser mencionados. Quando há
          quatro ou mais responsáveis pela obra, indica-se apenas o primeiro,
          seguido da expressão et al.
        </p>

        <p>
          O prenome do autor pode ser abreviado ou não. De qualquer forma, é
          recomendado seguir o mesmo padrão na lista de referências.
        </p>

        <img loading="lazy" src={referencias} alt="Exemplos de referências bibliográficas ABNT" width="100%" />

        <p>
          Os autores de um livro também podem se distinguir com relação à
          responsabilidade intelectual, que deve ser sempre indicada na
          referência.
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Organizador:</b> (org.){" "}
          </li>
          <li>
            {" "}
            <b>Coordenador:</b> (coord.){" "}
          </li>
          <li>
            {" "}
            <b>Editor:</b> (ed.){" "}
          </li>
          <li>
            {" "}
            <b>Compilador:</b> (comp.){" "}
          </li>
        </ul>

        <p>
          Algumas situações exigem atenção para preencher a autoria da obra. São
          elas:
        </p>

        <h2>Sobrenomes com prefixos</h2>

        <ul style={{ marginLeft: 15 }}>
          <li> DELLA MARA, J. </li>
          <li> DU MAURIER, C. </li>
          <li> VAN ENDE, E. </li>
          <li> LA BRUYÈRE, J. </li>
        </ul>

        <h2>Sobrenomes com grau de parentesco</h2>

        <ul style={{ marginLeft: 15 }}>
          <li> COSTA JÚNIOR, J. A. </li>
          <li> GUIMARÃES FILHO, L. P. </li>
          <li> TOURINHO NETO, R. S. </li>
        </ul>

        <h2>Sobrenomes compostos ou com hífen</h2>

        <ul style={{ marginLeft: 15 }}>
          <li> VALLERY-RADOT, L. P. </li>
          <li> ESPÍRITO SANTO, J. P. </li>
          <li> PAULA SOUZA, A. F. de. </li>
        </ul>

        <h2>Autoria corporativa</h2>

        <ul style={{ marginLeft: 15 }}>
          <li> ABNT - Associação Brasileira de Normas Técnicas. </li>
          <li> BRASIL. Ministério da Economia. </li>
          <li> UNIVERSIDADE DE SÃO PAULO. Faculdade de Saúde Pública. </li>
        </ul>

        <h2>Sem autoria</h2>

        <p>
          Quando um livro não tem autoria, a referência começa com o nome da
          obra, sendo a primeira palavra escrita com letras maiúsculas.
        </p>

        <h2>Exemplo:</h2>

        <p>CONCISE encyclopedia: chemistry.</p>

        <h2>Os Títulos e Subtítulos</h2>

        <p>
          O título deve ser escrito com letras minúsculas e com destaque em
          negrito. Se houver subtítulo, é importante incluir depois de
          dois-pontos [:], mas sem a necessidade de destacar.
        </p>

        <h2>Exemplo:</h2>

        <p>
          <span>
            <b>Marketing 4.0:</b> Do tradicional ao digital
          </span>
        </p>

        <h2>Edição</h2>

        <p>
          Quando a obra apresentar a edição indicada, essa informação deve ser
          transcrita na referência, respeitando o idioma do documento e com a
          palavra edição abreviada. Não mencionar a 1ª edição.
        </p>

        <img loading="lazy" src={edicoes} alt="Como indicar edição na referência ABNT" width="100%" />

        <h2>Local e Editora</h2>

        <p>
          O local é a cidade onde a obra foi publicada. Em caso de cidades
          homônimas (com nome idêntico ao de outro município), é necessário
          indicar o estado. Um exemplo disso é a cidade de Brasília, que existe
          no Distrito Federal (DF) e também em Minas Gerais (MG).
        </p>

        <img loading="lazy" src={editora} alt="Como indicar editora e local de publicação na referência ABNT" width="100%" />

        <p>
          Quando não há informações sobre o local de publicação, utiliza-se a
          expressão sine loco, que deve ser abreviada e colocada entre colchetes
          [S.l.].
        </p>

        <p>
          Ao preencher o nome da instituição publicadora, é recomendado suprimir
          as palavras que expõem a natureza jurídica ou empresarial (Exemplo:
          Editora Manole Ltda.)
        </p>

        <p>
          Quando o nome da editora não pode ser identificado, é usada a
          expressão sine nomine abreviada e entre colchetes [s. n.].
        </p>

        <h2>Ano de publicação</h2>

        <img loading="lazy" src={anoPublicacao} alt="Como indicar o ano de publicação na referência ABNT" width="100%" />

        <p>
          A indicação do ano deve ser feita com algarismos arábicos. Quando não
          há uma informação exata na obra, é necessário adicionar na referência
          uma data aproximada entre colchetes.
        </p>

        <img loading="lazy" src={anoPublicacao1} alt="Data aproximada de publicação na referência ABNT" width="100%" />

        <h2>Paginação e descrição física</h2>

        <p>
          O número de páginas pode constar na referência, na forma de números
          arábicos, seguido pela abreviatura p.
        </p>

        <p>
          <b>Exemplo: </b>345p.
        </p>

        <h2>Séries e coleções</h2>

        <p>
          Quando o livro faz parte de uma coleção ou série, o título deve ser
          indicado entre parênteses.
        </p>

        <p>
          <b>Exemplo: </b>(Coleção Cibercultura)
        </p>

        <h2>Notas</h2>

        <p>
          As informações complementares, também chamadas de notas, são inseridas
          no final da referência.
        </p>

        <h2>Disponibilidade e acesso</h2>

        <p>
          Livros consultados em suporte digital devem ter a URL do documento
          referenciada, precedida da expressão "Disponível em". A data de acesso
          - com dia, mês e ano - também precisa constar na referência, após o
          termo "Acesso em".
        </p>

        <p>
          <b>Exemplo: </b>Disponível em: http://machado.mec.gov.br. Acesso em: 7
          jan. 2020.
        </p>
      </ContentText>

      <Footer />
    </>
  );
};

BookGeneral.propTypes = {};

export default BookGeneral;
