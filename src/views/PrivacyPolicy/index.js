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
  font-size: 30px;
  font-weight: 800;
  color: #1e1b3a;
  margin: 0 0 12px;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Updated = styled.p`
  font-size: 13px;
  color: #888;
  margin: 0;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const H2 = styled.h2`
  font-size: 19px;
  font-weight: 700;
  color: #1e1b3a;
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0eeff;
`;

const P = styled.p`
  font-size: 15px;
  color: #444;
  line-height: 1.75;
  margin: 0 0 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Ul = styled.ul`
  margin: 0 0 12px 0;
  padding-left: 22px;

  li {
    font-size: 15px;
    color: #444;
    line-height: 1.75;
    margin-bottom: 6px;
  }
`;

const CookieTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0;
  border: 1.5px solid #e8e4ff;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
  font-size: 14px;
`;

const CookieRow = styled.div`
  display: contents;

  > div {
    padding: 12px 16px;
    border-bottom: 1px solid #f0eeff;
    color: #444;
    line-height: 1.6;
  }

  > div:first-child {
    font-weight: 600;
    color: #1e1b3a;
    background: #f8f7ff;
  }

  &:last-child > div {
    border-bottom: none;
  }
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
  border: none;
  padding: 0;
`;

const ContactText = styled.p`
  font-size: 14px;
  color: #bbb;
  margin: 0 0 16px;
  line-height: 1.65;
`;

const EmailLink = styled.a`
  color: #c4b8ff;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: #fff;
  }
