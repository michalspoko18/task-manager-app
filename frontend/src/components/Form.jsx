import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.scss";
import { toast } from "sonner";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SnackbarProvider, useSnackbar } from "notistack";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("At this moment not allowed!");
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
      // Handle error properly here
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <form onSubmit={handleSubmit} className="b-form__inner">
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        color="secondary"
      />

      {/* Password Input with Toggle Visibility */}
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          color="secondary"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <div className="b-form__options">
        <FormControlLabel control={<Checkbox />} label="Remember me" sx={{ color: "#fff" }} />
        <a className="b-form__options--button" type="button" onClick={handleClick}>
          Forget password?
        </a>
      </div>

      <Button variant="outlined" type="submit">
        {name}
      </Button>

      <Divider sx={{ color: "white", borderColor: "primary.main" }}>REGISTER</Divider>
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
