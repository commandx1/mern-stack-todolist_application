import React, { useState, useEffect } from "react";
import useHttpClient from "../../HOOKS/useHttpClient";
import { useParams } from "react-router-dom";
import CardList from "../components/KART/CardList";
import CreateCard from "../components/KART/CreateCard";
import ErrorModal from "../../USERLOGIN/ErrorModal";
import Spinner from "../../USERLOGIN/Spinner";

export default function MainCard() {
  const userId = useParams().userId;
  const { isLoading, error, open, sendRequest, clearError } = useHttpClient();
  const [headers, setHeaders] = useState([]);

  const addNewHeader = (Hid, Hname) => {
    setHeaders([...headers, {_id: Hid , header: Hname}]);
  }


  const editH = (Cid, value) => {
    const updatedHeader = headers.map(h =>
      h._id === Cid ? { ...h, header: value } : h
    );
    setHeaders(updatedHeader);
  };

  const removeH = (Hid) => {
    const updatedHeaders = headers.filter((header) => header._id !== Hid);
    setHeaders(updatedHeaders);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/cards/user/${userId}`
        );
        setHeaders(responseData.cards);
      } catch (err) {}
    };
    fetchCards();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
    <ErrorModal open={open} error={error} handleClose={clearError} /> 
      <CreateCard addNewHeader={addNewHeader}/>
      {isLoading && <Spinner asOverlay/>}
      {!isLoading && headers && (
          <CardList removeH={removeH} editH={editH} header={headers}  />
      )}
      </React.Fragment>
  );
}
