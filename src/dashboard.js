import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";

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

import { fetchCountries } from "./utils/apiStore";
import JatinDoughnut from "./components/JatinDoughnut";

const useStyles = makeStyles((theme) => ({
  gridMain: {
    padding: "16px",
  },
}));

const defaultGender = [
  {
    value: 0,
    label: "",
  },
];

const Dashboard = () => {
  const classes = useStyles();
  const [country, setCountry] = useState("");
  const [faculty, setFaculty] = useState("");
  const [countries, setCountries] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [genders, setGenders] = useState([]);
  const [StudentsByYearArray, setStudentsByYears] = useState([]);
  const [GradUnderGradArray, setGradUnderGrad] = useState([]);
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const [JsonCountries, setJsonCountries] = useState([]);
  const [GradData, setGradData] = useState(null);
  const [color, setColor] = useState("");
  const [studentsByAge, setStudentsByAge] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const resp = await fetch("GET", endpoints.fetchCountries);
        const countryArray = resp.map((country) => country.citizenship);
        setCountries(countryArray);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchFaculties = async () => {
      try {
        const resp = await fetch("GET", endpoints.fetchFaculties);
        const facultiesArray = resp.map((faculties) => faculties.faculty);
        setFaculties(facultiesArray);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchJsonCountries = async () => {
      try {
        const JsonCountry = await fetch("GET", endpoints.fetchApi);
        setJsonCountries(JsonCountry);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchGrad = async () => {
      try {
        const Grad = await fetch("GET", endpoints.fetchGrad);
        setdata1(Grad);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchUnderGrad = async () => {
      try {
        const UnderGrad = await fetch("GET", endpoints.fetchUnderGrad);
        setdata2(UnderGrad);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchStudentsByYear = async () => {
      try {
        const StudentsByYear = await fetch(
          "GET",
          endpoints.fetchStudentsByYear
        );
        const students = StudentsByYear.map((student) => ({
          Enroll_Year: +student.Enroll_Year,
          total: student.total,
        }));
        setStudentsByYears(students);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchStudentsByAge = async () => {
      const resp = await fetch("GET", endpoints.fetchStudentsByAge);
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
      setStudentsByAge(array);
    };

    fetchCountries();
    fetchFaculties();
    fetchJsonCountries();
    fetchGrad();
    fetchUnderGrad();
    fetchStudentsByYear();
    fetchStudentsByAge();
  }, []);

  useEffect(() => {
    const fetchGendersByCountry = async () => {
      const body = {
        country,
      };
      console.log(body);
      const resp = await fetch("POST", endpoints.fetchGenderByCountry, body);
      console.log(resp);
      const genders = resp.map((gender) => ({
        name: gender.gender,
        value: gender.count,
      }));
      console.log("fetchGendersByCountry -> genders", genders);

      setGenders(genders);
    };

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

    fetchGendersByCountry();
    fetchAgeByCountry();
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
        label: gender.gender,
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

    fetchGenderByFaculty();
    fetchAgeByFaculty();
  }, [faculty]);

  useEffect(() => {
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
        value: gender.count,
        label: gender.gender,
      }));
      setGenders(genders);
    };

    // if (country) fetchGendersByCountry();
    // if (country) fetchAgeByCountry();
    // if (country && faculty == false) fetchAgeByCountry();
    if (country && faculty) fetchGenderByFacultyAndCountry();
    // if (faculty) fetchGenderByFaculty();
    // if (faculty) fetchAgeByFaculty();
    // if (faculty && country == false) fetchAgeByFaculty();
    if (faculty && country) fetchGenderByFacultyAndCountry();
    if (faculty && country) fetchAgeByFacultyAndCountry();
  }, [countries, country, faculties, faculty]);

  console.log("Dashboard -> country", country);

  const handleCountryChange = async (event, country) => {
    setCountry(country);
  };
  const handleFacultiesChange = async (event, fac) => {
    console.log(fac);
    setFaculty(fac);
  };
  const handleChangeData = (d, color) => {
    setGradData(d);
    setColor(color);
  };

  console.log("fetchGenderByFacultyAndCountry -> genders", genders);

  return (
    <div>
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
            </Grid>
            {/* <Grid item>
              <Doughnut data={genders} />
            </Grid> */}
            <Grid item>
              <JatinDoughnut data={genders} />
            </Grid>
          </Grid>
          <Grid>
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

      <Box display="flex" p={2}>
        <Card>
          <button id="grad" onClick={() => handleChangeData(data1, "#f0fc03")}>
            Graduate
          </button>
          <button
            id="undergrad"
            onClick={() => handleChangeData(data2, "#0bfc03")}
          >
            UnderGraduate
          </button>
          <Grid
            container
            classes={{ root: classes.gridMain }}
            alignItems="center"
            justify="center"
            spacing={4}
          >
            <Grid item>
              <Switch data={GradData || data1} color={color || "f0fc03"} />
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
              <GeoMap data={data} api={JsonCountries} />
            </Grid>
          </Grid>
        </Card>
      </Box>

      <Box>
        <Card className="lineChart">
          <Grid
            container
            classes={{ root: classes.gridMain }}
            alignItems="center"
            justify="center"
            spacing={4}
          >
            <Grid item>
              <LineChart data={StudentsByYearArray} />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </div>
  );
};

export default Dashboard;
