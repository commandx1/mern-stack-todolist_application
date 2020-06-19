import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

export default function RecipeReviewCard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      background: `#${props.left}`,
      background: `-webkit-linear-gradient(to right, #${props.left}, #${props.right})`,
      background: `linear-gradient(to right, #${props.left}, #${props.right})`,
    },
    action: {
      marginLeft: theme.spacing(13),
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} />
      <CardActions className={classes.action} disableSpacing>
        <IconButton
          onClick={() => props.backgroundChangeHandler(props.left, props.right)}
          aria-label="Uygula"
        >
          <ThumbUpIcon style={{marginRight:"1em"}} />
          <Typography variant="subtitle1">Uygula</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}
