import React, { useState, useEffect } from "react";

// import PropTypes from "prop-types";

import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

const Editpr = () => {
  const [text, setText] = useState(null);

  useEffect(() => {
    if (text) console.log(draftToHtml(convertToRaw(text.getCurrentContent())));
  }, [text]);

  const onEditorStateChange = (editorState) => {
    setText(editorState);
  };

  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = function () {
        resolve({
          data: {
            link: reader.result,
          },
        });
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Editor
      editorState={text}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: {
          uploadCallback: uploadImageCallBack,
          alt: { present: true, mandatory: true },
          previewImage: true,
        },
      }}
      onEditorStateChange={onEditorStateChange}
    />
  );
};

Editpr.propTypes = {};

export default Editpr;
