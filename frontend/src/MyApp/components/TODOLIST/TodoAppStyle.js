import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      flexWrap: "wrap", 
      position: "relative",
      "& > *": {
        margin: theme.spacing(2),
        width: theme.spacing(35),
        borderRadius: "30px",
        background:"linear-gradient(45deg, #DEABAB 30%, #AE71A9 90%)"
      
      },
    },
    cards: {
      display: "flex",
      flexFlow:"row",
      height: "81vh"
  },
    textArea :{
        backgroundColor: "white",
        left: "0px",
        resize: "none",
        width: "86%",
        borderRadius: "10px",
        outline:0     //Çerçevesini yok etmek için
      },
    form: { 
        left: "0px", 
        display: "flex", 
        width: "100%" 
    }
  }),
);

export default useStyles;