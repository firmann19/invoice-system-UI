import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";

type Item = {
  id: number;
  code: string;
  name: string;
  price: number;
};

export function useItemLookup(code: string) {
  const [data, setData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!code) {
      setData(null);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchItem(code);
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [code]);

  const fetchItem = async (code: string) => {
    try {
      setLoading(true);
      setError("");

      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;

      const res = await api.get(`/items?code=${code}`, {
        signal: controller.signal,
      });

      setData(res.data);
    } catch (err: any) {
      if (err.name === "CanceledError" || err.name === "AbortError") {
        return;
      }

      setError("Item tidak ditemukan");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
}
