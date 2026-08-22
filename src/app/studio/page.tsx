"use client";

import { useCallback, useEffect, useState } from "react";

import ChatPanel, { messageFromResult, type ChatMessage } from "@/components/ChatPanel";
import Navbar from "@/components/Navbar";
import PlayerBar from "@/components/PlayerBar";
import TracksPanel from "@/components/TracksPanel";
import { audioUrl, fetchTracks, generateMusic, type Track } from "@/lib/api";

export default function StudioPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tracksLoading, setTracksLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [current, setCurrent] = useState<Track | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [mode, setMode] = useState<"clip" | "pro">("clip");

  const loadTracks = useCallback(async () => {
    try {
      setTracks(await fetchTracks());
    } catch {
      /* backend offline — library stays as-is */
    } finally {
      setTracksLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

  const playTrack = useCallback((track: Track) => {
    setCurrent(track);
    setLibraryOpen(false);
  }, []);

  const playByUrl = useCallback(
    (url: string) => {
      const found = tracks.find((t) => t.url === url);
      if (found) {
        playTrack(found);
        return;
      }
      setCurrent({
        name:
          url
            .split("/")
            .pop()
            ?.replace("lyria3_", "")
            .replace("lyria_", "")
            .replace(/\.(wav|mp3)$/, "")
            .replace(/_/g, " ")
            .trim() ?? "Track",
        file: url.split("/").pop() ?? "",
        url,
        size_mb: 0,
        created: Date.now() / 1000,
      });
      },
    [tracks, playTrack]
  );

  const handleSend = useCallback(
    async (text: string) => {
      setMessages((m) => [...m, { role: "user", text }]);
      setBusy(true);
      try {
        const result = await generateMusic(text, mode);
        setMessages((m) => [...m, messageFromResult(result.message, result)]);
        await loadTracks();
        if (result.track_url && result.track_name) {
          setCurrent({
            name: result.track_name.replace("lyria3_", "").replace("lyria_", "").replace(/\.(wav|mp3)$/, "").replace(/_/g, " ").trim(),
            file: result.track_name,
            url: audioUrl(result.track_url),
            size_mb: 0,
            created: Date.now() / 1000,
          });
              }
      } catch (err) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text:
              err instanceof Error
                ? err.message
                : "Something went wrong while composing. Is the backend running on port 8001?",
            error: true,
          },
        ]);
      } finally {
        setBusy(false);
      }
    },
    [loadTracks, mode]
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar variant="app" onLibraryClick={() => setLibraryOpen(true)} />
      <main className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_340px]">
        <ChatPanel
          messages={messages}
          busy={busy}
          mode={mode}
          onModeChange={setMode}
          onSend={handleSend}
          onPlayTrack={playByUrl}
        />
        <div className="hidden min-h-0 lg:block">
          <TracksPanel
            tracks={tracks}
            currentUrl={current?.url ?? null}
            loading={tracksLoading}
            onSelect={playTrack}
          />
        </div>
      </main>

      {libraryOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setLibraryOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[320px] max-w-[85vw] flex-col bg-panel shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <span className="font-display text-xs font-bold tracking-[0.28em] text-white/60 uppercase">
                Library
              </span>
              <button
                onClick={() => setLibraryOpen(false)}
                className="rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
                aria-label="Close library"
              >
                ✕
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <TracksPanel
                tracks={tracks}
                currentUrl={current?.url ?? null}
                loading={tracksLoading}
                onSelect={playTrack}
                className="h-full border-l-0"
              />
            </div>
          </div>
        </div>
      )}

      <PlayerBar track={current} />
    </div>
  );
}
