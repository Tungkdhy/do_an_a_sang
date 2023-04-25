import axios from "axios";
const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/vinorsoft/aicamera/v1.0/",
    headers: {
        "content-type":'multipart/form-data'
    },
  });

export default axiosClient