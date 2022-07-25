import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { UserContext } from "../state/stateprovider";
import DoneAllIcon from '@material-ui/icons/DoneAll';

const Nav = () => {
  const ctx = useContext(UserContext);
  const logout = () => {
    function clear() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_data");
    }
      clear();
      ctx.setRed(<DoneAllIcon />)
      ctx.setnotice('Logout succesfull')
      ctx.setOpen(true)
    ctx.setLod(true);
  };
  return (
    <div className="nav">
      <div className="user">
        <Alert severity="success">
          Loged In as <strong>{ctx.user.name}</strong>
        </Alert>
      </div>
      <div className="room">
        <Alert severity="info">
          Current Room: <strong>{ctx.room}</strong>
        </Alert>
      </div>
      <Button onClick={logout} variant="contained" color="secondary">
        Log Out
      </Button>
    </div>
  );
};

export default Nav;
