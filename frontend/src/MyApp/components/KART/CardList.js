import React from "react";
import { Paper } from "@material-ui/core";
import CardHeaders from "./CardHeaders";
import MissionList from "./MissionList";
import useStyles from "../TODOLIST/TodoAppStyle";

const CardList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.cards}>
      {props.header.map((heads) => (
        <div key={heads._id} className={classes.card}>
          <Paper elevation={3}>
            <CardHeaders
              removeH={props.removeH}
              editH={props.editH}
              key={heads._id}
              id={heads._id}
              task={heads.header}
            />
            <MissionList headerId={heads._id} task={heads.header} />
          </Paper>
        </div>
      ))}
    </div>
  );
};

export default CardList;
