import React from "react";

// import PropTypes from "prop-types";

import Menino_lendo from "../../../assets/images/menino_lendo.png";
import Menino_de_verde from "../../../assets/images/menino-de-verde.png";
import Mulher_em_pe_de_azul from "../../../assets/images/mulher_em_pe_de_azul.png";
import Mulher_de_rosa from "../../../assets/images/mulher_de_rosa.png";

import {
  Container,
  Wrapper,
  WrapperBox,
  Box,
  WrapperBoxMobile,
  BoxMobile,
} from "./styles";

const Session5 = () => {
  return (
    <Container>
      <Wrapper className="container">
        <h1> Com o GORB, fica mais fácil e rápido: </h1>
        <WrapperBox>
          <Box>
            <div>
              <img src={Menino_lendo} alt="" srcset="" />
            </div>
            <div>
              <img src={Menino_de_verde} alt="" srcset="" />
            </div>
            <div>
              <img src={Mulher_em_pe_de_azul} alt="" srcset="" />
            </div>
            <div>
              <img src={Mulher_de_rosa} alt="" srcset="" />
            </div>
          </Box>

          <Box>
            <span>
              Aplicar a NBR <br /> 6023:2018
            </span>
            <span>
              Organizar a lista de <br /> referências em um arquivo <br /> para
              imprimir
            </span>
            <span>
              Guardar os dados com <br /> segurança
            </span>
            <span>
              Criar fichas de <br /> anotações vinculadas às <br /> referências
              cadastradas
            </span>
          </Box>
        </WrapperBox>

        <WrapperBoxMobile>
          <BoxMobile>
            <img src={Menino_lendo} alt="" srcset="" />
            <span>Aplicar a NBR 6023:2018</span>
          </BoxMobile>
          <BoxMobile>
            <img src={Menino_de_verde} alt="" srcset="" />
            <span>
              Organizar a lista de referências em um arquivo para imprimir
            </span>
          </BoxMobile>
          <BoxMobile>
            <img src={Mulher_em_pe_de_azul} alt="" srcset="" />
            <span>Guardar os dados com segurança</span>
          </BoxMobile>
          <BoxMobile>
            <img src={Mulher_de_rosa} alt="" srcset="" />
            <span>
              Criar fichas de anotações vinculadas às referências cadastradas
            </span>
          </BoxMobile>
        </WrapperBoxMobile>
      </Wrapper>
    </Container>
  );
};

Session5.propTypes = {};

export default Session5;
