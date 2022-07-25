import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useContext } from "react";
import { UserContext } from "../../state/stateprovider";

const DialogBox = () => {
  const ctx = useContext(UserContext);
  function closeHandeler() {
    ctx.setdialog({
      openDialog: false,
      title: "",
      content: null,
    });
  }
  return (
    <div>
      <Dialog onClose={closeHandeler} open={ctx.dialog.openDialog}>
        <DialogTitle>{ctx.dialog.title}</DialogTitle>
        {ctx.dialog.content}
      </Dialog>
    </div>
  );
};

export default DialogBox;
