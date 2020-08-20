import React from "react";

// import PropTypes from "prop-types";

import Facebook from "../../../assets/images/facebook.svg";
import Linkedin from "../../../assets/images/linkedin.svg";
import Twitter from "../../../assets/images/twitter.svg";

import {
  Container,
  Content,
  Social,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  Title,
} from "./styles";

const Footer = () => {
  return (
    <Container className="container">
      <Content>
        <Social>
          <FacebookIcon src={Facebook} />
          <TwitterIcon src={Twitter} />
          <LinkedinIcon src={Linkedin} />
        </Social>
        <Title> @ Via Carreira 2020 - Todos os direitos reservados </Title>
      </Content>
    </Container>
  );
};

Footer.propTypes = {};

export default Footer;
