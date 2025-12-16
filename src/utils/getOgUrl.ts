export const getOgUrl = async (url: string): Promise<OgResponse> => {
  const res = await fetch("/api/og", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error("Failed to fetch OG image");

  return res.json();
};