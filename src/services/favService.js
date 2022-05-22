import axios from "axios";

const url = "/api/";

export function favOfUser() {
    return axios.get(
      `${url}favorites/ofUser`,
      {
        headers: {
            "x-auth-token": localStorage["token"],
        },
      }
    );
  }
export function favDeleteUser(id) {
    return axios.delete(
      `${url}favorites/delete/${id}`,
      {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
      }
    );
  }
export function addFav(subId) {
    return axios.post(
      `${url}favorites/add`,
      subId,
      {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
      }
    );
  }
  