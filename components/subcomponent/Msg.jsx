import React, { useContext } from "react";
import Moment from "react-moment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DeleteMsg from "./DeleteMsg";
import { UserContext } from "../../state/stateprovider";

const Msg = ({ left, msg, date, sender ,id}) => {
  const ctx = useContext(UserContext)
  return (
    <div className={`msg_dsp ${left && "left"}`}>
      <div className="text_dsp">
        <p className="text">{msg}</p>
        <p className="sender">Send by:{sender}</p>
        <Moment className="time">{date}</Moment>
      </div>
      {!left && (
        <div className="btn">
          <Button
            onClick={() => {
              ctx.setdialog({
                openDialog: true,
                title: "Massage Action",
                content: <DeleteMsg _id={id} msg={msg } />,
              });
            }}
            color="inherit"
            size="small"
          >
            <MoreVertIcon className="pong" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Msg;
