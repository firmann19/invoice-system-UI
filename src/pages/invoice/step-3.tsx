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

  const handleSubmit = async () => {
    try {
      const role = getUserRole();

      const {
        senderName,
        senderAddress,
        receiverName,
        receiverAddress,
        items,
      } = useInvoiceStore.getState();

      const payload = {
        sender_name: senderName,
        sender_address: senderAddress,
        receiver_name: receiverName,
        receiver_address: receiverAddress,
        items: transformPayload(items, role),
      };

      await api.post("/invoices", payload);

      alert("Invoice berhasil dibuat");
    } catch (err) {
      alert("Gagal submit invoice");
    }
  };

  if (!hydrated) return null;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Step 3 - Review</h1>

      <div className="border p-3">
        <p>
          <b>Sender:</b> {senderName}
        </p>
        <p>
          <b>Receiver:</b> {receiverName}
        </p>
      </div>

      <div>
        <h2 className="font-bold">Items</h2>
        {items.map((i, idx) => (
          <div key={idx}>
            {i.code} - Qty: {i.quantity}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => router.push("/invoice/step-2")}
          className="border px-4 py-2"
        >
          Back
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
