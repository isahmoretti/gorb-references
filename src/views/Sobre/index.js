import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Page = styled.main`
  max-width: 830px;
  margin: 60px auto 80px;
  padding: 0 24px;

  @media (max-width: 600px) {
    margin: 40px auto 60px;
    padding: 0 16px;
  }
`;

const Hero = styled.section`
  border-left: 4px solid #6666cc;
  padding: 28px 32px;
  background: #f8f7ff;
  border-radius: 0 12px 12px 0;
  margin-bottom: 48px;

  @media (max-width: 600px) {
    padding: 20px 18px;
  }
`;

const HeroLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: #6666cc;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 10px;
`;

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #1e1b3a;
  margin: 0 0 16px;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Lead = styled.p`
  font-size: 17px;
  color: #444;
  line-height: 1.75;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 48px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatCard = styled.div`
  background: #fff;
  border: 1.5px solid #e8e4ff;
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
`;

const StatNumber = styled.p`
  font-size: 28px;
  font-weight: 800;
  color: #6666cc;
  margin: 0 0 4px;
`;

const StatLabel = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const H2 = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1e1b3a;
  margin: 0 0 14px;
`;

const P = styled.p`
  font-size: 15px;
  color: #444;
  line-height: 1.75;
  margin: 0 0 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: #fff;
  border: 1.5px solid #e8e4ff;
  border-radius: 10px;
  padding: 20px;
`;

const InfoCardTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #6666cc;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 8px;
`;

const InfoCardText = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.65;
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e8e4ff;
  margin: 40px 0;
`;

const ContactBox = styled.div`
  background: #1e1b3a;
  border-radius: 12px;
  padding: 28px 32px;
  color: #fff;

  @media (max-width: 600px) {
    padding: 20px 18px;
  }
`;

const ContactTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px;
  color: #fff;
`;

const ContactText = styled.p`
  font-size: 14px;
  color: #bbb;
  margin: 0 0 18px;
  line-height: 1.65;
`;

const ContactLink = styled.a`
  display: inline-block;
  background: #6666cc;
  color: #fff;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.18s ease;

  &:hover {
    background: #5555bb;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const SobrePage = () => {
  useEffect(() => {
    document.title = "Sobre o GORB – Gerador Online de Referências Bibliográficas";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Conheça o GORB, gerador gratuito de referências bibliográficas no padrão ABNT NBR 6023:2018 para facilitar a vida dos estudantes brasileiros."
      );
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "GORB – Gerador Online de Referências Bibliográficas",
      url: "https://gorb.viacarreira.com",
      description:
        "Gerador gratuito de referências bibliográficas no padrão ABNT NBR 6023:2018.",
      inLanguage: "pt-BR",
    };

    const script = document.createElement("script");
    script.id = "sobre-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("sobre-jsonld");
      if (s) s.remove();
    };
  }, []);

  return (
    <>
      <Header />
      <Page>

        <Hero>
          <HeroLabel>Sobre o GORB</HeroLabel>
          <H1>Referências bibliográficas ABNT sem complicação</H1>
          <Lead>
            O Gerador Online de Referências Bibliográficas (GORB) foi criado
            com o objetivo de facilitar o dia a dia dos estudantes. Ele aplica
            a NBR 6023:2018, da Associação Brasileira de Normas Técnicas (ABNT).
          </Lead>
        </Hero>

        <StatsRow>
          <StatCard>
            <StatNumber>NBR</StatNumber>
            <StatLabel>6023:2018 — norma ABNT aplicada</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>50+</StatNumber>
            <StatLabel>tipos de documentos suportados</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>100%</StatNumber>
            <StatLabel>gratuito, sem cadastro</StatLabel>
          </StatCard>
        </StatsRow>

        <Section>
          <H2>Como funciona uma referência bibliográfica</H2>
          <P>
            Cada referência é composta por dois tipos de elementos:
          </P>
          <CardRow>
            <InfoCard>
              <InfoCardTitle>Elementos essenciais</InfoCardTitle>
              <InfoCardText>
                Indispensáveis para a identificação do documento. São obrigatórios em qualquer referência — sem eles, o leitor não consegue localizar a fonte.
              </InfoCardText>
            </InfoCard>
            <InfoCard>
              <InfoCardTitle>Elementos complementares</InfoCardTitle>
              <InfoCardText>
                Informações adicionais que enriquecem a referência. São opcionais, mas ajudam a contextualizar melhor o documento citado.
              </InfoCardText>
            </InfoCard>
          </CardRow>
          <P style={{ marginTop: 20 }}>
            Todos os documentos citados no trabalho devem ser referenciados. O GORB organiza esses elementos na ordem correta e aplica a pontuação exigida pela ABNT, automaticamente.
          </P>
        </Section>

        <Divider />

        <Section>
          <H2>Por que usar o GORB</H2>
          <P>
            Formatar referências manualmente é uma tarefa mecânica e propensa a erros — pontuação fora do lugar, ordem errada dos elementos, abreviações incorretas. O GORB elimina esse atrito: você informa os dados do documento e a ferramenta gera a referência pronta para copiar.
          </P>
          <P>
            O gerador cobre mais de 50 tipos de documentos: livros com um ou mais autores, capítulos, artigos científicos, sites, vídeos, podcasts, documentos jurídicos, trabalhos acadêmicos e muito mais — todos seguindo rigorosamente a NBR 6023:2018.
          </P>
        </Section>

        <Divider />

        <ContactBox>
          <ContactTitle>Encontrou algo fora do padrão?</ContactTitle>
          <ContactText>
            Se identificar uma referência incorreta ou tiver sugestões de melhoria, mande um e-mail para a gente. A precisão das referências é nossa prioridade.
          </ContactText>
          <ContactLink href="mailto:contato@viacarreira.com">
            contato@viacarreira.com
          </ContactLink>
        </ContactBox>

      </Page>
      <Footer />
    </>
  );
};

export default SobrePage;
