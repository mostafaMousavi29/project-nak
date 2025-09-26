import { StateCreator } from "zustand";
import axios from "axios";
import { api, BASE_URL } from "../../api";
// import { v4 as uuidv4 } from "uuid";
import { buildPath } from "../../api/helper";

export interface AttributeSlice {
  attributes: any[];
  attributeLoading: boolean;
  attributeError: string | null;
  createAttribute: (payload: {
    name: string;
    values: string[];
  }) => Promise<void>;
  fetchAttributes: () => Promise<void>;
  fetchAttributeById: (id: string) => Promise<any | null>;
}

export const createAttributeSlice: StateCreator<
  AttributeSlice & { token?: string | null },
  [],
  [],
  AttributeSlice
> = (set, get) => ({
  attributes: [],
  attributeLoading: false,
  attributeError: null,

  createAttribute: async (payload) => {
    set({ attributeLoading: true, attributeError: null });
    try {
      const token = (get() as any).token;
      const path = `https://nak-interview.darkube.app${api.attributes.create.defaultMethod}`;

      // const body = { id: uuidv4(), ...payload };
      const body = { ...payload };

      const res = await axios.post(path, body, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      set((state: any) => ({
        attributes: [...state.attributes, res.data],
        attributeLoading: false,
      }));
    } catch (err: any) {
      set({
        attributeError:
          err?.response?.data?.message ||
          err?.message ||
          "Create attribute failed",
        attributeLoading: false,
      });
    }
  },

  fetchAttributes: async () => {
    set({ attributeLoading: true, attributeError: null });
    try {
      const token = (get() as any).token;
      const path = `${BASE_URL}${api.attributes.list.defaultMethod}`;

      const res = await axios.get(path, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      set({ attributes: res.data, attributeLoading: false });
    } catch (err: any) {
      set({
        attributeError:
          err?.response?.data?.message ||
          err?.message ||
          "Fetch attributes failed",
        attributeLoading: false,
      });
    }
  },

  fetchAttributeById: async (id) => {
    set({ attributeLoading: true, attributeError: null });
    try {
      const token = (get() as any).token;
      const path = `${BASE_URL}${buildPath(
        api.attributes.getById.defaultMethod,
        { id }
      )}`;

      const res = await axios.get(path, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      set({ attributeLoading: false });
      return res.data;
    } catch (err: any) {
      set({
        attributeError:
          err?.response?.data?.message ||
          err?.message ||
          "Fetch attribute failed",
        attributeLoading: false,
      });
      return null;
    }
  },
});
