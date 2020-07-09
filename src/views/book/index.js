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

const BookGeneral = ({ back }) => {
  const [state, setState] = useState(0);

  return (
    <Conatiner>
      {!state && (
        <Content>
          <Row>
            <Back onClick={back} />
            <Hexagon onClick={() => setState(1)} className="blue">
              <p>Livros com um único autor</p>
            </Hexagon>

            <Hexagon className="blue">
              <p>Livro com indicação de edição</p>
            </Hexagon>
          </Row>

          <Row className="bt">
            <Hexagon onClick={() => setState(2)} className="blue">
              <p>Livros com dois ou três autores</p>
            </Hexagon>
            <Title> Livros </Title>
            <Hexagon className="blue">
              <p>Livro com responsável intelectual ao invés de autor</p>
            </Hexagon>
          </Row>

          <Row>
            <Hexagon onClick={() => setState(2)} className="blue">
              <p>Referência de livro com vários autores</p>
            </Hexagon>

            <Hexagon className="blue">
              <p>Capítulo de livro</p>
            </Hexagon>
          </Row>
        </Content>
      )}

      {state === 1 && <BookWithOneAuthor back={() => setState(0)} />}
      {state === 2 && <BookWithTwoOrThreeAuthors back={() => setState(0)} />}
    </Conatiner>
  );
};

BookGeneral.propTypes = {};

export default BookGeneral;
