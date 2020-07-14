import React from "react";

// import PropTypes from "prop-types";

const Feature = () => {
  return (
    <section id="feature">
      <div className="container">
        <div className="row">
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 100 102"
            height="100"
            width="100%"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="svgcolor-light"
          >
            <path d="M0 0 L50 100 L100 0 Z"></path>
          </svg>

          <div className="col-md-4 col-sm-6">
            <div className="media wow fadeInUp" data-wow-delay="0.4s">
              <div className="media-object media-left">
                <i className="icon icon-laptop"></i>
              </div>
              <div className="media-body">
                <h2 className="media-heading">Responsive</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque luctus lacus nulla, eget varius justo tristique ut.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="media wow fadeInUp" data-wow-delay="0.8s">
              <div className="media-object media-left">
                <i className="icon icon-refresh"></i>
              </div>
              <div className="media-body">
                <h2 className="media-heading">Bootstrap</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque luctus lacus nulla, eget varius justo tristique ut.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-8">
            <div className="media wow fadeInUp" data-wow-delay="1.2s">
              <div className="media-object media-left">
                <i className="icon icon-chat"></i>
              </div>
              <div className="media-body">
                <h2 className="media-heading">Support</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque luctus lacus nulla, eget varius justo tristique ut.
                </p>
              </div>
            </div>
          </div>

          <div className="clearfix text-center col-md-12 col-sm-12">
            <a href="#contact" className="btn btn-default smoothScroll">
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

Feature.propTypes = {};

export default Feature;
