import React, { useState } from "react";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
  Separator,
} from "../../../styles/Hexagon";

// pages
import BookWithOneAuthor from "./BookWithOneAuthor";
import BookWithTwoOrThreeAuthors from "./BookWithTwoOrThreeAuthors";
import BookAuthorEntity from "./BookAuthorEntity";
import BookIntellectuallyResponsible from "./BookIntellectuallyResponsible";
import BookWithFourOrMoreAuthors from "./BookWithFourOrMoreAuthors";
import ChapterOfBook from "./ChapterOfBook";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

const BookGeneral = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Back onClick={back} src={ArrowLeft} />
          <Row>
            <Hexagon onClick={() => setState(1)} className="blue">
              <p className="txt-white">Livros com um único autor</p>
            </Hexagon>
            <Separator />
            <Hexagon className="blue" onClick={() => setState(6)}>
              <p className="txt-white">Livro com autor entidade</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(2)} className="blue">
              <p className="txt-white">Livros com dois ou três autores</p>
            </Hexagon>
            <Title> Livros </Title>
            <Hexagon onClick={() => setState(5)} className="blue">
              <p className="txt-white">
                Livro com responsável intelectual ao invés de autor
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(3)} className="blue">
              <p className="txt-white">Livro com quatro autores ou mais</p>
            </Hexagon>
            <Separator />
            <Hexagon onClick={() => setState(4)} className="blue">
              <p className="txt-white"> Capítulo de livro</p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <BookWithOneAuthor back={() => setState(0)} />}
      {state === 2 && <BookWithTwoOrThreeAuthors back={() => setState(0)} />}
      {state === 3 && <BookWithFourOrMoreAuthors back={() => setState(0)} />}
      {state === 4 && <ChapterOfBook back={() => setState(0)} />}
      {state === 5 && (
        <BookIntellectuallyResponsible back={() => setState(0)} />
      )}
      {state === 6 && <BookAuthorEntity back={() => setState(0)} />}
    </Conatiner>
  );
};

BookGeneral.propTypes = {};

export default BookGeneral;
