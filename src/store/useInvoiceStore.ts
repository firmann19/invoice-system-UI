import { create } from "zustand";
import { persist } from "zustand/middleware";

type Item = {
  code: string;
  name?: string;
  quantity: number;
  price?: number;
};

type State = {
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  items: Item[];

  setField: (data: Partial<State>) => void;
  setItems: (items: Item[]) => void;
  reset: () => void;
};

export const useInvoiceStore = create<State>()(
  persist(
    (set) => ({
      senderName: "",
      senderAddress: "",
      receiverName: "",
      receiverAddress: "",
      items: [],

      setField: (data) => set(data),
      setItems: (items) => set({ items }),

      reset: () =>
        set({
          senderName: "",
          senderAddress: "",
          receiverName: "",
          receiverAddress: "",
          items: [],
        }),
    }),
    {
      name: "invoice-storage",
    },
  ),
);
