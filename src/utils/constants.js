// eslint-disable-next-line no-unused-vars
const local = "http://localhost:3000"
const api = "https://api.belich.students.nomoreparties.xyz"

export const apiOptions = {
  baseUrl: "https://api.belich.students.nomoreparties.xyz",
  headers: function (token) {
    return {
      'authorization': token,
      "Content-Type": "application/json"
    }
  },
};

export const authOptions = {
  BASE_URL: api,
  headers: {
    "Content-Type": "application/json"
  },
};

