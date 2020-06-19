import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
  paper: {
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    borderRadius:"30px",
    width: 500,
    background: "#ED213A",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to right, #93291E, #ED213A)",  /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to right, #93291E, #ED213A)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color:"white"
  },
}));

export default function ErrorModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Bir hata meydana geldi!</h2>
      <p id="simple-modal-description">
        {props.error}
      </p>
    </div>
  );

  return (
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
  );
}
