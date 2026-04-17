"use client";

import { useRouter } from "next/router";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";
import ItemRow from "@/components/ItemRow";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Step2() {
  const router = useRouter();
  const hydrated = useHydration();

  const { items, setItems } = useInvoiceStore();

  const addItem = () => {
    setItems([...items, { code: "", name: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    router.push("/invoice/step-3");
  };

  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-muted/30 flex justify-center p-6">
      <Card className="w-full max-w-4xl shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Step 2 - Data Barang</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ITEMS */}
          <div className="space-y-4">
            {items.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Belum ada item. Klik tambah untuk mulai.
              </p>
            )}

            {items.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 bg-white space-y-4"
              >
                {/* GRID LAYOUT */}
                <div className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-5">
                    <ItemRow
                      item={item}
                      onChange={(field, value) => updateItem(idx, field, value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">Qty</p>
                    <input
                      className="w-full border rounded-md p-2"
                      value={item.quantity}
                      type="number"
                      onChange={(e) =>
                        updateItem(idx, "quantity", Number(e.target.value))
                      }
                    />
                  </div>

                  <div className="col-span-2 flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem(idx)}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ADD BUTTON */}
          <Button onClick={addItem} variant="secondary" className="w-full">
            + Tambah Item
          </Button>

          {/* NAV */}
          <div className="flex justify-end pt-2">
            <Button onClick={() => router.push("/invoice/step-1")}>Back</Button>

            <Button onClick={handleSubmit} disabled={items.length === 0}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
