import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "components/shared/Copyright";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import urlBackend from "config/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function Change() {
  const classes = useStyles();
  const params: { token: string; username: string } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    Axios.post(
      urlBackend("secure/changePassword"),
      {
        username: params.username.trim(),
        password: password.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    )
      .then((resp) => {
        setLoading(false);
        history.push("/signin");
      })
      .catch(() => setLoading(false));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
            disabled={loading}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="/signin">Sign In</NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
