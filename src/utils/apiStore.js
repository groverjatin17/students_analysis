import fetch from "./fetch";
import endpoints from "./endpoints";

const fetchStudentsByAge = async (setStudentsByAge) => {
  const resp = await fetch("GET", endpoints.fetchStudentsByAge);
  let studentsByAgeArray = [];
  Object.entries(resp[0]).forEach(([key, value]) => {
    let tempObj = {};
    tempObj.group = `${key.substring(3, 5)}-${key.substring(7)}`;
    tempObj.value = value;
    studentsByAgeArray.push(tempObj);
  });
  setStudentsByAge(studentsByAgeArray);
};

const fetchCountries = async (setCountries) => {
  try {
    const resp = await fetch("GET", endpoints.fetchCountries);
    const countryArray = resp.map((country) => country.citizenship);
    setCountries(countryArray);
  } catch (e) {
    console.log(e);
  }
};

const fetchFaculties = async (setFaculties) => {
  try {
    const resp = await fetch("GET", endpoints.fetchFaculties);
    const facultiesArray = resp.map((faculties) => faculties.faculty);
    setFaculties(facultiesArray);
  } catch (e) {
    console.log(e);
  }
};

const fetchJsonCountries = async (setJsonCountries) => {
  try {
    const JsonCountry = await fetch("GET", endpoints.fetchApi);
    setJsonCountries(JsonCountry);
  } catch (e) {
    console.log(e);
  }
};

const fetchGrad = async (setGrads) => {
  try {
    const Grad = await fetch("GET", endpoints.fetchGrad);
    setGrads(Grad);
  } catch (e) {
    console.log(e);
  }
};

const fetchUnderGrads = async (setUndergrads) => {
  try {
    const UnderGrad = await fetch("GET", endpoints.fetchUnderGrad);
    setUndergrads(UnderGrad);
  } catch (e) {
    console.log(e);
  }
};

const fetchStudentsByYear = async (setStudentsByYears) => {
  try {
    const StudentsByYear = await fetch("GET", endpoints.fetchStudentsByYear);
    const students = StudentsByYear.map((student) => ({
      Enroll_Year: +student.Enroll_Year,
      total: student.total,
    }));
    setStudentsByYears(students);
  } catch (e) {
    console.log(e);
  }
};

const fetchGendersByCountry = async (setGenders, country) => {
  const body = {
    country,
  };
  const resp = await fetch("POST", endpoints.fetchGenderByCountry, body);
  const genders = resp.map((gender) => ({
    name: gender.gender,
    value: gender.count,
  }));
  setGenders(genders);
};

export {
  fetchCountries,
  fetchFaculties,
  fetchJsonCountries,
  fetchGrad,
  fetchUnderGrads,
  fetchStudentsByYear,
  fetchStudentsByAge,
  fetchGendersByCountry,
};
