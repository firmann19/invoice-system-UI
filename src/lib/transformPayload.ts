type Item = {
  code: string;
  quantity: number;
  price?: number;
  total?: number;
};

export function transformPayload(items: Item[], role: string | null) {
  if (role === "kerani") {
    return items.map(({ price, total, ...rest }) => rest);
  }

  return items;
}
