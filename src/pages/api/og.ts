import { load } from "cheerio";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const { url } = await request.json();

    const res = await fetch(url, { redirect: "follow" });

    const html = await res.text();

    const $ = load(html);

    const og = {
      title:
        $('meta[property="og:title"]').attr("content") ??
        $("title").text(),
      image:
        $('meta[property="og:image"]').attr("content") ??
        $('meta[name="twitter:image"]').attr("content"),
      description:
        $('meta[property="og:description"]').attr("content"),
    };

    return new Response(JSON.stringify(og));

  } catch (error) {
    return new Response(JSON.stringify({
      title: null,
      image: null,
      description: null,
    }));
  }
}