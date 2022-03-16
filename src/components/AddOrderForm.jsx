import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { addOrder } from "../helpers/api";
import { StatusOptions } from "../helpers/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddOrderForm(props) {
  const { onClose } = props;
  const classes = useStyles();

  const [seller, setSeller] = useState("");
  const [revenue, setRevenue] = useState("");
  const [status, setStatus] = useState("");

  const handleformSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      seller,
      revenue,
      status,
      date: new Date(),
    };
    addOrder(reqBody)
      .then((res) => {
        console.log(res);
        onClose();
        alert("Order added successfully");
      })
      .catch(() => {
        alert("Error while adding Order ...");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add New Order
        </Typography>
        <form className={classes.form} onSubmit={handleformSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Seller"
            name="seller"
            autoFocus
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Revenue"
            name="revenue"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
          <TextField
            select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="status"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {StatusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
}
