import { load } from "cheerio";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const { url } = await request.json();

    const res = await fetch(url, { redirect: "follow" });

    const contentType = res.headers.get("content-type") || "";

    // If the content type is an image, return it directly
    if (contentType.startsWith("image/")) {
      return new Response(
        JSON.stringify({
          title: null,
          image: url,
          description: null,
        }),
      );
    }


    // If the content type is HTML, parse the OG tags
    const html = await res.text();
    const $ = load(html);

    const og = {
      title:
        $('meta[property="og:title"]').attr("content") ??
        $("title").text() ??
        null,

      image:
        $('meta[property="og:image"]').attr("content") ??
        $('meta[name="twitter:image"]').attr("content") ??
        null,

      description:
        $('meta[property="og:description"]').attr("content") ??
        $('meta[name="description"]').attr("content") ??
        null,
    };

    return new Response(JSON.stringify(og), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        title: null,
        image: null,
        description: null,
      })
    );
  }
}
