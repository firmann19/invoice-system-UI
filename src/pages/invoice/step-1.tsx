import { useRouter } from "next/router";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";

export default function Step1() {
  const router = useRouter();
  const hydrated = useHydration();

  const { senderName, senderAddress, receiverName, receiverAddress, setField } =
    useInvoiceStore();

  const handleNext = () => {
    router.push("/invoice/step-2");
  };

  if (!hydrated) return null;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Step 1 - Data Klien</h1>

      <input
        className="border p-2 w-full"
        placeholder="Nama Pengirim"
        value={senderName}
        onChange={(e) => setField({ senderName: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Alamat Pengirim"
        value={senderAddress}
        onChange={(e) => setField({ senderAddress: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Nama Penerima"
        value={receiverName}
        onChange={(e) => setField({ receiverName: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Alamat Penerima"
        value={receiverAddress}
        onChange={(e) => setField({ receiverAddress: e.target.value })}
      />

      <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2">
        Next
      </button>
    </div>
  );
}
