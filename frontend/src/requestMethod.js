import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjAxYTRlMDQzYTI0MDJhMWNlOTE2OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzY4ODQ0MiwiZXhwIjoxNjMzOTQ3NjQyfQ.nXoCuZNvo6RM_I9X6A_8sR1ONbQT2MfqugvMxxbfY_A";

 export const  publicRequest = axios.create({
     baseURL: BASE_URL,
 })
 export const  userRequest = axios.create({
     baseURL: BASE_URL,
     headers:{ token: `Bearer ${TOKEN}`}
 })
