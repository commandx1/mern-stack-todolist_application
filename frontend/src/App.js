import React, { useState, useCallback } from "react";
import { AuthContext } from "./CONTEXT/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./Navigation/MainNavigation";
import Kaydol from "./USERLOGIN/Kaydol";
import PageContent from "./CONTEXT/PageContent";
import Auth from "./USERLOGIN/Auth";
import Profil from "./PROFILE/pages/Profil";
import Settings from "./SETTINGS/pages/Settings";
import ImageBackground from "./SETTINGS/pages/ImageBackground";
import MainCard from "./MyApp/pages/MainCard";
import MySnackbar from "./CONTEXT/Snackbar/MySnackbar";
import Scrollbars from "react-custom-scrollbars";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setuserId] = useState(false);
  const [showSnackbar, setshowSnackbar] = useState(false);
  const [message, setmessage] = useState(null);

  const login = useCallback((uid, message) => {
    setIsLoggedIn(true);
    setuserId(uid);
    setmessage(message);
    setshowSnackbar(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setuserId(null);
  }, []);

  const snackbarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setshowSnackbar(false);
  };

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <PageContent>
          <MainNavigation>
            <Route path="/:userId/Görevlerim" exact>
              <MainCard />
            </Route>
            <Route path="/:userId/Profil" exact>
              <Profil />
            </Route>
            <Scrollbars style={{height:550}}>
              <Route path="/Arkaplan/Renkler" component={Settings} exact />
              <Route path="/Arkaplan/Fotoğraflar" component={ImageBackground} exact />
            </Scrollbars> 
          </MainNavigation>
        </PageContent>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <MainNavigation>
          <Route path="/" exact>
            <Auth />
          </Route>
          <Route path="/Kaydol" exact>
            <Kaydol />
          </Route>
          <Redirect to="/" />
        </MainNavigation>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <MySnackbar
        autoHideDuration={6000}
        message={message}
        handleClose={snackbarCloseHandler}
        open={showSnackbar}
      />
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
