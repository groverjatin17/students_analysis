const baseURL = "http://localhost:5000/";
export default {
  fetchCountries: `${baseURL}country`,
  fetchStudentsByYear: `${baseURL}students`,
  fetchGenders: `${baseURL}genders`,
  fetchAge: `${baseURL}ages`,
  fetchLevel: `${baseURL}level`,
  fetchResidency: `${baseURL}residency`,
  fetchPtFt: `${baseURL}pt_ft`,
  fetchFaculty: `${baseURL}faculty`,
  fetchGenderByCountry: `${baseURL}country/genders`,
  fetchGradUnderGrad: `${baseURL}gradundergrad`,
  fetchUnderGrad: `${baseURL}undergrad`,
  fetchGrad: `${baseURL}grad`,
  fetchStudentsByAge: `${baseURL}studentsbyage`,
  fetchAgeByCountry: `${baseURL}country/age`,
  fetchAgeByFaculty: `${baseURL}faculty/age`,
  fetchGenderByFaculty: `${baseURL}faculties/genders`,
  fetchAgeByFacultyAndCountry: `${baseURL}facultyandcountry/age`,
  fetchGenderByFacultyAndCountry: `${baseURL}facultyandcountry/gender`,
  fetchFaculties: `${baseURL}faculties`,
  fetchAgeByFacultyAndCountryAndGender: `${baseURL}facultyandcountryandgender/age`,
  fetchAgeByGender: `${baseURL}gender/age`,
  fetchApi: `${baseURL}api`,
};
