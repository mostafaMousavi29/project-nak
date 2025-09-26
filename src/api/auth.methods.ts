import { ApiMethodDictionary } from "./types/api-methods.type";

const authMethods: ApiMethodDictionary = {
  login: {
    defaultMethod: "/auth/login",
    httpMethod: "POST",
    showSnackbar: false,
    authorized: false,
  },
  signup: {
    defaultMethod: "/auth/signup",
    httpMethod: "POST",
    showSnackbar: false,
    authorized: false,
  },
};

export default authMethods;
