"use client";

import { AudioPlayerProvider } from "react-use-audio-player";

export default function PlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AudioPlayerProvider>{children}</AudioPlayerProvider>;
}
