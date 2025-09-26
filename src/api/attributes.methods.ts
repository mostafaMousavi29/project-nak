import { ApiMethodDictionary } from "./types/api-methods.type";

const attributesMethods: ApiMethodDictionary = {
  create: {
    defaultMethod: "/attributes",
    httpMethod: "POST",
    authorized: true,
    showSnackbar: false,
  },
  list: {
    defaultMethod: "/attributes",
    httpMethod: "GET",
    authorized: true,
    showSnackbar: true,
  },
  getById: {
    defaultMethod: "/attributes/{id}",
    httpMethod: "GET",
    authorized: true,
    showSnackbar: true,
  },
};

export default attributesMethods