import axios from "axios";

const url = "/api/";

export function getSubs() {
    return axios.get(
      `${url}subs`,
      {
        headers: {
            "x-auth-token": localStorage["token"],
        },
      }
    );
  }
export function searchSubs(sQ) {
    return axios.get(
      `${url}subs/search/?q=${sQ}`
    );
  }
export function subsOfUser() {
    return axios.get(
      `${url}subs/ofUser`,{
        headers: {
            "x-auth-token": localStorage["token"],
          },
      }
    );
  }
export function subsEdit(f) {
    return axios.put(
      `${url}subs/edit`,f,{
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage["token"],
          },
      }
    );
  }
  
export function subsDelete(id) {
    return axios.delete(
      `${url}subs/delete/${id}`,{
        headers: {
            "x-auth-token": localStorage["token"],
          },
      }
    );
  }
export function subsAdd({ name, email, profession, seniority, info, location,
links }) {
    return axios.post(
      `${url}subs/add`,
      { name, email, profession, seniority, info, location, links },
      {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage["token"],
          },
      }
    );
  }