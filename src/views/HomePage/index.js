import React from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";

import fundo1 from "../../assets/images/fundo1.png";
import fundo2 from "../../assets/images/fundo2.png";
import layub_logo from "../../assets/images/layub_logo.png";
import logo_viacarreira from "../../assets/images/logo-branco-rodape.png";
import testevocacional from "../../assets/images/teste-vocacional.jpg";
import logo_viacarreiraRoxo from "../../assets/images/logo-lilas.png";

import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
import linkedin from "../../assets/images/linkedin.svg";
import share from "../../assets/images/compartilhar.svg";

// components
import GoogleAds from "../../components/GoogleAds";
import Footer from "../../components/Footer";

import {
  Container,
  Nav,
  WrapperNav,
  HambugerIcon,
  HeaderLogo,
  SearchIcon,
  WrapperHome,
  ContentHome,
  Box,
  Content,
  WrapperText,
  BoxImage,
  Button,
  Fundo1,
  Fundo2,
} from "./style";

const HomePageTest = () => {
  const history = useHistory();

  return (
    <Container>
      <Nav>
        <WrapperNav className="container">
          <a href="https://viacarreira.com/">
            <img src={logo_viacarreiraRoxo} alt="" />
          </a>
        </WrapperNav>
      </Nav>

      <WrapperHome>
        <Fundo1 src={fundo1} />
        <ContentHome className="container">
          <h1> Quer descobrir quais cursos mais combinam com você? </h1>

          <Box>
            <Content>
              <h2> Então responda as perguntas com atenção. </h2>
              <Button onClick={() => history.push("/test")} className="first">
                {" "}
                Fazer teste
              </Button>
            </Content>
          </Box>
        </ContentHome>
        <Fundo2 src={fundo2} />
      </WrapperHome>

      <WrapperText className="container">
        <h1> O que é o Teste Vocacional? </h1>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
        >
          <img src={share} width="50" height="50" />
        </a>
        <hr />
        <p>
          O teste vocacional é uma ferramenta que auxilia na escolha da
          profissão. Para isso, relaciona as áreas de atuação com os perfis
          considerados como ideais para o desempenho de determinadas funções.
          <br /> <br />A dúvida sobre a escolha da profissão geralmente surge no
          início da vida adulta, entre a conclusão do ensino médio e o preparo
          para o vestibular. Ao fazer o teste, é possível identificar para quais
          cursos mais vale a pena se inscrever, de acordo comas próprias
          expectativas no âmbito pessoal e profissional.
        </p>
      </WrapperText>

      {/* <GoogleAds slot="9562629284" width={300} height={250} /> */}

      <WrapperText className="container">
        <h1> Como o teste vocacional pode te ajudar? </h1>
        <p>
          O teste vocacional grátis não necessita de cadastro, é rápido e muito
          simples de responder. Para que o resultado seja compatível com o seu
          perfil, é fundamental ler as perguntas com atenção e escolher a
          resposta que mais se aproxima da sua realidade. <br /> <br /> As
          perguntas indagam sobre temas e tendências de comportamento que muitas
          vezes passam desapercebidos, mas que são de extrema importância para
          determinar o caminho profissional. Dessa forma, a cada questão
          concluída é possível reconhecer as próprias preferências, habilidades
          e pontos fortes.
        </p>
        <br />
        <BoxImage>
          <img src={testevocacional} alt="" />
        </BoxImage>
        <p>
          <br /> Ao finalizar, a descrição do perfil auxilia na identificação de
          competências com grande potencial de desenvolvimento, acompanhada de
          uma lista de cursos que correspondem às principais características do
          avaliado.
        </p>
      </WrapperText>

      <WrapperText className="container">
        <h1> A escolha do curso ideal </h1>

        <p>
          O teste vocacional direciona para a melhor escolha, mas é comum que a
          dúvida sobre o curso ideal persista.A afinidade com o conteúdo
          ministrado nas aulas não é suficiente para manter o estudante
          matriculado no curso, há outras coisas a se considerar. Confira!
        </p>

        <ul>
          <li>
            <h4>
              <span> 1. </span> Período do curso
            </h4>
            <p>
              Verifique se o curso que você almeja é ofertado em meio período ou
              integral. Faça uma análise da sua rotina à longo prazo e descubra
              se ele é compatível com o seu tempo disponível para estudos
              diariamente.
            </p>
          </li>

          <li>
            <h4>
              <span> 2. </span> Custo
            </h4>
            <p>
              A mensalidade, o gasto com transporte e o valor dos materiais são
              pontos que devem ser estudados. O investimento na formação não
              deve ultrapassar os limites de renda do estudante ou responsáveis.
              Contudo, também levante a possibilidade de conquistar uma bolsa de
              estudo ou de disputar por uma vaga em universidades públicas.
            </p>

            {/* <GoogleAds slot="6185479291" width={728} height={80} /> */}
          </li>

          <li>
            <h4>
              <span> 3. </span> Tempo de duração
            </h4>
            <p>
              Quanto tempo você pode esperar para receber o seu diploma? Por
              quanto tempo você pode pagar a mensalidade? Essas questões são
              importantes para evitar imprevistos quanto a conclusão da
              graduação. Os cursos de nível superior variam entre 2 e 6 anos de
              duração.
            </p>
          </li>

          <li>
            <h4>
              <span> 4. </span> Oportunidades no mercado de trabalho
            </h4>
            <p>
              O mercado de trabalho é exigente, especialmente para profissões em
              que há um grande número de profissionais formados e em atividade.
              O curso dos seus sonhos possibilita que você conquiste vagas de
              emprego com facilidade? A região em que você reside reserva
              oportunidades ou será preciso mudar de endereço? Pense nisso
            </p>
          </li>
        </ul>
      </WrapperText>

      <WrapperText className="container">
        <h1> Como descobrir qual a profissão certa para você? </h1>

        <p>
          O teste vocacional é de grande ajuda para a descoberta da profissão
          ideal. A escolha do curso é apenas o primeiro passo, é preciso
          considerar todo o caminho a ser percorrido até atingir o topo da
          carreira, normalmente, o momento de maior satisfação da trajetória
          profissional.
        </p>

        {/* <GoogleAds slot="5095758904" width={728} height={250} /> */}

        <p>
          Em qualquer profissão, a formação, a atualização constante e a
          experiência são essenciais para conquistar as melhores oportunidades
          do mercado. Portanto, não basta se identificar com a área, a
          felicidade no trabalho está diretamente relacionada com o que você
          espera da vida profissional, dos objetivos estabelecidos e do que está
          disposto a fazer para alcançá-los.
        </p>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <iframe
            width="100%"
            style={{ maxWidth: 700 }}
            height="400"
            src="https://www.youtube.com/embed/UN3umcvjCg8"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </WrapperText>

      <Button onClick={() => history.push("/test")} className="center last">
        {" "}
        Fazer teste vocacional{" "}
      </Button>

      <Footer />
    </Container>
  );
};

HomePageTest.propTypes = {};

export default HomePageTest;
