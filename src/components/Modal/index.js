import React, { useState, useRef } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

function SimpleDialog(props) {
  const { isOpen, handleClose, text } = props;

  const refDiv = useRef();
  const [content, setContent] = useState("");

  const handleCopy = () => {
    const copyText = refDiv.current.textContent;

    setContent(copyText);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={isOpen}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="simple-dialog-title">Referência</DialogTitle>
      <DialogContent>
        <div ref={refDiv}>{text}</div>
        <CopyToClipboard text={content} onCopy={handleCopy}>
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>
      </DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;
