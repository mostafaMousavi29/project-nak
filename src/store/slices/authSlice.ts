import { StateCreator } from "zustand";
import axios from "axios";
import { api } from "../../api";

type User = { userName: string };

export interface AuthSlice {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (payload: { userName: string; password: string }) => Promise<void>;
  signup: (payload: {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async ({ userName, password }) => {
    set({ loading: true, error: null });
    try {
      const candidates = [
        "https://nak-interview.darkube.app/auth/login",
        "https://nak-interview.darkube.app/api/auth/login",
      ];

      let finalRes = null;
      for (const path of candidates) {
        console.log("[DEBUG] trying path:", path);
        try {
          const res = await axios.post(
            path,
            { userName, password },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              validateStatus: () => true,
            }
          );
          console.log("[DEBUG] response for", path, res.status, res.data);
          if (res.status === 200 || res.status === 201) {
            finalRes = { res, path };
            break;
          }
        } catch (e: any) {
          console.error("[DEBUG] axios error for", path, e);
        }
      }

      if (finalRes) {
        const res = finalRes.res;
        set({
          user: { userName },
          token: res.data.access_token ?? res.data.token ?? null,
          loading: false,
        });
      } else {
        set({ error: "Login failed (see console)", loading: false });
      }
    } catch (err: any) {
      console.error("[DEBUG] outer catch", err);
      set({ error: err?.message || "Login failed", loading: false });
    }
  },

  signup: async ({ firstName, lastName, userName, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        `https://nak-interview.darkube.app/${api.auth.signup.defaultMethod}`,
        { firstName, lastName, userName, password }
      );
      set({ user: { userName }, token: res.data.access_token, loading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Signup failed",
        loading: false,
      });
    }
  },

  logout: () => set({ user: null, token: null }),
});
