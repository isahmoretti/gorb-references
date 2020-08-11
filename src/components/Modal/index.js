import React, { useRef, useEffect, useState } from "react";

import cm from "codemirror";
import { renderToString } from "react-dom/server";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "../../components/Buttons";

import { copyFormatted } from "./magic";

import "./style.css";

const Modal = ({ isOpen, handleClose, text, citationWithAuthor, citation }) => {
  const refTextarea = useRef(null);
  const refTextareaCitation = useRef(null);
  const refTextareaCitationWithAutor = useRef(null);

  const [textReference, setTextReference] = useState("");
  const [textCitation, setTextCitation] = useState("");
  const [textCitationWithAuthor, setCitationWithCitation] = useState("");

  const formartString = (string) =>
    renderToString(string).replace(/<!(.*?)>|<span(.*?)>|<\/span(.*?)>/g, "");

  useEffect(() => {
    setTextReference(formartString(text));
    setTextCitation(formartString(citation));
    setCitationWithCitation(formartString(citationWithAuthor));
  }, [citation, citationWithAuthor, text]);

  const handleCopy = (ref) => {
    var htmlEditor = cm.fromTextArea(ref.current, {
      mode: "text/html",
    });

    copyFormatted(htmlEditor.getValue());
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={isOpen}
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <textarea ref={refTextarea} value={textReference}></textarea>
        <div id="simple-dialog-title">
          <div
            style={{ color: "#6666cc", fontSize: "20px", fontWeight: "bold" }}
          >
            REFERÊNCIA
          </div>
        </div>
        <div style={{ fontSize: "18px" }}>{text}</div>

        <Button
          style={{ margin: 0, float: "right" }}
          color="primary"
          onClick={() => handleCopy(refTextarea)}
        >
          Copiar
        </Button>
        <div
          style={{
            height: 2,
            backgroundColor: "#6e6e6e",
            margin: "44px 0 0 0",
          }}
        />
      </DialogContent>
      {citationWithAuthor && (
        <DialogContent>
          <textarea
            ref={refTextareaCitationWithAutor}
            value={textCitationWithAuthor}
          ></textarea>

          <div id="simple-dialog-title">
            <div
              style={{ color: "#6666cc", fontSize: "20px", fontWeight: "bold" }}
            >
              CITAÇÃO COM AUTOR INCLUÍDO NO TEXTO
            </div>
          </div>
          <div style={{ fontSize: "18px" }}>{citationWithAuthor}</div>

          <Button
            style={{ margin: 0, float: "right" }}
            color="primary"
            onClick={() => handleCopy(refTextareaCitationWithAutor)}
          >
            Copiar
          </Button>

          <div
            style={{
              height: 2,
              backgroundColor: "#6e6e6e",
              margin: "44px 0 0 0",
            }}
          />
        </DialogContent>
      )}

      {citation && (
        <DialogContent>
          <textarea ref={refTextareaCitation} value={textCitation}></textarea>

          <div id="simple-dialog-title">
            <div
              style={{ color: "#6666cc", fontSize: "20px", fontWeight: "bold" }}
            >
              CITAÇÃO NO FINAL DO PARÁGRAFO
            </div>
          </div>
          <div style={{ fontSize: "18px" }}>{citation}</div>

          <Button
            style={{ margin: 0, float: "right" }}
            color="primary"
            onClick={() => handleCopy(refTextareaCitation)}
          >
            Copiar
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default Modal;
