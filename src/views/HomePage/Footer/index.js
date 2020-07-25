import React from "react";

// import PropTypes from "prop-types";

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
      <Content className="wow fadeInUp" data-wow-delay="0.3s">
        <Social>
          <FacebookIcon />
          <TwitterIcon />
          <LinkedinIcon />
        </Social>
        <Title> @ Via Carreira 2020 - Todos os diretos reservados </Title>
      </Content>
    </Container>
  );
};

Footer.propTypes = {};

export default Footer;
