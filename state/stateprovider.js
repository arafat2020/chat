import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState();
  const [load, setLod] = useState(false);
    const [token, setToken] = useState();
  const [room, setRoom] = useState()
  const [open, setOpen] = useState(false);
  const [notice, setnotice] = useState('');
  const [red,setRed] =useState();
  const [dialog, setdialog] = useState({
    openDialog: false,
    title:"",
    content: null,
  })
  const [dlt, seteDlt] = useState({
    type: "",
  })
    
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("user_token")));
    setUser(JSON.parse(localStorage.getItem("user_data")));
    // clear()
    setLod(false)
  }, [load]);
    console.log(room);
    function clear () {
        localStorage.removeItem("user_token")
        localStorage.removeItem("user_data")
    }
  return (
    <UserContext.Provider
      value={{
        user, setUser, load, setLod, token, setToken, room, setRoom, open, setOpen,notice,setnotice,red,setRed,dialog,setdialog,dlt, seteDlt
      }}
    >
      {load ? <Spinner /> : children}
    </UserContext.Provider>
  );
};
