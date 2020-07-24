import React, { useState, useRef } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "../../components/Buttons";

function SimpleDialog(props) {
  const { isOpen, handleClose, text, citationWithAuthor, citation } = props;

  const refDiv1 = useRef();
  const refDiv2 = useRef();
  const refDiv3 = useRef();

  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");

  const handleCopy1 = () => {
    const copyText = refDiv1.current.textContent;

    setContent1(copyText);
  };
  const handleCopy2 = () => {
    const copyText = refDiv2.current.textContent;

    setContent2(copyText);
  };
  const handleCopy3 = () => {
    const copyText = refDiv3.current.textContent;

    setContent3(copyText);
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
        <div id="simple-dialog-title">
          <div style={{ color: "black", fontSize: "20px" }}>REFERÊNCIA</div>
        </div>
        <div
          ref={refDiv1}
          style={{
            fontSize: "18px",
          }}
        >
          {text}
        </div>
        <CopyToClipboard text={content1} onCopy={handleCopy1}>
          <Button
            color="primary"
            style={{
              float: "right",
            }}
          >
            Copiar
          </Button>
        </CopyToClipboard>
      </DialogContent>

      {citationWithAuthor && (
        <DialogContent>
          <div id="simple-dialog-title">
            <div style={{ color: "black", fontSize: "20px" }}>
              CITAÇÃO COM AUTOR INCLUÍDO NO TEXTO
            </div>
          </div>
          <div
            ref={refDiv2}
            style={{
              fontSize: "18px",
            }}
          >
            {citationWithAuthor}
          </div>
          <CopyToClipboard text={content2} onCopy={handleCopy2}>
            <Button
              color="primary"
              style={{
                float: "right",
              }}
            >
              Copiar
            </Button>
          </CopyToClipboard>
        </DialogContent>
      )}
      {citation && (
        <DialogContent>
          <div id="simple-dialog-title">
            <div style={{ color: "black", fontSize: "20px" }}>CITAÇÃO</div>
          </div>
          <div
            ref={refDiv3}
            style={{
              fontSize: "18px",
            }}
          >
            {citation}
          </div>
          <CopyToClipboard text={content3} onCopy={handleCopy3}>
            <Button
              color="primary"
              style={{
                float: "right",
              }}
            >
              Copiar
            </Button>
          </CopyToClipboard>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default SimpleDialog;
