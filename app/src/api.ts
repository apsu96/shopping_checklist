import axios from "axios";
import store from "./Store";

const API_URL = process.env.REACT_APP_API_URL;
const COOKIE_NAME = process.env.REACT_APP_CSRF_TOKEN_NAME;

axios.defaults.xsrfCookieName = COOKIE_NAME;
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

let token = "";

export async function getUser() {
  try {
    const res = await axios.get(API_URL + "get_user/");
    if (res.data.username) {
      store.setUser(res.data.username);
    }
    // const cookies = document.cookie.split(";");
    // let result = "";
    // cookies.map((c) => {
    //   const cookie = c.trim();
    //   if (cookie.substring(0, COOKIE_NAME?.length) === COOKIE_NAME) {
    //     const res = cookie.substring(COOKIE_NAME.length + 1);
    //     if (res[-1] === ";") {
    //       result = decodeURIComponent(res.substring(0, res.length - 1));
    //     } else {
    //       result = decodeURIComponent(res);
    //     }
    //     return null;
    //   } else {
    //     return null;
    //   }
    // });
    // axios.defaults.headers.common["X-CSRFToken"] = result;
    // token = result;
  } catch (err) {
    console.log(err);
  }
}

export function signIn(username: string, password: string) {
  return axios
    .post(API_URL + "signin/", {
      username: username,
      password: password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}
