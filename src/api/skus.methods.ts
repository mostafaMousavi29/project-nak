// src/api/v1/skus.methods.ts
import { ApiMethodDictionary } from "./types/api-methods.type";

const skusMethods: ApiMethodDictionary = {
  create: {
    defaultMethod: "/skus",
    httpMethod: "POST",
    showSnackbar: true,
    authorized: true,
  },
  list: {
    defaultMethod: "/skus",
    httpMethod: "GET",
    showSnackbar: false,
    authorized: true,
  },
  update: {
    defaultMethod: "/skus/{id}",
    httpMethod: "PATCH",
    showSnackbar: true,
    authorized: true,
  },
  get: {
    defaultMethod: "/skus/{id}",
    httpMethod: "GET",
    showSnackbar: false,
    authorized: true,
  },
};

export default skusMethods;
