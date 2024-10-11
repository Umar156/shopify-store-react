import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const customAxios = (endpoint, method, data = null, header = null) => {
  return new Promise((resolve, reject) => {
    axios({
      url: endpoint,
      method: method,
      data: data,
      headers: header
        ? header
        : {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jsonToken")}`,
          },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default customAxios;
