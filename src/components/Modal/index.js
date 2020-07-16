import React, { useEffect, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function SimpleDialog(props) {
  const { isOpen, handleClose, text } = props;
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const copyText = document.getElementById("myInput")?.textContent;

    console.log("copyText: ", copyText);
  }, [copy]);

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
        <DialogContentText id="alert-dialog-description">
          <div id="myInput">{text}</div>
          <button onClick={() => setCopy(!copy)}> Copy </button>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;
