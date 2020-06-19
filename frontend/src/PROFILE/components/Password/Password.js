import React from "react";
import {
  makeStyles,
  InputLabel,
  FormControl,
  Popover,
  Typography,
  InputAdornment,
  IconButton,
  FilledInput,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import UseToggleState from "../../../HOOKS/UseToggleState";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "25ch",
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const Password = (props) => {
  const [showPassword, togglePassword] = UseToggleState(false);
  const classes = useStyles();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const openPop = Boolean(props.anchorEl);
  const id = openPop ? props.popoverName : undefined;

  return (
    <FormControl
      className={(clsx(classes.margin, classes.textField), props.className)}
      variant="filled"
    >
      <InputLabel htmlFor="filled-adornment-password">
        {props.passwordName}
      </InputLabel>
      <FilledInput
        aria-describedby={props.popoverName}
        style={{ color: "white" }}
        id="filled-adornment-password"
        type={showPassword ? "text" : "password"}
        value={props.password}
        onChange={(e) => props.passwordChangeHandler(props.pid, e)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <Popover
        id={id}
        open={openPop}
        anchorEl={props.anchorEl}
        onClose={() => props.handleClosePopover(props.pid)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          {props.popoverMessage}
        </Typography>
      </Popover>
    </FormControl>
  );
};

export default Password;
