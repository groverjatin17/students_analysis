const baseURL = "http://140.184.230.103:5000/";
export default {
  fetchCountries: `${baseURL}country`,
  fetchStudentsByYear: `${baseURL}students`,
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
  

  fetchApi: `${baseURL}api`  
};
