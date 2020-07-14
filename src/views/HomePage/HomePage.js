import React from "react";

import Preloader from "../../components/Preloader";
import Home from "../../components/Home";
import About from "../../components/About";
import Feature from "../../components/Feature";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

// assets
import Logo from "../../assets/images/via-carreira2.png";
import "./style.css";

const HomePage = () => {
  return (
    <div id="homepage">
      <Preloader />
      <Home />
      <About />
      <Feature />
      <Contact />
      <Footer />

      <a href="#back-top" className="go-top">
        <i className="fa fa-angle-up"></i>
      </a>

      <img src={Logo} alt="" className="logo" />
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
