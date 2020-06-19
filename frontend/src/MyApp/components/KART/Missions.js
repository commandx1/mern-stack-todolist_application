import React from "react";
import { List, Divider } from "@material-ui/core";
import Missionnn from "./Missionnn";
import Scrollbars from "react-custom-scrollbars";

const Missions = (props) => (
  <Scrollbars style={{ height: 390 }}>
    <List>
      {props.missions.map((mission, i) => (
        <div key={mission._id}>
          <Missionnn
            removeM={props.removeM}
            editM={props.editM}
            id={mission._id}
            task={mission.name}
            editMission={props.editMission}
            removeMission={props.removeMission}
            header={props.header}
            dateTime={mission.date}
            DateSetter={props.DateSetter}
            dateChangeHandler={props.dateChangeHandler}
            isDate={mission.isDate}
          />
          {i < props.missions.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  </Scrollbars>
);

export default Missions;