`;

const PrivacyPolicyPage = () => {
  useEffect(() => {
    document.title = "Política de Privacidade – GORB";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Política de privacidade do GORB – Gerador Online de Referências Bibliográficas. Saiba como coletamos, usamos e protegemos seus dados conforme a LGPD."
      );
    }
  }, []);

  const updated = "20 de maio de 2025";

  return (
    <>
      <Header />
      <Page>

        <Hero>
          <HeroLabel>GORB</HeroLabel>
          <H1>Política de Privacidade</H1>
          <Updated>Atualizado em {updated}</Updated>
        </Hero>

        <Section>
          <P>
            Esta Política de Privacidade descreve como o GORB – Gerador Online
            de Referências Bibliográficas coleta, utiliza e protege as
            informações dos visitantes do site{" "}
            <strong>gorb.viacarreira.com</strong>. Ao utilizar o GORB, você
            concorda com as práticas descritas neste documento, elaborado em
            conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº
            13.709/2018).
          </P>
        </Section>

        <Section>
          <H2>1. Quais dados coletamos</H2>
          <P>
            O GORB é uma ferramenta de uso livre, sem necessidade de cadastro ou
            criação de conta. Não coletamos nome, e-mail ou qualquer dado
            pessoal preenchido nos formulários de geração de referências — essas
            informações são processadas localmente no seu navegador e não são
            enviadas aos nossos servidores.
          </P>
          <P>Coletamos automaticamente os seguintes dados de navegação:</P>
          <Ul>
            <li>
              <strong>Dados de identificação digital:</strong> endereço IP,
              tipo e versão do navegador, sistema operacional e dispositivo
              utilizado.
            </li>
            <li>
              <strong>Dados de uso:</strong> páginas visitadas, tempo de
              permanência, formulários acessados e fluxo de navegação dentro
              do site.
            </li>
            <li>
              <strong>Cookies e tecnologias similares:</strong> utilizados para
              análise de desempenho e melhoria da experiência (veja a seção
              de Cookies abaixo).
            </li>
          </Ul>
        </Section>

        <Section>
          <H2>2. Para que usamos os dados</H2>
          <P>
            As informações coletadas são utilizadas exclusivamente para:
          </P>
          <Ul>
            <li>Analisar o desempenho e uso do site para identificar melhorias;</li>
            <li>Entender quais tipos de referência são mais acessados;</li>
            <li>Garantir o funcionamento correto e seguro da plataforma;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </Ul>
          <P>
            Não utilizamos seus dados para fins comerciais, publicidade
            direcionada ou venda a terceiros.
          </P>
        </Section>

        <Section>
          <H2>3. Compartilhamento de dados</H2>
          <P>
            Os dados de navegação coletados pelo GORB podem ser compartilhados
            apenas nas seguintes situações:
          </P>
          <Ul>
            <li>
              <strong>Ferramentas de análise (Google Analytics):</strong> para
              monitoramento de tráfego e comportamento de uso, com dados
              anonimizados.
            </li>
            <li>
              <strong>Cumprimento legal:</strong> quando exigido por autoridades
              competentes ou determinação judicial.
            </li>
            <li>
              <strong>Proteção de direitos:</strong> para fazer cumprir nossos
              Termos de Uso ou proteger a segurança do site.
            </li>
          </Ul>
          <P>
            Não vendemos, alugamos nem cedemos dados pessoais a terceiros para
            fins comerciais.
          </P>
        </Section>

        <Section>
          <H2>4. Proteção dos dados</H2>
          <P>
            Adotamos medidas técnicas e organizacionais para proteger as
            informações coletadas:
          </P>
          <Ul>
            <li>Comunicação via HTTPS com certificado SSL;</li>
            <li>Dados de analytics anonimizados antes do processamento;</li>
            <li>Acesso restrito às informações coletadas;</li>
            <li>Revisões periódicas de segurança da plataforma.</li>
          </Ul>
          <P>
            Em caso de incidente de segurança que possa afetar seus dados,
            seguiremos os procedimentos previstos na LGPD para notificação.
          </P>
        </Section>

        <Section>
          <H2>5. Cookies</H2>
          <P>
            O GORB utiliza cookies para garantir o funcionamento e analisar o
            desempenho do site. Veja as categorias utilizadas:
          </P>
          <CookieTable>
            <CookieRow>
              <div>Estritamente necessários</div>
              <div>
                Essenciais para o funcionamento básico do site. Não podem ser
                desativados.
              </div>
            </CookieRow>
            <CookieRow>
              <div>Analíticos</div>
              <div>
                Nos ajudam a entender como os visitantes utilizam o site
                (páginas acessadas, tempo de uso). Utilizamos Google Analytics
                com anonimização de IP.
              </div>
            </CookieRow>
            <CookieRow>
              <div>Funcionalidade</div>
              <div>
                Permitem que o site lembre de preferências de navegação para
                melhorar a experiência.
              </div>
            </CookieRow>
          </CookieTable>
          <P style={{ marginTop: 16 }}>
            Você pode gerenciar ou desativar cookies nas configurações do seu
            navegador. A desativação de cookies analíticos não compromete o uso
            da ferramenta de geração de referências.
          </P>
        </Section>

        <Section>
          <H2>6. Seus direitos (LGPD)</H2>
          <P>
            Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018),
            você tem os seguintes direitos em relação aos seus dados:
          </P>
          <Ul>
            <li>
              <strong>Acesso:</strong> solicitar informações sobre quais dados
              seus estão sendo coletados;
            </li>
            <li>
              <strong>Correção:</strong> solicitar a correção de dados
              incompletos ou inexatos;
            </li>
            <li>
              <strong>Exclusão:</strong> solicitar a eliminação de dados
              coletados, nos limites da lei;
            </li>
            <li>
              <strong>Portabilidade:</strong> solicitar a transferência dos seus
              dados a outro fornecedor;
            </li>
            <li>
              <strong>Revogação do consentimento:</strong> retirar o
              consentimento para uso dos dados a qualquer momento.
            </li>
          </Ul>
          <P>
            Para exercer qualquer um desses direitos, entre em contato pelo
            e-mail indicado ao final desta página.
          </P>
        </Section>

        <Section>
          <H2>7. Links externos</H2>
          <P>
            O GORB pode conter links para sites externos. Esta Política de
            Privacidade aplica-se exclusivamente ao domínio{" "}
            <strong>gorb.viacarreira.com</strong>. Não nos responsabilizamos
            pelas práticas de privacidade de sites de terceiros.
          </P>
        </Section>

        <Section>
          <H2>8. Alterações nesta política</H2>
          <P>
            Esta Política de Privacidade pode ser atualizada periodicamente para
            refletir mudanças na legislação ou na forma como operamos o site. A
            data de atualização no topo desta página indica a versão mais
            recente. Recomendamos a leitura periódica deste documento.
          </P>
        </Section>

        <ContactBox>
          <ContactTitle>Dúvidas ou solicitações</ContactTitle>
          <ContactText>
            Se tiver dúvidas sobre esta Política de Privacidade ou quiser
            exercer seus direitos previstos na LGPD, entre em contato:
          </ContactText>
          <EmailLink href="mailto:contato@viacarreira.com">
            contato@viacarreira.com
          </EmailLink>
        </ContactBox>

      </Page>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
