import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookie.remove("access_token");
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Orders List</Link>
          </Typography>
          <Grid>
            {location.pathname === "/" ? (
              <Link to="/graphs">
                <Button color="inherit">Chart</Button>
              </Link>
            ) : (
              <Link to="/">
                <Button color="inherit">Table</Button>
              </Link>
            )}
            <Button onClick={handleLogout} color="inherit">
              Log Out
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
