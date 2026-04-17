import { useRouter } from "next/router";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";
import api from "@/lib/axios";
import { getUserRole } from "@/lib/role";
import { transformPayload } from "@/lib/transformPayload";

export default function Step3() {
  const router = useRouter();
  const hydrated = useHydration();

  const { senderName, receiverName, items } = useInvoiceStore();

  const { reset } = useInvoiceStore();

  const handleSubmit = async () => {
    try {
      const role = getUserRole();

      const state = useInvoiceStore.getState();

      const cleanedItems = state.items.filter(
        (item) => item.code && item.code.trim() !== "",
      );

      const payload = {
        sender_name: state.senderName,
        sender_address: state.senderAddress,
        receiver_name: state.receiverName,
        receiver_address: state.receiverAddress,
        items: transformPayload(cleanedItems, role),
      };

      await api.post("/invoices", payload);

      reset();

      alert("Invoice berhasil dibuat");
      router.push("/invoice/step-1");
    } catch (err) {
      console.error(err);
      alert("Gagal submit invoice");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!hydrated) return null;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold no-print">Step 3 - Review</h1>

      {/* INVOICE AREA (PRINTABLE) */}
      <div className="print-area border p-4 space-y-3">
        <h2 className="text-lg font-bold">INVOICE</h2>

        <div>
          <p>
            <b>Sender:</b> {senderName}
          </p>
          <p>
            <b>Receiver:</b> {receiverName}
          </p>
        </div>

        <hr />

        <div>
          <h3 className="font-bold">Items</h3>

          {items.length === 0 && <p className="text-gray-500">No items</p>}

          {items.map((i, idx) => (
            <div key={idx} className="flex justify-between border-b py-1">
              <span>{i.code}</span>
              <span>Qty: {i.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS (NO PRINT) */}
      <div className="flex gap-2 no-print">
        <button
          onClick={() => router.push("/invoice/step-2")}
          className="border px-4 py-2"
        >
          Back
        </button>

        <button onClick={handlePrint} className="bg-black text-white px-4 py-2">
          Cetak Invoice
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
