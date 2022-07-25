import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../state/stateprovider";
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneAllIcon from '@material-ui/icons/DoneAll';


const DeleteRoom = ({ room, id }) => {
  const [ld, setLd] = useState(false);
  const [roomname, setRoom] = useState();
  const ctx = useContext(UserContext);
  const dltRoom = () => {
    console.log(id);
      console.log(ctx.token.token);
      setLd(true)
    if (ctx.token.token) {
      axios
        .delete(`${process.env.BACK_END}/room`, {
          headers: {
            Authorization: `Bearer ${ctx.token.token}`,
          },

          data: {
            id: id,
          },
        })
        .then((dl) => {
          console.log(dl);
          if (dl.data.dlt) {
            ctx.seteDlt("room_dlt");
            ctx.setRoom();
            ctx.setdialog({
              openDialog: false,
              title: "",
              content: null,
            });
            ctx.setRed(<DoneAllIcon/>)
            ctx.setOpen(true)
            ctx.setnotice(`Room Deleted`)
            }
            setLd(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="delete_room">
      {ld ? (
        <CircularProgress />
      ) : (
        <div>
          <Typography variant="caption">
            Are you sure that you wnat to delete room <strong>{room}</strong>?
            <br />
            To delete The room type the room name then click
          </Typography>
          <form>
            <TextField
              onChange={(e) => setRoom(e.target.value)}
              type="text"
              id="outlined-basic"
              label="Room Nmae"
              variant="outlined"
            />
            <Button
              className="btn"
              onClick={dltRoom}
              disabled={room != roomname && true}
              variant="contained"
              color="secondary"
            >
              Delete Room
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteRoom;
