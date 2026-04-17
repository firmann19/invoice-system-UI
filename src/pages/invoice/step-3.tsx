"use client";

import { useRouter } from "next/router";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";
import api from "@/lib/axios";
import { getUserRole } from "@/lib/role";
import { transformPayload } from "@/lib/transformPayload";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Step3() {
  const router = useRouter();
  const hydrated = useHydration();

  const {
    senderName,
    senderAddress,
    receiverName,
    receiverAddress,
    items,
    reset,
  } = useInvoiceStore();

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
    <div className="min-h-screen bg-muted/30 flex justify-center p-6">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
        {/* HEADER */}
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Step 3 - Review Invoice</CardTitle>
          <p className="text-sm text-muted-foreground no-print">
            Periksa data sebelum dikirim
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* INVOICE PREVIEW */}
          <div className="border rounded-xl p-6 space-y-6 print:p-0 print:border-none">
            {/* TITLE */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">INVOICE</h2>
                <p className="text-sm text-muted-foreground">Preview dokumen</p>
              </div>
            </div>

            {/* SENDER / RECEIVER */}
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold mb-1">Sender</p>
                <p>{senderName}</p>
                <p className="text-muted-foreground">{senderAddress}</p>
              </div>

              <div>
                <p className="font-semibold mb-1">Receiver</p>
                <p>{receiverName}</p>
                <p className="text-muted-foreground">{receiverAddress}</p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-3">
              <p className="font-semibold">Items</p>

              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No items available
                </p>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  {items.map((i, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between px-4 py-2 border-b last:border-none text-sm"
                    >
                      <span>{i.code}</span>
                      <span>Qty: {i.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between no-print">
            <Button onClick={() => router.push("/invoice/step-2")}>Back</Button>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={handlePrint}>
                Print
              </Button>

              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
