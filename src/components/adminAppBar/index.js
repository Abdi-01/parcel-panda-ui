import React, { useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authLogout } from "../../actions";
import {
  AppBar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core/";
import {
  AdminNavWrapper,
  LeftWrapper,
  Navigation,
  RightWrapper,
  StyledToolbar,
} from "./adminAppBarComp";

const AdminAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authLogout())
    handleMenuClose()
    history.push("/");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <AccountBoxIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
          <StyledToolbar>
            <LeftWrapper>
              <Typography variant="h6" noWrap component="div">
                Admin
              </Typography>
            </LeftWrapper>
            <AdminNavWrapper>
                  <Navigation activeStyle={{ fontWeight: "bold", color: "#ef9a9a" }} to="/product-management">
                      <Typography>Product Management</Typography>
                  </Navigation>
                  <Navigation activeStyle={{ fontWeight: "bold", color: "#ef9a9a" }} to="/transaction-management">
                      <Typography>Transaction Management</Typography>
                  </Navigation>
                  <Navigation activeStyle={{ fontWeight: "bold", color: "#ef9a9a" }} to="/sales-report">
                      <Typography>Sales Report</Typography>
                  </Navigation>
            </AdminNavWrapper>
            <RightWrapper>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </RightWrapper>
          </StyledToolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default AdminAppBar;
