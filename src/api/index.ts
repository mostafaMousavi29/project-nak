import auth from "./auth.methods";
import products from "./product.methods";
import attributes from "./attributes.methods";
import skus from "././skus.methods";

export const BASE_URL = "https://nak-interview.darkube.app";

export const api = {
  auth,
  products,
  attributes,
  skus,
};
