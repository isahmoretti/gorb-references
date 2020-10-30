import React, { useEffect } from "react";

// import PropTypes from "prop-types";

const googleAdId = "ca-pub-8340769599356298";

const GoogleAds = ({ slot, width, height }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof window !== "undefined")
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ins
        className="adsbygoogle"
        // style="display:inline-block;width:728px;height:90px"
        style={{ display: "block", width, height }}
        data-ad-client={googleAdId}
        data-ad-slot={slot}
        data-ad-format="link"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

GoogleAds.propTypes = {};

export default GoogleAds;
