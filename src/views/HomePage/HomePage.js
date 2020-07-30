import React from "react";

import Header from "./Header/index";
import Session1 from "./Session1/index";
import Session2 from "./Session2/index";
import Session3 from "./Session3/index";
import Session4 from "./Session4";
import Session5 from "./Session5/index";
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
    </>
  );
};

HomePage.propTypes = {};

export default HomePage;
