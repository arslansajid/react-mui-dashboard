import React from "react";
import PieChart from "../components/PieChart";
import BarGraph from "../components/BarGraph";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "calc(100vh - 132px)",
    padding: theme.spacing(4),
  },
}));

const Graphs = ({ orders }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.paper} container>
      <Grid item xs={6}>
        <PieChart data={orders} />
      </Grid>
      <Grid item xs={6}>
        <BarGraph data={orders} />
      </Grid>
    </Grid>
  );
};

export default Graphs;
