import { create } from "zustand";

const useQrState = create((set) => ({
  urlShort: "",
  updateUrl: null,
  setUrlShort: ({ value = "", status = null }) =>
    set({ urlShort: value, updateUrl: status }),
}));

export default useQrState;
