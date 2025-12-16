import { useEffect, useState } from "preact/hooks";

import { getOgUrl } from "../utils/getOgUrl.util";

interface Props {
  url: string;
}

export const CardImage = ({ url }: Props) => {

  const [og, setOg] = useState<OgResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fallbackImage = "https://res.cloudinary.com/dzn3nempv/image/upload/v1765846307/others/Gemini_Generated_Image_j5ekisj5ekisj5ek_fzum3r.png"

  useEffect(() => {
    setIsLoading(true);

    getOgUrl(url)
      .then((data) => setOg(data))
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, [url]);

  if (isLoading) {
    return (
      <div class="min-w-20 min-h-20 rounded-xl bg-gray-200 animate-pulse" />
    );
  }

  return (
    <img
      src={og?.image ?? fallbackImage}
      alt="Image Preview"
      class="size-20 rounded-xl object-cover opacity-90"
    />
  );
}
