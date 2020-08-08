import React, { useRef, useEffect } from "react";

import cm from "codemirror";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "../../components/Buttons";

import { copyFormatted } from "./magic";

import "./style.css";

const Modal = ({
  isOpen,
  handleClose,
  text,
  span,
  citationWithAuthor,
  citation,
}) => {
  const refTextarea = useRef(null);

  const handleCopy = () => {
    var htmlEditor = cm.fromTextArea(refTextarea.current, {
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
        <textarea ref={refTextarea} value={span}></textarea>
        <div id="simple-dialog-title">
          <div
            style={{ color: "#6666cc", fontSize: "20px", fontWeight: "bold" }}
          >
            REFERÊNCIA
          </div>
        </div>
        <div
          style={{
            fontSize: "18px",
          }}
        >
          {text}
        </div>

        <Button
          style={{ margin: 0, float: "right" }}
          color="primary"
          onClick={handleCopy}
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
    </Dialog>
  );
};

export default Modal;
