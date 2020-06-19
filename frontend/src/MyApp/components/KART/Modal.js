import React from "react";
import {
  makeStyles,
  useMediaQuery,
  TextareaAutosize,
  Modal,
} from "@material-ui/core";
import TodoApp from "../TODOLIST/TodoApp";
import useHttpClient from "../../../HOOKS/useHttpClient";

const useStyles = makeStyles((theme) => ({
  paper: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    borderRadius: "15px",
    width: "80vw",
    height: "95vh",
    background: "#870000" /* fallback for old browsers */,
    background:
      "-webkit-linear-gradient(to right, #190A05, #870000)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #190A05, #870000)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const { sendRequest } = useHttpClient();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isDateSetter = async (Mid) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/missions/isDate/${Mid}`,
        "PATCH",
        JSON.stringify({
          isDate: true,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.DateSetter(Mid);
    } catch (err) {}
  };

  const handleDateChange = async (Mid, date) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/missions/date/${Mid}`,
        "PATCH",
        JSON.stringify({
          date: date,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.dateChangeHandler(Mid, date);
    } catch (err) {}
  };

  const body = (
    <div className={classes.paper}>
      <TodoApp
        isDateSetter={isDateSetter}
        dateTime={props.dateTime}
        handleDateChange={handleDateChange}
        isDate={props.isDate}
        id={props.id}
        header={props.header}
        gorev={props.gorev}
      />
    </div>
  );

  const style = {
    left: "0px",
    resize: "none",
    width: "99%",
    borderRadius: "10px",
  };

  const styleMobile = { ...props.style, width: "69%" };
  const TextArea = !matches ? (
    <TextareaAutosize value={props.gorev} style={styleMobile} disabled />
  ) : (
    <TextareaAutosize
      value={props.gorev}
      style={props.showIcons ? props.style : style}
      disabled
    />
  );
  return (
    <div>
      <div onClick={handleOpen}>{TextArea}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
