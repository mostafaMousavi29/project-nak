// src/store/slices/productSlice.ts
import { StateCreator } from "zustand";
import axios from "axios";
import { api, BASE_URL } from "../../api";
import { buildPath } from "../../api/helper";

export type Product = {
  id?: string | number
  name: string
  skusIds: string[]
  attributes: { name: string; values: string[] }[]
}


export interface ProductSlice {
  products: Product[];
  productLoading: boolean;
  productError: string | null;

  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string | number) => Promise<Product | null>;
  createProduct: (payload: Partial<Product>) => Promise<Product | null>;
  updateProduct: (
    id: string | number,
    payload: Partial<Product>
  ) => Promise<Product | null>;
  deleteProduct: (id: string | number) => Promise<boolean>;
}

export const createProductSlice: StateCreator<
  ProductSlice & { token?: string | null }
> = (set, get) => ({
  products: [],
  productLoading: false,
  productError: null,

  fetchProducts: async () => {
    set({ productLoading: true, productError: null });
    try {
      const token = (get() as any).token;
      const path = `${BASE_URL}${api.products.list.defaultMethod}`;
      const res = await axios.get(path, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      set({ products: res.data, productLoading: false });
    } catch (err: any) {
      set({
        productError:
          err?.response?.data?.message ||
          err?.message ||
          "Fetch products failed",
        productLoading: false,
      });
    }
  },

  fetchProductById: async (id) => {
    set({ productLoading: true, productError: null });
    try {
      const token = (get() as any).token;
      const relative = buildPath(api.products.get.defaultMethod, { id });
      const path = `${BASE_URL}${relative}`;
      const res = await axios.get(path, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      set({ productLoading: false });
      return res.data;
    } catch (err: any) {
      set({
        productError:
          err?.response?.data?.message ||
          err?.message ||
          "Fetch product failed",
        productLoading: false,
      });
      return null;
    }
  },

  createProduct: async (payload) => {
  set({ productLoading: true, productError: null });
  try {
    const token = (get() as any).token;
    const path = `${BASE_URL}${api.products.create.defaultMethod}`;
    
    const res = await axios.post(path, payload, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    set((state: any) => ({
      products: [...state.products, res.data],
      productLoading: false,
    }));

    return res.data;
  } catch (err: any) {
    set({
      productError:
        err?.response?.data?.message ||
        err?.message ||
        "Create product failed",
      productLoading: false,
    });
    return null;
  }
},


  updateProduct: async (id, payload) => {
    set({ productLoading: true, productError: null });
    try {
      const token = (get() as any).token;
      const relative = buildPath(api.products.update.defaultMethod, { id });
      const path = `${BASE_URL}${relative}`;
      const res = await axios.patch(path, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      set((state: any) => ({
        products: state.products.map((p: any) =>
          String(p.id) === String(id) ? res.data : p
        ),
        productLoading: false,
      }));
      return res.data;
    } catch (err: any) {
      set({
        productError:
          err?.response?.data?.message ||
          err?.message ||
          "Update product failed",
        productLoading: false,
      });
      return null;
    }
  },

  deleteProduct: async (id) => {
    set({ productLoading: true, productError: null });
    try {
      const token = (get() as any).token;
      const relative = buildPath(api.products.delete.defaultMethod, { id });
      const path = `${BASE_URL}${relative}`;
      const res = await axios.delete(path, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      set((state: any) => ({
        products: state.products.filter(
          (p: any) => String(p.id) !== String(id)
        ),
        productLoading: false,
      }));
      return true;
    } catch (err: any) {
      set({
        productError:
          err?.response?.data?.message ||
          err?.message ||
          "Delete product failed",
        productLoading: false,
      });
      return false;
    }
  },
});
