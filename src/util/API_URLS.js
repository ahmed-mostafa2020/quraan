
const BASE = "https://watawanu.com/api/";

export const API_URLS = {
  BASE,
  REGISTER: BASE + "user/register",
  LOGIN: BASE + "user/login",
  LOGOUT: BASE + "user/logout",
  HOME: BASE + "home",
  ANSWER: BASE + "answer",
  RESULT: BASE + "result",

  HEADERGET: {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    redirect: 'follow'
  },
  HEADERPOST: {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: [],
    redirect: 'follow'
  },

};