import React, { useState, useContext } from "react";
import { AuthContext } from "../CONTEXT/AuthContext";
import useHttpClient from "../HOOKS/useHttpClient";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import { NavLink, useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
  Grid,
  TextField,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import GoogleLoginn from "./GoogleLoginn";
import FacebookLoginn from "./FacebookLoginn";
import ErrorModal from "./ErrorModal";
import Spinner from "./Spinner";
import "./Auth.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "rgba(255,255,255, 0.6);",
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "40px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "70%", // Fix IE 11 issue.
    marginBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textfield: {
    color: "white !important",
  },
}));

const Auth = () => {
  const history = useHistory();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { error, open, sendRequest, clearError, isLoading } = useHttpClient();

  const responseFacebook = async (response) => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/googleLogin",
        "POST",
        JSON.stringify({
          email: response.email,
          name: response.name,
          image: response.picture.data.url,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.user.id,responseData.message);
      history.push("/" + responseData.user.id + "/Görevlerim");
    } catch (err) {}
  };

  const responseGoogle = async (response) => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/googleLogin",
        "POST",
        JSON.stringify({
          name: response.profileObj.name,
          email: response.profileObj.email,
          image: response.profileObj.imageUrl,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.user.id, responseData.message);
      history.push("/" + responseData.user.id + "/Görevlerim");
    } catch (err) {}
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <ErrorModal open={open} handleClose={clearError} error={error} />
      {isLoading ? <Spinner asOverlay /> :
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography style={{ color: "white" }} component="h1" variant="h5">
            Giriş Yap
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                const responseData = await sendRequest(
                  "http://localhost:5000/api/users/login",
                  "POST",
                  JSON.stringify({
                    email: values.email,
                    password: values.password,
                  }),
                  {
                    "Content-Type": "application/json",
                  }
                );
                auth.login(responseData.user.id, responseData.message);
                history.push("/" + responseData.user.id + "/Görevlerim");
              } catch (err) {}
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              /* and other goodies */
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="login-inputs"
                />
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    className="login-inputs"
                    required
                    name="password"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Giriş Yap
                </Button>
                <Grid container>
                  <NavLink className="nav-link" to="/Kaydol">
                    {"Hesabınız yok mu? Kaydolmak için tıklayın."}
                  </NavLink>
                </Grid>
              </form>
            )}
          </Formik>
          <GoogleLoginn googleRes={responseGoogle} />
          <FacebookLoginn faceResponse={responseFacebook} />
        </div>
      </Container>}
    </React.Fragment>
  );
};
export default Auth;
