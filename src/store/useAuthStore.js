import { create } from "zustand";

export const useStore = create((set) => ({
  // TEMPORARY
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
