import React from "react";

import Header from "./Header";
import Session1 from "./Session1";
import Session2 from "./Session2";
import Session3 from "./Session3";
import Session4 from "./Session4";
import Session5 from "./Session5";
import Session6 from "./Session6";
import Footer from "./Footer";

import { Separator } from "./styles";

// assets
import Logo from "../../assets/images/via-carreira2.png";
import "../../styles/css/Homepage.css";

const HomePage = () => {
  return (
    <>
      <Header />
      <Session1 />
      <Session2 />
      <Session3 />
      <Session4 />
      <Session5 />
      <Session6 />

      <div className="container">
        <Separator />
      </div>

      <Footer />

      <img src={Logo} alt="" className="logo" />
    </>
  );
};

HomePage.propTypes = {};

export default HomePage;
