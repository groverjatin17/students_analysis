import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import GeoMap from "./components/GeoMap";
import data from "./components/GeoChart.world.geo.json";
import DoughnutChart from "./components/DoughnutChart";
import BarGraphForAge from "./components/BarGraphForAge";

import FilterBar from "./filters";

import {
  fetchCountries,
  fetchFaculties,
  fetchJsonCountries,
  // fetchGrad,
  // fetchUnderGrads,
  // fetchStudentsByYear,
  // fetchStudentsByAge,
  // fetchGendersByCountry,
  // fetchGenderByFaculty,
  // fetchAgeByCountry,
  // fetchAgeByFaculty,
  // fetchGenderByFacultyAndCountry,
  // fetchAgeByFacultyAndCountry,
  // fetchAgeByGender,
  fetchAge,
  fetchGenders,
} from "./utils/apiStore";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function DashboardMain(props) {
  const classes = useStyles();

  const [countryFilter, setCountryFilter] = useState([]);
  const [facultyFilter, setFacultyFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);
  const [gradStatusFilter, setGradStatusFilter] = useState([]);

  const [countries, setCountries] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [gendersData, setGendersData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  //   const [studentsByYearArray, setStudentsByYears] = useState([]);
  //   const [GradUnderGradArray, setGradUnderGrad] = useState([]);
  //   const [grads, setGrads] = useState([]);
  //   const [underGrads, setUndergrads] = useState([]);
  const [JsonCountries, setJsonCountries] = useState([]);
  //   const [GradData, setGradData] = useState(null);
  //   const [color, setColor] = useState("");
  //   const [studentsByAge, setStudentsByAge] = useState([]);
  const [graduationStatus, setGraduationStatus] = useState(false);
  //   const [genderFilter, setGenderFilter] = useState(null);

  const FilterBarProps = {
    setGenderFilter,
    setCountryFilter,
    countries,
    faculties,
    setFacultyFilter,
    setYearFilter,
    setGradStatusFilter,
  };

  useEffect(() => {
    fetchCountries(setCountries);
    fetchFaculties(setFaculties);
    fetchJsonCountries(setJsonCountries);
    // fetchGrad(setGrads);
    // fetchUnderGrads(setUndergrads);
    // fetchStudentsByYear(setStudentsByYears);
    // fetchStudentsByAge(setStudentsByAge);
  }, []);

  useEffect(() => {
    console.log("In useEffect Filter");

    // fetchGenders(
    //   setGendersData,
    //   countryFilter,
    //   facultyFilter,
    //   genderFilter,
    //   yearFilter,
    //   gradStatusFilter
    // );

    fetchAge(
      setAgeData,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );
  }, [
    countryFilter,
    facultyFilter,
    genderFilter,
    yearFilter,
    gradStatusFilter,
  ]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <FilterBar {...FilterBarProps} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
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
        <DoughnutChart data={gendersData} />
        <BarGraphForAge data={ageData} />
      </main>
    </div>
  );
}
