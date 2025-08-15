import { create } from "zustand";

export const useStore = create((set) => ({
  // CREATE AUCTION PAGE STATE
  currentAuction: {
    title: "",
    description: "",
    startingBid: "",
    startDate: "",
    endDate: "",
    image: null,
    imagePreview: null,
  },

  loading: false,
  error: null,

  updateField: (field, value) =>
    set((state) => ({
      currentAuction: {
        ...state.currentAuction,
        [field]: value,
      },
    })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  resetForm: () =>
    set({
      currentAuction: {
        title: "",
        description: "",
        startingBid: "",
        startDate: "",
        endDate: "",
        image: null,
        imagePreview: null,
      },
      error: null,
    }),
}));
