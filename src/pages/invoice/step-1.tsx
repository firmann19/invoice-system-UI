"use client";

import { useRouter } from "next/router";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Step 1 - Data Klien</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Nama Pengirim</Label>
            <Input
              placeholder="Masukkan nama pengirim"
              value={senderName}
              onChange={(e) => setField({ senderName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Alamat Pengirim</Label>
            <Input
              placeholder="Masukkan alamat pengirim"
              value={senderAddress}
              onChange={(e) => setField({ senderAddress: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Nama Penerima</Label>
            <Input
              placeholder="Masukkan nama penerima"
              value={receiverName}
              onChange={(e) => setField({ receiverName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Alamat Penerima</Label>
            <Input
              placeholder="Masukkan alamat penerima"
              value={receiverAddress}
              onChange={(e) => setField({ receiverAddress: e.target.value })}
            />
          </div>

          <Button onClick={handleNext} className="w-full">
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
