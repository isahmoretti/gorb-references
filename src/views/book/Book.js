import React, { useState } from 'react'
import BookWithOneAuthor from "./BookWithOneAuthor";
import BookWithTwoOrthreeAuthors from './BookWithTwoOrthreeAuthors'
const Book = () => {
  const [active, setActive] = useState(0)
  return (
    <div>
      <button onClick={() => setActive(1)}>Livro com um Autor</button>
      <button onClick={() => setActive(2)}>Livro com dois ou tres Autores</button>


      {active === 1 && <BookWithOneAuthor />}
      {active === 2 && <BookWithTwoOrthreeAuthors />}

    </div>
  )
}
export default Book