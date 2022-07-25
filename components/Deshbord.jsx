import React, { useContext, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";
import Typography from "@material-ui/core/Typography";
import Msg from "./subcomponent/Msg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { UserContext } from "../state/stateprovider";
import DeleteIcon from "@material-ui/icons/Delete";
import { io } from "socket.io-client";
import FlipMove from "react-flip-move";
import Spinner from "./Spinner";
import Nav from "./Nav";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import PanToolIcon from "@material-ui/icons/PanTool";
import AddIcon from "@material-ui/icons/Add";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogBox from "./subcomponent/DialogBox";
import DeleteRoom from "./subcomponent/DeleteRoom";


const Deshbord = () => {
  const [load, setLod] = useState(false);
  const [loadmsg, setLodmsg] = useState(false);
  const [spinner, noSpinner] = useState(false);
  const [room, setRoom] = useState([]);
  const [msg, setMsg] = useState();
  const [massage, setMassage] = useState();
  const [roomseet, setRoomset] = useState();
  const [newRoom, setNewroom] = useState();
  const ctx = useContext(UserContext);
  const socket = io(`${process.env.BACK_END}`, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });
  console.log(process.env.BACK_END)
  useEffect(() => {
    var myDiv = document.getElementsByClassName("msgbox");
    console.log(myDiv.scrollHeight);
    myDiv[0].scrollTo(0, myDiv[0].scrollHeight);
  }, [load, msg]);
  useEffect(() => {
    try {
      socket.on("connect", (socket) => {
        console.log("io connected");
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  socket.on("msgUdate", (sent) => {
    console.log(sent);
    if (!sent.msgLoader) {
      const isSame = () => {
        return ctx.room !== sent.room;
      };
      console.log(isSame());
  
      ctx.setRed(isSame() && <NotificationsActiveIcon />);
      ctx.setOpen(isSame() && true);
      ctx.setnotice(isSame() && `New massage from room  ${sent.room}`);
  
      setLodmsg(true);
    } else {
      setLodmsg(true)
    }
  });

  useEffect(() => {
    var myDiv = document.getElementsByClassName("rooms");
    console.log(myDiv[0].scrollHeight);
    myDiv[0].scrollTo(0, myDiv[0].scrollHeight);
  }, [room, newRoom]);
  useEffect(() => {
    console.log(ctx);
    if (ctx.token || ctx.dlt == 'room_dlt') {
      axios
        .get(`${process.env.BACK_END}/room`, {
          headers: {
            Authorization: `Bearer ${ctx.token.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setRoom(res.data);
          ctx.seteDlt("")
        });
    }
  }, [newRoom,ctx.dlt]);
  useEffect(() => {
    if (ctx.room || ctx.dlt=='msg_dlt') {
      axios
        .post(
          `${process.env.BACK_END}/get_msg`,
          {
            room: ctx.room,
          },
          {
            headers: {
              Authorization: `Bearer ${ctx.token.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setMsg(res.data);
          setLodmsg(false);
          noSpinner(false);
          setLod(false);
        });
    } else {
      setMsg([])
    }
  }, [ctx.room, loadmsg, ctx.dlt]);
  const msgSender = (e) => {
    e.preventDefault();
    setLod(true);
    document.getElementById("msgForm").reset();
    if (ctx.room) {
      axios
        .post(
          `${process.env.BACK_END}/msg`,
          {
            room: ctx.room,
            msg: massage,
          },
          {
            headers: {
              Authorization: `Bearer ${ctx.token.token}`,
            },
          }
        )
        .then((res) => {
          socket.emit("msgUdate", res.data);
          setMassage(null);
          setLod(false);
        });
    }
  };
  useEffect(() => {
    if (ctx.dlt == 'msg_dlt') {
      socket.emit("msgUdate", {
       msgLoader:true
     })
   }
  },[ctx.dlt])
  const roomSender = (e) => {
    e.preventDefault();
    document.getElementById("roomForm").reset()
    if (ctx.token) {
      axios
        .post(
          `${process.env.BACK_END}/room`,
          {
            roomName: roomseet,
            creator: ctx.user.name,
          },
          {
            headers: {
              Authorization: `Bearer ${ctx.token.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setNewroom(res.data);
          ctx.setRed(<AddIcon />);
          ctx.setOpen(true);
          ctx.setnotice(`New Room added  ${res.data.roomName}`);
        })

        .catch((err) => {
          console.log(err);
          ctx.setRed(<PanToolIcon />);
          ctx.setOpen(true);
          ctx.setnotice(`Room name should be unique: ${err.code}`);
        });
    }
  };
  
  return (
    <React.Fragment>
      <Nav />
      <div className="container dbord">
        <div className="room">
          <div className="input">
            <form id="roomForm" action="">
              <TextField
                onChange={(e) => setRoomset(e.target.value)}
                type="text"
                label="Create Room"
                variant="outlined"
              />
              <Button
                onClick={roomSender}
                type="submitt"
                variant="contained"
                color="primary"
              >
                enter
              </Button>
            </form>
          </div>
          <div className="rooms">
            {!room ? (
              <Spinner />
            ) : (
              room.map((room) => {
                return (
                  <div key={room._id}>
                    <div className="item">
                      <div className="name">
                        <Typography
                          onClick={(e) => {
                            noSpinner(true);
                            ctx.setRoom(room.roomName);
                            ctx.setRed(<AnnouncementIcon />);
                            ctx.setOpen(true);
                            ctx.setnotice(
                              `Channel room Selected as ${room.roomName}`
                            );
                          }}
                          variant="h6"
                          gutterBottom
                        >
                          {room.roomName}
                        </Typography>
                      </div>
                      <Moment format="YYYY/MM/DD/hh/" className="time">
                        {room.createdAt}
                      </Moment>
                      {room.creator == ctx.user.name && (
                        <Button onClick={() => {
                          ctx.setdialog({
                          openDialog: true,
                          title: "Delete Room",
                          content: <DeleteRoom room={room.roomName} id={room._id} />,
                         
                        })}} color="secondary" size="small">
                          <DeleteIcon />
                        </Button>
                      )}
                    </div>
                    <hr />
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div id="chatmsg" className="chat">
          <div className="msg msgbox">
            {spinner ? (
              <Spinner />
            ) : (
              msg &&
              msg.map((msg) => {
                return (
                  <FlipMove>
                    <Msg
                      key={msg._id}
                      id={msg._id}
                      left={ctx.user.name != msg.sender && true}
                      msg={msg.msg}
                      date={msg.createdAt}
                      sender={msg.sender}
                    />
                  </FlipMove>
                );
              })
            )}
          </div>
          {ctx.room && (
            <div className="msg_in">
              {load ? <CircularProgress /> : (
                <form id="msgForm" action="">
                <TextField
                  onChange={(e) => {
                    setMassage(e.target.value);
                  }}
                  type="text"
                  label="write Massage"
                  variant="outlined"
                />
                <Button
                  type="submitt"
                  onClick={msgSender}
                  disabled={!massage || (load && true)}
                  variant="contained"
                  color="primary"
                >
                  {load ? "Sending..." : "enter"}
                </Button>
              </form>
              )}
            </div>
          )}
        </div>
      </div>
      <DialogBox/>
    </React.Fragment>
  );
};

export default Deshbord;
