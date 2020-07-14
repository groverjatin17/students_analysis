import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import Drawer from "@material-ui/core/Drawer";

import fetch from "./utils/fetch";
import endpoints from "./utils/endpoints";
import Doughnut from "./components/doughnut";
import LineChart from "./components/LineChart";
import Stack from "./components/Stack";
import GeoMap from "./components/GeoMap";
import data from "./components/GeoChart.world.geo.json";
// import Worldmap from './components/WorldMap'
import Switch from "./components/Switch";
import { color } from "d3";
import "./dashboard.css";
import AgeBarGraphs from "./components/AgeBarGraph";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";

import {
  fetchCountries,
  fetchFaculties,
  fetchJsonCountries,
  fetchGrad,
  fetchUnderGrads,
  fetchStudentsByYear,
  fetchStudentsByAge,
  fetchGendersByCountry,
} from "./utils/apiStore";

import DoughnutChart from "./components/DoughnutChart";

const useStyles = makeStyles((theme) => ({
  gridMain: {
    padding: "16px",
  },
  sidebar: {
    width: 300,
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const [country, setCountry] = useState("");
  const [faculty, setFaculty] = useState("");
  const [countries, setCountries] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [genders, setGenders] = useState([]);
  const [studentsByYearArray, setStudentsByYears] = useState([]);
  const [GradUnderGradArray, setGradUnderGrad] = useState([]);
  const [grads, setGrads] = useState([]);
  const [underGrads, setUndergrads] = useState([]);
  const [JsonCountries, setJsonCountries] = useState([]);
  const [GradData, setGradData] = useState(null);
  const [color, setColor] = useState("");
  const [studentsByAge, setStudentsByAge] = useState([]);

  useEffect(() => {
    fetchCountries(setCountries);
    fetchFaculties(setFaculties);
    fetchJsonCountries(setJsonCountries);
    fetchGrad(setGrads);
    fetchUnderGrads(setUndergrads);
    fetchStudentsByYear(setStudentsByYears);
    fetchStudentsByAge(setStudentsByAge);
  }, []);

  useEffect(() => {
    // TODO: Check why are we changing state of setSTudentByAge rather than by country
    const fetchAgeByCountry = async () => {
      const body = {
        country,
      };
      const resp = await fetch("POST", endpoints.fetchAgeByCountry, body);
      console.log(resp);
      var array = [];

      resp.map((student) => {
        var a = { group: "10-20", value: student.age10to20 };
        array.push(a);
        var b = { group: "20-30", value: student.age20to30 };
        array.push(b);
        var c = { group: "30-40", value: student.age30to40 };
        array.push(c);
        var d = { group: "40-50", value: student.age40to50 };
        array.push(d);
        var e = { group: "50-60", value: student.age50to60 };
        array.push(e);
      });
      console.log(array);
      setStudentsByAge(array);
    };

    fetchGendersByCountry(setGenders, country);
    // TODO: Function called here
    // fetchAgeByCountry();
  }, [country]);

  useEffect(() => {
    const fetchGenderByFaculty = async () => {
      const body = {
        faculty,
      };
      console.log(body);
      const resp = await fetch("POST", endpoints.fetchGenderByFaculty, body);
      console.log(resp);
      const genders = resp.map((gender) => ({
        value: gender.count,
        name: gender.gender,
      }));
      setGenders(genders);
    };

    const fetchAgeByFaculty = async () => {
      const body = {
        faculty,
      };
      console.log(body);
      const resp = await fetch("POST", endpoints.fetchAgeByFaculty, body);
      console.log(resp);
      var array = [];

      resp.map((student) => {
        var a = { group: "10-20", value: student.age10to20 };
        array.push(a);
        var b = { group: "20-30", value: student.age20to30 };
        array.push(b);
        var c = { group: "30-40", value: student.age30to40 };
        array.push(c);
        var d = { group: "40-50", value: student.age40to50 };
        array.push(d);
        var e = { group: "50-60", value: student.age50to60 };
        array.push(e);
      });
      console.log(array);
      setStudentsByAge(array);
    };

    if (country === "") fetchGenderByFaculty();
    // fetchAgeByFaculty();
  }, [country, faculty]);

  useEffect(() => {
    // TODO: Check why are we changing state of the fetchAgeByFacultyAndCountry in AgeByFaculty
    const fetchAgeByFacultyAndCountry = async () => {
      const body = {
        faculty,
        country,
      };
      console.log(body);

      const resp = await fetch(
        "POST",
        endpoints.fetchAgeByFacultyAndCountry,
        body
      );
      console.log(resp);
      var array = [];

      resp.map((student) => {
        var a = { group: "10-20", value: student.age10to20 };
        array.push(a);
        var b = { group: "20-30", value: student.age20to30 };
        array.push(b);
        var c = { group: "30-40", value: student.age30to40 };
        array.push(c);
        var d = { group: "40-50", value: student.age40to50 };
        array.push(d);
        var e = { group: "50-60", value: student.age50to60 };
        array.push(e);
      });
      console.log(array);
      setStudentsByAge(array);
    };

    const fetchGenderByFacultyAndCountry = async () => {
      const body = {
        faculty,
        country,
      };
      console.log(body);

      const resp = await fetch(
        "POST",
        endpoints.fetchGenderByFacultyAndCountry,
        body
      );
      console.log(resp);
      var array = [];

      const genders = resp.map((gender) => ({
        name: gender.gender,
        value: gender.count,
      }));
      setGenders(genders);
    };

    if (country && faculty) fetchGenderByFacultyAndCountry();

    // TODO: Check  fetchAgeByFacultyAndCountry being called here
    // if (faculty && country) fetchAgeByFacultyAndCountry();
  }, [country, faculty]);

  const handleCountryChange = async (event, country) => {
    setCountry(country);
    props.setOpenDrawer(false);
  };
  const handleFacultiesChange = async (event, fac) => {
    setFaculty(fac);
    props.setOpenDrawer(false);
  };
  const handleChangeData = (d, color) => {
    setGradData(d);
    setColor(color);
  };

  const sidebarItems = () => (
    <div className={classes.sidebar}>
      <List>
        <ListItem button key={"filters"}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Filters" />
        </ListItem>
        <Divider />
        <ListItem button key="country-filter">
          <Autocomplete
            id="country-selector"
            options={countries}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Country" variant="outlined" />
            )}
            onChange={handleCountryChange}
          />
        </ListItem>
        <Divider />
        <ListItem button key="faculties-filter">
          <Autocomplete
            id="faculties-selector"
            options={faculties}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Faculties" variant="outlined" />
            )}
            onChange={handleFacultiesChange}
          />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Drawer
        anchor="left"
        open={props.openDrawer}
        onClose={() => props.setOpenDrawer(false)}
      >
        {sidebarItems()}
      </Drawer>
      <Box p={2}>
        <Card>
          <Grid
            container
            classes={{ root: classes.gridMain }}
            alignItems="center"
            justify="center"
            spacing={4}
          >
            <Grid>
              <GeoMap data={data} api={JsonCountries} />
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box display="flex" p={2}>
        <Card>
          <Grid
            container
            classes={{ root: classes.gridMain }}
            alignItems="center"
            justify="center"
            spacing={4}
          >
            <Grid item>
              <DoughnutChart data={genders} />
              <Typography variant="h5" gutterBottom>
                Students/Gender ratio
              </Typography>
            </Grid>
          </Grid>
        </Card>
        <Card>
          <Grid
            container
            classes={{ root: classes.gridMain }}
            alignItems="center"
            justify="center"
            spacing={4}
          >
            <Grid>
              <AgeBarGraphs data={studentsByAge} />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </div>
  );
};

export default Dashboard;
