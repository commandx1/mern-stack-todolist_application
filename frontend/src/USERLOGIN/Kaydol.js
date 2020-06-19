import React, { useContext, useState } from 'react';
import {AuthContext} from "../CONTEXT/AuthContext";
import useHttpClient from "../HOOKS/useHttpClient";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import {
  Visibility, 
  VisibilityOff, 
  LockOutlined
} from "@material-ui/icons";
import { Formik } from 'formik';
import {NavLink, useHistory} from "react-router-dom";
import ErrorModal from './ErrorModal';
import Spinner from './Spinner';
import MySnackbar from "../CONTEXT/Snackbar/MySnackbar";
import "./Auth.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    backgroundColor:"rgba(255,255,255, 0.6)",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius:"40px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '70%', // Fix IE 11 issue.
    marginBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Kaydol = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const { error, open, sendRequest, clearError, isLoading } = useHttpClient();
  const [showPassword,setShowPassword]=useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false)
  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleMouseDownPassword = e => {
      e.preventDefault();
  }

  const snackbarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  }
  
  let snackbarMessage;
  return (  
    <React.Fragment>
      {showSnackbar &&
      <MySnackbar autoHideDuration={4000} message={snackbarMessage} handleClose={snackbarCloseHandler} open={showSnackbar} /> }
      
      <ErrorModal open={open} handleClose={clearError} error={error} />
      {isLoading && <Spinner asOverlay />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography style={{color:"white"}} component="h1" variant="h5">
            Kayıt Ol
          </Typography>
        <Formik
          initialValues={{fullName:'', email: '', password: '' }}
          onSubmit={async (values) => {
            try {
              const responseData = await sendRequest("http://localhost:5000/api/users/signup", "POST", JSON.stringify({
                name: values.fullName,
                email: values.email,
                password: values.password
              }),  
                {
                'Content-Type': 'application/json'
                }
              );
               auth.login(responseData.user.id, responseData.message);
               history.push("/"+ responseData.user.id +"/Görevlerim");
               setShowSnackbar(true);
               snackbarMessage = responseData.message;
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
                className="login-inputs"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Adınız"
                name="fullName"
                autoComplete="fullName"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
              />
              <TextField
                className="login-inputs"
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
                helperText="abc@ornek.com"
              />
              <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Şifre
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
            <Grid container>
                  <NavLink style={{marginTop:"1em"}} className="nav-link" to="/">
                    {"Zaten bir hesabınız mı var? Giriş yapmak için tıklayın."}
                  </NavLink>
                </Grid>
              <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                      Kaydol
                    </Button>
            </form>
          )}  
          </Formik>
        </div>
    </Container>
    </React.Fragment>
  );
}
export default Kaydol;