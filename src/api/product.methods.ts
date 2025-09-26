// src/api/v1/products.ts
import { ApiMethodDictionary } from "./types/api-methods.type";

const productMethods: ApiMethodDictionary = {
  list: {
    defaultMethod: "/products",
    httpMethod: "GET",
    showSnackbar: false,
    authorized: true,
  },
  create: {
    defaultMethod: "/products",
    httpMethod: "POST",
    showSnackbar: true,
    authorized: true,
  },
  get: {
    defaultMethod: "/products/{id}",
    httpMethod: "GET",
    showSnackbar: false,
    authorized: true,
  },
  update: {
    defaultMethod: "/products/{id}",
    httpMethod: "PATCH",
    showSnackbar: true,
    authorized: true,
  },
  delete: {
    defaultMethod: "/products/{id}",
    httpMethod: "DELETE",
    showSnackbar: true,
    authorized: true,
  },
};

export default productMethods;
