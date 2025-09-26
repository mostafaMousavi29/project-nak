import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice, AuthSlice } from "./slices/authSlice";
import { createProductSlice, ProductSlice } from "./slices/productSlice";
import { createAttributeSlice, AttributeSlice } from "./slices/attributesSlice";
import { createSkuSlice, SkuSlice } from "./slices/skuSlice";

type RootState = AuthSlice & ProductSlice & AttributeSlice & SkuSlice;

const useStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createProductSlice(...a),
      ...createAttributeSlice(...a),
      ...createSkuSlice(...a),
    }),
    { name: "root-storage" }
  )
);

export default useStore;
export { useStore };
