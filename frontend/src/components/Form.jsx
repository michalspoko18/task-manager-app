import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.scss";
import { toast } from "sonner";

import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";

import { SnackbarProvider, useSnackbar } from "notistack";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("At this moment not allow!");
  };

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/taskmanager");
      } else {
        navigate("/login");
      }
    } catch (error) {
      // alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="b-form__inner">
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        color="white"
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"

        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="b-form__options">
        <FormControlLabel control={<Checkbox />} label="Remeber me" sx={{color: "#fff"}}/>
        <a className="b-form__options--button" type="button" onClick={handleClick}>Forget password?</a>
      </div>
      <Button variant="outlined" type="submit">
        {name}
      </Button>

      <Divider sx={{ color: "white", borderColor: "primary.main" }}>REGISTER</Divider>

      {/* <button className="b-form__button" type="submit ">
        {name}
      </button> */}
    </form>
  );
}

function FormApp() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Form route="api/token/" method="login" />
    </SnackbarProvider>
  );
}

export default FormApp;
