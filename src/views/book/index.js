import React, { useState } from "react";

import {
  Conatiner,
  Content,
  Row,
  Hexagon,
  Title,
  Back,
} from "../../styles/Hexagon";

// pages
import BookWithOneAuthor from "./BookWithOneAuthor";
import BookWithTwoOrThreeAuthors from "./BookWithTwoOrThreeAuthors";
import BookAuthorEntity from "./BookAuthorEntity";
import BookIntellectuallyResponsible from "./BookIntellectuallyResponsible";

const BookGeneral = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Row>
            <Back onClick={back} />
            <Hexagon onClick={() => setState(1)} className="blue">
              <p className="txt-white">Livros com um único autor</p>
            </Hexagon>

            <Hexagon className="blue" onClick={() => setState(4)}>
              <p className="txt-white">Livro com autor entidade</p>
            </Hexagon>
          </Row>

          <Row className="bt">
            <Hexagon onClick={() => setState(2)} className="blue">
              <p className="txt-white">Livros com dois ou três autores</p>
            </Hexagon>
            <Title> Livros </Title>
            <Hexagon onClick={() => setState(6)} className="blue">
              <p className="txt-white">
                Livro com responsável intelectual ao invés de autor
              </p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(2)} className="blue">
              <p className="txt-white">
                Referência de livro com vários autores
              </p>
            </Hexagon>

            <Hexagon className="blue">
              <p className="txt-white"> Capítulo de livro</p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <BookWithOneAuthor back={() => setState(0)} />}
      {state === 2 && <BookWithTwoOrThreeAuthors back={() => setState(0)} />}
      {state === 4 && <BookAuthorEntity back={() => setState(0)} />}
      {state === 6 && (
        <BookIntellectuallyResponsible back={() => setState(0)} />
      )}
    </Conatiner>
  );
};

BookGeneral.propTypes = {};

export default BookGeneral;
