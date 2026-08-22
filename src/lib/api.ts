export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001";

export interface Track {
  name: string;
  file: string;
  url: string;
  size_mb: number;
  created: number;
}

export interface GenerateResult {
  session_id: string;
  message: string;
  emotion_analysis: string;
  enhanced_prompt: string;
  track_url: string | null;
  track_name: string | null;
  lyrics: string | null;
}

export function audioUrl(url: string): string {
  return url.startsWith("http") ? url : `${API_BASE}${url}`;
}

export async function fetchTracks(): Promise<Track[]> {
  const res = await fetch(`${API_BASE}/api/tracks`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load tracks (${res.status})`);
  const list: Track[] = await res.json();
  return list.map((t) => ({ ...t, url: audioUrl(t.url) }));
}

export async function generateMusic(text: string, mode: "clip" | "pro" = "clip"): Promise<GenerateResult> {
  const res = await fetch(`${API_BASE}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, mode }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail ?? `Generation failed (${res.status})`);
  }
  return res.json();
}
