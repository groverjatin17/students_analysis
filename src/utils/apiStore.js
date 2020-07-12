import fetch from "./fetch";
import endpoints from "./endpoints";

const fetchCountries = async () => {
  try {
    const resp = await fetch("GET", endpoints.fetchCountries);
    const countryArray = resp.map((country) => country.citizenship);
    console.log("fetchCountries -> countryArray", countryArray);
    return countryArray;
  } catch (e) {
    console.log(e);
  }
};

export { fetchCountries };
