import { useEffect, useState } from "preact/hooks";

import { getOgUrl } from "../utils/getOgUrl";

interface Props {
  url: string;
}

export const CardImage = ({ url }: Props) => {

  const [og, setOg] = useState<OgResponse | null>(null)

  useEffect(() => {
    getOgUrl(url)
      .then((data) => setOg(data))
      .catch((error) => console.error("Error fetching OG url:", error)
      );
  }, [url]);

  if (!og?.image) {
    return (
      <div class="min-w-20 min-h-20 rounded-xl bg-gray-200 animate-pulse" />
    );
  }

  return (
    <img
      src={og?.image}
      alt={"title"}
      class="size-20 rounded-xl object-cover opacity-90"
    />
  );
}
