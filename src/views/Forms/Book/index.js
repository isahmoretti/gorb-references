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

import ArrowLeft from "../../../assets/images/arrow-left.svg";

import anoPublicacao from "../../../assets/images/home/Ano de publicação.jpg";
import anoPublicacao1 from "../../../assets/images/home/ano-de-publicacao-1.jpg";
import edicoes from "../../../assets/images/home/edicoes.jpg";
import editora from "../../../assets/images/home/editora-e-local.jpg";
import referencias from "../../../assets/images/home/referencias-de-livros-autores-1.jpg";

const BookGeneral = ({ back }) => {
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
              onClick={() => history.push("/livro/um-autor")}
              className="blue"
            >
              <p className="txt-white">Livros com um único autor</p>
            </Hexagon>
            <Separator />
            <Hexagon
              className="blue"
              onClick={() => history.push("/livro/autor-entidade")}
            >
              <p className="txt-white">Livro com autor entidade</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() => history.push("/livro/dois-ou-tres-autores")}
              className="blue"
            >
              <p className="txt-white">Livros com dois ou três autores</p>
            </Hexagon>
            <Title> Livros </Title>
            <Hexagon
              onClick={() => history.push("/livro/responsavel-intelectual")}
              className="blue"
            >
              <p className="txt-white">
                Livro com responsável intelectual ao invés de autor
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon
              onClick={() => history.push("/livro/quatro-autores-ou-mais")}
              className="blue"
            >
              <p className="txt-white">Livro com quatro autores ou mais</p>
            </Hexagon>
            <Separator />
            <Hexagon
              onClick={() => history.push("/livro/capitulo-de-livro")}
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

        <h3>Os Autores</h3>

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

        <img src={referencias} alt="referencias" width="100%" />

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

        <h3>Sobrenomes com prefixos</h3>

        <ul style={{ marginLeft: 15 }}>
          <li> DELLA MARA, J. </li>
          <li> DU MAURIER, C. </li>
          <li> VAN ENDE, E. </li>
          <li> LA BRUYÈRE, J. </li>
        </ul>

        <h3>Sobrenomes com grau de parentesco</h3>

        <ul style={{ marginLeft: 15 }}>
          <li> COSTA JÚNIOR, J. A. </li>
          <li> GUIMARÃES FILHO, L. P. </li>
          <li> TOURINHO NETO, R. S. </li>
        </ul>

        <h3>Sobrenomes compostos ou com hífen</h3>

        <ul style={{ marginLeft: 15 }}>
          <li> VALLERY-RADOT, L. P. </li>
          <li> ESPÍRITO SANTO, J. P. </li>
          <li> PAULA SOUZA, A. F. de. </li>
        </ul>

        <h3>Autoria corporativa</h3>

        <ul style={{ marginLeft: 15 }}>
          <li> ABNT - Associação Brasileira de Normas Técnicas. </li>
          <li> BRASIL. Ministério da Economia. </li>
          <li> UNIVERSIDADE DE SÃO PAULO. Faculdade de Saúde Pública. </li>
        </ul>

        <h3>Sem autoria</h3>

        <p>
          Quando um livro não tem autoria, a referência começa com o nome da
          obra, sendo a primeira palavra escrita com letras maiúsculas.
        </p>

        <h3>Exemplo:</h3>

        <p>CONCISE encyclopedia: chemistry.</p>

        <h3>Os Títulos e Subtítulos</h3>

        <p>
          O título deve ser escrito com letras minúsculas e com destaque em
          negrito. Se houver subtítulo, é importante incluir depois de
          dois-pontos [:], mas sem a necessidade de destacar.
        </p>

        <h3>Exemplo:</h3>

        <p>
          <span>Marketing 4.0: Do tradicional ao digital</span>
        </p>

        <h3>Edição</h3>

        <p>
          Quando a obra apresentar a edição indicada, essa informação deve ser
          transcrita na referência, respeitando o idioma do documento e com a
          palavra edição abreviada. Não mencionar a 1ª edição.
        </p>

        <img src={edicoes} alt="edicoes" width="100%" />

        <h3>Local e Editora</h3>

        <p>
          O local é a cidade onde a obra foi publicada. Em caso de cidades
          homônimas (com nome idêntico ao de outro município), é necessário
          indicar o estado. Um exemplo disso é a cidade de Brasília, que existe
          no Distrito Federal (DF) e também em Minas Gerais (MG).
        </p>

        <img src={editora} alt="editora" width="100%" />

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

        <h3>Ano de publicação</h3>

        <img src={anoPublicacao} alt="ano-publicacao" width="100%" />

        <p>
          A indicação do ano deve ser feita com algarismos arábicos. Quando não
          há uma informação exata na obra, é necessário adicionar na referência
          uma data aproximada entre colchetes.
        </p>

        <img src={anoPublicacao1} alt="ano-publicacao-1" width="100%" />

        <h3>Paginação e descrição física</h3>

        <p>
          O número de páginas pode constar na referência, na forma de números
          arábicos, seguido pela abreviatura p.
        </p>

        <p>
          <b>Exemplo: </b>345p.
        </p>

        <h3>Séries e coleções</h3>

        <p>
          Quando o livro faz parte de uma coleção ou série, o título deve ser
          indicado entre parênteses.
        </p>

        <p>
          <b>Exemplo: </b>(Coleção Cibercultura)
        </p>

        <h3>Notas</h3>

        <p>
          As informações complementares, também chamadas de notas, são inseridas
          no final da referência.
        </p>

        <h3>Disponibilidade e acesso</h3>

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
