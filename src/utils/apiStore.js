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
  console.log("fetching genders only by country");

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

const fetchGenderByFaculty = async (setGenders, faculty) => {
  const body = {
    faculty,
  };
  const resp = await fetch("POST", endpoints.fetchGenderByFaculty, body);
  const genders = resp.map((gender) => ({
    name: gender.gender,
    value: gender.count,
  }));
  console.log("TCL: fetchGenderByFaculty -> genders", genders);
  setGenders(genders);
};

const fetchAgeByCountry = async (setStudentsByAge, country) => {
  const body = {
    country,
  };
  const resp = await fetch("POST", endpoints.fetchAgeByCountry, body);
  let studentsByAgeArray = [];
  Object.entries(resp[0]).forEach(([key, value]) => {
    let tempObj = {};
    tempObj.group = `${key.substring(3, 5)}-${key.substring(7)}`;
    tempObj.value = value;
    studentsByAgeArray.push(tempObj);
  });
  setStudentsByAge(studentsByAgeArray);
};

const fetchAgeByFaculty = async (setStudentsByAge, faculty) => {
  const body = {
    faculty,
  };
  const resp = await fetch("POST", endpoints.fetchAgeByFaculty, body);
  let studentsByAgeArray = [];
  Object.entries(resp[0]).forEach(([key, value]) => {
    let tempObj = {};
    tempObj.group = `${key.substring(3, 5)}-${key.substring(7)}`;
    tempObj.value = value;
    studentsByAgeArray.push(tempObj);
  });
  setStudentsByAge(studentsByAgeArray);
};

const fetchGenderByFacultyAndCountry = async (setGenders, faculty, country) => {
  const body = {
    faculty,
    country,
  };
  const resp = await fetch(
    "POST",
    endpoints.fetchGenderByFacultyAndCountry,
    body
  );
  const genders = resp.map((gender) => ({
    name: gender.gender,
    value: gender.count,
  }));
  setGenders(genders);
};

const fetchAgeByFacultyAndCountry = async (
  setStudentsByAge,
  faculty,
  country
) => {
  const body = {
    faculty,
    country,
  };
  const resp = await fetch("POST", endpoints.fetchAgeByFacultyAndCountry, body);
  let studentsByAgeArray = [];
  Object.entries(resp[0]).forEach(([key, value]) => {
    let tempObj = {};
    tempObj.group = `${key.substring(3, 5)}-${key.substring(7)}`;
    tempObj.value = value;
    studentsByAgeArray.push(tempObj);
  });
  setStudentsByAge(studentsByAgeArray);
};

const fetchAgeByFaAndCoAndGe = async (
  setStudentsByAge,
  faculty,
  country,
  gender
) => {
  const body = {
    faculty,
    country,
    gender,
  };
  const resp = await fetch(
    "POST",
    endpoints.fetchAgeByFacultyAndCountryAndGender,
    body
  );
  console.log("TCL: resp", resp);
  // let studentsByAgeArray = [];
  // Object.entries(resp[0]).forEach(([key, value]) => {
  //   let tempObj = {};
  //   tempObj.group = `${key.substring(3, 5)}-${key.substring(7)}`;
  //   tempObj.value = value;
  //   studentsByAgeArray.push(tempObj);
  // });
  // setStudentsByAge(studentsByAgeArray);
};

const fetchAgeByGender = async (setStudentsByAge, gender) => {
  let newValue = "";
  if (gender === "Male") {
    newValue = "M";
  } else if (gender === "Female") {
    newValue = "F";
  } else if (gender === "Non-Binary") {
    newValue = "N";
  }

  const body = {
    gender: newValue,
  };

  const resp = await fetch("POST", endpoints.fetchAgeByGender, body);
  let studentsByAgeArray = [];
  Object.entries(resp[0]).forEach(([key, value]) => {
    let tempObj = {};
    tempObj.group = `${key.substring(3, 5)}-${key.substring(7)}`;
    tempObj.value = value;
    studentsByAgeArray.push(tempObj);
  });
  setStudentsByAge(studentsByAgeArray);
};

const fetchGenders = async (
  setGendersData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };
  console.log("TCL: body", body);

  const resp = await fetch("POST", endpoints.fetchGenders, body);
  console.log("TCL: fetchGender -> resp", resp);
  // let studentsByAgeArray = [];
  // Object.entries(resp[0]).forEach(([key, value]) => {
  //   let tempObj = {};
  //   tempObj.group = `${key.substring(3, 5)}-${key.substring(7)}`;
  //   tempObj.value = value;
  //   studentsByAgeArray.push(tempObj);
  // });

  setGendersData(resp);
};

const fetchAge = async (
  setAgeData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };
  console.log("TCL: body", body);

  const resp = await fetch("POST", endpoints.fetchAge, body);
  console.log("TCL: fetchGender -> resp", resp);
  let studentsByAgeArray = [];
  Object.entries(resp[0]).forEach(([key, value]) => {
    let tempObj = {};
    tempObj.group = `${key.substring(3, 5)}-${key.substring(7)}`;
    tempObj.value = value;
    studentsByAgeArray.push(tempObj);
  });
  console.log("TCL: studentsByAgeArray", studentsByAgeArray);

  setAgeData(studentsByAgeArray);
};

const fetchLevel = async (
  setLevelData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };
  console.log("TCL: body", body);

  const resp = await fetch("POST", endpoints.fetchLevel, body);
  console.log("TCL: resp", resp);

  // setLevelData(studentsByAgeArray);
};

const fetchResidency = async (
  setResidencyData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };
  console.log("TCL: body", body);

  const resp = await fetch("POST", endpoints.fetchResidency, body);
  console.log("TCL: resp", resp);

  // setResidencyData(studentsByAgeArray);
};

const fetchPtFt = async (
  setPtFtData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };
  console.log("TCL: body", body);

  const resp = await fetch("POST", endpoints.fetchPtFt, body);
  console.log("TCL: resp", resp);

  // setPtFtData(studentsByAgeArray);
};

const fetchFaculty = async (
  setFacultyData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };
  console.log("TCL: body", body);

  const resp = await fetch("POST", endpoints.fetchFaculty, body);
  console.log("TCL: resp", resp);

  // setFacultyData(studentsByAgeArray);
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
  fetchGenderByFaculty,
  fetchAgeByCountry,
  fetchAgeByFaculty,
  fetchGenderByFacultyAndCountry,
  fetchAgeByFacultyAndCountry,
  fetchAgeByFaAndCoAndGe,
  fetchAgeByGender,
  fetchGenders,
  fetchAge,
  fetchLevel,
  fetchResidency,
  fetchPtFt,
  fetchFaculty,
};
