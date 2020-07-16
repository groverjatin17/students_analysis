import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
// import Switch from "./components/Switch";
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
import { blue } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import BarGraphForAge from "./components/BarGraphForAge";

import {
  fetchCountries,
  fetchFaculties,
  fetchJsonCountries,
  fetchGrad,
  fetchUnderGrads,
  fetchStudentsByYear,
  fetchStudentsByAge,
  fetchGendersByCountry,
  fetchGenderByFaculty,
  fetchAgeByCountry,
  fetchAgeByFaculty,
  fetchGenderByFacultyAndCountry,
  fetchAgeByFacultyAndCountry,
  fetchAgeByGender,
  fetchAge,
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

const GraduationSwitch = withStyles({
  switchBase: {
    color: blue[500],
    "&$checked": {
      color: blue[500],
    },
    "&$checked + $track": {
      backgroundColor: blue[500],
      color: blue[500],
    },
  },
  checked: {},
  track: { backgroundColor: blue[500] },
})(Switch);

const Dashboard = (props) => {
  const classes = useStyles();
  const [country, setCountry] = useState(null);
  const [faculty, setFaculty] = useState(null);
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
  const [graduationStatus, setGraduationStatus] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);

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
    console.log("In Country", faculty);

    if (!faculty) fetchGendersByCountry(setGenders, country);
    if (!faculty && country !== "")
      fetchAgeByCountry(setStudentsByAge, country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    if (!country) fetchGenderByFaculty(setGenders, faculty);
    if (!country && !faculty) fetchAgeByFaculty(setStudentsByAge, faculty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faculty]);

  // useEffect(() => {
  //   //Use effect for Age
  //   // if ((!country) & (faculty === "")){
  //   //   fetchAgeByGender(setStudentsByAge, selectedGender);
  //   // }
  //   fetchAge(
  //     setStudentsByAge,
  //     faculty,
  //     country,
  //     selectedGender,
  //     graduationStatus
  //   );

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [country, faculty, selectedGender, graduationStatus]);

  useEffect(() => {
    //Use effect for Age
    if (!country & !faculty) {
      fetchAgeByGender(setStudentsByAge, selectedGender);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGender]);

  useEffect(() => {
    if (country && faculty)
      fetchGenderByFacultyAndCountry(setGenders, faculty, country);
    if (country && faculty)
      fetchAgeByFacultyAndCountry(setStudentsByAge, faculty, country);
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
          <ListItemText
            primary={
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
            }
          />
        </ListItem>
        <Divider />
        <ListItem button key="gender-filter">
          <Autocomplete
            id="gender-selector"
            options={["Male", "Female", "Non-Binary"]}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Gender" />}
            onChange={(_, value) => {
              setSelectedGender(value);
              props.setOpenDrawer(false);
            }}
            value={selectedGender}
          />
        </ListItem>
        <Divider />
        <ListItem button key="country-filter">
          <Autocomplete
            id="country-selector"
            options={countries}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Country" />}
            onChange={handleCountryChange}
            value={country}
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
              <TextField {...params} label="Faculties" />
            )}
            onChange={handleFacultiesChange}
            value={faculty}
          />
        </ListItem>
        <Divider />
        <ListItem button key="grad-filter">
          <FormControlLabel
            control={
              <GraduationSwitch
                checked={graduationStatus}
                onChange={() => setGraduationStatus((prevState) => !prevState)}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label={graduationStatus ? "Graduate" : "Undergraduate"}
          />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Grid>
        <Grid item xs={3}>
          <Drawer
            // anchor="left"
            // open={props.openDrawer}
            // onClose={() => props.setOpenDrawer(false)}
            variant="permanent"
          >
            {sidebarItems()}
          </Drawer>
        </Grid>
        <Grid item xs={8}>
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
                  <BarGraphForAge data={studentsByAge} />
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
