import React from "react";

// import PropTypes from "prop-types";

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <img
              src="images/about-img.png"
              className="img-responsive wow fadeInUp"
              alt="About"
            />
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="about-thumb">
              <div className="section-title">
                <h1 className="wow fadeIn" data-wow-delay="0.2s">
                  our company
                </h1>
                <h3 className="wow fadeInUp" data-wow-delay="0.4s">
                  Comila Studio is based in Hong Kong
                </h3>
              </div>
              <div className="wow fadeInUp" data-wow-delay="0.6s">
                <p>
                  Vivamus elit risus, porttitor id placerat ut, aliquet non
                  quam. Pellentesque nulla metus, ornare et porttitor vel,
                  consectetur vitae erat. Vestibulum tristique semper tellus
                  vitae condimentum. Duis sed eros eget diam dictum posuere.
                </p>
                <p>
                  Aliquam vel gravida ligula. Phasellus ut purus ac libero
                  ultrices commodo commodo at quam. In vestibulum purus sit amet
                  tempus euismod. Donec sed congue nisl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {};

export default About;
