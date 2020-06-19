import React, { useState, useEffect } from "react";
import Missions from "./Missions";
import CreateMissionList from "./CreateMissionList";
import useHttpClient from "../../../HOOKS/useHttpClient";

const MissionList = (props) => {
  const { isLoading, error, open, sendRequest, clearError } = useHttpClient();
  const [missionList, setMissionList] = useState([]);

  const addNewMissionList = (Mid, Mname) => {
    setMissionList([...missionList, { _id: Mid, name: Mname }]);
  };

  const editM = (Mid, NewName) => {
    const updatedMission = missionList.map((mission) =>
      mission._id === Mid ? { ...mission, name: NewName } : mission
    );
    setMissionList(updatedMission);
  };

  const removeM = (missionID) => {
    const updatedMissions = missionList.filter(
      (mission) => missionID !== mission._id
    );
    setMissionList(updatedMissions);
  };

  const dateChangeHandler = (Mid, date) => {
    const updatedMissions = missionList.map((mission) =>
      mission._id === Mid ? { ...mission, date: date } : mission
    );
    setMissionList(updatedMissions);
  };

  const DateSetter = (Mid) => {
    const updatedIsDate = missionList.map((m) =>
      m._id === Mid ? { ...m, isDate: true } : m
    );
    setMissionList(updatedIsDate);
  };

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/missions/card/${props.headerId}`
        );
        setMissionList(responseData.missions);
      } catch (err) {}
    };
    fetchMissions();
  }, [sendRequest, props.headerId]);

  return (
    <React.Fragment>
      <CreateMissionList
        addNewMissionList={addNewMissionList}
        headerId={props.headerId}
      />
      {!isLoading && missionList && (
        <Missions
          editM={editM}
          missions={missionList}
          header={props.task}
          removeM={removeM}
          DateSetter={DateSetter}
          dateChangeHandler={dateChangeHandler}
        />
      )}
    </React.Fragment>
  );
};

export default MissionList;
