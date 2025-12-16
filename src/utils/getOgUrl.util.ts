export const getOgUrl = async (url: string): Promise<OgResponse> => {
  const res = await fetch("/api/og", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error("Failed to fetch OG data");

  const data = await res.json() as OgResponse;

  const imageHasProtocol = data.image && data.image.startsWith("https://")
  const imageUrl = imageHasProtocol ? data.image : null

  return {
    title: data.title,
    description: data.description,
    image: imageUrl
  }
};