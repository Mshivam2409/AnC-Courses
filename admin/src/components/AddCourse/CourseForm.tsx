import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { InputLabel } from "@material-ui/core";

export default function PaymentForm(props: any) {
  const [semester, setSemester] = React.useState("");

  const handleChange = (event: any) => {
    setSemester(event.target.value);
    props.set({ ...props.state, offered: event.target.value });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Course Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Course Number"
            fullWidth
            onChange={(e) => {
              props.set({ ...props.state, number: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Course Department"
            fullWidth
            onChange={(e) => {
              props.set({ ...props.state, dept: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Credits"
            fullWidth
            onChange={(e) => {
              props.set({ ...props.state, credits: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="demo-simple-select-label">Semester</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={semester}
            onChange={handleChange}
            fullWidth
            placeholder="Semester"
          >
            <MenuItem value={"Odd"}>Odd</MenuItem>
            <MenuItem value={"Even"}>Even</MenuItem>
            <MenuItem value={"Odd & Even"}>Odd and Even</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Title"
            fullWidth
            onChange={(e) => {
              props.set({ ...props.state, title: e.target.value });
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
