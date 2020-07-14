import React from "react";

// import PropTypes from "prop-types";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <svg
            className="svgcolor-light"
            preserveAspectRatio="none"
            viewBox="0 0 100 102"
            height="100"
            width="100%"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0 L50 100 L100 0 Z"></path>
          </svg>

          <div className="col-md-4 col-sm-6">
            <h2>comila</h2>
            <div className="wow fadeInUp" data-wow-delay="0.3s">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                luctus lacus nulla, eget varius justo tristique ut. Etiam a
                tellus magna.
              </p>
              <p className="copyright-text">
                Copyright &copy; 2016 Your Company <br />
                Designed by
                <a
                  rel="nofollow"
                  href="http://www.google.com/+templatemo"
                  target="_parent"
                >
                  Templatemo
                </a>
              </p>
            </div>
          </div>

          <div className="col-md-1 col-sm-1"></div>

          <div className="col-md-4 col-sm-5">
            <h2>Our Studio</h2>
            <p className="wow fadeInUp" data-wow-delay="0.6s">
              120-240 aliquam augue libero,
              <br />
              Convallis in vulputate 10220 <br />
              San Francisco, CA, USA
            </p>
            <ul className="social-icon">
              <li>
                <a
                  href="#"
                  className="fa fa-facebook wow bounceIn"
                  data-wow-delay="0.9s"
                ></a>
              </li>
              <li>
                <a
                  href="#"
                  className="fa fa-twitter wow bounceIn"
                  data-wow-delay="1.2s"
                ></a>
              </li>
              <li>
                <a
                  href="#"
                  className="fa fa-behance wow bounceIn"
                  data-wow-delay="1.4s"
                ></a>
              </li>
              <li>
                <a
                  href="#"
                  className="fa fa-dribbble wow bounceIn"
                  data-wow-delay="1.6s"
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
