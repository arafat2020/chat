import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import axios from 'axios'
import { useContext } from "react";
import { UserContext } from "../state/stateprovider";
import PanToolIcon from '@material-ui/icons/PanTool';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const Login = () => {
  const ctx = useContext(UserContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const handelclick = () => {
    ctx.setLod(true)
    axios.post(`${process.env.BACK_END}/login`, {
      email,
      password
    }).then(res => {
      console.log(res.data.data)
      localStorage.setItem('user_token', JSON.stringify(res.data.token))
      localStorage.setItem('user_data', JSON.stringify(res.data.data))

      ctx.setToken(res.data.token)
      ctx.setUser(res.data.data)
      ctx.setRed(<DoneAllIcon/>)
      ctx.setOpen(true)
      ctx.setnotice(`Succesfully login as ${res.data.data.name}`)
      ctx.setLod(false)
    }).catch(err => {
      console.log('err:', err)
      ctx.setRed(<PanToolIcon/>)
      ctx.setOpen(true)
      ctx.setnotice(err.code)
      ctx.setLod(false)
    })
  }
  return (
    <div className="container flex login">
      <form className="flex" action="">
        <TextField
          onChange={e=>setEmail(e.target.value)}
          type="email"
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
        />
        <hr />
        <TextField
          onChange={e=>setPassword(e.target.value)}
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <hr />
        <Button onClick={handelclick} variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
