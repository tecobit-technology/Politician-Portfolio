export function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "");
    let id: string | null = null;

    if (host === "youtu.be") {
      id = u.pathname.slice(1).split("/")[0] || null;
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") {
        id = u.searchParams.get("v");
      } else {
        const m = u.pathname.match(/^\/(embed|shorts|live)\/([\w-]{11})/);
        id = m ? m[2] : null;
      }
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}