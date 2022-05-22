import axios from "axios";

const url = "/api/";

export function login({ email, password }) {
  return axios.post(
    `${url}users/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
export function signup ({ user, email, password }) {
  return axios.post(`${url}users/add`,
  { user, email, password},
   {
    headers: { "Content-Type": "application/json"
   },
  })
}
