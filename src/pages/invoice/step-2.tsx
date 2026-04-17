import { useRouter } from "next/router";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";

export default function Step2() {
  const router = useRouter();
  const hydrated = useHydration();

  const { items, setItems } = useInvoiceStore();

  const addItem = () => {
    setItems([...items, { code: "", quantity: 1 }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    (updated as any)[index][field] = value;
    setItems(updated);
  };

  if (!hydrated) return null;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Step 2 - Data Barang</h1>

      {items.map((item, idx) => (
        <div key={idx} className="border p-3 space-y-2">
          <input
            placeholder="Kode Barang"
            className="border p-2 w-full"
            value={item.code}
            onChange={(e) => updateItem(idx, "code", e.target.value)}
          />

          <input
            type="number"
            placeholder="Qty"
            className="border p-2 w-full"
            value={item.quantity}
            onChange={(e) =>
              updateItem(idx, "quantity", Number(e.target.value))
            }
          />
        </div>
      ))}

      <button onClick={addItem} className="bg-gray-200 px-3 py-2">
        + Tambah Item
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => router.push("/invoice/step-1")}
          className="border px-4 py-2"
        >
          Back
        </button>

        <button
          onClick={() => router.push("/invoice/step-3")}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
