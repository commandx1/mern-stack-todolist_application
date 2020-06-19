import React, { useContext } from "react";
import { AuthContext } from "../../CONTEXT/AuthContext";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <List>
      {auth.isLoggedIn && (
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
          style={{ textDecoration: "none" }}
          to={`/${auth.userId}/Görevlerim`}
          exact
        >
          <ListItem button key={"Görevlerim"}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary={"Görevlerim"} />
          </ListItem>
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
          style={{ textDecoration: "none" }}
          to={`/${auth.userId}/Profil`}
          exact
        >
          <ListItem button key={"Profil"}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Profil"} />
          </ListItem>
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <div>
          <ListItem
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            button
            key={"Arkaplan"}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText style={{ color: "blue" }} primary={"Arkaplan"} />
          </ListItem>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              style={{ textDecoration: "none" }}
              to="/Arkaplan/Renkler"
              exact
            >
              <MenuItem onClick={handleClose}>Renkler</MenuItem>
            </NavLink>

            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              style={{ textDecoration: "none" }}
              to="/Arkaplan/Fotoğraflar"
              exact
            >
              <MenuItem onClick={handleClose}> Fotoğraflar</MenuItem>
            </NavLink>
          </Menu>
        </div>
      )}
      {!auth.isLoggedIn && (
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
          style={{ textDecoration: "none" }}
          to="/"
          exact
        >
          <ListItem button key={"Giriş Yap"}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={"Giriş Yap"} />
          </ListItem>
        </NavLink>
      )}
      {!auth.isLoggedIn && (
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
          style={{ textDecoration: "none" }}
          to="/Kaydol"
          exact
        >
          <ListItem button key={"Kaydol"}>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary={"Kaydol"} />
          </ListItem>
        </NavLink>
      )}
      <Divider />
      {auth.isLoggedIn && (
        <ListItem onClick={auth.logout} button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Çıkış yap" />
        </ListItem>
      )}
    </List>
  );
};

export default NavLinks;
