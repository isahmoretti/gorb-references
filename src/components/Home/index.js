import React from "react";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section id="home">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-8 col-sm-12">
            <div className="home-thumb">
              <h1 className="wow fadeInUp" data-wow-delay="0.4s">
                Hello, we are comila
              </h1>
              <h3 className="wow fadeInUp" data-wow-delay="0.6s">
                We are almost <strong>ready to launch</strong> our
                <strong>new creative</strong> website!
              </h3>
              <a
                href="#about"
                className="btn btn-lg btn-default smoothScroll wow fadeInUp hidden-xs"
                data-wow-delay="0.8s"
                onClick={() => navigate("/app")}
              >
                Let's go
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {};

export default Home;
