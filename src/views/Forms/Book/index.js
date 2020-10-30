import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

// components
import Header from "../../../components/Header";

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
            <Hexagon className="blue" onClick={() => history.push('/livro/autor-entidade')}>
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
            <Hexagon onClick={() => history.push('/livro/responsavel-intelectual')} className="blue">
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
            <Hexagon onClick={() => history.push("/livro/capitulo-de-livro")} className="blue">
              <p className="txt-white"> Capítulo de livro</p>
            </Hexagon>
          </Row>
        </Content>
      </Conatiner>

      <ContentText className="container">
        <WrapperAdvertising>
          <Advertising width={728} height={90}>
            image
          </Advertising>
        </WrapperAdvertising>

        <h1>{data.title}</h1>

        {ReactHtmlParser(data.content)}

        <WrapperAdvertising>
          <Advertising width={728} height={250}>
            image
          </Advertising>
        </WrapperAdvertising>
      </ContentText>
    </>
  );
};

BookGeneral.propTypes = {};

export default BookGeneral;
