import { useItemLookup } from "@/hooks/useItemLookup";

type Props = {
  item: {
    code: string;
    quantity: number;
  };
  onChange: (field: string, value: any) => void;
};

export default function ItemRow({ item, onChange }: Props) {
  const { data, loading, error } = useItemLookup(item.code);

  return (
    <div className="border p-3 space-y-2">
      <input
        placeholder="Kode Barang"
        className="border p-2 w-full"
        value={item.code}
        onChange={(e) => onChange("code", e.target.value)}
      />

      {loading && <p className="text-blue-500 text-sm">Loading item...</p>}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {data && (
        <div className="text-sm text-green-600">
          <p>Name: {data.name}</p>
          <p>Price: {data.price}</p>
        </div>
      )}

      <input
        type="number"
        className="border p-2 w-full"
        value={item.quantity}
        onChange={(e) => onChange("quantity", Number(e.target.value))}
      />
    </div>
  );
}
