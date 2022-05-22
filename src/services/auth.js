import axios from "axios";
import swal from "sweetalert2";

export const auth = async() => {
    if(!localStorage["token"]){
      return window.location.href = "/login"
    }
    try{
      let myData = await axios.get("/api/users/auth",{
        headers: {
          "x-auth-token": localStorage["token"],
        }
      })
      return myData.data;
    }
    catch(err){
      swal.fire({
        title: 'הטוקן לא תקין בבקשה התחבר שוב',
                    icon: 'error',
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5500,
      });
      localStorage.removeItem("token");
      return window.location.href = "/login";
    }   
  }