// src/store/slices/skuSlice.ts
import { StateCreator } from "zustand";
import axios from "axios";
import { api, BASE_URL } from "../../api";
import { buildPath } from "../../api/helper";

export type SKU = {
  id?: string;
  sku?: string;
  title?: string;
  price?: number;
  stock?: number;
  [key: string]: any;
};

export interface SkuSlice {
  skus: SKU[];
  skuLoading: boolean;
  skuError: string | null;
  createSku: (payload: Partial<SKU>) => Promise<SKU | null>;
  fetchSkus: () => Promise<void>;
  updateSku: (id: string, payload: Partial<SKU>) => Promise<SKU | null>;
  fetchSkuById: (id: string) => Promise<SKU | null>;
}

export const createSkuSlice: StateCreator<
  SkuSlice & { token?: string | null }
> = (set, get) => ({
  skus: [],
  skuLoading: false,
  skuError: null,

  createSku: async (payload) => {
    set({ skuLoading: true, skuError: null });
    try {
      const token = (get() as any).token;
      const path = `${BASE_URL}${api.skus.create.defaultMethod}`;

      const res = await axios.post(path, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      set((state: any) => ({
        skus: [...state.skus, res.data],
        skuLoading: false,
      }));
      return res.data;
    } catch (err: any) {
      set({
        skuError:
          err?.response?.data?.message || err?.message || "Create SKU failed",
        skuLoading: false,
      });
      return null;
    }
  },

  fetchSkus: async () => {
    set({ skuLoading: true, skuError: null });
    try {
      const token = (get() as any).token;
      const path = `${BASE_URL}${api.skus.list.defaultMethod}`;

      const res = await axios.get(path, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      set({ skus: res.data, skuLoading: false });
    } catch (err: any) {
      set({
        skuError:
          err?.response?.data?.message || err?.message || "Fetch SKUs failed",
        skuLoading: false,
      });
    }
  },

  updateSku: async (id, payload) => {
    set({ skuLoading: true, skuError: null });
    try {
      const token = (get() as any).token;
      const relative = buildPath(api.skus.update.defaultMethod, { id });
      const path = `${BASE_URL}${relative}`;

      const res = await axios.patch(path, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      set((state: any) => ({
        skus: state.skus.map((s: any) => (s.id === id ? res.data : s)),
        skuLoading: false,
      }));

      return res.data;
    } catch (err: any) {
      set({
        skuError:
          err?.response?.data?.message || err?.message || "Update SKU failed",
        skuLoading: false,
      });
      return null;
    }
  },

  fetchSkuById: async (id) => {
    set({ skuLoading: true, skuError: null });
    try {
      const token = (get() as any).token;
      const relative = buildPath(api.skus.get.defaultMethod, { id });
      const path = `${BASE_URL}${relative}`;

      const res = await axios.get(path, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      set({ skuLoading: false });
      return res.data;
    } catch (err: any) {
      set({
        skuError:
          err?.response?.data?.message || err?.message || "Fetch SKU failed",
        skuLoading: false,
      });
      return null;
    }
  },
});
